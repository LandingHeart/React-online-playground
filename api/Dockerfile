# api/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# --- FIX: Install system dependencies required for building psycopg2 ---
# First, update the package list, then install build tools and postgresql client (which includes libpq-dev)
RUN apt-get update && apt-get install -y \
    build-essential \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*
# --- END FIX ---

# Set the working directory
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Copy the requirements file from the root context and install packages
# This now works because the build context is the project root
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code from the 'api' directory into the container
# This ensures only the backend code is copied
COPY ./api .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
