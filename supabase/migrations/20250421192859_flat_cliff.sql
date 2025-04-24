/*
  # Instagram Authentication Schema Update

  1. Changes
    - Add Instagram-specific columns to users table
    - Create Instagram auth tables
    - Add RLS policies

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Add Instagram-specific columns to users table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'instagram_id') THEN
    ALTER TABLE users 
      ADD COLUMN instagram_id text UNIQUE,
      ADD COLUMN instagram_username text,
      ADD COLUMN instagram_full_name text,
      ADD COLUMN instagram_profile_picture text,
      ADD COLUMN instagram_bio text,
      ADD COLUMN instagram_website text,
      ADD COLUMN instagram_followers_count integer,
      ADD COLUMN instagram_following_count integer,
      ADD COLUMN instagram_media_count integer,
      ADD COLUMN instagram_account_type text,
      ADD COLUMN instagram_is_business boolean DEFAULT false,
      ADD COLUMN instagram_connected_at timestamptz;
  END IF;
END $$;

-- Create Instagram auth sessions table
CREATE TABLE IF NOT EXISTS instagram_auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text,
  token_type text DEFAULT 'bearer',
  expires_at timestamptz NOT NULL,
  scope text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on instagram_auth_sessions
ALTER TABLE instagram_auth_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for instagram_auth_sessions
CREATE POLICY "Users can manage their own Instagram auth sessions"
  ON instagram_auth_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for instagram_auth_sessions
CREATE TRIGGER update_instagram_auth_sessions_updated_at
  BEFORE UPDATE ON instagram_auth_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();