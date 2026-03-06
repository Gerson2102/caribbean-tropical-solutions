"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl p-6 sm:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-8px)";
        el.style.borderColor = "rgba(61,165,74,0.3)";
        el.style.boxShadow = "0 0 40px rgba(61,165,74,0.15), 0 8px 30px rgba(0,0,0,0.3)";
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget;
        el.style.transform = "";
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.boxShadow = "";
      }}
    >
      {/* Cursor spotlight — hidden on touch devices */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 hidden [@media(hover:hover)]:block"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(61,165,74,0.12), transparent 40%)",
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <div className="relative z-10">
        <div
          className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
          style={{ background: "var(--accent-dim)" }}
        >
          <div style={{ color: "var(--accent)" }}>{icon}</div>
        </div>
        <h3
          className="mb-2 text-xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif", color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
