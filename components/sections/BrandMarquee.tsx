"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { BRANDS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function BrandMarquee() {
  const allBrands = [...BRANDS, ...BRANDS];
  const hoveredRef = useRef(false);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Cache scrollWidth via ResizeObserver — reading it inside the RAF loop
  // forces a layout recalc on every frame.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => { halfWidthRef.current = el.scrollWidth / 2; };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const speed = hoveredRef.current ? -2 : -50;
    let newX = x.get() + (speed * delta) / 1000;

    const halfWidth = halfWidthRef.current;
    if (halfWidth > 0 && Math.abs(newX) >= halfWidth) {
      newX += halfWidth;
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
