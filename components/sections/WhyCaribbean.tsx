"use client";

import { useRef, useCallback } from "react";
import { VALUE_PROPS } from "@/lib/constants";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import { HeadsetIcon, ShieldCheckIcon, TruckIcon, ZapIcon } from "@/components/ui/Icons";

const iconMap = {
  headset: HeadsetIcon,
  shield: ShieldCheckIcon,
  truck: TruckIcon,
  tag: ZapIcon,
} as const;

function ValueCard({ prop }: { prop: (typeof VALUE_PROPS)[number] }) {
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const IconComp = iconMap[prop.icon];

  const handleMousePosition = useCallback((pos: { x: number; y: number } | null) => {
    if (!watermarkRef.current) return;
    if (pos) {
      watermarkRef.current.style.transform = `translate(${pos.x * 3}px, ${pos.y * 3}px)`;
      watermarkRef.current.style.transition = "none";
    } else {
      watermarkRef.current.style.transform = "translate(0, 0)";
      watermarkRef.current.style.transition = "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    }
  }, []);

  return (
    <SpotlightCard
      className="value-card rounded-2xl border border-offwhite/8 bg-offwhite/[0.04] p-5 sm:p-8 lg:p-10 hover:border-accent/20 transition-colors duration-300"
      spotlightColor="#e8a81725"
      onMousePosition={handleMousePosition}
    >
      <span
        ref={watermarkRef}
        className="absolute -top-4 -right-2 hidden font-display font-extrabold leading-none text-offwhite/[0.06] select-none pointer-events-none sm:block sm:text-[80px] md:text-[120px]"
        style={{
          transform: "translate(0, 0)",
          willChange: "transform",
        }}
      >
        {prop.number}
      </span>

      {/* Phones: icon beside the text in one full-width row, so the copy gets a readable size */}
      <div className="relative z-10 flex items-start gap-4 sm:block">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 sm:mb-5 sm:h-12 sm:w-12" aria-hidden="true">
          <IconComp className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold leading-snug text-offwhite sm:text-lg lg:text-xl">
            {prop.title}
          </h3>
          <p className="mt-1 text-[15px] text-offwhite/75 leading-relaxed sm:mt-2 sm:text-sm lg:text-base">
            {prop.description}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function WhyCaribbean() {
  return (
    <section
      id="por-que-elegirnos"
      className="noise-overlay relative border-t border-offwhite/10 bg-charcoal-deep py-14 md:py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <ScrollTextReveal className="text-section font-display font-extrabold text-offwhite">
            ¿Por Qué Comprar en Caribbean Tropical?
          </ScrollTextReveal>
        </div>

        {/* Value Props Grid */}
        <ScrollReveal selector=".value-card" stagger={0.15}>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {VALUE_PROPS.map((prop) => (
              <ValueCard key={prop.number} prop={prop} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
