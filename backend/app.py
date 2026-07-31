import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
client = None

if groq_api_key:
    client = OpenAI(
        api_key=groq_api_key,
        base_url="https://api.groq.com/openai/v1",
    )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str


STATIC_MOCK_RESPONSE = {
    "success": True,
    "message": "Mock response for testing.",
    "answer": "This is a static mock response. Use this endpoint to validate hosting, networking, and frontend integration.",
    "data": {
        "environment": "mock",
        "items": [
            {"id": 1, "name": "alpha", "active": True},
            {"id": 2, "name": "beta", "active": False},
            {"id": 3, "name": "gamma", "active": True},
        ],
    },
}

mock_response_store: Any = STATIC_MOCK_RESPONSE


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-chat-backend"}


@app.api_route("/mock-response", methods=["GET", "POST"])
async def mock_response(request: Request):
    global mock_response_store

    if request.method == "POST":
        try:
            payload = await request.json()
        except Exception as exc:
            raise HTTPException(
                status_code=400,
                detail="Request body must be valid JSON.",
            ) from exc

        is_frontend_chat_request = (
            isinstance(payload, dict)
            and set(payload.keys()) == {"prompt"}
        )

        if not is_frontend_chat_request:
            mock_response_store = payload

    return mock_response_store


@app.post("/chat")
def chat(request: ChatRequest):
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="GROQ_API_KEY is not configured.",
        )

    response = client.responses.create(
        model="llama-3.3-70b-versatile",
        input=request.prompt
    )

    return {
        "answer": response.output_text
    }
