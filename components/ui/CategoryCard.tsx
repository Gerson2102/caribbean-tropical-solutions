"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type Category } from "@/lib/constants";
import { imageZoomEnhanced } from "@/lib/animations";
import { handleSectionLinkClick } from "@/lib/smooth-scroll";
import { NotebookIcon } from "@/components/ui/Icons";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [arrowOffset, setArrowOffset] = useState({ x: 0, y: 0 });
  const isComingSoon = category.comingSoon === true;

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

  const handleClick = useCallback(
    (e: React.MouseEvent) => handleSectionLinkClick(e, "#catalogo"),
    []
  );

  return (
    <motion.a
      ref={cardRef}
      href="#catalogo"
      onClick={handleClick}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Area — fixed 4:3 so the full photo shows without cropping */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {isComingSoon ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0f1f0f 0%, #1f3d1f 50%, #0f1f0f 100%)",
            }}
            aria-label={category.altText}
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 30%, rgba(232,168,23,0.5) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(61,122,61,0.6) 0%, transparent 50%)",
              }}
            />
            <NotebookIcon
              className="relative h-20 w-20 md:h-24 md:w-24 text-accent/70"
              aria-hidden="true"
            />
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Coming-soon status badge — sits on the media area so it never crowds the title */}
        {isComingSoon && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-accent/30 bg-deep-green/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent backdrop-blur-sm">
            Próximamente
          </span>
        )}
      </div>

      {/* Glassmorphism Dark Panel — absorbs the remaining height */}
      <div className="relative z-10 flex flex-1 flex-col border-t border-white/[0.07] backdrop-blur-md bg-deep-green/80 px-6 py-4 md:px-7 md:py-5">
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
          {isComingSoon ? "Pronto disponible" : "Ver productos"}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}
