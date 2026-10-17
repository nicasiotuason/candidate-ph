// Supabase Edge Function: create-checkout-session
// Deploy via: supabase functions deploy create-checkout-session --no-verify-jwt
// Required Env: PAYMONGO_SECRET_KEY, VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const paymongoSecretKey = Deno.env.get("PAYMONGO_SECRET_KEY");
    if (!paymongoSecretKey) {
      throw new Error("Missing PAYMONGO_SECRET_KEY environment variable");
    }

    const { 
      amount, 
      currency = "PHP", 
      description, 
      paymentMethods = ["gcash", "paymaya", "card", "grab_pay"], 
      userId, 
      userEmail, 
      userName, 
      successUrl, 
      cancelUrl 
    } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call PayMongo Checkout Sessions API
    const authHeader = btoa(`${paymongoSecretKey}:`);
    const paymongoRes = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authHeader}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            description: description || "CANDIDATE.ph Micro-Transaction Wallet Top-Up",
            line_items: [
              {
                currency: currency,
                amount: amount, // in centavos
                name: description || "Application Credit Bundle",
                quantity: 1
              }
            ],
            payment_method_types: paymentMethods,
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
              user_id: userId,
              user_email: userEmail,
              user_name: userName,
              platform: "candidate.ph"
            }
          }
        }
      })
    });

    const responseData = await paymongoRes.json();

    if (!paymongoRes.ok) {
      console.error("PayMongo API error:", responseData);
      return new Response(
        JSON.stringify({ error: responseData.errors?.[0]?.detail || "Failed to create checkout session" }),
        { status: paymongoRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const session = responseData.data;
    const checkoutUrl = session.attributes.checkout_url;

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        checkoutUrl: checkoutUrl
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Internal error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
