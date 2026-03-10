"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f1f0f",
          color: "#fafaf8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: "clamp(4rem, 15vw, 8rem)",
            fontWeight: 800,
            lineHeight: 1,
            color: "rgba(232, 168, 23, 0.2)",
            margin: 0,
          }}
          aria-hidden="true"
        >
          Error
        </p>

        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 700,
            marginTop: "-0.5rem",
            marginBottom: "1rem",
          }}
        >
          Error inesperado
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: "rgba(250, 250, 248, 0.6)",
            maxWidth: "28rem",
            marginBottom: "2rem",
          }}
        >
          Lo sentimos, ocurrió un error grave. Por favor intentá de nuevo.
        </p>

        <button
          onClick={reset}
          style={{
            backgroundColor: "#e8a817",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "9999px",
            padding: "0.875rem 1.75rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
