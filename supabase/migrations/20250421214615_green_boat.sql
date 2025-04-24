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
DROP POLICY IF EXISTS "Users can manage their own Instagram auth sessions" ON instagram_auth_sessions;
DROP POLICY IF EXISTS "Service role can manage all sessions" ON instagram_auth_sessions;

-- Create policy for authenticated users
CREATE POLICY "authenticated_users_access"
  ON instagram_auth_sessions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create policy for service role
CREATE POLICY "service_role_access"
  ON instagram_auth_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for system operations
CREATE POLICY "system_operations_access"
  ON instagram_auth_sessions
  FOR ALL
  TO postgres
  USING (true)
  WITH CHECK (true);