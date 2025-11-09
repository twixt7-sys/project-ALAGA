from ..models.order import Order, OrderItem
from ..models.cart import Cart, CartItem
from ..models.product import Product
from ..extensions import db

class OrderService:
	@staticmethod
	def checkout(user_id):
		cart = Cart.query.filter_by(user_id=user_id).first()
		if not cart or not cart.items:
			return {"error": "Cart is empty"}, 400

		order = Order(user_id=user_id, status="pending")
		db.session.add(order)
		db.session.flush()  # get order.id early

		for item in cart.items:
			product = Product.query.get(item.product_id)
			if product.stock < item.quantity:
				return {"error": f"Insufficient stock for {product.name}"}, 400
			product.stock -= item.quantity
			db.session.add(OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity, price=product.price))
			db.session.delete(item)

		db.session.commit()
		return {"message": "Order placed successfully", "order_id": order.id}

	@staticmethod
	def get_orders(user_id):
		orders = Order.query.filter_by(user_id=user_id).all()
		return [o.to_dict() for o in orders]

	@staticmethod
	def get_order(order_id, user_id):
		order = Order.query.filter_by(id=order_id, user_id=user_id).first()
		return order.to_dict() if order else None

	@staticmethod
	def update_order(order_id, status):
		order = Order.query.get(order_id)
		if not order:
			return {"error": "Order not found"}, 404
		order.status = status
		db.session.commit()
		return order.to_dict()
