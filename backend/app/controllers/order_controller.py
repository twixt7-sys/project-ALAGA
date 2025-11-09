from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.order_service import OrderService

order_bp = Blueprint("order_bp", __name__)

@order_bp.get("/")
@jwt_required()
def list_orders():
	user = get_jwt_identity()
	orders = OrderService.get_orders(user["user_id"])
	return jsonify(orders), 200

@order_bp.get("/<int:order_id>")
@jwt_required()
def get_order(order_id):
	user = get_jwt_identity()
	order = OrderService.get_order(order_id, user["user_id"])
	if not order:
		return jsonify({"error": "Order not found"}), 404
	return jsonify(order), 200

@order_bp.put("/<int:order_id>")
@jwt_required()
def change_status(order_id):
	user = get_jwt_identity()
	if user["role"] != "business_owner":
		return jsonify({"error": "Unauthorized"}), 403
	data = request.get_json()
	order = OrderService.update_order(order_id, data)
	return jsonify(order), 200

@order_bp.post("/checkout")
@jwt_required()
def checkout():
	user = get_jwt_identity()
	result = OrderService.checkout(user["user_id"])
	return jsonify(result), 201
