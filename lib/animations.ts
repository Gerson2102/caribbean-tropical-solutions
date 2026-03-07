"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Variants } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateSectionEntrance(
  trigger: HTMLElement,
  children: HTMLElement[] | NodeListOf<Element>,
  options?: { stagger?: number; y?: number; start?: string }
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) {
    gsap.set(children, { opacity: 1, y: 0 });
    return null;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: options?.start ?? "top 85%",
      once: true,
    },
  });

  tl.fromTo(
    children,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.12,
      ease: "power3.out",
    }
  );

  return tl;
}

export function animateParallax(
  element: HTMLElement,
  speed = 0.3
): ScrollTrigger | null {
  if (prefersReducedMotion()) return null;

  gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  return ScrollTrigger.getAll().pop() ?? null;
}

export function animateMarquee(
  track: HTMLElement,
  duration = 30
): gsap.core.Tween {
  const tween = gsap.to(track, {
    xPercent: -50,
    duration,
    ease: "none",
    repeat: -1,
  });

  if (prefersReducedMotion()) tween.pause();
  return tween;
}

// Framer Motion Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  tap: { scale: 0.97 },
};

export const cardOverlay: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};
