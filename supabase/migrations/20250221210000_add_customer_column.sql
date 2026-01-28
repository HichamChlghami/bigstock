/*
# Add customer column to orders table

## Query Description:
This query adds a 'customer' column of type JSONB to the 'orders' table if it doesn't already exist.
This is required to store customer shipping details (name, address, phone) within the order record.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Medium"
- Requires-Backup: false
- Reversible: true
*/

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'orders'
        AND column_name = 'customer'
    ) THEN
        ALTER TABLE "public"."orders" ADD COLUMN "customer" JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;
