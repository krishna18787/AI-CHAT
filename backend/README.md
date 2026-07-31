# Backend API

This FastAPI service now exposes a mock endpoint for static JSON testing, plus the existing chat endpoint.

## Endpoints

- `GET /health` - quick hosting check
- `GET /mock-response` - static JSON response for browser/curl testing
- `POST /mock-response` - same static JSON response for API clients
- `POST /chat` - live model-backed chat response when `GROQ_API_KEY` is configured

## Run locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Test the mock API

```bash
curl http://127.0.0.1:8000/mock-response
```

## Point the frontend at the mock API

Set `REACT_APP_CHAT_API_URL=http://127.0.0.1:8000/mock-response` before running the React app.

