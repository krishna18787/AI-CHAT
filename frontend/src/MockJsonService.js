import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CHAT_API_URL, MOCK_RESPONSE_API_URL } from "./apiConfig";

const DEFAULT_MOCK_JSON = {
  success: true,
  message: "Custom mock response",
  answer: "You can replace this payload with any JSON you want.",
  data: {
    environment: "mock",
    items: [
      { id: 1, name: "alpha", active: true },
      { id: 2, name: "beta", active: false },
    ],
  },
};

function formatJson(value) {
  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value, null, 2);
}

function MockJsonService() {
  const [draftJson, setDraftJson] = useState(
    formatJson(DEFAULT_MOCK_JSON)
  );
  const [savedJson, setSavedJson] = useState(
    formatJson(DEFAULT_MOCK_JSON)
  );
  const [status, setStatus] = useState(
    "Edit the JSON below, then save it to update the mock endpoint."
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadLatest = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(MOCK_RESPONSE_API_URL);
      const formattedJson = formatJson(response.data);

      setDraftJson(formattedJson);
      setSavedJson(formattedJson);
      setStatus("Loaded the latest saved mock JSON.");
    } catch (loadError) {
      setError("Could not load the latest mock JSON from the server.");
      console.error(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLatest();
  }, [loadLatest]);

  const saveJson = async () => {
    setSaving(true);
    setError("");

    try {
      const parsedJson = JSON.parse(draftJson);
      const response = await axios.post(MOCK_RESPONSE_API_URL, parsedJson);
      const formattedJson = formatJson(response.data);

      setDraftJson(formattedJson);
      setSavedJson(formattedJson);
      setStatus("Saved successfully. The mock endpoint now returns this JSON.");
    } catch (saveError) {
      if (saveError instanceof SyntaxError) {
        setError("Please enter valid JSON before saving.");
      } else {
        setError("Failed to save the mock JSON. Check the backend URL.");
      }

      console.error(saveError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #dbe3ee",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f8fafc",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: 700,
          }}
        >
          POST /mock-response
        </p>
        <p
          style={{
            margin: "6px 0 0",
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          Paste any JSON payload here and save it. The backend will keep
          returning the latest JSON until you replace it again.
        </p>
      </div>

      <div style={{ padding: "20px" }}>
        <label
          htmlFor="mock-json-editor"
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          JSON payload
        </label>

        <textarea
          id="mock-json-editor"
          value={draftJson}
          onChange={(event) => setDraftJson(event.target.value)}
          spellCheck="false"
          rows={18}
          style={{
            width: "100%",
            resize: "vertical",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            fontFamily:
              'ui-monospace, SFMono-Regular, SF Mono, Consolas, "Liberation Mono", monospace',
            fontSize: "14px",
            lineHeight: 1.6,
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "14px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={loadLatest}
            disabled={loading || saving}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "12px 16px",
              background: loading ? "#94a3b8" : "#e2e8f0",
              color: "#0f172a",
              fontWeight: 700,
              cursor: loading || saving ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Load latest"}
          </button>

          <button
            type="button"
            onClick={saveJson}
            disabled={loading || saving}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "12px 16px",
              background: saving ? "#60a5fa" : "#2563eb",
              color: "#ffffff",
              fontWeight: 700,
              cursor: loading || saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Save mock JSON"}
          </button>
        </div>

        {error ? (
          <div
            style={{
              marginTop: "14px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        ) : (
          <div
            style={{
              marginTop: "14px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
            }}
          >
            {status}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: "18px",
              color: "#111827",
            }}
          >
            Latest saved response
          </h3>

          <pre
            style={{
              margin: 0,
              padding: "16px",
              borderRadius: "12px",
              background: "#0f172a",
              color: "#e2e8f0",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: 1.6,
            }}
          >
            {savedJson}
          </pre>
        </div>

        <p
          style={{
            margin: "14px 0 0",
            fontSize: "13px",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          API Base URL: <code>{CHAT_API_URL}</code>
        </p>
      </div>
    </div>
  );
}

export default MockJsonService;
