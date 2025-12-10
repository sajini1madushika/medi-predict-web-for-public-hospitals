from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
import asyncio
import logging
from typing import Optional
import os
import io
from datetime import datetime
from pymongo import MongoClient

app = FastAPI(title="rasa-chat-api")

logger = logging.getLogger("uvicorn.error")


class ChatRequest(BaseModel):
    message: str


def find_latest_model(models_dir: Path) -> Optional[Path]:
    """Find files like YYYYMMDD-HHMMSS-*.tar.gz and return the newest by filename.

    Returns None if no models found.
    """
    if not models_dir.exists() or not models_dir.is_dir():
        return None
    files = list(models_dir.glob("*.tar.gz"))
    if not files:
        return None
    # sort by filename (timestamps at start) descending
    files.sort(key=lambda p: p.name, reverse=True)
    return files[0]


def _download_latest_from_gdrive(models_dir: Path) -> Optional[Path]:
    """Attempt to download the latest .tar.gz from Google Drive into models_dir.

    This function is optional: it requires the `google-api-python-client` and
    `google-auth` packages and credentials. Configure either of these env vars:

    - GDRIVE_SERVICE_ACCOUNT: path to a service account JSON file, OR
    - GDRIVE_CREDENTIALS_JSON: path to OAuth client credentials JSON (less common here)

    Also set GDRIVE_FOLDER_ID to the Drive folder containing your models. If
    download succeeds, returns the Path to the downloaded file; otherwise None.
    """
    # Only attempt if env vars provided
    cred_path = os.environ.get("GDRIVE_SERVICE_ACCOUNT") or os.environ.get(
        "GDRIVE_CREDENTIALS_JSON"
    )
    folder_id = os.environ.get("GDRIVE_FOLDER_ID")

    if not cred_path or not folder_id:
        logger.debug("No GDrive credentials or folder id provided; skipping GDrive download.")
        return None

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaIoBaseDownload
    except Exception as e:
        logger.warning(
            "Google Drive client libraries not installed (google-api-python-client/google-auth).\n"
            "Install with: pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib"
        )
        return None

    try:
        scopes = ["https://www.googleapis.com/auth/drive.readonly"]
        creds = service_account.Credentials.from_service_account_file(cred_path, scopes=scopes)
        service = build("drive", "v3", credentials=creds)

        # List files in folder that end with .tar.gz
        query = f"'{folder_id}' in parents and name contains '.tar.gz' and trashed = false"
        resp = service.files().list(q=query, fields="files(id,name,createdTime)").execute()
        files = resp.get("files", [])
        if not files:
            logger.warning("No .tar.gz files found in the configured Drive folder.")
            return None

        # pick latest by name (assumes filename starts with timestamp) or by createdTime
        files.sort(key=lambda f: f.get("name", ""), reverse=True)
        file_meta = files[0]

        file_id = file_meta["id"]
        file_name = file_meta["name"]

        models_dir.mkdir(parents=True, exist_ok=True)
        out_path = models_dir / file_name

        # Download
        request = service.files().get_media(fileId=file_id)
        fh = io.FileIO(str(out_path), mode="wb")
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
            logger.info("Download %d%%.", int(status.progress() * 100) if status else 0)

        logger.info("Downloaded model from GDrive to %s", out_path)
        return out_path
    except Exception as e:
        logger.exception("Failed to download from Google Drive: %s", e)
        return None


async def load_agent_from_model(model_path: Path):
    """Lazy-load the Rasa Agent from a model archive. Raises informative errors."""
    try:
        # import inside function to avoid hard dependency at module import time
        from rasa.core.agent import Agent
    except Exception as e:
        logger.error("Failed to import rasa.core.agent: %s", e)
        raise RuntimeError("Rasa is not available in the environment: %s" % e)

    try:
        agent = await Agent.load(str(model_path))
    except Exception as e:
        logger.exception("Failed to load Rasa model '%s': %s", model_path, e)
        raise RuntimeError(f"Failed to load Rasa model '{model_path}': {e}")

    return agent


# Cache agent in module scope
_agent = None
_agent_lock = asyncio.Lock()


async def get_agent():
    """Return cached agent or load the latest model found in ./models."""
    global _agent
    async with _agent_lock:
        if _agent is not None:
            return _agent

        models_dir = Path(__file__).parent / "models"
        latest = find_latest_model(models_dir)
        if not latest:
            # Attempt to download from Google Drive (optional). Will return None if not configured.
            downloaded = _download_latest_from_gdrive(models_dir)
            if downloaded:
                latest = downloaded
        if not latest:
            raise RuntimeError("No Rasa model found in ./models. Place a .tar.gz model there or configure GDRIVE_SERVICE_ACCOUNT and GDRIVE_FOLDER_ID.")

        _agent = await load_agent_from_model(latest)
        return _agent


def _get_db():
    """Return a MongoDB client and collection for logging chats.

    Uses MONGO_URI env var. If missing, returns None for the collection.
    """
    uri = os.environ.get("MONGO_URI")
    if not uri:
        logger.debug("MONGO_URI not set; chat logs will not be stored.")
        return None
    try:
        client = MongoClient(uri)
        db = client.get_database()
        coll = db.get_collection("patient_chats")
        return coll
    except Exception as e:
        logger.exception("Failed to connect to MongoDB: %s", e)
        return None


def _log_chat(user_message: str, bot_reply: str):
    coll = _get_db()
    if not coll:
        return
    try:
        coll.insert_one({"user_message": user_message, "bot_reply": bot_reply, "timestamp": datetime.utcnow()})
    except Exception:
        logger.exception("Failed to write chat log to MongoDB")


def rule_based_reply(message: str) -> str:
    """Fallback simple rule-based replies used when Rasa agent is unavailable."""
    text = (message or "").lower()

    if "ඖෂධ" in text or "drug" in text:
        return "ඔබට දිනකට දෙවරක් මිනිත්තු 30 කට පෙර ඖෂධ ගන්න."
    if "අහාර" in text or "food" in text:
        return "ඔබ මසුරූම් සහ සීනි අඩු කරන්න."
    if "වෙහෙස" in text or "වෙහෙසවීම" in text or "tired" in text:
        return "ඔබ සතිහරකට නියමිත නිදහස් හා ප්‍රමාණවත් වර්කවුට් කිරීමක් කරන්න; විවේක සඳහා 8 පැය නියමිත වේලාවන් ඇත්නම් හොඳය."

    return "කරුණාකර ඔබේ ප්‍රශ්නය පැහැදිලි කරන්න."


@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    # Try to use the Rasa agent if available; otherwise return the fallback rule reply
    try:
        agent = await get_agent()
    except Exception as e:
        logger.warning("Rasa agent unavailable, using fallback reply: %s", e)
        reply = rule_based_reply(req.message)
        try:
            _log_chat(req.message, reply)
        except Exception:
            logger.exception("Failed to log fallback reply to MongoDB")
        return {"reply": reply}

    try:
        responses = await agent.handle_text(req.message)
        texts = [r.get("text") for r in responses if isinstance(r, dict) and r.get("text")]
        reply = texts[0] if texts else rule_based_reply(req.message)
        _log_chat(req.message, reply)
        return {"reply": reply}
    except Exception as e:
        logger.exception("Error while getting response from Rasa agent: %s", e)
        reply = rule_based_reply(req.message)
        _log_chat(req.message, reply)
        return {"reply": reply}


@app.post("/models/reload")
async def models_reload():
    """Force re-scan of ./models and reload the agent cache."""
    global _agent
    async with _agent_lock:
        _agent = None
        try:
            models_dir = Path(__file__).parent / "models"
            latest = find_latest_model(models_dir)
            if not latest:
                downloaded = _download_latest_from_gdrive(models_dir)
                if downloaded:
                    latest = downloaded
            if not latest:
                raise RuntimeError("No model found to load.")

            _agent = await load_agent_from_model(latest)
            return {"status": "reloaded", "model": str(latest)}
        except Exception as e:
            logger.exception("Failed to reload models: %s", e)
            return {"status": "error", "detail": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("chat:app", host="127.0.0.1", port=8001)
