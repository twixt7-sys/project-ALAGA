from datetime import datetime
from ..extensions import db

class Order(db.Model):
	__tablename__ = 'orders'

	order_id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	order_date = db.Column(db.DateTime, default=datetime.utcnow)
	total_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
	status = db.Column(
		db.Enum('pending', 'processing', 'completed', 'cancelled', name='order_status'),
		default='pending',
		nullable=False
	)

	order_items = db.relationship('OrderItem', backref='order', cascade='all, delete-orphan', lazy=True)

	def calc_total(self):
		self.total_amount = sum(item.price_at_purchase * item.quantity for item in self.order_items)

	def __repr__(self):
		return f"<Order {self.order_id} - User {self.user_id}>"

	def to_dict(self):
		return {
			"order_id": self.order_id,
			"user_id": self.user_id,
			"order_date": self.order_date.isoformat() if self.order_date else None,
			"total_amount": float(self.total_amount) if self.total_amount is not None else 0,
			"status": self.status,
			"order_items": [item.to_dict() for item in self.order_items]
		}

class OrderItem(db.Model):
	__tablename__ = 'order_items'

	order_item_id = db.Column(db.Integer, primary_key=True)
	order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
	quantity = db.Column(db.Integer, nullable=False, default=1)
	price_at_purchase = db.Column(db.Numeric(10, 2), nullable=False)

	def __repr__(self):
		return f"<OrderItem {self.order_item_id} - Product {self.product_id}>"

	def to_dict(self):
		return {
			"order_item_id": self.order_item_id,
			"order_id": self.order_id,
			"product_id": self.product_id,
			"quantity": self.quantity,
			"price_at_purchase": float(self.price_at_purchase)
		}

