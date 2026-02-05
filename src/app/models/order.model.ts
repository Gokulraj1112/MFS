export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface OrderItemResponse {
  product_name: string;
  price: number;
  quantity: number;
  image: string;
}

/* =========================
   CREATE ORDER PAYLOAD
========================= */
export interface CreateOrderPayload {
  items: OrderItem[];

  customer_name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;

  notes?: string;
  delivery_date: string;

  payment_method: 'COD' | 'ONLINE'; // ✅ added
}

/* =========================
   ORDER RESPONSE MODEL
========================= */
export interface Order {
  id: number;
  total: number;

  status: 'NEW' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; // ✅ added SHIPPED

  payment_method: 'COD' | 'ONLINE'; // ✅ added
  payment_status: 'PENDING' | 'PAID' | 'FAILED'; // ✅ added

  created_at: string;
  delivery_date: string;

  notes?: string;

  customer_name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;

  items: OrderItemResponse[];
}
