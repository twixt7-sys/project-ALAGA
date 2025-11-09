from ..models.cart import Cart, CartItem
from ..models.product import Product
from ..extensions import db

class CartService:
	@staticmethod
	def get_cart(user_id):
		cart = Cart.query.filter_by(user_id=user_id).first()
		if not cart:
			cart = Cart(user_id=user_id)
			db.session.add(cart)
			db.session.commit()
		return cart.to_dict()

	@staticmethod
	def add_item(user_id, product_id, quantity):
		cart = Cart.query.filter_by(user_id=user_id).first()
		if not cart:
			cart = Cart(user_id=user_id)
			db.session.add(cart)
			db.session.commit()

		product = Product.query.get(product_id)
		if not product:
			return {"error": "Product not found"}, 404

		if product.stock < quantity:
			return {"error": "Insufficient stock"}, 400

		item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()
		if item:
			item.quantity += quantity
		else:
			item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
			db.session.add(item)
		db.session.commit()
		return cart.to_dict()

	@staticmethod
	def update_item(cart_item_id, quantity):
		item = CartItem.query.get(cart_item_id)
		if not item:
			return {"error": "Cart item not found"}, 404
		item.quantity = quantity
		db.session.commit()
		return item.to_dict()

	@staticmethod
	def remove_item(cart_item_id):
		item = CartItem.query.get(cart_item_id)
		if not item:
			return {"error": "Cart item not found"}, 404
		db.session.delete(item)
		db.session.commit()
		return {"message": "Item removed"}
