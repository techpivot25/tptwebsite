-- Add UPDATE policy to block public updates to chat_sessions
-- This completes the RLS protection for the table
CREATE POLICY "No public update access to chat sessions"
  ON public.chat_sessions
  FOR UPDATE
  TO public
  USING (false);