/*
  # Webhook Events Schema

  1. New Tables
    - `instagram_webhooks`
      - `id` (uuid, primary key)
      - `event_type` (text)
      - `data` (jsonb)
      - `processed` (boolean)
      - `created_at` (timestamp)
      - `processed_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for system access
*/

CREATE TABLE IF NOT EXISTS instagram_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  data jsonb NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  CONSTRAINT valid_event_type CHECK (
    event_type IN ('mentions', 'story_insights', 'media_insights')
  )
);

ALTER TABLE instagram_webhooks ENABLE ROW LEVEL SECURITY;

-- Allow system to insert webhook events
CREATE POLICY "System can insert webhook events"
  ON instagram_webhooks
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to view their webhook events
CREATE POLICY "Users can view webhook events"
  ON instagram_webhooks
  FOR SELECT
  TO authenticated
  USING (true);