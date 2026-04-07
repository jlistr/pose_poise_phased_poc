import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any,
});

function resolvePlanTier(priceId: string): 'free' | 'professional' | 'deluxe' {
  const proIds = [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID, process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_ID];
  const deluxeIds = [process.env.NEXT_PUBLIC_STRIPE_DELUXE_MONTHLY_ID, process.env.NEXT_PUBLIC_STRIPE_DELUXE_YEARLY_ID];
  if (proIds.includes(priceId)) return 'professional';
  if (deluxeIds.includes(priceId)) return 'deluxe';
  return 'free';
}

export async function POST(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Missing subscriptionId' }, { status: 400 });
    }

    // Verify the requesting user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Retrieve the subscription from Stripe to get the authoritative status
    const subscription: any = await stripe.subscriptions.retrieve(subscriptionId);

    // Verify the subscription belongs to this user via metadata
    if (subscription.metadata.supabase_user_id !== user.id) {
      return NextResponse.json({ error: 'Subscription does not belong to this user' }, { status: 403 });
    }

    const priceId = subscription.items.data[0].price.id;
    const tier = resolvePlanTier(priceId);

    // Use admin client to bypass RLS
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update subscriptions table
    const { error: subError } = await supabaseAdmin
      .from('subscriptions')
      .upsert({
        id: user.id,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        stripe_price_id: priceId,
        plan_tier: tier,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      });

    if (subError) throw subError;

    // Update user_features to reflect the new tier
    const { error: featError } = await supabaseAdmin
      .from('user_features')
      .update({
        tier: tier === 'free' ? 'free' : 'pro',
        max_images: tier === 'free' ? 10 : 50,
        can_export_pdf: tier !== 'free',
        stripe_customer_id: subscription.customer as string,
      })
      .eq('id', user.id);

    if (featError) throw featError;

    return NextResponse.json({ success: true, plan_tier: tier, status: subscription.status });
  } catch (err: any) {
    console.error('Error confirming subscription:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
