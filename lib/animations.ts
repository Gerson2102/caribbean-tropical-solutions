import type { Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const imageZoomEnhanced: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};
