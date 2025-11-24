from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..services.admin_service import AdminService
from ..utils import is_admin_role, error

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.get("/inventory")
@jwt_required()
def inventory():
	claims = get_jwt()
	if not is_admin_role(claims):
		return error("Unauthorized", 403)

	products = AdminService.get_inventory()

	return jsonify(products), 200

@admin_bp.get("/sales")
@jwt_required()
def sales_report():
	claims = get_jwt()
	if not is_admin_role(claims):
		return error("Unauthorized", 403)

	start_date = request.args.get("start_date")
	end_date = request.args.get("end_date")
	report = AdminService.get_sales_report(start_date, end_date)
	return jsonify(report), 200

