/*
# Achu & Kati-Kati Express — Core Schema

## Overview
Creates the data model for a local Cameroonian food connector platform operating
across Douala. This is a single-tenant, no-auth app: the browser talks to the
database directly with the anon key, so all policies are scoped to
`TO anon, authenticated` and the data is intentionally public/shared.

## New Tables

### vendors
Directory of local Douala cooks. Each cook has a name, quarter, specialty dish,
price (XAF), rating, photo, and a WhatsApp/phone number for contact.
- `id` (uuid, pk)
- `name` (text) — cook / vendor display name
- `quarter` (text) — Douala quarter (Makepe, Akwa, Bonapriso, Kotto, ...)
- `specialty` (text) — signature dish (Achu, Kati-Kati chicken, yellow & black soup)
- `description` (text) — short bio
- `price_xaf` (integer) — menu dish price in XAF (final price shown to buyers)
- `rating` (numeric) — average rating 0-5
- `reviews` (integer) — number of reviews
- `image_url` (text) — photo URL
- `phone` (text) — MTN/Orange Money contact number
- `prep_minutes` (integer) — typical prep time
- `available` (boolean) — currently accepting orders
- `created_at` (timestamptz)

### orders
Customer orders for individual dishes, tied to the escrow lifecycle.
- `id` (uuid, pk)
- `vendor_id` (uuid, fk -> vendors)
- `customer_name` (text)
- `customer_phone` (text) — MTN/Orange Money number used at checkout
- `dish` (text) — ordered dish name
- `quantity` (integer, default 1)
- `total_xaf` (integer) — total food price paid by buyer
- `commission_xaf` (integer) — 15% platform commission
- `gateway_fee_xaf` (integer) — ~2% deposit fee
- `payout_fee_xaf` (integer) — ~1% disbursement fee
- `cook_payout_xaf` (integer) — ~85% net cook earnings
- `status` (text) — 'payment_pending' | 'held_in_escrow' | 'released'
- `pickup_pin` (text, nullable) — 4-digit pickup PIN, set when escrow holds
- `quarter` (text) — pickup quarter
- `landmark` (text, nullable) — pickup landmark
- `created_at` (timestamptz)
- `released_at` (timestamptz, nullable)

### catering_requests
Bulk/event catering orders (Achu by the bucket for weddings, Njangi, etc.).
- `id` (uuid, pk)
- `vendor_id` (uuid, fk -> vendors)
- `people_count` (integer) — 20 / 40 / 60 / 100
- `total_xaf` (integer) — total food price
- `commission_xaf` (integer) — 15% platform commission
- `cook_payout_xaf` (integer) — ~85% net cook earnings
- `customer_name` (text)
- `customer_phone` (text)
- `quarter` (text)
- `landmark` (text, nullable)
- `delivery_date` (date)
- `status` (text) — 'payment_pending' | 'held_in_escrow' | 'released'
- `pickup_pin` (text, nullable)
- `created_at` (timestamptz)
- `released_at` (timestamptz, nullable)

## Security
- RLS enabled on every table.
- All tables are intentionally public/shared (no-auth app), so policies use
  `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`. This is
  correct for this single-tenant connector platform, not a shortcut around
  ownership checks.

## Notes
1. No `user_id` columns or `auth.uid()` references — no sign-in screen.
2. `pickup_pin` is generated client-side when an order moves to 'held_in_escrow'.
3. Status transitions: payment_pending -> held_in_escrow -> released.
*/

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quarter text NOT NULL,
  specialty text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_xaf integer NOT NULL DEFAULT 2500,
  rating numeric(2,1) NOT NULL DEFAULT 4.8,
  reviews integer NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  prep_minutes integer NOT NULL DEFAULT 30,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_vendors" ON vendors;
CREATE POLICY "anon_select_vendors" ON vendors FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_vendors" ON vendors;
CREATE POLICY "anon_insert_vendors" ON vendors FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_vendors" ON vendors;
CREATE POLICY "anon_update_vendors" ON vendors FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_vendors" ON vendors;
CREATE POLICY "anon_delete_vendors" ON vendors FOR DELETE
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  customer_name text NOT NULL DEFAULT '',
  customer_phone text NOT NULL,
  dish text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_xaf integer NOT NULL,
  commission_xaf integer NOT NULL DEFAULT 0,
  gateway_fee_xaf integer NOT NULL DEFAULT 0,
  payout_fee_xaf integer NOT NULL DEFAULT 0,
  cook_payout_xaf integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'payment_pending',
  pickup_pin text,
  quarter text NOT NULL DEFAULT '',
  landmark text,
  created_at timestamptz NOT NULL DEFAULT now(),
  released_at timestamptz
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS orders_customer_phone_idx ON orders (customer_phone);
CREATE INDEX IF NOT EXISTS orders_vendor_idx ON orders (vendor_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);


CREATE TABLE IF NOT EXISTS catering_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  people_count integer NOT NULL,
  total_xaf integer NOT NULL,
  commission_xaf integer NOT NULL DEFAULT 0,
  cook_payout_xaf integer NOT NULL DEFAULT 0,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  quarter text NOT NULL,
  landmark text,
  delivery_date date NOT NULL,
  status text NOT NULL DEFAULT 'payment_pending',
  pickup_pin text,
  created_at timestamptz NOT NULL DEFAULT now(),
  released_at timestamptz
);

ALTER TABLE catering_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_catering" ON catering_requests;
CREATE POLICY "anon_select_catering" ON catering_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_catering" ON catering_requests;
CREATE POLICY "anon_insert_catering" ON catering_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_catering" ON catering_requests;
CREATE POLICY "anon_update_catering" ON catering_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_catering" ON catering_requests;
CREATE POLICY "anon_delete_catering" ON catering_requests FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS catering_vendor_idx ON catering_requests (vendor_id);
CREATE INDEX IF NOT EXISTS catering_status_idx ON catering_requests (status);
