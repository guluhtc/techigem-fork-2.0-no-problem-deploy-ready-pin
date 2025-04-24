/*
  # Admin Panel Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
    
    - `features`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)

    - `pricing_plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `interval` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)

    - `plan_features`
      - `id` (uuid, primary key)
      - `plan_id` (uuid, foreign key)
      - `feature_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins full access to users"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'));

-- Features table
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins full access to features"
  ON features
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'));

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  interval text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins full access to pricing_plans"
  ON pricing_plans
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'));

-- Plan features junction table
CREATE TABLE IF NOT EXISTS plan_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES pricing_plans(id) ON DELETE CASCADE,
  feature_id uuid REFERENCES features(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(plan_id, feature_id)
);

ALTER TABLE plan_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins full access to plan_features"
  ON plan_features
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'))
  WITH CHECK (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'));