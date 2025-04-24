/*
  # Add Missing Columns Migration

  1. Changes
    - Add full_name column to users table
    - Add phone column to users table
    - Add indexes for performance
    - Add phone format validation

  2. Security
    - Maintains existing RLS policies
*/

-- Add columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'full_name') THEN
    ALTER TABLE users ADD COLUMN full_name text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
    ALTER TABLE users ADD COLUMN phone text;
  END IF;
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_full_name ON users(full_name);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Add phone format validation
ALTER TABLE users DROP CONSTRAINT IF EXISTS phone_format;
ALTER TABLE users ADD CONSTRAINT phone_format CHECK (
  phone IS NULL OR phone ~ '^\+?[\d\s-]{10,}$'
);