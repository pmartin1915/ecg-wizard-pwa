# ECG Wizard PWA — Backend

## Canonical Entry Point

`backend/main.py` is the canonical FastAPI backend. The other backend scripts in `backend/archive/` are retired experiments and should not be used unless you explicitly need to restore an older implementation.

## Run the Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Or use the startup helper:

```bash
cd backend
python start_backend.py
```

The API will be available at `http://localhost:8000`.

## Endpoints

- `GET /` — API info
- `GET /health` — Health check
- `GET /api/v1/status` — System status and capabilities
- `GET /api/v1/demo-files` — List demo ECG files
- `POST /api/v1/analyze-demo/{demo_id}` — Analyze a demo file
- `POST /api/v1/classify-ecg` — Upload and classify an ECG file
- `GET /api/v1/cardiac-conditions` — Clinical reference database
- `WS /ws/analysis-progress` — Real-time analysis progress

## AI Dependency

The full AI classification path tries to import `RealECGPredictor` from a sibling `ecg-classification-system` project. If that project is not present, the backend starts in limited mode and returns `503 Service Unavailable` for AI endpoints.
