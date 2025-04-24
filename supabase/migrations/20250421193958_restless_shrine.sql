/*
  # Remove Full Name and Phone Columns

  1. Changes
    - Drop full_name and phone columns from users table
    - Drop associated indexes and constraints
    - Clean up any related data

  2. Security
    - Maintains existing RLS policies
*/

-- Drop indexes first if they exist
DROP INDEX IF EXISTS idx_users_full_name;
DROP INDEX IF EXISTS idx_users_phone;

-- Drop phone format constraint if it exists
ALTER TABLE users DROP CONSTRAINT IF EXISTS phone_format;

-- Drop columns if they exist
ALTER TABLE users 
DROP COLUMN IF EXISTS full_name,
DROP COLUMN IF EXISTS phone;