
-- Drop both restrictive SELECT policies
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;

-- Recreate as PERMISSIVE (default) so either one grants access
CREATE POLICY "Anyone can view published blogs"
  ON public.blogs
  FOR SELECT
  TO anon, authenticated
  USING ((status = 'published'::blog_status) AND ((publish_date IS NULL) OR (publish_date <= now())));

CREATE POLICY "Admins can view all blogs"
  ON public.blogs
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
