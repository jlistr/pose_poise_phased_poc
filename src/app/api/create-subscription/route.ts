import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(request: Request) {
  try {
    let priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID;

    try {
      const body = await request.json();
      if (body.priceId) {
        priceId = body.priceId;
      }
    } catch (e) {
      // Allow fallback to env default
    }

    if (!priceId) {
      return NextResponse.json(
        { error: 'Subscription Price ID is missing. Ensure NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID is available.' },
        { status: 400 }
      );
    }

    // Securely Retrieve Active User Session
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    // Reuse existing Stripe customer if one exists, otherwise create
    const { data: existingSub } = await (supabase as any)
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    let customerId: string;

    if (existingSub?.stripe_customer_id) {
      customerId = existingSub.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      trial_period_days: 7,
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      metadata: { supabase_user_id: user.id },
    });

    // Trial subscription: Stripe populates pending_setup_intent (no charge yet)
    // Non-trial subscription: Stripe populates latest_invoice.payment_intent
    const invoice: any = subscription.latest_invoice;
    const paymentIntent: any = invoice?.payment_intent;
    const setupIntent: any = subscription.pending_setup_intent;

    let clientSecret = paymentIntent?.client_secret ?? setupIntent?.client_secret ?? null;

    // Fallback: explicitly create a SetupIntent to collect the payment method
    if (!clientSecret) {
      console.warn('Stripe omitted both intents — creating explicit SetupIntent fallback.');
      const fallbackIntent = await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
        usage: 'off_session',
        metadata: { subscription_id: subscription.id, supabase_user_id: user.id },
      });
      clientSecret = fallbackIntent.client_secret;
    }

    return NextResponse.json({
      clientSecret,
      subscriptionId: subscription.id,
    });
  } catch (err: any) {
    console.error('Error creating subscription:', err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
