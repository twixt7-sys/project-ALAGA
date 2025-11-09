from datetime import datetime
from ..extensions import db

class Order(db.Model):
	__tablename__ = 'orders'

	order_id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	order_date = db.Column(db.DateTime, default=datetime.utcnow)
	total_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
	status = db.Column(
		db.Enum('Pending', 'Processing', 'Completed', 'Cancelled', name='order_status'),
		default='Pending',
		nullable=False
	)

	order_items = db.relationship('OrderItem', backref='order', cascade='all, delete-orphan', lazy=True)

	def calc_total(self):
		self.total_amount = sum(item.price_at_purchase * item.quantity for item in self.order_items)

	def __repr__(self):
		return f"<Order {self.order_id} - User {self.user_id}>"

class OrderItem(db.Model):
	__tablename__ = 'order_items'

	order_item_id = db.Column(db.Integer, primary_key=True)
	order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
	quantity = db.Column(db.Integer, nullable=False, default=1)
	price_at_purchase = db.Column(db.Numeric(10, 2), nullable=False)

	def __repr__(self):
		return f"<OrderItem {self.order_item_id} - Product {self.product_id}>"
