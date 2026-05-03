"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { CATEGORIES } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import CategoryCard from "@/components/ui/CategoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProductCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = container;
      const cardWidth = offsetWidth * 0.82 + 16;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), CATEGORIES.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.82 + 16;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, []);

  return (
    <section id="categorias" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <SectionLabel>Lo Que Distribuimos</SectionLabel>
          <ScrollTextReveal className="text-section mt-4 font-display font-extrabold text-charcoal-deep">
            Nuestras Líneas
          </ScrollTextReveal>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
            Seis líneas de productos para cubrir todas las necesidades de tu empresa.
            Desde protección personal hasta cuidado y bienestar.
          </p>
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="md:hidden -mx-5">
          <div
            ref={scrollRef}
            role="region"
            aria-label="Categorías de productos"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollToIndex(Math.min(activeIndex + 1, CATEGORIES.length - 1));
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollToIndex(Math.max(activeIndex - 1, 0));
              }
            }}
            className="carousel-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-xl"
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="w-[82%] flex-shrink-0 snap-start"
              >
                <CategoryCard category={cat} />
              </div>
            ))}
            <div className="w-px flex-shrink-0" aria-hidden="true" />
          </div>
          {/* Dot indicators */}
          <div className="mt-4 flex justify-center gap-2">
            {CATEGORIES.map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ver categoría ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid (unchanged) */}
        <ScrollReveal selector=".category-card" stagger={0.15}>
          <div className="hidden md:grid md:grid-cols-6 md:gap-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="category-card md:col-span-2">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
