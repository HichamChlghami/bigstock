/*
  # Add Best Seller Column
  Adds a boolean flag to products to manually mark them as best sellers.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: products
  - Column: is_best_seller (boolean, default false)
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_best_seller') THEN
    ALTER TABLE products ADD COLUMN is_best_seller BOOLEAN DEFAULT false;
  END IF;
END $$;
