#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Vercel provides PYTHON_EXEC_PATH which points to the Python interpreter
# in the virtual environment. We use its directory to find other installed executables.
# Example: If PYTHON_EXEC_PATH is /vercel/path/to/venv/bin/python,
# then PYTHON_BIN_DIR will be /vercel/path/to/venv/bin.
PYTHON_BIN_DIR=$(dirname "$PYTHON_EXEC_PATH")

if [[ "$VERCEL_ENV" == "production" ]] ; then

  echo "Starting npm build for production..."
  npm run build:production

  echo "Starting Alembic database upgrade..."
  # THIS IS THE CRITICAL LINE: Use the full path to the alembic executable
  "$PYTHON_BIN_DIR"/alembic upgrade head

  echo "Alembic database upgrade completed."
else
  echo "Starting npm build for preview..."
  npm run build:preview
fi