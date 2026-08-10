import { ImageResponse } from "next/og";

export const alt = "직장인 계산기 허브";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, #eff6ff 0%, #f5f3ff 50%, #fff1f2 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 64 }}>🛡️</span>
          <span style={{ fontSize: 64 }}>💼</span>
          <span style={{ fontSize: 64 }}>📅</span>
          <span style={{ fontSize: 64 }}>🌴</span>
          <span style={{ fontSize: 64 }}>💰</span>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#18181b" }}>
          직장인 계산기 허브
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#52525b", marginTop: 20 }}>
          4대보험료 · 퇴직금 · 주휴수당 · 연차수당 · 잔고 시뮬레이터
        </div>
      </div>
    ),
    { ...size }
  );
}
