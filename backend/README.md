# Backend API

This FastAPI service now exposes a mock endpoint for JSON testing, plus the existing chat endpoint.

## Endpoints

- `GET /health` - quick hosting check
- `GET /mock-response` - returns the latest saved mock response
- `POST /mock-response` - saves a new mock response and returns it
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

## Save a custom mock response

```bash
curl -X POST http://127.0.0.1:8000/mock-response \
  -H "Content-Type: application/json" \
  -d '{"answer":"This is my custom mock reply.","status":"ok"}'
```

After that, `GET /mock-response` returns the same JSON until you replace it again.

## Point the frontend at the API

Set `REACT_APP_API_BASE_URL=http://127.0.0.1:8000` before running the React app. The frontend will build both `/chat` and `/mock-response` from that base URL. If the saved mock response contains an `answer` field, the chat UI will use that; otherwise it will display the full JSON payload.
