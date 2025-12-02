from datetime import datetime
from ..extensions import db

class Product(db.Model):
	__tablename__ = 'products'

	product_id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(120), nullable=False)
	description = db.Column(db.Text, nullable=True)
	category = db.Column(db.String(80), nullable=False)
	price = db.Column(db.Numeric(10, 2), nullable=False)
	stock_quantity = db.Column(db.Integer, nullable=False)
	image_url = db.Column(db.String(255))
	date_added = db.Column(db.DateTime, default=datetime.utcnow)

	cart_items = db.relationship('CartItem', backref='product', lazy=True)
	order_items = db.relationship('OrderItem', backref='product', lazy=True)
	inventory_logs = db.relationship('InventoryLog', backref='product', lazy=True)

	def __repr__(self):
		return f"<Product {self.name}>"

	def to_dict(self):
		return {
			"product_id": self.product_id,
			"name": self.name,
			"description": self.description,
			"category": self.category,
			"price": float(self.price) if self.price is not None else None,
			"stock_quantity": self.stock_quantity,
			"image_url": self.image_url,
			"date_added": self.date_added.isoformat() if self.date_added else None
		}