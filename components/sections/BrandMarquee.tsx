"use client";

import { BRANDS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function BrandMarquee() {
  // Double the brands for seamless loop
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <section id="marcas" className="relative overflow-hidden bg-deep-green py-14 border-t border-b border-offwhite/5">
      <div className="mb-8 text-center">
        <SectionLabel>Nuestras Marcas</SectionLabel>
      </div>

      <div className="relative overflow-hidden group/marquee">
        <div className="flex w-max items-center gap-16 whitespace-nowrap px-8 will-change-transform animate-marquee-scroll group-hover/marquee:[animation-play-state:paused]">
          {allBrands.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-2xl font-bold text-offwhite/55 md:text-3xl lg:text-4xl select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
