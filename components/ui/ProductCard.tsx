"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { type Product } from "@/lib/constants";
import { toggleItem, useIsInQuote } from "@/lib/quote-store";
import { CheckIcon, PlusIcon } from "@/components/ui/Icons";

export default function ProductCard({ product }: { product: Product }) {
  const inQuote = useIsInQuote(product.id);

  // Gallery = main image first, then any additional images (deduped). Works for
  // both legacy data (where `images` already includes the main) and CMS entries
  // (where "Imágenes adicionales" holds only the extras).
  const images =
    product.images && product.images.length > 0
      ? [product.image, ...product.images.filter((src) => src !== product.image)]
      : [product.image];
  const hasGallery = images.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (!hasGallery) return;
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [hasGallery, images.length]);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleDotClick = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(index);
  }, []);

  return (
    <article className="group">
      {/* Image tile: the tile is the card. Hover only zooms inside it, so nothing leaves the rail. */}
      <div
        className={`relative aspect-square overflow-hidden rounded-[1.25rem] bg-offwhite ${
          product.featured ? "ring-2 ring-accent/50" : ""
        }`}
      >
        <div
          className="absolute inset-0"
          onClick={handleImageClick}
          role={hasGallery ? "button" : undefined}
          aria-label={hasGallery ? "Ver siguiente imagen" : undefined}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={hasGallery ? `${product.altText} - imagen ${i + 1}` : product.altText}
              fill
              // multiply melts the white box some product photos ship with into the tile tone.
              // Tailwind v4 zooms via the `scale` property, so it must be in the transition list or the zoom snaps.
              className="object-contain p-6 mix-blend-multiply transition-[opacity,scale] duration-500 ease-hover will-change-[scale] group-hover:scale-[1.05]"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
              sizes="(min-width: 1024px) 270px, (min-width: 640px) 36vw, 62vw"
            />
          ))}
        </div>

        {/* Gallery: Image counter badge */}
        {hasGallery && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-charcoal-deep/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
            {activeIndex + 1}/{images.length}
          </span>
        )}

        {/* Gallery: Desktop hover arrows */}
        {hasGallery &&
          ([
            ["left-2", "Imagen anterior", handlePrev, "M15 19l-7-7 7-7"],
            ["right-2", "Siguiente imagen", handleNext, "M9 5l7 7-7 7"],
          ] as const).map(([pos, label, onClick, d]) => (
            <button
              key={label}
              type="button"
              className={`absolute ${pos} top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal-deep/25 p-1.5 text-white opacity-0 transition-[opacity,background-color] duration-500 ease-hover hover:bg-charcoal-deep/45 group-hover:opacity-100 focus-visible:opacity-100 focus-ring-accent`}
              onClick={onClick}
              aria-label={label}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
              </svg>
            </button>
          ))}

        {/* Gallery: Dot indicators (bottom-left, clear of the Agregar button) */}
        {hasGallery && (
          <div className="absolute bottom-5 left-3 z-10 flex">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className="flex h-6 items-center rounded-full px-[3px] focus-ring-accent"
                onClick={(e) => handleDotClick(e, i)}
                aria-label={`Imagen ${i + 1} de ${images.length}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-hover ${
                    i === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-charcoal/25 hover:bg-charcoal/50"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => toggleItem(product.id)}
          aria-pressed={inQuote}
          aria-label={
            inQuote
              ? `Quitar ${product.name} de la cotización`
              : `Agregar ${product.name} a la cotización`
          }
          className={`absolute bottom-3 right-3 z-10 flex h-10 items-center gap-1.5 rounded-full pl-3 pr-4 text-[13px] font-semibold transition-[background-color,color,scale] duration-200 active:scale-95 focus-ring-accent ${
            inQuote
              ? "bg-primary text-offwhite hover:bg-primary-dark"
              : "bg-accent text-charcoal-deep shadow-[var(--shadow-cta)] [--focus-ring-extra-shadow:var(--shadow-cta)] hover:bg-accent-light"
          }`}
        >
          {inQuote ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
          {inQuote ? "Agregado" : "Agregar"}
        </button>
      </div>

      <h4 className="mt-4 line-clamp-2 font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-offwhite">
        {product.name}
      </h4>
      <p className="mt-1 text-[13px] text-offwhite/55">{product.brand}</p>
    </article>
  );
}
