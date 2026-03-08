"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar) return;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar!.style.transform = `scaleX(${progress})`;
      if (glow) {
        const leftPos = progress * window.innerWidth;
        glow.style.transform = `translateX(${leftPos - 12}px)`;
        glow.style.opacity = progress > 0.01 ? "1" : "0";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          transform: "scaleX(0)",
          transitionProperty: "none",
          background: "linear-gradient(to right, #3d7a3d, #e8a817, #f5c842)",
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 h-full w-6 pointer-events-none"
        style={{
          background: "radial-gradient(circle at right, rgba(245,200,66,0.6), transparent)",
          transform: "translateX(0)",
          opacity: "0",
        }}
      />
    </div>
  );
}
