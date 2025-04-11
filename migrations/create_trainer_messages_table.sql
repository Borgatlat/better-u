-- Create trainer_messages table
CREATE TABLE IF NOT EXISTS trainer_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS trainer_messages_user_id_idx ON trainer_messages(user_id);
CREATE INDEX IF NOT EXISTS trainer_messages_timestamp_idx ON trainer_messages(timestamp);

-- Add RLS (Row Level Security) policies
ALTER TABLE trainer_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own messages
CREATE POLICY trainer_messages_select_policy ON trainer_messages 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own messages
CREATE POLICY trainer_messages_insert_policy ON trainer_messages 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own messages
CREATE POLICY trainer_messages_update_policy ON trainer_messages 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own messages
CREATE POLICY trainer_messages_delete_policy ON trainer_messages 
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
CREATE TRIGGER update_trainer_messages_updated_at
BEFORE UPDATE ON trainer_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
