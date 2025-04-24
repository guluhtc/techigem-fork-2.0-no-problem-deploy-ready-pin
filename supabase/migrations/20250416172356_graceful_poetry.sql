/*
  # Fix Policy Conflict

  1. Changes
    - Drop existing policy "Allow admins full access to users"
    - Create new policy with fixed admin check logic

  2. Security
    - Maintains same security level with improved policy logic
    - Uses auth.users table for admin verification
*/

-- Drop the conflicting policy
DROP POLICY IF EXISTS "Allow admins full access to users" ON users;

-- Create new policy with fixed logic
CREATE POLICY "Allow admins full access to users_v2"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.email = auth.jwt() ->> 'email'
      AND auth.users.email IN (SELECT email FROM users WHERE role = 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.email = auth.jwt() ->> 'email'
      AND auth.users.email IN (SELECT email FROM users WHERE role = 'admin')
    )
  );