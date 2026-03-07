import type { Variants } from "framer-motion";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
