#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Upgrading build tools ---"
pip install --upgrade pip

echo "--- Installing dependencies ---"
pip install -r requirements.txt

echo "--- Build script finished ---"
