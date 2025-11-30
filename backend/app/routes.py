from .controllers.auth_controller import auth_bp
from .controllers.product_controller import product_bp
from .controllers.cart_controller import cart_bp
from .controllers.order_controller import order_bp
from .controllers.admin_controller import admin_bp

def register_blueprints(app):
	root = "/api"
	app.register_blueprint(auth_bp, url_prefix="/api/auth")
	app.register_blueprint(product_bp, url_prefix="/api/products")
	app.register_blueprint(cart_bp, url_prefix="/api/cart")
	app.register_blueprint(order_bp, url_prefix="/api/orders")
	app.register_blueprint(admin_bp, url_prefix="/api/admin")
	return app