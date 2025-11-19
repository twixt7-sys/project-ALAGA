from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db
from ..models.user import User
from passlib.hash import pbkdf2_sha256

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.post("/register")
def register():
	data = request.get_json()
	username = data.get("username")
	email = data.get("email")
	password = data.get("password")
	role = data.get("role")


	if not all([username, email, password]):
		return jsonify({"error": "Missing fields"}), 400

	if User.query.filter((User.username == username) | (User.email == email)).first():
		return jsonify({"error": "User already exists"}), 400

	user = User(username=username, email=email, role=role)
	user.password = pbkdf2_sha256.hash(password)
	db.session.add(user)
	db.session.commit()

	return jsonify({"message": "User registered successfully"}), 201

@auth_bp.post("/login")
def login():
	data = request.get_json()
	email = data.get("email")
	password = data.get("password")

	user = User.query.filter_by(email=email).first()
	if not user or not pbkdf2_sha256.verify(password, user.password):
		return jsonify({"error": "Invalid credentials"}), 401

	access_token = create_access_token(identity={"user_id": user.user_id, "role": user.role})
	return jsonify({"access_token": access_token, "user": user.to_dict()}), 200

@auth_bp.get("/me")
@jwt_required()
def get_me():
	user_identity = get_jwt_identity()
	user = User.query.get(user_identity["user_id"])
	if not user:
		return jsonify({"error": "User not found"}), 404
	return jsonify(user.to_dict()), 200
