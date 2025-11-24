from ..models.product import Product
from ..models.report import SalesReport, InventoryLog
from ..extensions import db
from datetime import datetime
import json

class AdminService:
	@staticmethod
	def get_inventory():
		products = Product.query.all()
		return [p.to_dict() for p in products]

	@staticmethod
	def get_sales_report(start_date=None, end_date=None):
		def normalize_date(val):
			if not val:
				return None

			# convert numbers to None
			if isinstance(val, (int, float)):
				return None

			# ensure val is string
			val = str(val)

			# try json decode
			try:
				import json
				decoded = json.loads(val)
				if isinstance(decoded, dict):
					val = decoded.get("date")
			except Exception:
				pass

			# try iso parsing
			try:
				return datetime.fromisoformat(val)
			except Exception:
				return None

		start = normalize_date(start_date)
		end = normalize_date(end_date)

		query = SalesReport.query
		if start:
			query = query.filter(SalesReport.date >= start)
		if end:
			query = query.filter(SalesReport.date <= end)

		return [r.to_dict() for r in query.all()]

