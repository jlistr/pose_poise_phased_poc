-- ==========================================
-- FIX: Add missing Stripe subscription statuses to enum
-- ==========================================
-- Stripe sends 'incomplete' for subscriptions created with payment_behavior: 'default_incomplete'.
-- Without this value, the webhook upsert silently fails and the row never receives its stripe_subscription_id,
-- breaking all downstream status updates.

ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'incomplete';
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'incomplete_expired';
ALTER TYPE public.subscription_status ADD VALUE IF NOT EXISTS 'paused';
