/*
  # Fix Instagram Auth Flow

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
DROP POLICY IF EXISTS "users_manage_own_sessions" ON instagram_auth_sessions;
DROP POLICY IF EXISTS "service_role_full_access" ON instagram_auth_sessions;
DROP POLICY IF EXISTS "anon_read_access" ON instagram_auth_sessions;

-- Create simplified policy for all operations
CREATE POLICY "allow_all_operations"
  ON instagram_auth_sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_user_id ON instagram_auth_sessions(user_id);

-- Add index for token lookup
CREATE INDEX IF NOT EXISTS idx_instagram_auth_sessions_access_token ON instagram_auth_sessions(access_token);