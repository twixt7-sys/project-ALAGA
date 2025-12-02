from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..services.cart_service import CartService

cart_bp = Blueprint("cart_bp", __name__)

@cart_bp.get("/")
@jwt_required()
def view_cart():
	user = get_jwt_identity()
	claims = get_jwt()
	cart = CartService.get_cart(claims.get("user_id"))
	return jsonify(cart), 200

@cart_bp.post("/items")
@jwt_required()
def add_item():
	user = get_jwt_identity()
	claims = get_jwt()

	data = request.get_json()
	item = CartService.add_item(claims.get("user_id"), data.get("product_id"), data.get("quantity"))
	
	print("RAW DATA:", request.data)
	print("JSON:", request.get_json(silent=True))

	return jsonify(item), 201

@cart_bp.put("/items/<int:cart_item_id>")
@jwt_required()
def update_item(cart_item_id):
	data = request.get_json()
	item = CartService.update_item(cart_item_id, data)
	if not item:
		return jsonify({"error": "Item not found"}), 404
	return jsonify(item), 200

@cart_bp.delete("/items/<int:cart_item_id>")
@jwt_required()
def delete_item(cart_item_id):
	success = CartService.remove_item(cart_item_id)
	if not success:
		return jsonify({"error": "Item not found"}), 404
	return jsonify({"message": "Item removed"}), 200
