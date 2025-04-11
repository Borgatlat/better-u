-- Create workout_logs table
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  training_style TEXT NOT NULL,
  duration TEXT NOT NULL,
  exercise_count INTEGER NOT NULL,
  set_count INTEGER NOT NULL,
  completed_sets INTEGER NOT NULL,
  total_weight NUMERIC(10, 2) NOT NULL DEFAULT 0,
  exercise_names TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS workout_logs_user_id_idx ON workout_logs(user_id);
CREATE INDEX IF NOT EXISTS workout_logs_date_idx ON workout_logs(date);

-- Add RLS (Row Level Security) policies
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own workout logs
CREATE POLICY workout_logs_select_policy ON workout_logs 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own workout logs
CREATE POLICY workout_logs_insert_policy ON workout_logs 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own workout logs
CREATE POLICY workout_logs_update_policy ON workout_logs 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own workout logs
CREATE POLICY workout_logs_delete_policy ON workout_logs 
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_workout_logs_updated_at
BEFORE UPDATE ON workout_logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
