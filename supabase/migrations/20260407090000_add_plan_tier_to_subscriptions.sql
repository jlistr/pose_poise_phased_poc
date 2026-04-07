-- ==========================================
-- PHASE 2.5: ADD PLAN TIER TRACKING
-- ==========================================

-- 1. Add plan_tier column to track Free / Professional / Deluxe
CREATE TYPE public.plan_tier AS ENUM ('free', 'professional', 'deluxe');

ALTER TABLE public.subscriptions
ADD COLUMN plan_tier public.plan_tier NOT NULL DEFAULT 'free';

-- 2. Backfill: insert a free-tier subscription row for every existing user who lacks one
INSERT INTO public.subscriptions (id, status, plan_tier)
SELECT p.id, 'trialing', 'free'
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.subscriptions s WHERE s.id = p.id
);

-- 3. Allow the service role (webhooks) to manage subscription rows
CREATE POLICY "Service role can manage subscriptions"
ON public.subscriptions FOR ALL
USING (true)
WITH CHECK (true);
