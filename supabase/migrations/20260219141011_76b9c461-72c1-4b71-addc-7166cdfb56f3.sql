
-- Create blog_analytics table to track page views
CREATE TABLE public.blog_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
  session_id TEXT,
  country_code TEXT,
  country_name TEXT,
  state_code TEXT,
  city TEXT,
  user_agent TEXT,
  referrer TEXT,
  device_type TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for fast aggregation
CREATE INDEX idx_blog_analytics_blog_id ON public.blog_analytics(blog_id);
CREATE INDEX idx_blog_analytics_viewed_at ON public.blog_analytics(viewed_at);
CREATE INDEX idx_blog_analytics_country ON public.blog_analytics(country_code);

-- Enable RLS
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;

-- Admins can read all analytics
CREATE POLICY "Admins can view analytics"
ON public.blog_analytics
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Public insert is blocked - only via edge function (service role)
CREATE POLICY "No public insert analytics"
ON public.blog_analytics
FOR INSERT
WITH CHECK (false);

-- No public delete
CREATE POLICY "No public delete analytics"
ON public.blog_analytics
FOR DELETE
USING (false);

-- No public update
CREATE POLICY "No public update analytics"
ON public.blog_analytics
FOR UPDATE
USING (false);
