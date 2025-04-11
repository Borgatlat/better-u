-- Create water_tracking table
CREATE TABLE IF NOT EXISTS water_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  water_consumed INTEGER NOT NULL DEFAULT 0, -- in ml
  water_goal INTEGER NOT NULL DEFAULT 2000, -- in ml (2 liters)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS water_tracking_user_id_idx ON water_tracking(user_id);
CREATE INDEX IF NOT EXISTS water_tracking_date_idx ON water_tracking(date);

-- Add RLS (Row Level Security) policies
ALTER TABLE water_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own water data
CREATE POLICY water_tracking_select_policy ON water_tracking 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own water data
CREATE POLICY water_tracking_insert_policy ON water_tracking 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own water data
CREATE POLICY water_tracking_update_policy ON water_tracking 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own water data
CREATE POLICY water_tracking_delete_policy ON water_tracking 
  FOR DELETE USING (auth.uid() = user_id);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_water_tracking_updated_at
BEFORE UPDATE ON water_tracking
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
