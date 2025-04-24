/*
  # Instagram Business Integration Schema

  1. New Tables
    - `instagram_business_accounts`
      - Store Instagram business account data
      - Track token expiration and refresh
      - Store business-specific metrics

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS instagram_business_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  instagram_business_account_id text NOT NULL,
  username text,
  name text,
  profile_picture_url text,
  access_token text NOT NULL,
  token_type text DEFAULT 'bearer',
  token_expires_at timestamptz NOT NULL,
  is_token_valid boolean DEFAULT true,
  business_account_type text,
  media_count integer,
  followers_count integer,
  following_count integer,
  website text,
  biography text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, instagram_business_account_id)
);

ALTER TABLE instagram_business_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own Instagram business accounts"
  ON instagram_business_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update trigger for updated_at
CREATE TRIGGER update_instagram_business_accounts_updated_at
  BEFORE UPDATE ON instagram_business_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();