-- Add categories array column
ALTER TABLE products ADD COLUMN IF NOT EXISTS categories text[];

-- Migrate existing category data to the new array column
UPDATE products 
SET categories = ARRAY[category] 
WHERE categories IS NULL AND category IS NOT NULL;
