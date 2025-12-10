# mediPredict - Backend (FastAPI)

This directory contains a FastAPI backend that serves patient-related data.

## Setup

1. Create a virtual environment and install dependencies:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example` and set `MONGO_URI`.

3. Optionally seed mock data (requires .env to be set):

```powershell
cd backend_fastapi
python mock_seed.py
```

4. Run the server:

```powershell
python -m uvicorn main:app --reload --port 8000
```

OpenAPI docs: http://127.0.0.1:8000/docs

## Example cURL

```powershell
curl http://127.0.0.1:8000/patients/P-3001/medicines
curl -X POST http://127.0.0.1:8000/chat -H "Content-Type: application/json" -d '{"message":"ඖෂධ ගැන කියන්න"}'
```

## Generate QR for testing

If you want a QR image for `P-3001` (scannable by the app), install additional requirements and run:

```powershell
pip install qrcode pillow
python generate_qr.py
```

This will create `backend_fastapi/samples/qr_patient.png`.

## Common Issues & Fixes

- If the backend can't connect to Mongo, the endpoints will return built-in mock JSON so frontend can still function.
- If your Android emulator cannot reach `127.0.0.1`, use `10.0.2.2` as the API base in the Flutter app.
- Do NOT commit your `.env` file with credentials to source control.

Patching Rasa `randomname` issue
--------------------------------

If you installed Rasa inside the project's virtualenv and the install fails due to the `randomname` package, run the provided PowerShell script to patch Rasa so it uses `uuid` instead:

```powershell
cd c:\Users\acer\backend_fastapi
.\.venv\Scripts\Activate.ps1
.\scripts\patch_rasa_randomname.ps1
```

This will edit `rasa/cli/utils.py` inside your venv, replacing `randomname.get_name()` calls with a uuid-based name so installation and runtime won't require `randomname`.

Chat API (Rasa model)
---------------------
Place your trained Rasa `.tar.gz` model(s) inside `backend_fastapi/models/`. The FastAPI app `chat.py` will pick the latest model and load it on first request.

Run the chat server:

```powershell
cd c:\Users\acer\backend_fastapi
.\.venv\Scripts\Activate.ps1
python -m uvicorn chat:app --reload --port 8001
```

Test with cURL:

```powershell
curl -X POST http://127.0.0.1:8001/chat -H "Content-Type: application/json" -d '{"message":"hi"}'
```

Limitations & security
----------------------
- The patch script modifies files inside your virtualenv; review the backup file `.bak` created in the same folder.
- Editing package code is an emergency workaround. For a permanent fix, report the issue to the `randomname` package maintainers or pin a fixed dependency set.

Notes:
- Do not commit your real `.env` to source control. Use `.env.example` as a template.
- If Mongo is unreachable, the endpoints will return built-in mock JSON so the frontend can function during development.
