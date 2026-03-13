"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { type Product, WHATSAPP_URL } from "@/lib/constants";

const springConfig = { stiffness: 300, damping: 25 };

export default function ProductCard({ product }: { product: Product }) {
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)}`;
  const cardRef = useRef<HTMLAnchorElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, springConfig);

  // Gallery state
  const images = product.images && product.images.length > 1 ? product.images : [product.image];
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
    <motion.a
      ref={cardRef}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-2xl border bg-[#f7f6f3] ${product.featured ? "border-accent/30 ring-1 ring-accent/20" : "border-charcoal/[0.06]"}`}
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
                  loading="lazy"
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
              loading="lazy"
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
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold text-charcoal-deep leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-charcoal-light">{product.brand}</p>
          <span className="flex items-center gap-1 text-[10px] font-medium text-[#25D366] opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:opacity-100 sm:group-hover:opacity-100"
            style={{ transitionProperty: "opacity" }}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar
          </span>
        </div>
      </div>
    </motion.a>
  );
}
