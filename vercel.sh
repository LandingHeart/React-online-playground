#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting Alembic database upgrade..."

alembic upgrade head

echo "Alembic database upgrade completed."
