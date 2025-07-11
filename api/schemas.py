# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


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


# Base File Schema
class FileBase(BaseModel):
  path: str
  content: str

# Schema for creating a file (if needed)


class FileCreate(FileBase):
  pass

# Schema for reading a file


class File(FileBase):
  id: int
  created_at: datetime
  updated_at: Optional[datetime] = None  # Make updated_at optional

  class Config:
    from_attributes = True

# --- Project Schemas ---

# Base Project Schema


class ProjectBase(BaseModel):
  name: str
  description: Optional[str] = None

# Schema for creating a project


class ProjectCreate(ProjectBase):
  pass

# Schema for reading a project


class Project(ProjectBase):
  id: int
  created_at: datetime
  updated_at: Optional[datetime] = None  # Make updated_at optional
  files: List[File] = []  # Include the list of files

  class Config:
    from_attributes = True
