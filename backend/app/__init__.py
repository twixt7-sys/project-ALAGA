from flask import Flask, request
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
        name = request.args.get("name", "Flask")
        return f"Hello, {escape(name)}!"

    # blueprint registration
    app = register_blueprints(app)
    
    # tables creation
    with app.app_context():
        db.create_all()
    
    return app