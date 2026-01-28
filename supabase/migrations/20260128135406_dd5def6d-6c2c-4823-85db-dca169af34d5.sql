-- Fix 1: Remove unnecessary SECURITY DEFINER from trigger function
CREATE OR REPLACE FUNCTION public.prevent_contact_field_updates()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.email IS DISTINCT FROM NEW.email OR 
     OLD.name IS DISTINCT FROM NEW.name OR 
     OLD.company IS DISTINCT FROM NEW.company OR 
     OLD.mobile IS DISTINCT FROM NEW.mobile OR
     OLD.service IS DISTINCT FROM NEW.service THEN
    RAISE EXCEPTION 'Contact information cannot be modified';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;

-- Fix 2 & 3: Remove overly permissive UPDATE policy (chat sessions don't need public updates)
-- Based on code review, the application doesn't use the database for chat storage - 
-- it only uses edge functions for AI chat. Removing UPDATE capability entirely.
DROP POLICY IF EXISTS "Allow message updates to chat sessions" ON public.chat_sessions;

-- Fix 4: Add explicit DELETE restriction policy to prevent unauthorized deletion
CREATE POLICY "No public delete access to chat sessions"
ON public.chat_sessions
FOR DELETE
USING (false);