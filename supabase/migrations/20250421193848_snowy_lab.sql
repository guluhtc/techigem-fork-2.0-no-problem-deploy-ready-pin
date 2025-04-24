/*
  # Remove Full Name and Phone Columns

  1. Changes
    - Drop full_name column from users table
    - Drop phone column from users table
    - Drop associated indexes and constraints
    - Drop phone_format constraint

  2. Security
    - Maintains existing RLS policies
*/

-- Drop indexes first
DROP INDEX IF EXISTS idx_users_full_name;
DROP INDEX IF EXISTS idx_users_phone;

-- Drop phone format constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS phone_format;

-- Drop columns if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'full_name') THEN
    ALTER TABLE users DROP COLUMN full_name;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
    ALTER TABLE users DROP COLUMN phone;
  END IF;
END $$;