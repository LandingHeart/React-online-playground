# api/main.py

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from fastapi.middleware.cors import CORSMiddleware
import logging
from . import database, models, schemas


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
  """
  Lifespan manager to handle startup and shutdown events.
  """
  logger.info(f"Application starting in '{database.env}' mode...")
  try:
    if await database.connect_to_db():
      async with database.engine.begin() as conn:
        logger.info("Creating database tables...")
  except Exception as e:
    logger.error(f"--- DATABASE CONNECTION FAILED ON STARTUP ---")
    logger.error(f"Error: {e}")
    logger.error("API will start, but database-dependent endpoints will fail.")
    logger.error("Please ensure the database is running and accessible.")

  yield
  logger.info("Application shutdown.")

app = FastAPI(lifespan=lifespan)

origins = [
    "https://react-online-playground.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
  """Dependency that provides an async database session per request."""
  async with database.async_session() as session:
    yield session


@api_router.get("/api/helloFastApi")
def hello_fast_api():
  """A simple synchronous endpoint that does not use the database."""
  return {"message": "Hello from FastAPI (no /py prefix)"}


@api_router.get("/api/projects/{project_id}", response_model=schemas.Project)
async def get_project_with_files(
    project_id: int, db: AsyncSession = Depends(get_db)
):
  """
  Retrieves a single project by its ID, including all of its associated files.
  """
  query = (
      select(models.Project)
      .where(models.Project.id == project_id)
      .options(selectinload(models.Project.files))
  )
  result = await db.execute(query)
  project = result.scalar_one_or_none()

  if project is None:
    raise HTTPException(status_code=404, detail="Project not found")

  return project

app.include_router(api_router)
