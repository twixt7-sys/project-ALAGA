from flask import Flask, request, jsonify
from markupsafe import escape
from .extensions import db, jwt, cors
from .config import Config
from .routes import register_blueprints

# app instance creation
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # extension initialization
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    
    @app.route("/api")
    def hello():
        api_structure = {
            "endpoints": {
                "products": {
                    "GET /api/products": {
                        "description": "List products",
                        "query_params": ["search", "category", "page", "limit"]
                    },
                    "GET /api/products/<id>": { # Use standard Flask syntax for path variables
                        "description": "Get product by ID"
                    },
                    "POST /api/products": {
                        "description": "Create new product (business owner only)"
                    },
                    "PUT /api/products/<id>": {
                        "description": "Update product (business owner only)"
                    },
                    "DELETE /api/products/<id>": {
                        "description": "Delete product (business owner only)"
                    }
                },
                "cart": {
                    "GET /api/cart": {
                        "description": "Get current user's cart"
                    },
                    "POST /api/cart/items": {
                        "description": "Add item to cart",
                        "body": {
                            "product_id": "integer",
                            "quantity": "integer"
                        }
                    },
                    "PUT /api/cart/items/<cart_item_id>": {
                        "description": "Update cart item quantity"
                    },
                    "DELETE /api/cart/items/<cart_item_id>": {
                        "description": "Remove item from cart"
                    }
                },
                "checkout_orders": {
                    "POST /api/checkout": {
                        "description": "Perform checkout (validate items, deduct stock, create order)"
                    },
                    "GET /api/orders": {
                        "description": "List user's orders"
                    },
                    "GET /api/orders/<id>": {
                        "description": "Get order by ID (must belong to current user)"
                    },
                    "PUT /api/orders/<id>": {
                        "description": "Update order status (business owner / admin only)"
                    }
                },
                "auth": {
                    "POST /api/auth/register": {
                        "description": "Register a new user"
                    },
                    "POST /api/auth/login": {
                        "description": "Authenticate user and return JWT"
                    },
                    "GET /api/auth/me": {
                        "description": "Get current authenticated user's info (protected)"
                    }
                },
                "admin": {
                    "GET /api/admin/inventory": {
                        "description": "View all products and stock (business owner / admin only)"
                    },
                    "GET /api/admin/reports/sales": {
                        "description": "Generate sales report",
                        "query_params": ["start_date", "end_date"]
                    }
                }
            }
        }
        # Use jsonify to return the dictionary as a proper JSON response
        return jsonify(api_structure)

    # blueprint registration
    app = register_blueprints(app)
    
    # tables creation
    with app.app_context():
        db.create_all()
    
    return app