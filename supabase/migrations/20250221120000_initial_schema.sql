/*
  # Initial Schema for E-commerce

  ## Query Description:
  Creates the necessary tables for products, orders, and categories.
  This migration sets up the core data structure for the application.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "High"
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - Tables: products, orders, categories
  - Security: RLS enabled on all tables
*/

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  short_description TEXT,
  description TEXT,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_notes TEXT,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending',
  items JSONB NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read, Admin Write - Simplified for now to allow public read/write for demo purposes or specific roles)
-- For a real app, you'd restrict write access to authenticated admin users.
-- Here we allow public read for products/categories, and public insert for orders.

-- Products: Everyone can read
CREATE POLICY "Enable read access for all users" ON public.products
  FOR SELECT USING (true);

-- Products: Allow insert/update/delete for now (In real app, restrict to admin)
CREATE POLICY "Enable write access for all users" ON public.products
  FOR ALL USING (true);

-- Categories: Everyone can read
CREATE POLICY "Enable read access for all users" ON public.categories
  FOR SELECT USING (true);

-- Categories: Allow write (In real app, restrict to admin)
CREATE POLICY "Enable write access for all users" ON public.categories
  FOR ALL USING (true);

-- Orders: Everyone can insert (placing order)
CREATE POLICY "Enable insert for all users" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Orders: Allow read/update (In real app, restrict to admin or owner)
CREATE POLICY "Enable read/update for all users" ON public.orders
  FOR ALL USING (true);
