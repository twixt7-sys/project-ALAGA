export interface Product {
	id: number;
	name: string;
	description: string;
	category: string;
	price: number;
	stockQuantity: number;
	imageUrl?: string;
	dateAdded: string;
}
