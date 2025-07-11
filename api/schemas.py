# schemas.py
from pydantic import BaseModel
from datetime import datetime


class ItemBase(BaseModel):
  name: str
  description: str | None = None


class ItemCreate(ItemBase):
  pass


class Item(ItemBase):
  id: int

  class Config:
    from_attributes = True  # Allows Pydantic to read data from ORM models

# --- File Schemas ---


class FileBase(BaseModel):
  """Base schema for a file, containing common attributes."""
  path: str
  content: str


class FileCreate(FileBase):
  """Schema for creating a new file. Inherits path and content."""
  pass


class File(FileBase):
  """
  Schema for reading a file from the database.
  Includes all database-generated fields.
  """
  id: int
  project_id: int
  created_at: datetime
  updated_at: datetime

  class Config:
    # This allows Pydantic to read data from ORM models (SQLAlchemy).
    from_attributes = True


# --- Project Schemas ---

class ProjectBase(BaseModel):
  """Base schema for a project."""
  name: str
  description: str | None = None


class ProjectCreate(ProjectBase):
  """Schema for creating a new project."""
  pass


class Project(ProjectBase):
  """
  Schema for reading a project from the database.
  This includes a list of its associated files.
  """
  id: int
  user_id: int | None = None
  created_at: datetime
  updated_at: datetime
  files: list[File] = []  # Nested list of File schemas

  class Config:
    # Enable ORM mode to map SQLAlchemy models to this Pydantic model.
    from_attributes = True
