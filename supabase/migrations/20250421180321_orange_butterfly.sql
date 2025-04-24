/*
  # Add updated_at Function

  1. Changes
    - Add update_updated_at_column function
    - Function updates updated_at timestamp automatically
    - Used by triggers to maintain updated_at columns

  2. Security
    - Function is schema-level, no special permissions needed
*/

-- Create the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';