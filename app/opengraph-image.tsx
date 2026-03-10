import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Caribbean Tropical Solutions S.A. — Distribuidora en Guácimo, Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f1f0f 0%, #1f4420 50%, #0f1f0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "linear-gradient(90deg, #e8a817, #f5c842, #e8a817)",
          }}
        />

        {/* Business name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafaf8",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Caribbean Tropical
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#e8a817",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "40px",
          }}
        >
          Solutions S.A.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(250, 250, 248, 0.75)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Distribuidora de productos industriales, limpieza, EPP y
          ferreteria en el Caribe de Costa Rica
        </div>

        {/* Location badge */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "9999px",
            border: "2px solid rgba(232, 168, 23, 0.3)",
            background: "rgba(232, 168, 23, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#e8a817",
              fontWeight: 600,
            }}
          >
            Guacimo, Limon, Costa Rica
          </div>
        </div>

        {/* Gold accent bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "linear-gradient(90deg, #e8a817, #f5c842, #e8a817)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
