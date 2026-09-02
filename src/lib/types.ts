export type OrderStatus = 'payment_pending' | 'held_in_escrow' | 'released';

export type DishType = 'achu' | 'kati_kati' | 'full_menu';

export type SoupChoice = 'yellow' | 'black' | 'mix';

export interface Vendor {
  id: string;
  name: string;
  quarter: string;
  specialty: string;
  description: string;
  price_xaf: number;
  rating: number;
  reviews: number;
  image_url: string;
  phone: string;
  prep_minutes: number;
  available: boolean;
  dish_type: DishType;
  created_at: string;
}

export interface Order {
  id: string;
  vendor_id: string;
  customer_name: string;
  customer_phone: string;
  dish: string;
  quantity: number;
  total_xaf: number;
  commission_xaf: number;
  gateway_fee_xaf: number;
  payout_fee_xaf: number;
  cook_payout_xaf: number;
  status: OrderStatus;
  pickup_pin: string | null;
  quarter: string;
  landmark: string | null;
  created_at: string;
  released_at: string | null;
}

export interface CateringRequest {
  id: string;
  vendor_id: string;
  people_count: number;
  total_xaf: number;
  commission_xaf: number;
  cook_payout_xaf: number;
  customer_name: string;
  customer_phone: string;
  quarter: string;
  landmark: string | null;
  delivery_date: string;
  status: OrderStatus;
  pickup_pin: string | null;
  created_at: string;
  released_at: string | null;
}

export interface VendorWithOrder extends Vendor {
  orders?: Order[];
}
