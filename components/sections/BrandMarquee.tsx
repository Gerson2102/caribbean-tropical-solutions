"use client";

import { useEffect, useRef } from "react";
import { BRANDS } from "@/lib/constants";
import { animateMarquee } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

export default function BrandMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    tweenRef.current = animateMarquee(trackRef.current, 25);
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  function handleHover(pause: boolean) {
    if (pause) tweenRef.current?.pause();
    else tweenRef.current?.resume();
  }

  // Double the brands for seamless loop
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <section id="marcas" className="relative overflow-hidden bg-deep-green py-14 border-t border-b border-offwhite/5">
      <div className="mb-8 text-center">
        <SectionLabel>Nuestras Marcas</SectionLabel>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <div ref={trackRef} className="flex w-max items-center gap-16 whitespace-nowrap px-8">
          {allBrands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl font-bold text-offwhite/40 transition-colors duration-300 hover:text-accent md:text-3xl lg:text-4xl select-none"
              style={{ transitionProperty: "color" }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
