/*
  # Add Phone Column Migration

  1. Changes
    - Add phone column to users table if it doesn't exist
    - Add index for phone column
    - Add constraint for phone format

  2. Security
    - Maintains existing RLS policies
*/

-- Add phone column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
    ALTER TABLE users ADD COLUMN phone text;
    
    -- Add index for phone column
    CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    
    -- Add constraint for phone format (optional, basic validation)
    ALTER TABLE users ADD CONSTRAINT phone_format CHECK (
      phone IS NULL OR phone ~ '^\+?[\d\s-]{10,}$'
    );
  END IF;
END $$;