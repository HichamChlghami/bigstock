/*
  # Add categories column to products table
  
  ## Query Description:
  This migration adds the missing 'categories' column to the products table to support multi-category tagging.
  It handles the case where the column might already exist to be safe.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: products
  - Column: categories (text[])
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'categories') THEN
    ALTER TABLE products ADD COLUMN categories text[] DEFAULT '{}';
  END IF;
END $$;

-- Update existing rows to have categories based on the old 'category' column if categories is empty
UPDATE products 
SET categories = ARRAY[category] 
WHERE categories IS NULL OR categories = '{}';

-- Refresh schema cache (handled by Supabase usually, but good to note)
NOTIFY pgrst, 'reload schema';
