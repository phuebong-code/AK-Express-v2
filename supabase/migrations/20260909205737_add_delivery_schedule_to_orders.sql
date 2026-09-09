-- Add delivery schedule fields to orders table
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS delivery_type text NOT NULL DEFAULT 'express',
  ADD COLUMN IF NOT EXISTS scheduled_date date,
  ADD COLUMN IF NOT EXISTS scheduled_time_slot text;

COMMENT ON COLUMN orders.delivery_type IS 'express or scheduled';
COMMENT ON COLUMN orders.scheduled_date IS 'Date for scheduled pre-orders (null for express)';
COMMENT ON COLUMN orders.scheduled_time_slot IS 'Time slot for scheduled pre-orders (null for express)';
