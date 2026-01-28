-- Enable RLS on orders table
ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;

-- Remove any existing restrictive policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."orders";
DROP POLICY IF EXISTS "Enable insert access for all users" ON "public"."orders";
DROP POLICY IF EXISTS "Enable update access for all users" ON "public"."orders";
DROP POLICY IF EXISTS "Enable delete access for all users" ON "public"."orders";
DROP POLICY IF EXISTS "Allow anonymous inserts" ON "public"."orders";
DROP POLICY IF EXISTS "Allow anonymous selects" ON "public"."orders";

-- Create permissive policies for the application
-- Since we use a custom Admin Auth (not Supabase Auth), we allow access via the API key (anon)
CREATE POLICY "Enable read access for all users" ON "public"."orders" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON "public"."orders" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON "public"."orders" FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON "public"."orders" FOR DELETE USING (true);

-- Ensure products table is also accessible
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."products" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON "public"."products" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON "public"."products" FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON "public"."products" FOR DELETE USING (true);
