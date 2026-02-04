-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create chat sessions" ON public.chat_sessions;

-- Create a restrictive INSERT policy - only service role can insert
-- This prevents direct database abuse while allowing edge functions to insert if needed
CREATE POLICY "Only service role can create chat sessions" 
ON public.chat_sessions 
FOR INSERT 
TO authenticated, anon
WITH CHECK (false);