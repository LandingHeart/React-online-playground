# api/main.py
from . import database, models, schemas
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Annotated


# Import the modules directly to make object access more explicit


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


@app.post("/api/py/projects/", response_model=schemas.Project, status_code=201)
async def create_project(
    project: schemas.ProjectCreate, db: AsyncSession = Depends(get_db)
):
  """
  An example endpoint to demonstrate the database connection.
  This creates a new project in the database.
  """
  db_project = models.Project(**project.model_dump())
  db.add(db_project)
  await db.commit()
  await db.refresh(db_project)
  return db_project
