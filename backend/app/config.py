# app configurations, environment variables, and constants
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
	# basic setup
	SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")
	DEBUG = os.getenv("DEBUG", "True").lower() == "true"

	# database
	SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///alaga.db")
	SQLALCHEMY_TRACK_MODIFICATIONS = False

	# jwt auth
	JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.getenv("JWT_EXPIRES_HOURS", 2)))

	# cors
	CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

	# other optional configs
	PAGINATION_PAGE_SIZE = int(os.getenv("PAGE_SIZE", 10))
	PAGINATION_PAGE_NUMBER = int(os.getenv("PAGE_NUMBER", 1))