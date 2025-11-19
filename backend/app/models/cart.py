from datetime import datetime
from ..extensions import db

class Cart(db.Model):
	__tablename__ = 'carts'

	cart_id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	created_at = db.Column(db.DateTime, default=datetime.utcnow)
	updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

	items = db.relationship('CartItem', backref='cart', cascade='all, delete-orphan', lazy=True)

	def total_items(self):
		return sum(item.quantity for item in self.items)

	def __repr__(self):
		return f"<Cart {self.cart_id} - User {self.user_id}>"

class CartItem(db.Model):
	__tablename__ = 'cart_items'

	cart_item_id = db.Column(db.Integer, primary_key=True)
	cart_id = db.Column(db.Integer, db.ForeignKey('carts.cart_id'), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
	quantity = db.Column(db.Integer, nullable=False, default=1)

	def __repr__(self):
		return f"<CartItem {self.cart_item_id} (x{self.quantity})>"

	def to_dict(self):
		return {
			"cart_item_id": self.cart_item_id,
			"cart_id": self.cart_id,
			"product_id": self.product_id,
			"quantity": self.quantity,
			"product": self.product.to_dict() if self.product else None
		}