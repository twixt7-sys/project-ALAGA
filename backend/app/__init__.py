from flask import Flask
from .extensions import db, jwt, cors
from .config import Config
from .routes import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # extension initialization
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    
    register_blueprints(app)
    
    with app.app_context():
        db.create_all()
    
    return app