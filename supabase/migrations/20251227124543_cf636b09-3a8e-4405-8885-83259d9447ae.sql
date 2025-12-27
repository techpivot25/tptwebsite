-- Fix 1: Add SELECT policy that blocks public reads (admin can use service role)
CREATE POLICY "No public read access to chat sessions"
ON public.chat_sessions
FOR SELECT
USING (false);

-- Fix 2: Replace unrestricted UPDATE policy with one that only allows messages updates
-- First drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can update chat sessions" ON public.chat_sessions;

-- Create function to prevent contact field updates (only allow messages field)
CREATE OR REPLACE FUNCTION public.prevent_contact_field_updates()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent changes to contact information - only messages can be updated
  IF OLD.email IS DISTINCT FROM NEW.email OR 
     OLD.name IS DISTINCT FROM NEW.name OR 
     OLD.company IS DISTINCT FROM NEW.company OR 
     OLD.mobile IS DISTINCT FROM NEW.mobile OR
     OLD.service IS DISTINCT FROM NEW.service THEN
    RAISE EXCEPTION 'Contact information cannot be modified';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to enforce contact immutability
CREATE TRIGGER enforce_contact_immutability
BEFORE UPDATE ON public.chat_sessions
FOR EACH ROW
EXECUTE FUNCTION public.prevent_contact_field_updates();

-- Create new UPDATE policy that still allows updates (trigger enforces field restrictions)
CREATE POLICY "Allow message updates to chat sessions"
ON public.chat_sessions
FOR UPDATE
USING (true)
WITH CHECK (true);