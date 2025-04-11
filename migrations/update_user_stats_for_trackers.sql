-- Add calorie and water tracking columns to user_stats table
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS calories_tracked INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS water_tracked INTEGER DEFAULT 0;
