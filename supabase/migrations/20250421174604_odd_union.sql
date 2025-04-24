/*
  # Instagram User Data Storage Schema

  1. New Columns
    - Add columns to users table:
      - `instagram_id` (text)
      - `instagram_username` (text)
      - `instagram_full_name` (text)
      - `instagram_profile_picture` (text)
      - `instagram_bio` (text)
      - `instagram_website` (text)
      - `instagram_followers_count` (integer)
      - `instagram_following_count` (integer)
      - `instagram_media_count` (integer)
      - `instagram_account_type` (text)
      - `instagram_is_business` (boolean)
      - `instagram_connected_at` (timestamp)

  2. Security
    - Maintain existing RLS policies
    - Add indexes for performance
*/

-- Add Instagram-specific columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_id text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_username text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_full_name text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_profile_picture text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_bio text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_website text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_followers_count integer;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_following_count integer;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_media_count integer;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_account_type text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_is_business boolean;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_connected_at timestamptz;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_instagram_id ON users(instagram_id);
CREATE INDEX IF NOT EXISTS idx_users_instagram_username ON users(instagram_username);

-- Add constraint to ensure instagram_id is unique when not null
ALTER TABLE users ADD CONSTRAINT unique_instagram_id UNIQUE (instagram_id);