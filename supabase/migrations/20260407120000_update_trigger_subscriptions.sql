-- ==========================================
-- FIX: Update handle_new_user to insert into subscriptions
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id, 
    NEW.email, 
    SPLIT_PART(NEW.email, '@', 1) || '_' || substr(md5(random()::text), 1, 6)
  );

  -- Insert into features (Assigns 'free' tier restrictions natively)
  INSERT INTO public.user_features (id, tier, max_images, can_export_pdf)
  VALUES (NEW.id, 'free', 10, false);

  -- Insert into onboarding
  INSERT INTO public.onboarding_progress (id)
  VALUES (NEW.id);
  
  -- Insert into subscriptions with free tier
  INSERT INTO public.subscriptions (id, status, plan_tier)
  VALUES (NEW.id, 'trialing', 'free');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
