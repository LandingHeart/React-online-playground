#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

if [[ $VERCEL_ENV == "production"  ]] ; then
  echo "Starting npm build..."
  npm run build:production
else
  npm run build:preview
fi

