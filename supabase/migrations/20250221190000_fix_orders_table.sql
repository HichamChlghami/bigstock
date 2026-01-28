-- Create orders table if it doesn't exist
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  items jsonb not null,
  total numeric not null,
  customer jsonb not null,
  status text not null default 'Pending',
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.orders enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Enable all access for all users" on public.orders;
drop policy if exists "Public can insert orders" on public.orders;
drop policy if exists "Admin can view orders" on public.orders;

-- Create a permissive policy for this application structure
-- Allows anyone (anon users) to Insert, Select, Update, Delete
-- This is necessary because the Admin panel uses the same anon key in this setup
create policy "Enable all access for all users" on public.orders
  for all using (true) with check (true);
