-- Create orders table for storing plan inquiries/orders
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  plan_id TEXT NOT NULL,
  plan_duration TEXT NOT NULL,
  plan_price DECIMAL(10, 2) NOT NULL,
  plan_display_duration TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  customer_city TEXT,
  customer_state TEXT,
  customer_country TEXT,
  customer_zip_code TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS orders_email_idx ON public.orders(customer_email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for form submissions)
CREATE POLICY "Allow public insert" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role full access
CREATE POLICY "Allow service role full access" ON public.orders
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
