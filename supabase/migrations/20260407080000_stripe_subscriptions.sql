-- ==========================================
-- PHASE 2: STRIPE SUBSCRIPTIONS TELEMETRY
-- ==========================================

-- 1. Create Subscriptions Table explicitly tracking trial/active states
CREATE TYPE public.subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid');

CREATE TABLE public.subscriptions (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  status public.subscription_status DEFAULT 'trialing',
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Secure Subscriptions Table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription state" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = id);

-- 3. Enhance user_features with Stripe references for fast webhook joins if needed
ALTER TABLE public.user_features 
ADD COLUMN stripe_customer_id TEXT UNIQUE;

CREATE INDEX idx_stripe_customer ON public.user_features(stripe_customer_id);

-- (Note: check_image_quota trigger from Phase 1B gracefully relies on user_features.max_images
-- which our Stripe Webhook will safely update to 50 upon checkout.session.completed!)
