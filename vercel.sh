#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

if [[ $VERCEL_ENV == "production"  ]] ; then

  echo "Starting build..."
  npm run build:production

  echo "Starting Alembic database upgrade..."

  python3 -m alembic upgrade head

  echo "Alembic database upgrade completed."
else
  npm run build:preview
fi

