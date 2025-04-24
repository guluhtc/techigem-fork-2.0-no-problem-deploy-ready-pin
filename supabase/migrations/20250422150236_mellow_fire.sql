/*
  # Caption Generations Schema

  1. New Tables
    - `caption_generations`
      - Store caption generation requests and results
      - Track generation status and completion
      - Store user preferences and options

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS caption_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  options jsonb DEFAULT '{}',
  result text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed'))
);

ALTER TABLE caption_generations ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own caption generations
CREATE POLICY "Users can manage their own caption generations"
  ON caption_generations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_caption_generations_user_id ON caption_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_caption_generations_status ON caption_generations(status);