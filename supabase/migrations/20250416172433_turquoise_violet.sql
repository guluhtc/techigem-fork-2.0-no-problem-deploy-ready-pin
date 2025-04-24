/*
  # Add New Admin User

  1. Changes
    - Add new admin user with email ssghtc@gmail.com
    - Ensures idempotent insertion

  2. Security
    - Maintains existing security policies
    - Only adds admin role
*/

-- Insert new admin user
INSERT INTO users (email, role) 
VALUES ('ssghtc@gmail.com', 'admin')
ON CONFLICT (email) 
DO UPDATE SET role = 'admin'
WHERE users.email = 'ssghtc@gmail.com';