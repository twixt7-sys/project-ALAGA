export interface SalesReport {
	id: number;
	generatedBy: number;
	dateGenerated: string;
	totalSales: number;
	totalOrders: number;
	topSellingProducts: number[]; // array of product_ids
}
