# api/database.py
import os
import asyncio  # Import asyncio
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy import text  # Import text for raw SQL queries


load_dotenv()
env = os.getenv("ENV")
if env == "production":
  POSTGRES_URL = os.getenv("POSTGRES_URL_PROD")
elif env == "development":
  POSTGRES_URL = os.getenv("POSTGRES_URL_DEV")
else:
  POSTGRES_URL = os.getenv("POSTGRES_URL_DEV")  # Fallback to DEV_ASYNC


if POSTGRES_URL is None:
  raise ValueError("POSTGRES_URL environment variable is not set")

# Add echo=True for debugging connection issues
engine = create_async_engine(POSTGRES_URL, echo=True)
SessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Connection Verification Function ---


async def check_db_connection():
  """
  Attempts to connect to the database and execute a simple query
  to verify the connection.
  """
  try:
    async with engine.connect() as connection:
      # Execute a simple query to test the connection
      # 'SELECT 1' is a common lightweight query for this purpose
      result = await connection.execute(text("SELECT 1"))
      if result.scalar_one() == 1:
        print("Database connection successful!")
        return True
      else:
        print("Database connection failed: Unexpected query result.")
        return False
  except Exception as e:
    print(f"Database connection failed: {e}")
    return False

# You might want to call this during application startup
# For a simple script, you can do:


async def main():
  await check_db_connection()

if __name__ == "__main__":
  # This block runs only when the script is executed directly
  # e.g., python api/database.py
  asyncio.run(main())
