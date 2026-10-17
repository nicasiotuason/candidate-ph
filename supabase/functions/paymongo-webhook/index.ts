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
  if (!signatureHeader || !secret) return true; // allow in test/unconfigured dev mode

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
      const paymentAttr = eventData?.attributes;
      const metadata = paymentAttr?.metadata || {};
      const userId = metadata.user_id;
      
      // Amount in PayMongo is in centavos (e.g. 50000 = ₱500.00)
      const amountCentavos = paymentAttr?.amount || 0;
      const amountPhp = amountCentavos / 100;
      const paymentId = eventData?.id || `pay_${Date.now()}`;
      const paymentMethod = paymentAttr?.source?.type || "paymongo";

      if (!userId) {
        console.warn("No user_id found in metadata. Skipping database update.");
        return new Response(JSON.stringify({ received: true, note: "missing_user_id" }), { status: 200 });
      }

      // Fetch user profile to calculate new balance
      const { data: profile, error: profileErr } = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("id", userId)
        .single();

      if (profileErr) {
        console.error("Profile lookup error:", profileErr);
        throw profileErr;
      }

      const currentBalance = Number(profile?.wallet_balance || 0);
      const newBalance = currentBalance + amountPhp;

      // 1. Credit wallet balance
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({ wallet_balance: newBalance })
        .eq("id", userId);

      if (updateErr) {
        console.error("Wallet update error:", updateErr);
        throw updateErr;
      }

      // 2. Insert audit log in wallet_transactions
      const appsUnlocked = amountPhp >= 1000 ? 24 : amountPhp >= 500 ? 11 : 4;
      await supabase.from("wallet_transactions").insert({
        user_id: userId,
        amount: amountPhp,
        type: "topup",
        description: `PayMongo Instant Checkout (${appsUnlocked} Apps)`,
        balance_after: newBalance,
        payment_method: `PayMongo (${paymentMethod.toUpperCase()})`,
        paymongo_payment_id: paymentId
      });

      console.log(`Successfully credited ₱${amountPhp} to user ${userId}. New balance: ₱${newBalance}`);
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
