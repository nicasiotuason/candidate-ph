// Supabase Edge Function: paymongo-webhook
// Deploy via: supabase functions deploy paymongo-webhook --no-verify-jwt
// Required Env: PAYMONGO_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const webhookSecret = Deno.env.get("PAYMONGO_WEBHOOK_SECRET") || "";

// Supabase admin client for secure backend database mutations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Verify HMAC-SHA256 signature from PayMongo
async function verifyPayMongoSignature(payload: string, signatureHeader: string, secret: string): Promise<boolean> {
  if (!secret) return true; // allow unverified ONLY in local dev if secret is not set
  if (!signatureHeader) return false; // fail if secret is set but signature is missing

  // Paymongo-Signature format: t=1614764834,te=test_mode_hash,li=live_mode_hash
  const parts = signatureHeader.split(",");
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const liveHashPart = parts.find((p) => p.startsWith("li="));
  const testHashPart = parts.find((p) => p.startsWith("te="));

  const timestamp = timestampPart ? timestampPart.split("=")[1] : "";
  const signature = (liveHashPart || testHashPart)?.split("=")[1];

  if (!timestamp || !signature) return false;

  const comparisonString = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(comparisonString)
  );

  const computedHash = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedHash === signature;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("paymongo-signature") || "";

    // Verify webhook authenticity
    if (webhookSecret) {
      const isValid = await verifyPayMongoSignature(rawBody, signatureHeader, webhookSecret);
      if (!isValid) {
        console.error("Invalid PayMongo signature received");
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.data?.attributes?.type;
    const eventData = payload.data?.attributes?.data;

    console.log(`Processing PayMongo event: ${eventType}`);

    if (eventType === "checkout_session.payment.paid" || eventType === "payment.paid") {
      // Support both checkout_session payload structure and direct payment payload structure
      const sessionPayments = eventData?.attributes?.payments;
      const paymentAttr = sessionPayments && sessionPayments.length > 0 
        ? sessionPayments[0]?.attributes 
        : eventData?.attributes;

      const metadata = eventData?.attributes?.metadata || paymentAttr?.metadata || {};
      const userId = metadata.user_id;
      
      // Amount in PayMongo is in centavos (e.g. 50000 = ₱500.00)
      const amountCentavos = paymentAttr?.amount || eventData?.attributes?.line_items?.[0]?.amount || 0;
      const amountPhp = amountCentavos / 100;
      const paymentId = sessionPayments && sessionPayments.length > 0
        ? sessionPayments[0]?.id
        : eventData?.id || `pay_${Date.now()}`;
      const paymentMethod = paymentAttr?.source?.type || "paymongo";

      if (!userId) {
        console.warn("No user_id found in metadata. Skipping database update.");
        return new Response(JSON.stringify({ received: true, note: "missing_user_id" }), { status: 200 });
      }

      // 1. Idempotency Check: Prevent duplicate crediting if PayMongo retries the webhook
      const { data: existingTx } = await supabase
        .from("wallet_transactions")
        .select("id")
        .eq("paymongo_payment_id", paymentId)
        .maybeSingle();

      if (existingTx) {
        console.log(`Payment ID ${paymentId} was already processed. Skipping duplicate credit.`);
        return new Response(JSON.stringify({ received: true, note: "already_processed" }), { status: 200 });
      }

      // 2. Atomic Wallet Credit using stored procedure
      const appsUnlocked = amountPhp >= 1000 ? 24 : amountPhp >= 500 ? 11 : 5;
      const { data: rpcResult, error: rpcErr } = await supabase.rpc("credit_wallet", {
        p_user_id: userId,
        p_amount: amountPhp,
        p_payment_method: `PayMongo (${paymentMethod.toUpperCase()})`,
        p_payment_id: paymentId,
        p_description: `PayMongo Instant Checkout (${appsUnlocked} Apps)`
      });

      if (rpcErr) {
        console.error("Atomic credit_wallet RPC error:", rpcErr);
        throw rpcErr;
      }

      console.log(`Successfully credited ₱${amountPhp} to user ${userId} via atomic RPC.`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
