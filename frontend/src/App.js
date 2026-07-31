import { useState } from "react";
import Chat from "./Chat";
import MockJsonService from "./MockJsonService";

const FEATURES = [
  {
    id: "post-mock-json",
    title: "Post Mock Json",
    description:
      "Save a custom JSON response and keep returning the latest payload for testing.",
    badge: "Mock API",
  },
  {
    id: "open-ai-chat",
    title: "Open AI Chat",
    description:
      "Open the chat experience backed by the AI assistant endpoint.",
    badge: "Chat",
  },
];

function App() {
  const [selectedService, setSelectedService] = useState(null);

  const activeFeature = FEATURES.find(
    (feature) => feature.id === selectedService
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        background:
          "linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)",
        boxSizing: "border-box",
      }}
    >
      {!activeFeature ? (
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "12px",
                color: "#6b7280",
                fontWeight: 700,
              }}
            >
              Feature launcher
            </p>

            <h1
              style={{
                margin: "10px 0 8px",
                fontSize: "34px",
                color: "#111827",
              }}
            >
              Choose a service to open
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "16px",
                color: "#4b5563",
                lineHeight: 1.6,
                maxWidth: "720px",
              }}
            >
              We can keep adding more features here later. For now,
              pick one of the two services below.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {FEATURES.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelectedService(feature.id)}
                style={{
                  textAlign: "left",
                  border: "1px solid #dbe3ee",
                  borderRadius: "18px",
                  padding: "22px",
                  background: "#ffffff",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "#e8f1ff",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: 700,
                    marginBottom: "14px",
                  }}
                >
                  {feature.badge}
                </div>

                <h2
                  style={{
                    margin: "0 0 8px",
                    fontSize: "22px",
                    color: "#111827",
                  }}
                >
                  {feature.title}
                </h2>

                <p
                  style={{
                    margin: "0 0 18px",
                    color: "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#2563eb",
                    fontWeight: 700,
                  }}
                >
                  Open service →
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedService(null)}
            style={{
              border: "none",
              background: "#ffffff",
              color: "#2563eb",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700,
              marginBottom: "18px",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
            }}
          >
            ← Back to services
          </button>

          <div style={{ marginBottom: "18px" }}>
            <p
              style={{
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "12px",
                color: "#6b7280",
                fontWeight: 700,
              }}
            >
              {activeFeature.badge}
            </p>

            <h2
              style={{
                margin: "8px 0 6px",
                fontSize: "28px",
                color: "#111827",
              }}
            >
              {activeFeature.title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#4b5563",
                lineHeight: 1.6,
              }}
            >
              {activeFeature.description}
            </p>
          </div>

          {selectedService === "post-mock-json" ? (
            <MockJsonService />
          ) : (
            <Chat />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
