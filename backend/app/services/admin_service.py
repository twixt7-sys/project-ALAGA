from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..models.user import User
from ..extensions import db

class AuthService:
	@staticmethod
	def register_user(data):
		if User.query.filter_by(email=data["email"]).first():
			return {"error": "Email already exists"}, 400

		hashed_pw = generate_password_hash(data["password"])
		user = User(
			name=data["name"],
			email=data["email"],
			password=hashed_pw,
			role=data.get("role", "customer")
		)
		db.session.add(user)
		db.session.commit()
		return {"message": "User registered successfully"}, 201

	@staticmethod
	def login_user(data):
		user = User.query.filter_by(email=data["email"]).first()
		if not user or not check_password_hash(user.password, data["password"]):
			return {"error": "Invalid credentials"}, 401

		token = create_access_token(identity=user.id)
		return {"access_token": token, "user": user.to_dict()}, 200

	@staticmethod
	def get_current_user(user_id):
		user = User.query.get(user_id)
		return user.to_dict() if user else None
