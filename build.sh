#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Installing Python backend dependencies..."
pip install -r backend/requirements.txt

echo "Build complete!"
