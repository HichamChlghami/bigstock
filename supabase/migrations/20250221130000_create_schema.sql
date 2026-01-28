-- Create tables for the e-commerce store

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- CATEGORIES TABLE
create table public.categories (
  id text primary key,
  name text not null,
  image text
);

-- PRODUCTS TABLE
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  category text not null,
  image text not null, -- Main image (base64 or url)
  images text[] default array[]::text[], -- Gallery
  short_description text,
  description text,
  sizes text[] default array[]::text[],
  colors text[] default array[]::text[],
  in_stock boolean default true,
  is_featured boolean default false,
  is_new boolean default false,
  rating numeric default 5.0,
  reviews numeric default 0,
  stock_quantity numeric default 0,
  tags text[] default array[]::text[],
  created_at timestamptz default now()
);

-- ORDERS TABLE
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  items jsonb not null, -- Store cart items as JSON
  total numeric not null,
  customer jsonb not null, -- Store customer details as JSON
  date timestamptz default now(),
  status text default 'Pending'
);

-- RLS POLICIES
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Public Read Access
create policy "Public categories are viewable by everyone" on public.categories for select using (true);
create policy "Public products are viewable by everyone" on public.products for select using (true);

-- Admin Write Access (Simulated for this demo, usually requires auth.uid())
-- For simplicity in this demo environment, we allowing all inserts/updates if the user is authenticated via the client (anon key is fine for now, but in prod use proper auth roles)
create policy "Enable all access for authenticated users" on public.categories for all using (true) with check (true);
create policy "Enable all access for authenticated users" on public.products for all using (true) with check (true);
create policy "Enable all access for authenticated users" on public.orders for all using (true) with check (true);

-- Initial Data Seeding (Optional, but good for starting)
