
-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;

CREATE POLICY "Anyone can view published blogs"
  ON public.blogs
  FOR SELECT
  USING ((status = 'published'::blog_status) AND ((publish_date IS NULL) OR (publish_date <= now())));
