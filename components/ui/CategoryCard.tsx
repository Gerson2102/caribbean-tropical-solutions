"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type Category } from "@/lib/constants";
import { imageZoomEnhanced } from "@/lib/animations";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [arrowOffset, setArrowOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    setArrowOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setArrowOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href="#catalogo"
      className="group relative flex h-full min-h-[360px] md:min-h-[420px] flex-col overflow-hidden rounded-2xl"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Area — top ~65% */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div className="absolute inset-0" variants={imageZoomEnhanced}>
          <Image
            src={category.image}
            alt={category.altText}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        {/* Light color tint over image */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
      </div>

      {/* Glassmorphism Dark Panel — bottom ~35% */}
      <div className="relative z-10 border-t border-white/[0.07] backdrop-blur-md bg-deep-green/80 px-6 py-4 md:px-7 md:py-5">
        <h3 className="font-display text-lg font-bold text-white md:text-xl leading-tight">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm text-white/70 leading-relaxed line-clamp-2">
          {category.subtitle}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          style={{
            transform: `translate(${arrowOffset.x}px, ${arrowOffset.y}px)`,
            transition: arrowOffset.x === 0 && arrowOffset.y === 0
              ? "transform 0.3s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s, translate 0.3s"
              : "opacity 0.3s",
            transitionProperty: arrowOffset.x === 0 && arrowOffset.y === 0
              ? "transform, opacity"
              : "opacity",
          }}
        >
          Ver productos
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}
