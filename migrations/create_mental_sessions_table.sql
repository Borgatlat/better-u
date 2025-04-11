-- Create mental_sessions table
CREATE TABLE IF NOT EXISTS mental_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  session_id TEXT NOT NULL,
  session_title TEXT NOT NULL,
  session_category TEXT NOT NULL,
  duration TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  mood TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS mental_sessions_user_id_idx ON mental_sessions(user_id);
CREATE INDEX IF NOT EXISTS mental_sessions_date_idx ON mental_sessions(date);

-- Add RLS (Row Level Security) policies
ALTER TABLE mental_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own sessions
CREATE POLICY mental_sessions_select_policy ON mental_sessions 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own sessions
CREATE POLICY mental_sessions_insert_policy ON mental_sessions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own sessions
CREATE POLICY mental_sessions_update_policy ON mental_sessions 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own sessions
CREATE POLICY mental_sessions_delete_policy ON mental_sessions 
  FOR DELETE USING (auth.uid() = user_id);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_mental_sessions_updated_at
BEFORE UPDATE ON mental_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
