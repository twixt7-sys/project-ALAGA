import { CartItem } from './cart-item.model';

export interface Cart {
	id: number;
	userId: number;
	createdAt: string;
	updatedAt: string;
	items?: CartItem[];
}
