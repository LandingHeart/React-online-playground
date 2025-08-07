# api/database.py
import os
import asyncio
from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
    AsyncSession
)
from sqlalchemy import text
import logging
from uuid import uuid4
# Configure basic logging
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Get the 'ENV' environment variable, defaulting to 'development'
env = os.getenv("ENV", "development")

if env == "production":
  POSTGRES_URL = os.getenv("POSTGRES_URL_PROD")
else:
  # Fallback to a local database for development
  POSTGRES_URL = os.getenv(
      "POSTGRES_URL_DEV", "postgresql+asyncpg://postgres:admin@localhost/codenan-io")


if not POSTGRES_URL:
  raise ValueError(
      "Database URL is not set or is empty. Please check your .env file and ensure the correct POSTGRES_URL variable has a value.")

# --- FIX: Re-added SSL configuration for production environments ---
connect_args = {}
if env == "production":
  # Most cloud databases require SSL. 'require' enforces it.
  connect_args = {
      "ssl": "require",
      "statement_cache_size": 0,
      "prepared_statement_cache_size": 0,
      "prepared_statement_name_func": lambda: f"__asyncpg_{uuid4()}__",
  }

# Create the async engine, passing the SSL config via connect_args.
# The 'echo=True' flag will print the generated SQL statements.
engine = create_async_engine(
    POSTGRES_URL,
    connect_args=connect_args,
    echo=True
)

# Create a session maker
async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for declarative models
Base = declarative_base()


async def check_db_connection():
  """
  Attempts to connect to the database and execute a simple query
  to verify the connection.
  """
  try:
    logging.info("Attempting to connect to the database...")
    # The program was failing here, preventing the next print statement.
    async with engine.connect() as connection:
      logging.info("Database connection process started...")
      result = await connection.execute(text("SELECT 1"))
      if result.scalar_one() == 1:
        logging.info("✅ Database connection successful!")
        return True
      else:
        logging.info(
            "❌ Database connection check failed: Unexpected query result.")
        return False
  except Exception as e:
    # If the connection times out or fails, this error will be printed.
    logging.info(
        f"❌ Database connection failed. Please check your connection string and ensure the database is running. Error: {e}")
    return False

if __name__ == "__main__":
  # This allows you to test the database connection directly by running:
  # python api/database.py
  # or for production:
  # ENV=production python api/database.py
  asyncio.run(check_db_connection())
