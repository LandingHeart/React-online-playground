# api/database.py
import os
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
)


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
  raise ValueError("DATABASE_URL environment variable is not set")

engine = create_async_engine(DATABASE_URL)
SessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
