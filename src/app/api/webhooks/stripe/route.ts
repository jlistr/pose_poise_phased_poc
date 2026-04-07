import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize a hardened Service Role client that completely bypasses Row Level Security.
// Do NOT use this client for normal frontend API paths, ONLY secure webhooks.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map Stripe Price IDs to plan tiers for subscription tracking
function resolvePlanTier(priceId: string): 'free' | 'professional' | 'deluxe' {
  const proIds = [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID, process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_ID];
  const deluxeIds = [process.env.NEXT_PUBLIC_STRIPE_DELUXE_MONTHLY_ID, process.env.NEXT_PUBLIC_STRIPE_DELUXE_YEARLY_ID];

  if (proIds.includes(priceId)) return 'professional';
  if (deluxeIds.includes(priceId)) return 'deluxe';
  return 'free';
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      // Cryptographically verify this package actually originated from Stripe using the Local CLI Secret
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed. ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Process the exact event type routed to us
    switch (event.type) {
      case "customer.subscription.created": {
        const subscription = event.data.object as any;
        const userId = subscription.metadata.supabase_user_id;

        if (!userId) {
          console.warn("Missing supabase_user_id in subscription metadata.");
          break;
        }

        const priceId = subscription.items.data[0].price.id;
        const tier = resolvePlanTier(priceId);

        const { error: subError } = await supabaseAdmin
          .from("subscriptions")
          .upsert({
            id: userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            stripe_price_id: priceId,
            plan_tier: tier,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });

        if (subError) throw subError;

        if (subscription.status === 'active' || subscription.status === 'trialing') {
          const { error: featError } = await supabaseAdmin.from("user_features").update({
            tier: tier === 'free' ? 'free' : 'pro',
            max_images: tier === 'free' ? 10 : 50,
            can_export_pdf: tier !== 'free',
            stripe_customer_id: subscription.customer as string,
          }).eq("id", userId);
          if (featError) throw featError;
        }

        console.log(`✅ Subscription created (${tier}) for user ${userId}.`);
        break;
      }
      
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!userId) {
          throw new Error("Missing client_reference_id in checkout payload.");
        }

        const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;
        const tier = resolvePlanTier(priceId);

        const { error: subError } = await supabaseAdmin
          .from("subscriptions")
          .upsert({
            id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            stripe_price_id: priceId,
            plan_tier: tier,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });

        if (subError) throw subError;

        const { error: featError } = await supabaseAdmin
          .from("user_features")
          .update({
            tier: tier === 'free' ? 'free' : 'pro',
            max_images: tier === 'free' ? 10 : 50,
            can_export_pdf: tier !== 'free',
            stripe_customer_id: customerId,
          })
          .eq("id", userId);

        if (featError) throw featError;

        console.log(`✅ User ${userId} provisioned with ${tier} plan.`);
        break;
      }
      
      // Expand mapping for automated renewals over time or downgrade constraints
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription: any = event.data.object;

        const { data: subData } = await supabaseAdmin
          .from("subscriptions")
          .select("id")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (subData) {
          const priceId = subscription.items.data[0].price.id;
          const tier = resolvePlanTier(priceId);

          if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
            await supabaseAdmin.from("user_features").update({
              tier: "free",
              max_images: 10,
              can_export_pdf: false,
            }).eq("id", subData.id);
          } else if (subscription.status === 'active' || subscription.status === 'trialing') {
            await supabaseAdmin.from("user_features").update({
              tier: tier === 'free' ? 'free' : 'pro',
              max_images: tier === 'free' ? 10 : 50,
              can_export_pdf: tier !== 'free',
            }).eq("id", subData.id);
          }

          await supabaseAdmin
            .from("subscriptions")
            .update({
              status: subscription.status,
              plan_tier: tier,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq("id", subData.id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`🚨 Fatal Webhook execution crash:`, err);
    return NextResponse.json({ error: "Internal Server Error during Webhook ingestion" }, { status: 500 });
  }
}
