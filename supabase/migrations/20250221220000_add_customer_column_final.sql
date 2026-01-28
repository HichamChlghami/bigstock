-- Add the missing 'customer' column as JSONB to store customer details
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer jsonb DEFAULT '{}'::jsonb;

-- Force PostgREST to refresh its schema cache immediately
NOTIFY pgrst, 'reload config';
