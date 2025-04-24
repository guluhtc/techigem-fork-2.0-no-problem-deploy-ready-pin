/*
  # Fix Instagram Auth Sessions RLS Policy

  1. Changes
    - Drop existing RLS policy
    - Create new policy that allows authenticated users to manage their sessions
    - Add service role policy for system operations

  2. Security
    - Maintains secure access control
    - Allows users to manage their own sessions
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can manage their own Instagram auth sessions" ON instagram_auth_sessions;

-- Create new policy for authenticated users
CREATE POLICY "Users can manage their own Instagram auth sessions"
  ON instagram_auth_sessions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (SELECT email FROM users WHERE role = 'admin')
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (SELECT email FROM users WHERE role = 'admin')
    )
  );

-- Create policy for service role
CREATE POLICY "Service role can manage all sessions"
  ON instagram_auth_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);