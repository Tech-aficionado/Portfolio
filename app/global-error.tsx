"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#f4f1e9",
          color: "#17130e",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ maxWidth: 440, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#ff4e1a",
              margin: 0,
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 56,
              lineHeight: 1.05,
              margin: "16px 0 0",
              fontWeight: 500,
            }}
          >
            Something went{" "}
            <span style={{ fontStyle: "italic", color: "#ff4e1a" }}>wrong</span>
          </h1>
          <p style={{ margin: "20px 0 0", color: "#6f675a", fontSize: 16 }}>
            The application hit an unexpected error. Please try reloading.
          </p>
          {error?.digest && (
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(111,103,90,0.7)",
              }}
            >
              ref: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              border: "none",
              cursor: "pointer",
              background: "#17130e",
              color: "#f4f1e9",
              fontSize: 14,
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 999,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
