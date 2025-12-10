# MediPredict AI Patient Assistant – Project Overview

## Components
- **backend/**: FastAPI server exposing `/patients`, `/chat`, `/health` and root `/`.
- **frontend/**: Vite + React + Tailwind dashboard with `ChatWidget`, `PatientProfile`, `DashboardLayout`.
- **chatbot/**: Rasa 3.6 conversational model with intents, stories, and optional custom actions.
- **web/**: Placeholder Admin/Analytics portal.

## Local Paths
- **Backend**: `C:\\Users\\acer\\MediPredict\\backend`
- **Frontend**: `C:\\Users\\acer\\MediPredict\\frontend`
- **Chatbot**: `C:\\Users\\acer\\MediPredict\\chatbot`
- **Web**: `C:\\Users\\acer\\MediPredict\\web`

## Integration Plan
- **Frontend → Backend**: Axios client at `http://localhost:8000`. `ChatWidget` posts to `POST /chat`.
- **Backend → Rasa**: `POST http://localhost:5005/webhooks/rest/webhook` with `{ sender, message }`. Returns array of messages; backend transforms into `{ replies: string[] }`.
- **Actions Server** (optional): Exposed at `http://localhost:5055/webhook` for custom actions referenced in `endpoints.yml`.

## Deployment Plan
- **Backend**: Render or Railway with Docker or `uvicorn`. Add CORS to allow the frontend origin.
- **Frontend**: Vercel/Netlify deployment of Vite build (`npm run build`). Configure env `VITE_API_BASE` if you parameterize the base URL.
- **Chatbot**: Deploy Rasa server on a VM/Render/Railway. Expose REST port 5005 and actions port 5055. Secure with firewall or auth proxy.
- **Web**: Deploy as static site or Next.js app on Vercel.

## Integration Checklist
- **[ ]** Backend `/chat` forwards to Rasa REST webhook at `http://localhost:5005/webhooks/rest/webhook`.
- **[ ]** Frontend `ChatWidget` → FastAPI → Rasa → replies render.
- **[ ]** Use Axios for frontend API calls.
- **[ ]** Commands run:
  - `npm run dev` (frontend)
  - `uvicorn main:app --reload` (backend)
  - `rasa run --enable-api` (chatbot)

## Next Steps Guide (Local Dev)

### 1) Python env and backend deps (PowerShell)
```powershell
# Create and activate venv
python -m venv C:\Users\acer\MediPredict\backend\.venv
C:\Users\acer\MediPredict\backend\.venv\Scripts\Activate.ps1

# Install deps
pip install -r C:\Users\acer\MediPredict\backend\requirements.txt

# Run backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --app-dir C:\Users\acer\MediPredict\backend
```

### 2) Chatbot (Rasa)
```powershell
# (Optional) Create venv for Rasa
python -m venv C:\Users\acer\MediPredict\chatbot\.venv
C:\Users\acer\MediPredict\chatbot\.venv\Scripts\Activate.ps1

# Install Rasa (ensure Python 3.10; Rasa 3.6 supports it)
pip install rasa==3.6.20 rasa-sdk==3.6.2

# Train model
cd C:\Users\acer\MediPredict\chatbot
rasa train

# Run Rasa API
rasa run --enable-api --cors "*" --port 5005

# (Optional) Start actions server in another terminal
rasa run actions --port 5055
```

### 3) Frontend (Vite + Tailwind)
```powershell
# Scaffold Vite React+TS app in existing folder
cd C:\Users\acer\MediPredict
npm create vite@latest frontend -- --template react-ts

cd C:\Users\acer\MediPredict\frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure Tailwind
# tailwind.config.js -> content: ["./index.html", "./src/**/*.{ts,tsx}"]
# src/index.css -> add: @tailwind base; @tailwind components; @tailwind utilities;

# Add provided components into src/components and add services/api.ts
# Ensure api.ts baseURL = http://localhost:8000

npm run dev -- --port 5173
```

### 4) Integration Test
```powershell
# In three terminals
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --app-dir C:\Users\acer\MediPredict\backend
rasa run --enable-api --cors "*" --port 5005 --domain C:\Users\acer\MediPredict\chatbot\domain.yml
npm run dev --prefix C:\Users\acer\MediPredict\frontend
```

Open http://localhost:5173 and send a message in ChatWidget. Verify the response flows: Frontend → FastAPI → Rasa → Frontend.
