-- Create mood_tracking table
CREATE TABLE IF NOT EXISTS mood_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  mood_id TEXT NOT NULL,
  mood_label TEXT NOT NULL,
  mood_icon TEXT NOT NULL,
  mood_color TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS mood_tracking_user_id_idx ON mood_tracking(user_id);
CREATE INDEX IF NOT EXISTS mood_tracking_date_idx ON mood_tracking(date);

-- Add RLS (Row Level Security) policies
ALTER TABLE mood_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own mood entries
CREATE POLICY mood_tracking_select_policy ON mood_tracking 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own mood entries
CREATE POLICY mood_tracking_insert_policy ON mood_tracking 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own mood entries
CREATE POLICY mood_tracking_update_policy ON mood_tracking 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own mood entries
CREATE POLICY mood_tracking_delete_policy ON mood_tracking 
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
CREATE TRIGGER update_mood_tracking_updated_at
BEFORE UPDATE ON mood_tracking
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
