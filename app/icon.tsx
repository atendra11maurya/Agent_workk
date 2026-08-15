import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#050608",
          color: "#f5f7fa",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 27,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-2px",
          width: "100%",
        }}
      >
        C<span style={{ color: "#2f6bff" }}>/</span>
      </div>
    ),
    size,
  );
}
