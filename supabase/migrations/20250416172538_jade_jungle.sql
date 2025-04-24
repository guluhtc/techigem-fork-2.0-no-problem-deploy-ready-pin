/*
  # Fix Admin Policy

  1. Changes
    - Drop existing policies that may cause recursion
    - Create a simplified admin access policy
    - Ensure admin email has proper access

  2. Security
    - Maintains secure admin-only access
    - Prevents policy recursion
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Allow admins full access to users" ON users;
DROP POLICY IF EXISTS "Allow admins full access to users_v2" ON users;

-- Create a simplified admin policy
CREATE POLICY "admin_access_policy"
  ON users
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'ssghtc@gmail.com'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'ssghtc@gmail.com'
  );