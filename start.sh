#!/bin/bash

# Start the backend
uv run python -m backend.main &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 2

# Start the frontend
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "Backend running at http://localhost:8001"
echo "Frontend running at http://localhost:5173"

# Handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
