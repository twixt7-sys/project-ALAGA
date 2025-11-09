from datetime import datetime
from ..extensions import db

class SalesReport(db.Model):
	__tablename__ = 'sales_reports'

	report_id = db.Column(db.Integer, primary_key=True)
	generated_by = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	date_generated = db.Column(db.DateTime, default=datetime.utcnow)
	total_sales = db.Column(db.Numeric(10, 2), nullable=False, default=0)
	total_orders = db.Column(db.Integer, nullable=False, default=0)
	top_selling_products = db.Column(db.JSON, nullable=True)

	def __repr__(self):
		return f"<SalesReport {self.report_id}>"

class InventoryLog(db.Model):
	__tablename__ = 'inventory_logs'

	log_id = db.Column(db.Integer, primary_key=True)
	product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
	change_type = db.Column(
		db.Enum('Restock', 'Sale', 'Adjustment', name='change_type'),
		nullable=False
	)
	quantity_changed = db.Column(db.Integer, nullable=False)
	timestamp = db.Column(db.DateTime, default=datetime.utcnow)

	def __repr__(self):
		return f"<InventoryLog {self.log_id} - Product {self.product_id}>"
