-- ==========================================
-- PHASE 3/4: PORTFOLIO MANAGEMENT
-- ==========================================

CREATE TABLE public.portfolio_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view public portfolio images
CREATE POLICY "Public profile images are viewable by everyone" 
ON public.portfolio_images FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = portfolio_images.user_id 
    AND profiles.is_public = true
  )
  OR auth.uid() = user_id
);

-- Policy: Users can manage their own images
CREATE POLICY "Users can manage their own portfolio images" 
ON public.portfolio_images FOR ALL 
USING (auth.uid() = user_id);

-- Create index for faster querying by user
CREATE INDEX idx_portfolio_images_user_id ON public.portfolio_images(user_id);
