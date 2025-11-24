from ..models.product import Product
from ..models.report import SalesReport, InventoryLog
from ..extensions import db
from datetime import datetime
import json
from ..utils import normalize_date

class AdminService:
	@staticmethod
	def get_inventory():
		products = Product.query.all()
		return [p.to_dict() for p in products]

	@staticmethod
	def get_sales_report(start_date=None, end_date=None):
		start = normalize_date(start_date)
		end = normalize_date(end_date)

		query = SalesReport.query
		if start:
			query = query.filter(SalesReport.date >= start)
		if end:
			query = query.filter(SalesReport.date <= end)

		return [r.to_dict() for r in query.all()]

