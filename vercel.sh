#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

PYTHON_BIN_DIR=$(dirname "$PYTHON_EXEC_PATH")

if [[ "$VERCEL_ENV" == "production" ]] ; then

  echo "Starting npm build for production..."
  npm run build:production

  echo "Starting Alembic database upgrade..."
  "$PYTHON_BIN_DIR"/alembic upgrade head

  echo "Alembic database upgrade completed."
else
  echo "Starting npm build for preview..."
  npm run build:preview
fi