from app.models.order import Order, OrderItem
from ..models.product import Product
from ..models.report import SalesReport, InventoryLog
from ..extensions import db
from datetime import datetime
import json
from ..utils import normalize_date
from sqlalchemy import func

class AdminService:

	@staticmethod
	def get_inventory():
		products = Product.query.all()
		return [p.to_dict() for p in products]

	@staticmethod
	def get_sales_report(start_date=None, end_date=None):
		orders_q = db.session.query(Order)

		if start_date:
			orders_q = orders_q.filter(Order.order_date >= start_date)
		if end_date:
			orders_q = orders_q.filter(Order.order_date <= end_date)

		orders = orders_q.all()

		total_sales = sum(o.total_amount for o in orders)
		total_orders = len(orders)

		top_products = (
			db.session.query(
				Product.name,
				func.sum(OrderItem.quantity).label("quantity_sold")
			)
			.join(OrderItem)
			.join(Order)
			.group_by(Product.name)
			.order_by(func.sum(OrderItem.quantity).desc())
			.limit(5)
			.all()
		)

		return [{
			"total_sales": float(total_sales),
			"total_orders": total_orders,
			"top_selling_products": [
				{
					"name": p.name,
					"quantity_sold": int(p.quantity_sold)
				} for p in top_products
			]
		}]