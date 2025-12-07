from ..models.product import Product
from ..extensions import db

class ProductService:
	@staticmethod
	def get_all(search=None, category=None, page=1, limit=100):
		query = Product.query
		if search:
			query = query.filter(Product.name.ilike(f"%{search}%"))
		if category:
			query = query.filter_by(category=category)
		products = query.paginate(page=page, per_page=limit, error_out=False)
		return [p.to_dict() for p in products.items]

	@staticmethod
	def get_by_id(product_id):
		product = Product.query.get(product_id)
		return product.to_dict() if product else None

	@staticmethod
	def create(data):
		product = Product(**data)
		db.session.add(product)
		db.session.commit()
		return product.to_dict()

	@staticmethod
	def update(product_id, data):
		product = Product.query.get(product_id)
		if not product:
			return None
		for key, value in data.items():
			setattr(product, key, value)
		db.session.commit()
		return product.to_dict()

	@staticmethod
	def delete(product_id):
		product = Product.query.get(product_id)
		if not product:
			return False
		db.session.delete(product)
		db.session.commit()
		return True
