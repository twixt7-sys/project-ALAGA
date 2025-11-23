from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..services.admin_service import AdminService

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.get("/inventory")
@jwt_required()
def inventory():
	user = get_jwt_identity()
	claims = get_jwt()

	# make into util functions
	if claims.get("role") != "admin":
		return jsonify({"error": "Unauthorized"}), 403

	products = AdminService.get_inventory()
	return jsonify(products), 200

@admin_bp.get("/reports/sales")
@jwt_required()
def sales_report():
	user = get_jwt_identity()
	if user["role"] != "business_owner":
		return jsonify({"error": "Unauthorized"}), 403
	start_date = request.args.get("start_date")
	end_date = request.args.get("end_date")
	report = AdminService.get_sales_report(user["user_id"], start_date, end_date)
	return jsonify(report), 200
