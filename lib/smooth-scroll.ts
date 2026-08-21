import type { MouseEvent } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/animations";

// Lenis rewrites the scroll position every rAF frame, so native scrolling —
// hash jumps and scrollIntoView alike — is overwritten by in-flight wheel
// momentum and the click reads as dead. In-page links must drive Lenis itself.
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scroll to a section, given its id or "#id". Cancels in-flight momentum. */
export function scrollToSection(target: string) {
  const el = document.getElementById(target.replace(/^#/, ""));
  if (!el) return;

  // Lenis already applies the section's CSS scroll-margin-top.
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** onClick for an in-page link — leaves modified clicks to the browser. */
export function handleSectionLinkClick(e: MouseEvent, href: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  scrollToSection(href);
}
