"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { type Product } from "@/lib/constants";
import ProductCard from "@/components/ui/ProductCard";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
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
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-lg font-bold text-offwhite sm:text-xl">
            {title}
          </h3>
          <span className="text-sm text-offwhite/40">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Desplazar a la izquierda"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/10 text-offwhite/60 transition-opacity duration-200 hover:border-offwhite/30 hover:text-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-0"
            style={{ transitionProperty: "opacity, border-color, color" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Desplazar a la derecha"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/10 text-offwhite/60 transition-opacity duration-200 hover:border-offwhite/30 hover:text-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-0"
            style={{ transitionProperty: "opacity, border-color, color" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-deep-green to-transparent"
          style={{
            opacity: canScrollLeft ? 1 : 0,
            transition: "opacity 0.2s",
            transitionProperty: "opacity",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-deep-green to-transparent"
          style={{
            opacity: canScrollRight ? 1 : 0,
            transition: "opacity 0.2s",
            transitionProperty: "opacity",
          }}
        />

        <div
          ref={scrollRef}
          role="region"
          aria-label={`${title} productos`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="carousel-scroll flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
          style={{ scrollPaddingLeft: "0px" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[70%] flex-shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
