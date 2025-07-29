from logging.config import fileConfig
from alembic import context
# Ensure your Base is correctly imported. Assuming api.models.py defines it.
# If Base is in api/database.py, adjust the import accordingly.
from api.models import Base
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv
import os

# Load environment variables from .env file
# This is crucial for local development to pick up .env variables
load_dotenv()

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# --- FIX START ---
# Determine the database URL based on the environment
# Vercel sets VERCEL_ENV (production, preview, development)
# Or you can rely on your own ENV variable if you set it manually in Vercel.
# Default to 'development' if not explicitly set
env = os.getenv("VERCEL_ENV", os.getenv("ENV", "development"))

# Define the variable that will hold the database URL for Alembic
db_url_for_alembic = None

if env == "production":
  # Use POSTGRES_URL_PROD directly
  db_url_for_alembic = os.getenv("POSTGRES_URL_PROD")
elif env == 'development' or env == 'preview':  # Vercel uses 'preview' for preview deployments
  # Use POSTGRES_URL_DEV directly
  db_url_for_alembic = os.getenv("POSTGRES_URL_DEV")

if db_url_for_alembic is None:
  raise ValueError(
      f"Database URL is not set for environment: {env}. Please ensure POSTGRES_URL_PROD or POSTGRES_URL_DEV is configured and contains 'postgresql+asyncpg://' prefix.")

# Set the 'sqlalchemy.url' option in Alembic's config object
# This makes it available to context.configure later.
config.set_main_option("sqlalchemy.url", db_url_for_alembic)
# --- FIX END ---


# Interpret the config file for Python logging.
if config.config_file_name is not None:
  fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
  """Run migrations in 'offline' mode."""
  url = config.get_main_option("sqlalchemy.url")
  context.configure(
      url=url,
      target_metadata=target_metadata,
      literal_binds=True,
      dialect_opts={"paramstyle": "named"},
  )
  with context.begin_transaction():
    context.run_migrations()


def run_migrations_online() -> None:
  """Run migrations in 'online' mode."""

  # Retrieve the URL that was set in the config object
  db_url = config.get_main_option("sqlalchemy.url")
  if not db_url:
    raise ValueError("Database URL is not configured in alembic.ini or env.py")

  # Use create_async_engine with the determined URL
  connectable = create_async_engine(db_url)

  async def run_migrations_async(engine):
    async with engine.connect() as connection:
      await connection.run_sync(do_run_migrations)

  def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
      context.run_migrations()

  try:
    asyncio.run(run_migrations_async(connectable))
  finally:
    # Dispose of the engine's connections
    asyncio.run(connectable.dispose())


if context.is_offline_mode():
  run_migrations_offline()
else:
  run_migrations_online()
