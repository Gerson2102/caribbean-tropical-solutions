"use client";

import { useRef, useCallback, type ReactNode } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "#e8a81730",
  onMousePosition,
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onMousePosition?: (pos: { x: number; y: number } | null) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!divRef.current || !spotlightRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;

    if (onMousePosition) {
      onMousePosition({
        x: (x / rect.width - 0.5) * 2,
        y: (y / rect.height - 0.5) * 2,
      });
    }
  }, [spotlightColor, onMousePosition]);

  const handleMouseEnter = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0.6";
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    onMousePosition?.(null);
  }, [onMousePosition]);
  const handleFocus = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0.6";
  }, []);
  const handleBlur = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden backdrop-blur-[6px] ${className}`}
      style={{
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 1px rgba(0,0,0,0.1)",
      }}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 0,
          transitionProperty: "opacity",
        }}
      />
      {children}
    </div>
  );
}
