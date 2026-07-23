import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello Krishna! I'm your AI assistant. How can I help you today?"
    }
  ]);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const send = async () => {
    if (!prompt.trim() || loading) return;

    const userPrompt = prompt;

    setPrompt("");

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: userPrompt
      }
    ]);

    setLoading(true);

    try {

      const response = await axios.post(
        "https://ai-chat-production-dce0.up.railway.app",
        {
          prompt: userPrompt
        }
      );

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer
        }
      ]);

    } catch (e) {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Something went wrong while contacting the AI."
        }
      ]);

      console.error(e);

    } finally {

      setLoading(false);

    }
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      send();

    }

  };

  return (
    <div
      style={{
        width: "900px",
        height: "90vh",
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 0 10px rgba(0,0,0,0.08)"
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "18px",
          fontSize: "20px",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
          background: "#f8f8f8"
        }}
      >
        Krish AI Chat
      </div>

      {/* Messages */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          background: "#fafafa"
        }}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
          />
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 10
            }}
          >
            <div
              style={{
                background: "#ececec",
                padding: "12px 18px",
                borderRadius: 12
              }}
            >
              🤖 AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}

      <div
        style={{
          display: "flex",
          padding: "15px",
          borderTop: "1px solid #ddd",
          background: "#fff"
        }}
      >
        <textarea
          rows={2}
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            resize: "none",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none"
          }}
        />

        <button
          onClick={send}
          disabled={loading}
          style={{
            marginLeft: "10px",
            width: "110px",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#999" : "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
