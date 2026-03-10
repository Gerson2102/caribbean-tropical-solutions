"use client";

import { useState, useCallback } from "react";
import { VALUE_PROPS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
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
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const IconComp = iconMap[prop.icon];

  const handleMousePosition = useCallback((pos: { x: number; y: number } | null) => {
    setMousePos(pos);
  }, []);

  const watermarkTransform = mousePos
    ? `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`
    : "translate(0, 0)";

  return (
    <SpotlightCard
      className="value-card rounded-2xl border border-offwhite/8 bg-offwhite/[0.04] p-4 sm:p-8 lg:p-10 hover:border-accent/20 transition-colors duration-300"
      spotlightColor="#e8a81725"
      onMousePosition={handleMousePosition}
    >
      <span
        className="absolute -top-4 -right-2 font-display text-[50px] sm:text-[80px] md:text-[120px] font-extrabold leading-none text-offwhite/[0.06] select-none pointer-events-none"
        style={{
          transform: watermarkTransform,
          transition: mousePos ? "none" : "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          willChange: "transform",
        }}
      >
        {prop.number}
      </span>

      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 sm:mb-5 sm:h-12 sm:w-12" aria-hidden="true">
          <IconComp className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
        </div>
        <h3 className="font-display text-sm font-bold text-offwhite sm:text-lg lg:text-xl">
          {prop.title}
        </h3>
        <p className="mt-2 text-xs text-offwhite/70 leading-relaxed sm:text-sm lg:text-base">
          {prop.description}
        </p>
      </div>
    </SpotlightCard>
  );
}

export default function WhyCaribbean() {
  return (
    <section
      id="por-que-elegirnos"
      className="noise-overlay relative border-t border-offwhite/10 bg-charcoal-deep py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionLabel>Nuestra Propuesta</SectionLabel>
          <ScrollTextReveal className="text-section mt-4 font-display font-extrabold text-offwhite">
            ¿Por Qué Caribbean?
          </ScrollTextReveal>
        </div>

        {/* Value Props Grid */}
        <ScrollReveal selector=".value-card" stagger={0.15}>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
            {VALUE_PROPS.map((prop) => (
              <ValueCard key={prop.number} prop={prop} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
