# models.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base  # Assuming your Base is in a 'database.py' file


class Item(Base):
  __tablename__ = "items"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True)
  description = Column(String, index=True, nullable=True)


class Project(Base):
  """
   SQLAlchemy model for the 'Projects' table.
   """
  __tablename__ = "projects"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(255), nullable=False)
  description = Column(Text)
  user_id = Column(Integer)  # Can be linked to a User model later

  # Timestamps
  created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
  updated_at = Column(TIMESTAMP(timezone=True),
                      default=func.now(), onupdate=func.now())

  # Relationship to the File model
  # The 'back_populates' argument establishes a bidirectional relationship.
  # 'cascade="all, delete-orphan"' means that related files will be deleted
  # when their parent project is deleted.
  files = relationship("File", back_populates="project",
                       cascade="all, delete-orphan")


class File(Base):
  """
  SQLAlchemy model for the 'Files' table.
  """
  __tablename__ = "files"

  id = Column(Integer, primary_key=True, index=True)
  project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
  path = Column(String(255), nullable=False)
  content = Column(Text, nullable=False)

  # Timestamps
  created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
  updated_at = Column(TIMESTAMP(timezone=True),
                      default=func.now(), onupdate=func.now())

  # Relationship to the Project model
  project = relationship("Project", back_populates="files")
