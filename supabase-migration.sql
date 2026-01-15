-- Create channels table for storing channel data
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.channels (
  id BIGSERIAL PRIMARY KEY,
  channel_number TEXT NOT NULL,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create unique constraint on channel_number and genre combination
-- This ensures we don't have duplicate channels for the same genre
CREATE UNIQUE INDEX IF NOT EXISTS channels_channel_number_genre_idx 
ON public.channels(channel_number, genre);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS channels_category_idx ON public.channels(category);

-- Create index on genre for faster filtering
CREATE INDEX IF NOT EXISTS channels_genre_idx ON public.channels(genre);

-- Enable Row Level Security (RLS) - adjust policies as needed
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (adjust as needed for your use case)
CREATE POLICY "Allow public read access" ON public.channels
  FOR SELECT
  USING (true);

-- Create policy to allow service role to insert/update (for API sync)
-- Note: This assumes you're using service role key in the API
-- If using anon key, you may need to adjust this policy
CREATE POLICY "Allow service role full access" ON public.channels
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_channels_updated_at
  BEFORE UPDATE ON public.channels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
