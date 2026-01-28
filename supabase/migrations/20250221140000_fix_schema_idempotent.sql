/*
  # Fix Schema Creation (Idempotent)
  
  ## Description
  This script safely sets up the database schema by checking if tables exist before creating them.
  It also resets the Row Level Security (RLS) policies to ensure the app can access the data.

  ## Metadata:
  - Schema-Category: "Safe"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
*/

-- 1. Create Categories Table (if not exists)
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table (if not exists)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  short_description TEXT,
  description TEXT,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Orders Table (if not exists)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  customer JSONB NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT DEFAULT 'Pending'
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Reset Policies (Drop if exist, then create)
-- We use permissive policies (true) because the app uses a custom client-side admin auth
-- and needs public read/write access for the demo functionality.

DROP POLICY IF EXISTS "Public Access Categories" ON public.categories;
DROP POLICY IF EXISTS "Public Access Products" ON public.products;
DROP POLICY IF EXISTS "Public Access Orders" ON public.orders;

CREATE POLICY "Public Access Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Access Products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Access Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
