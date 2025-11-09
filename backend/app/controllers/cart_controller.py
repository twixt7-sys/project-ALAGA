from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.cart_service import (
	get_user_cart,
	add_cart_item,
	update_cart_item,
	remove_cart_item
)

cart_bp = Blueprint("cart_bp", __name__)

@cart_bp.get("/")
@jwt_required()
def view_cart():
	user = get_jwt_identity()
	cart = get_user_cart(user["user_id"])
	return jsonify(cart), 200

@cart_bp.post("/items")
@jwt_required()
def add_item():
	user = get_jwt_identity()
	data = request.get_json()
	item = add_cart_item(user["user_id"], data)
	return jsonify(item), 201

@cart_bp.put("/items/<int:cart_item_id>")
@jwt_required()
def update_item(cart_item_id):
	data = request.get_json()
	item = update_cart_item(cart_item_id, data)
	if not item:
		return jsonify({"error": "Item not found"}), 404
	return jsonify(item), 200

@cart_bp.delete("/items/<int:cart_item_id>")
@jwt_required()
def delete_item(cart_item_id):
	success = remove_cart_item(cart_item_id)
	if not success:
		return jsonify({"error": "Item not found"}), 404
	return jsonify({"message": "Item removed"}), 200
