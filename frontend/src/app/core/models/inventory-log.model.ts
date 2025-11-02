export type ChangeType = 'Restock' | 'Sale' | 'Adjustment';

export interface InventoryLog {
	id: number;
	productId: number;
	changeType: ChangeType;
	quantityChanged: number;
	timestamp: string;
}
