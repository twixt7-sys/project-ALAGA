from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..services.product_service import ProductService

product_bp = Blueprint("product_bp", __name__)

@product_bp.get("/")
def list_products():
	query_params = request.args
	products = ProductService.get_all(query_params)
	return jsonify(products), 200

@product_bp.get("/<int:product_id>")
def get_product(product_id):
	product = ProductService.get_by_id(product_id)
	if not product:
		return jsonify({"error": "Product not found"}), 404
	return jsonify(product), 200

@product_bp.post("/")
@jwt_required()
def add_product():
	user = get_jwt_identity()
	claims = get_jwt()

	if claims.get("role") != "admin":
		return jsonify({"error": "Unauthorized"}), 403
	
	data = request.get_json()
	
	product = ProductService.create(data)
	return jsonify(product), 201

@product_bp.put("/<int:product_id>")
@jwt_required()
def edit_product(product_id):
	user = get_jwt_identity()
	claims = get_jwt()
	data = request.get_json()
	product = ProductService.update(product_id, data)

	if claims.get("role") != "admin":
		return jsonify({"error": "Unauthorized"}), 403

	if not product:
		return jsonify({"error": "Product not found"}), 404
	return jsonify(product), 200

@product_bp.delete("/<int:product_id>")
@jwt_required()
def remove_product(product_id):
	user = get_jwt_identity()
	claims = get_jwt()

	if claims.get("role") != "admin":
		return jsonify({"error": "Unauthorized"}), 403
	success = ProductService.delete(product_id)
	if not success:
		return jsonify({"error": "Product not found"}), 404
	return jsonify({"message": "Product deleted"}), 200
