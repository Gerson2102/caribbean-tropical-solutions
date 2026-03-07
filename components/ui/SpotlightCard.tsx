"use client";

import { useRef, useCallback, useState, type ReactNode } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "#e8a81730",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!divRef.current || !spotlightRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
  }, [spotlightColor]);

  const handleMouseEnter = useCallback(() => setOpacity(0.6), []);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);
  const handleFocus = useCallback(() => setOpacity(0.6), []);
  const handleBlur = useCallback(() => setOpacity(0), []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          transitionProperty: "opacity",
        }}
      />
      {children}
    </div>
  );
}
