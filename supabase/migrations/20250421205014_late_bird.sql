/*
  # Instagram Authentication Schema

  1. New Tables
    - `instagram_auth_sessions`
      - Store Instagram auth session data
      - Track token expiration and refresh
      - Store authorized scopes

  2. Security
    - Enable RLS
    - Add policies for user access
*/

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
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
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

-- Create trigger for instagram_auth_sessions
CREATE TRIGGER update_instagram_auth_sessions_updated_at
  BEFORE UPDATE ON instagram_auth_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();