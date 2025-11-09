from ..models.product import Product
from ..models.report import SalesReport, InventoryLog
from ..extensions import db
from datetime import datetime

class AdminService:
	@staticmethod
	def get_inventory():
		products = Product.query.all()
		return [p.to_dict() for p in products]

	@staticmethod
	def get_sales_report(start_date=None, end_date=None):
		query = SalesReport.query
		if start_date:
			start_date = datetime.fromisoformat(start_date)
			query = query.filter(SalesReport.date >= start_date)
		if end_date:
			end_date = datetime.fromisoformat(end_date)
			query = query.filter(SalesReport.date <= end_date)
		reports = query.all()
		return [r.to_dict() for r in reports]
