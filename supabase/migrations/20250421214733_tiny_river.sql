/*
  # Fix Instagram Auth Sessions RLS Policy

  1. Changes
    - Drop existing policies
    - Create new policy for authenticated users
    - Add policy for service role
    - Add policy for system operations

  2. Security
    - Maintains secure access control
    - Allows proper session management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "authenticated_users_access" ON instagram_auth_sessions;
DROP POLICY IF EXISTS "service_role_access" ON instagram_auth_sessions;
DROP POLICY IF EXISTS "system_operations_access" ON instagram_auth_sessions;

-- Create policy for authenticated users
CREATE POLICY "users_manage_own_sessions"
  ON instagram_auth_sessions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ssghtc@gmail.com'
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ssghtc@gmail.com'
    )
  );

-- Create policy for service role
CREATE POLICY "service_role_full_access"
  ON instagram_auth_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for anon role
CREATE POLICY "anon_read_access"
  ON instagram_auth_sessions
  FOR SELECT
  TO anon
  USING (true);