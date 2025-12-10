"""Launcher for the backend_fastapi package.

This file allows running the app via:

  python -m backend_fastapi.main

or for convenience during development:

  python main.py

Both will delegate to the package entrypoint.
"""

if __name__ == "__main__":
    # Delegate to the package module so imports resolve correctly
    import runpy
    runpy.run_module("backend_fastapi.main", run_name="__main__")



