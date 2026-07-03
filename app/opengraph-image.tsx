import { ImageResponse } from "next/og";

export const alt = "Shivansh Goel — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f1e9",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#ff4e1a",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#6f675a",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              color: "#17130e",
              lineHeight: 1.05,
            }}
          >
            Shivansh Goel
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#ff4e1a",
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6f675a",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            Building robust, user-centric web solutions with JavaScript,
            React, Next.js & Cloud.
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#17130e",
          }}
        >
          <div>ash-labs.tech</div>
          <div style={{ color: "#6f675a" }}>@Tech-aficionado</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
