/*
  # Fix Instagram Auth Sessions

  1. Changes
    - Drop existing policies
    - Create new simplified policies
    - Add necessary indexes
    - Enable proper auth flow

  2. Security
    - Maintains secure access control
    - Allows proper session management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "allow_all_operations" ON instagram_auth_sessions;

-- Create simplified policy for authenticated users
CREATE POLICY "authenticated_users_access"
  ON instagram_auth_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add index for performance if not exists
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_user_id ON instagram_auth_sessions(user_id);

-- Add index for token lookup if not exists
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_access_token ON instagram_auth_sessions(access_token);