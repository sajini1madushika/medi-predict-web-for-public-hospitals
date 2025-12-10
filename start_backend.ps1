# PowerShell script to start the mediPredict FastAPI backend

$ErrorActionPreference = "Stop"

Write-Host "Activating conda environment medi_predict_py310..."
conda activate medi_predict_py310

Write-Host "Starting FastAPI backend (backend_fastapi.main:app) on port 8000..."
uvicorn backend_fastapi.main:app --reload --port 8000
