import { OrderItem } from './order-item.model';

export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

export interface Order {
	id: number;
	userId: number;
	orderDate: string;
	totalAmount: number;
	status: OrderStatus;
	items?: OrderItem[];
}
