from datetime import datetime
from ..extensions import db

class User(db.Model):
	__tablename__ = 'users'

	user_id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(80), unique=True, nullable=False)
	password = db.Column(db.String(255), nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	role = db.Column(db.Enum('business_owner', 'customer', name='user_roles'), nullable=False)
	date_joined = db.Column(db.DateTime, default=datetime.utcnow)

	orders = db.relationship('Order', backref='user', lazy=True)
	carts = db.relationship('Cart', backref='user', lazy=True)
	reports = db.relationship('SalesReport', backref='owner', lazy=True)

	def __repr__(self):
		return f"<User {self.username}>"
	
	def to_dict(self):
		return {
			"user_id": self.user_id,
			"username": self.username,
			"email": self.email,
			"role": self.role,
			"date_joined": self.date_joined.isoformat() if self.date_joined else None
		}
