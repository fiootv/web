-- Contact submissions table for contact page form
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for listing submissions by date (e.g. in admin)
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (contact form is public)
CREATE POLICY "Allow anonymous insert" ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Restrict SELECT to authenticated users only (view submissions in dashboard later)
CREATE POLICY "Allow authenticated read" ON public.contact_submissions
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
