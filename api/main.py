# api/main.py
from . import database, models, schemas
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends, HTTPException
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Annotated
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload


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

app = FastAPI(
    lifespan=lifespan
)

# You can add a root endpoint for the FastAPI application itself (useful for health checks)
# This will be accessible at https://your-app.vercel.app/api/py/


@app.get("/")
def read_root_api():
  return {"message": "FastAPI root is working!"}


async def get_db() -> AsyncGenerator[AsyncSession, None]:
  """Dependency that provides an async database session per request."""
  async with database.SessionLocal() as session:
    try:
      yield session
    finally:
      await session.close()


@app.get("/helloFastApi")
def hello_fast_api():
  """A simple synchronous endpoint that does not use the database.
  Accessible via /api/py/helloFastApi on Vercel.
  """
  return {"message": "Hello from FastAPI"}


@app.get("/projects/{project_id}", response_model=schemas.Project)
async def get_project_with_files(
    project_id: int, db: AsyncSession = Depends(get_db)
):
  """
  Retrieves a single project by its ID, including all of its associated files.
  Accessible via /py/projects/{project_id} on Vercel.
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
