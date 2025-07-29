# api/database.py
import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
)


load_dotenv()
env = os.getenv("ENV")
if env == "production":
  POSTGRES_URL = os.getenv("POSTGRES_URL_PROD")
elif env == "development":
  POSTGRES_URL = os.getenv("POSTGRES_URL_DEV")
else:
  POSTGRES_URL = os.getenv("POSTGRES_URL_DEV")


if POSTGRES_URL is None:
  raise ValueError("POSTGRES_URL environment variable is not set")

engine = create_async_engine(POSTGRES_URL)
SessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
