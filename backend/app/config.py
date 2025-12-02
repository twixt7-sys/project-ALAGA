import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
	# basic setup
	SECRET_KEY = os.getenv("SECRET_KEY")
	DEBUG = os.getenv("DEBUG", "True").lower() == "true"

	# database
	SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
	SQLALCHEMY_TRACK_MODIFICATIONS = False

	# jwt auth
	JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.getenv("JWT_EXPIRES_HOURS", 2)))
	JWT_IDENTITY_CLAIM = "user_id"

	# cors
	CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
