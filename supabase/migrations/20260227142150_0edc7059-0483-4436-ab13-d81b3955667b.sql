
-- Fix: Make admin SELECT policy permissive too
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;

CREATE POLICY "Admins can view all blogs"
  ON public.blogs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
