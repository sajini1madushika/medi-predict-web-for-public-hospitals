"""Top-level db proxy that re-exports the package db for scripts that import db directly."""

from backend_fastapi.db import db  # re-export package db

__all__ = ["db"]
