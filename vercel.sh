#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

if [[ "$VERCEL_ENV" == "production" ]] ; then

  echo "Starting npm build for production..."
  npm run build:production

  echo "Starting Alembic database upgrade..."

  # CRITICAL FIX: Directly call Alembic's main function using python3
  # This bypasses issues with finding the 'alembic' executable in the PATH
  # or it being interpreted as a directory.
  # 'upgrade head' arguments are passed to Alembic's main function.
  python3 -c "import sys; from alembic.config import main; sys.exit(main(sys.argv[1:]))" upgrade head

  echo "Alembic database upgrade completed."
else
  echo "Starting npm build for preview..."
  npm run build:preview
fi