"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Adjust based on latest standard or your pinned API version
});

export async function createCheckoutSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ensure you define NEXT_PUBLIC_STRIPE_PRICE_ID in your .env.local file!
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;

  if (!priceId) {
    console.warn("SERVER ACTION BUMP: No Stripe Price ID found. Redirecting user back with an error param.");
    redirect("/upgrade?error=missing_stripe_price_id");
  }

  // Ping database to see if we already generated a stripe_customer_id explicitly during a past process
  const { data: featureData } = await supabase
    .from("user_features")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  const stripePayload: any = {
    mode: "subscription",
    payment_method_types: ["card"],
    client_reference_id: user.id, // VITAL: used by Webhook to map payload natively back to the Supabase User.
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 7, // Enforce the specific 7-day gateway logic requested for Phase 2 PoC
    },
    // Dynamically inject local or production route limits
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/upgrade?canceled=true`,
  };

  // If we already know the customer ID, let Stripe pre-fill them
  if ((featureData as any)?.stripe_customer_id) {
    stripePayload.customer = (featureData as any).stripe_customer_id;
  } else {
    // Optionally pre-fill their email for a faster checkout friction map
    stripePayload.customer_email = user.email;
  }

  try {
    const session = await stripe.checkout.sessions.create(stripePayload);

    if (!session.url) {
      redirect("/upgrade?error=failed_stripe_session");
    }

    // Force the server to perform a hard redirect throwing them over to the secure Stripe ecosystem
    redirect(session.url);
  } catch (err: any) {
    console.error("STRIPE CHECKOUT CRASH:", err);
    redirect("/upgrade?error=" + encodeURIComponent(err.message || 'unknown_stripe_error'));
  }
}
