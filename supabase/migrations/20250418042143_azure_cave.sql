/*
  # Token Verification Schema

  1. New Tables
    - `token_verifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `token` (text)
      - `verified_at` (timestamp)
      - `expires_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS token_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  token text NOT NULL,
  verified_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, token)
);

ALTER TABLE token_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own token verifications"
  ON token_verifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage token verifications"
  ON token_verifications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);