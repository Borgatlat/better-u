-- Add mental_sessions column to user_stats table if it doesn't exist
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS mental_sessions INTEGER DEFAULT 0;
