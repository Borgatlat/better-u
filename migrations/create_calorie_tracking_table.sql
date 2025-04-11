-- Create calorie_tracking table
CREATE TABLE IF NOT EXISTS calorie_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  calories_consumed INTEGER NOT NULL DEFAULT 0,
  calories_goal INTEGER NOT NULL DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS calorie_tracking_user_id_idx ON calorie_tracking(user_id);
CREATE INDEX IF NOT EXISTS calorie_tracking_date_idx ON calorie_tracking(date);

-- Add RLS (Row Level Security) policies
ALTER TABLE calorie_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own calorie data
CREATE POLICY calorie_tracking_select_policy ON calorie_tracking 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own calorie data
CREATE POLICY calorie_tracking_insert_policy ON calorie_tracking 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own calorie data
CREATE POLICY calorie_tracking_update_policy ON calorie_tracking 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own calorie data
CREATE POLICY calorie_tracking_delete_policy ON calorie_tracking 
  FOR DELETE USING (auth.uid() = user_id);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_calorie_tracking_updated_at
BEFORE UPDATE ON calorie_tracking
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
