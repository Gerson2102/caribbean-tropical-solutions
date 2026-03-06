"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  stagger = 0.15,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply stagger delays to direct children
    const kids = Array.from(el.children) as HTMLElement[];
    kids.forEach((child, i) => {
      child.style.transitionDelay = `${i * stagger}s`;
    });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("in-view");
      return;
    }

    // If already in viewport on mount, animate immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: Math.min(threshold, 0.1) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, threshold]);

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}
