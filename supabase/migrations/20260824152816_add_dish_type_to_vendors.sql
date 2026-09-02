/*
# Add dish_type column to vendors

## Overview
Adds a `dish_type` column to the `vendors` table to support cook category filtering
on the home page (Achu Specialists, Fufu & Kati-Kati, Full Menu).

## Changes
- `vendors.dish_type` (text, NOT NULL, default 'full_menu') — one of:
  'achu', 'kati_kati', 'full_menu'

## Data
- Updates existing vendors to set appropriate dish_type values based on their specialty.

## Security
- No RLS changes. Existing policies remain valid.
*/

ALTER TABLE vendors
  ADD COLUMN IF NOT EXISTS dish_type text NOT NULL DEFAULT 'full_menu';

UPDATE vendors SET dish_type = 'achu' WHERE specialty ILIKE '%achu%';
UPDATE vendors SET dish_type = 'kati_kati' WHERE specialty ILIKE '%kati-kati%' AND specialty NOT ILIKE '%achu%';
UPDATE vendors SET dish_type = 'full_menu' WHERE dish_type = 'full_menu' AND (specialty ILIKE '%bulk%' OR specialty ILIKE '%yellow & black%');
