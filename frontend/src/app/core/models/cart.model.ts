import { CartItem } from './cart-item.model';

export interface Cart {
  cart_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
  total_items: number;
}
