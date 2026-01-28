/*
  # Add Slug Column to Products
  
  1. Changes
    - Add `slug` column to `products` table (text, unique, nullable initially)
    - Add index on slug for faster lookups
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'slug') THEN
    ALTER TABLE products ADD COLUMN slug text;
    CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx ON products (slug);
  END IF;
END $$;
