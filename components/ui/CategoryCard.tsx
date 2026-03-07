"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Category } from "@/lib/constants";
import { imageZoom } from "@/lib/animations";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.a
      href="#catalogo"
      className="group relative flex h-full min-h-[360px] md:min-h-[420px] flex-col overflow-hidden rounded-2xl"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Area — top ~65% */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div className="absolute inset-0" variants={imageZoom}>
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

      {/* Solid Dark Text Panel — bottom ~35% */}
      <div className="relative z-10 border-t border-white/[0.07] bg-deep-green px-6 py-4 md:px-7 md:py-5">
        <h3 className="font-display text-lg font-bold text-white md:text-xl leading-tight">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm text-white/70 leading-relaxed line-clamp-2">
          {category.subtitle}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-100 md:opacity-0 md:translate-y-2 transition-[opacity,transform] duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0"
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
