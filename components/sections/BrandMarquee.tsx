"use client";

import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { BRANDS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function BrandMarquee() {
  const allBrands = [...BRANDS, ...BRANDS];
  const hoveredRef = useRef(false);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const speed = hoveredRef.current ? -2 : -50;
    let newX = x.get() + (speed * delta) / 1000;

    if (innerRef.current) {
      const halfWidth = innerRef.current.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(newX) >= halfWidth) {
        newX += halfWidth;
      }
    }
    x.set(newX);
  });

  return (
    <section id="marcas" className="relative overflow-hidden bg-deep-green py-14 border-t border-b border-offwhite/5">
      <div className="mb-8 text-center">
        <SectionLabel>Nuestras Marcas</SectionLabel>
      </div>

      <div
        className="relative overflow-hidden marquee-mask"
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <motion.div
          ref={innerRef}
          className="flex w-max items-center gap-16 whitespace-nowrap px-8"
          style={{ x }}
        >
          {allBrands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl font-bold text-offwhite/55 md:text-3xl lg:text-4xl select-none"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
