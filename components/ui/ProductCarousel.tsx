"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { type Product } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animations";
import ProductCard from "@/components/ui/ProductCard";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, products]);

  // Horizontal Lenis on the rail, tuned like the page's (SmoothScroll.tsx) so both scrolls feel the same.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || prefersReducedMotion()) return;

    const lenis = new Lenis({
      wrapper: el,
      content: el,
      orientation: "horizontal",
      gestureOrientation: "both",
      lerp: 0.1,
      duration: 1.2,
      // Only sideways gestures move the rail; vertical wheel falls through to the page's Lenis.
      virtualScroll: ({ deltaX, deltaY, event }) => event.shiftKey || Math.abs(deltaX) > Math.abs(deltaY),
    });
    lenisRef.current = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    const card = el?.firstElementChild as HTMLElement | null | undefined;
    if (!el || !card) return;
    // Page by whole cards so every arrow click lands on a card edge.
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const perPage = Math.max(1, Math.floor(el.clientWidth / step));
    const from = lenisRef.current?.targetScroll ?? el.scrollLeft;
    const target = (Math.round(from / step) + (direction === "left" ? -perPage : perPage)) * step;
    if (lenisRef.current) lenisRef.current.scrollTo(target);
    else el.scrollTo({ left: target });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll("right");
      }
    },
    [scroll]
  );

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-offwhite sm:text-xl">
            {title}
          </h3>
          <span className="shrink-0 text-sm text-offwhite/50">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        {/* Arrow buttons */}
        <div className="flex shrink-0 gap-2">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              disabled={dir === "left" ? !canScrollLeft : !canScrollRight}
              aria-label={dir === "left" ? "Desplazar a la izquierda" : "Desplazar a la derecha"}
              className="group/arrow flex h-10 w-10 items-center justify-center rounded-full bg-offwhite/[0.07] text-offwhite/80 transition-[background-color,color,opacity,scale] duration-500 ease-hover hover:bg-offwhite/[0.14] hover:text-offwhite active:scale-95 active:duration-75 disabled:pointer-events-none disabled:opacity-25 focus-ring-accent"
            >
              <svg
                className={`h-4 w-4 transition-transform duration-500 ease-hover ${
                  dir === "left" ? "group-hover/arrow:-translate-x-0.5" : "group-hover/arrow:translate-x-0.5"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel: bleeds past the container to the viewport's right edge (the section clips x-overflow) */}
      <div className="mr-[calc(50%_-_50vw)]">
        <div
          ref={scrollRef}
          role="region"
          aria-label={`${title} productos`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="carousel-scroll flex gap-5 overflow-x-auto pb-1 pr-5 focus-ring-accent lg:pr-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[62%] shrink-0 sm:w-[36%] md:w-[27%] lg:w-[270px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
