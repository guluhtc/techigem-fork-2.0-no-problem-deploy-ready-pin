/*
  # Fix Instagram Auth Sessions RLS

  1. Changes
    - Drop existing policies
    - Create new policies for service role access
    - Add necessary indexes

  2. Security
    - Maintains secure access control
    - Allows proper session management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "authenticated_users_access" ON instagram_auth_sessions;

-- Create policy for service role
CREATE POLICY "service_role_access"
  ON instagram_auth_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_user_id ON instagram_auth_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_access_token ON instagram_auth_sessions(access_token);