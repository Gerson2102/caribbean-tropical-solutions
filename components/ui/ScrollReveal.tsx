"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  stagger = 0.12,
  selector,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector
      ? el.querySelectorAll<HTMLElement>(selector)
      : [el];

    // Set initial state
    targets.forEach((target, i) => {
      target.style.opacity = "0";
      target.style.transform = "translateY(24px)";
      target.style.transition = `opacity 0.6s ease-out ${i * stagger}s, transform 0.6s ease-out ${i * stagger}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((target) => {
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
