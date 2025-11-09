from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.product_service import (
	get_all_products,
	get_product_by_id,
	create_product,
	update_product,
	delete_product
)

product_bp = Blueprint("product_bp", __name__)

@product_bp.get("/")
def list_products():
	query_params = request.args
	products = get_all_products(query_params)
	return jsonify(products), 200

@product_bp.get("/<int:product_id>")
def get_product(product_id):
	product = get_product_by_id(product_id)
	if not product:
		return jsonify({"error": "Product not found"}), 404
	return jsonify(product), 200

@product_bp.post("/")
@jwt_required()
def add_product():
	user = get_jwt_identity()
	if user["role"] != "business_owner":
		return jsonify({"error": "Unauthorized"}), 403
	data = request.get_json()
	product = create_product(data)
	return jsonify(product), 201

@product_bp.put("/<int:product_id>")
@jwt_required()
def edit_product(product_id):
	user = get_jwt_identity()
	if user["role"] != "business_owner":
		return jsonify({"error": "Unauthorized"}), 403
	data = request.get_json()
	product = update_product(product_id, data)
	if not product:
		return jsonify({"error": "Product not found"}), 404
	return jsonify(product), 200

@product_bp.delete("/<int:product_id>")
@jwt_required()
def remove_product(product_id):
	user = get_jwt_identity()
	if user["role"] != "business_owner":
		return jsonify({"error": "Unauthorized"}), 403
	success = delete_product(product_id)
	if not success:
		return jsonify({"error": "Product not found"}), 404
	return jsonify({"message": "Product deleted"}), 200
