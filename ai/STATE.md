# ECG Wizard PWA — State

**Last Updated:** 2026-06-27 (Session 2 cleanup)

## Backend

- **Canonical backend:** `backend/main.py` (FastAPI)
- **Retired backends:** `backend/archive/simple_backend.py`, `backend/archive/real_ai_backend.py`, `backend/archive/fresh_ai_backend.py`
- **Startup helper:** `backend/start_backend.py` (wraps `main.py` with dependency checks)
- **AI dependency:** Full AI classification requires a sibling `ecg-classification-system` project. Without it, the backend runs in limited mode.

## Frontend

- **Framework:** React 19 + Vite 7 + TypeScript 5.7
- **Test runner:** Vitest 3
- **PWA:** Enabled via `vite-plugin-pwa`

## Environment

- `.env` is no longer committed. Use `.env.example` as the template.
- Default: `VITE_API_URL=http://localhost:8000`

## Known Issues / Next Steps

- App tests pass but emit React Router future-flag warnings and `act(...)` warnings. These are cosmetic for now.
- The VitePWA plugin is included in the main Vite config; verify service-worker behavior after deployment.
