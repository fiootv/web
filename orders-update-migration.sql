-- Migration to add missing fields from checkout form
-- Run this SQL in your Supabase SQL editor

-- Add new columns to orders table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_first_name TEXT,
  ADD COLUMN IF NOT EXISTS customer_last_name TEXT,
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS customer_address_line_1 TEXT,
  ADD COLUMN IF NOT EXISTS customer_address_line_2 TEXT,
  ADD COLUMN IF NOT EXISTS order_notes TEXT,
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash_on_delivery';

-- Update existing records to split customer_name into first_name and last_name if needed
-- This is optional - only run if you want to migrate existing data
-- UPDATE public.orders
-- SET customer_first_name = SPLIT_PART(customer_name, ' ', 1),
--     customer_last_name = SUBSTRING(customer_name FROM LENGTH(SPLIT_PART(customer_name, ' ', 1)) + 2)
-- WHERE customer_first_name IS NULL AND customer_name IS NOT NULL;

-- Migrate existing address to address_line_1
UPDATE public.orders
SET customer_address_line_1 = customer_address
WHERE customer_address_line_1 IS NULL AND customer_address IS NOT NULL;
