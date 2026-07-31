const RAW_API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://krishna-ai-chat.up.railway.app";

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, "");
const API_BASE_URL_WITH_TRAILING_SLASH = `${API_BASE_URL}/`;

export const CHAT_API_URL = new URL("chat", API_BASE_URL_WITH_TRAILING_SLASH).toString();
export const MOCK_RESPONSE_API_URL = new URL(
  "mock-response",
  API_BASE_URL_WITH_TRAILING_SLASH
).toString();
