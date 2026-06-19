"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { type Product } from "@/lib/constants";
import { toggleItem, useIsInQuote } from "@/lib/quote-store";
import { CheckIcon, PlusIcon } from "@/components/ui/Icons";

const springConfig = { stiffness: 300, damping: 25 };

export default function ProductCard({ product }: { product: Product }) {
  const inQuote = useIsInQuote(product.id);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, springConfig);

  // Gallery = main image first, then any additional images (deduped). Works for
  // both legacy data (where `images` already includes the main) and CMS entries
  // (where "Imágenes adicionales" holds only the extras).
  const images =
    product.images && product.images.length > 0
      ? [product.image, ...product.images.filter((src) => src !== product.image)]
      : [product.image];
  const hasGallery = images.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(y * -5);
    rotateY.set(x * 5);
  }, [rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.02);
  }, [scale]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }, [rotateX, rotateY, scale]);

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
    <motion.div
      ref={cardRef}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#f7f6f3] ${product.featured ? "border-accent/30 ring-1 ring-accent/20" : "border-charcoal/[0.06]"}`}
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d" as const,
        willChange: "transform",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        onClick={handleImageClick}
        role={hasGallery ? "button" : undefined}
        aria-label={hasGallery ? "Ver siguiente imagen" : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f6f3] via-[#f2f0eb] to-[#eae7e0]" />
        <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          style={{ transitionProperty: "transform" }}
        >
          {hasGallery ? (
            // Multi-image gallery with crossfade
            images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 0.3s ease-out",
                  transitionProperty: "opacity",
                }}
              >
                <Image
                  src={src}
                  alt={`${product.altText} - imagen ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))
          ) : (
            // Single image (original behavior)
            <Image
              src={product.image}
              alt={product.altText}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Gallery: Image counter badge */}
        {hasGallery && (
          <span className="absolute top-2 right-2 z-10 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
            {activeIndex + 1}/{images.length}
          </span>
        )}

        {/* Gallery: Desktop hover arrows */}
        {hasGallery && (
          <>
            <button
              className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-black/40 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={handlePrev}
              aria-label="Imagen anterior"
              style={{ transitionProperty: "opacity" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-black/40 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={handleNext}
              aria-label="Siguiente imagen"
              style={{ transitionProperty: "opacity" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {/* Gallery: Dot indicators */}
        {hasGallery && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${
                  i === activeIndex
                    ? "w-4 bg-accent"
                    : "w-1.5 bg-white/50 hover:bg-white/70"
                }`}
                onClick={(e) => handleDotClick(e, i)}
                aria-label={`Imagen ${i + 1} de ${images.length}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-semibold text-charcoal-deep leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-charcoal-light">{product.brand}</p>
        <button
          type="button"
          onClick={() => toggleItem(product.id)}
          aria-pressed={inQuote}
          aria-label={
            inQuote
              ? `Quitar ${product.name} de la cotización`
              : `Agregar ${product.name} a la cotización`
          }
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-ring-accent ${
            inQuote
              ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/15"
              : "bg-accent text-charcoal-deep hover:bg-accent-light"
          }`}
          style={{ transitionProperty: "background-color, color" }}
        >
          {inQuote ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
          {inQuote ? "Agregado" : "Agregar"}
        </button>
      </div>
    </motion.div>
  );
}
