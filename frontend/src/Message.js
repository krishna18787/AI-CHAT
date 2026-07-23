import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

function Message({ message }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          message.role === "user" ? "flex-end" : "flex-start",
        marginBottom: 15,
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: 15,
          borderRadius: 15,
          background:
            message.role === "user" ? "#007AFF" : "#F4F4F4",
          color:
            message.role === "user" ? "#FFFFFF" : "#222",
          whiteSpace: "pre-wrap",
          lineHeight: 1.7,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match = /language-(\w+)/.exec(
                className || ""
              );

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  style={{
                    background: "#eee",
                    padding: 3,
                    borderRadius: 4,
                  }}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;