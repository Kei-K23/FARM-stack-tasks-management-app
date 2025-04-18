# 1. Build frontend
FROM node:23-alpine AS frontend

WORKDIR /app/frontend
COPY frontend/ .

RUN npm install && npm run build

# 2. Build backend (FastAPI + Uvicorn)
FROM python:3.13.3-alpine AS backend

# Set working dir and copy everything
WORKDIR /app
COPY backend/ /app/backend/
COPY --from=frontend /app/frontend/dist /app/frontend/dist/

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start FastAPI with static files
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]