# Backend (FastAPI) Dockerfile
FROM python:3.10-slim
WORKDIR /app

# Install system deps if needed (uncomment if you add OS packages)
# RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker layer cache
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Environment
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Launch Uvicorn using package entrypoint
CMD ["python", "-m", "uvicorn", "backend_fastapi.main:app", "--host", "0.0.0.0", "--port", "8000"]
