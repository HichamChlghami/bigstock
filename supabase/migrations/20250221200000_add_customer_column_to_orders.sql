/*
  # Fix Orders Table Schema
  
  ## Query Description:
  Adds the missing 'customer' JSONB column to the orders table to store shipping details.
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: orders
  - Column: customer (JSONB)
*/

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'customer') THEN
        ALTER TABLE orders ADD COLUMN customer JSONB DEFAULT '{}'::jsonb;
    END IF;

    -- Also ensure 'items' exists just in case
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'items') THEN
        ALTER TABLE orders ADD COLUMN items JSONB DEFAULT '[]'::jsonb;
    END IF;
    
    -- Ensure RLS is enabled and policies exist (idempotent check)
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
END $$;

-- Re-apply policies to be safe (drop first to avoid errors)
DROP POLICY IF EXISTS "Enable insert for everyone" ON orders;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON orders;

CREATE POLICY "Enable insert for everyone" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for authenticated users only" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" ON orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON orders FOR DELETE TO authenticated USING (true);
