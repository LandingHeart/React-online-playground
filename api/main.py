# api/main.py
# Import the modules directly to make object access more explicit
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends, HTTPException
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Annotated
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
import database
import models
import schemas


@asynccontextmanager
async def lifespan(app: FastAPI):
  """
  Lifespan manager to handle startup and shutdown events.
  On startup, it creates the database tables.
  """
  # Access engine and Base through the database module
  async with database.engine.begin() as conn:
    await conn.run_sync(database.Base.metadata.create_all)
  yield
  # Code here would run on shutdown


# Create FastAPI instance with custom docs, openapi url, and lifespan manager
app = FastAPI(
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json",
    lifespan=lifespan
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
  """Dependency that provides an async database session per request."""
  async with database.SessionLocal() as session:
    yield session


@app.get("/api/py/helloFastApi")
def hello_fast_api():
  """A simple synchronous endpoint that does not use the database."""
  return {"message": "Hello from FastAPI"}


@app.get("/api/py/projects/{project_id}", response_model=schemas.Project)
async def get_project_with_files(
    project_id: int, db: AsyncSession = Depends(get_db)
):
  """
  Retrieves a single project by its ID, including all of its associated files.
  """
  # Create a query to select the project and eagerly load the related files
  # using selectinload() to prevent the N+1 query problem.
  query = (
      select(models.Project)
      .where(models.Project.id == project_id)
      .options(selectinload(models.Project.files))
  )
  result = await db.execute(query)

  # scalar_one_or_none() is a clean way to get a single result or None
  project = result.scalar_one_or_none()

  if project is None:
    raise HTTPException(status_code=404, detail="Project not found")

  return project
