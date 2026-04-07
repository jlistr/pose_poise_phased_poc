-- ==========================================
-- PHASE 1A / 1B: SUPABASE INFRASTRUCTURE
-- ==========================================
-- Execute this script in your Supabase SQL Editor
-- to establish the Core Database, Auth Triggers,
-- Storage Buckets, and Row Level Security (RLS) Limits.

-- 1. Create Core Application Tables
CREATE TYPE public.subscription_tier AS ENUM ('FREE', 'PROFESSIONAL', 'DELUXE');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  username TEXT UNIQUE,
  slug TEXT UNIQUE,
  avatar_url TEXT,
  overline TEXT,
  bio TEXT,
  instagram TEXT,
  tiktok TEXT,
  facebook TEXT,
  twitter TEXT,
  website TEXT,
  hourly_rate TEXT,
  day_rate TEXT,
  services TEXT,
  height_cm NUMERIC,
  bust_cm NUMERIC,
  waist_cm NUMERIC,
  hips_cm NUMERIC,
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  location TEXT,
  agency TEXT,
  is_public BOOLEAN DEFAULT false,
  subscription_tier public.subscription_tier DEFAULT 'FREE',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  custom_domain TEXT,
  custom_domain_verified BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INT DEFAULT 0,
  onboarding_completed_at TIMESTAMPTZ,
  selected_template TEXT DEFAULT 'altar',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: RLS needs to be enabled for Next.js Server Components to securely update
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read any public profile
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT 
USING (is_public = true OR auth.uid() = id);

-- Allow users to update their own profile during onboarding and beyond
CREATE POLICY "Users can update their own profile." 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE TABLE public.user_features (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  tier TEXT DEFAULT 'free', -- 'free' or 'pro'
  max_images INT DEFAULT 10,
  can_export_pdf BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own features." 
ON public.user_features FOR SELECT 
USING (auth.uid() = id);

CREATE TABLE public.onboarding_progress (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  current_step TEXT DEFAULT 'template',
  completed BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update own onboarding progress." 
ON public.onboarding_progress FOR ALL 
USING (auth.uid() = id);

-- 2. Create the Trigger to auto-populate profiles on user registration
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
  INSERT INTO public.user_features (id)
  VALUES (NEW.id);

  -- Insert into onboarding
  INSERT INTO public.onboarding_progress (id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Bind Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- STORAGE ENFORCEMENT & PUBLIC BUCKETS
-- ==========================================

-- 3. Create the Portfolio Images Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the Storage Objects table (Already natively enabled by Supabase)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Set standard Storage RLS (Standard CRUD)
-- Allow public to READ images
CREATE POLICY "Public profiles are viewable by everyone" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload to their own folder (folder name = user_id)
CREATE POLICY "Users can upload their own images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'portfolio-images' AND 
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-images' AND 
  (auth.uid()::text = (string_to_array(name, '/'))[1])
);


-- ==========================================
-- THE 10-IMAGE HARD LIMIT POLICY (FREE TIER)
-- ==========================================
-- In Supabase Storage RLS, we can restrict INSERTS based on aggregated criteria.
-- Alternatively, if running aggregate queries inside RLS causes performance issues, 
-- a Postgres trigger on standard database tables is preferred. 
-- Since Supabase Storage `objects` table IS a standard table, we can attach a trigger:

CREATE OR REPLACE FUNCTION check_image_quota()
RETURNS TRIGGER AS $$
DECLARE
  current_count INT;
  allowed_limit INT;
  user_tier TEXT;
  user_folder TEXT;
BEGIN
  -- We only restrict the 'portfolio-images' bucket
  IF NEW.bucket_id = 'portfolio-images' THEN
    -- Extract the User ID folder boundary (the first element of the file path)
    user_folder := (string_to_array(NEW.name, '/'))[1];

    -- Verify the uploading user is placing it inside their designated folder
    IF user_folder != auth.uid()::text THEN
      RAISE EXCEPTION 'You cannot upload files into another user''s directory.';
    END IF;

    -- Lookup their allotted limit dynamically from user_features
    SELECT tier, max_images INTO user_tier, allowed_limit 
    FROM public.user_features 
    WHERE id = auth.uid();

    -- Count active images current held in their folder
    SELECT COUNT(*) INTO current_count 
    FROM storage.objects 
    WHERE bucket_id = 'portfolio-images' 
    AND (string_to_array(name, '/'))[1] = auth.uid()::text;

    -- Enforce the 10-image restriction (or dynamically requested limit)
    IF current_count >= allowed_limit THEN
      RAISE EXCEPTION 'Maximum image quota (%) reached for % tier. Please upgrade to upload more.', allowed_limit, user_tier;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Bind quota limit Trigger directly to Storage INSERTS
DROP TRIGGER IF EXISTS enforce_portfolio_quota ON storage.objects;
CREATE TRIGGER enforce_portfolio_quota
  BEFORE INSERT ON storage.objects
  FOR EACH ROW EXECUTE FUNCTION check_image_quota();
