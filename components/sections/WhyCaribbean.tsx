import { VALUE_PROPS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { HeadsetIcon, ShieldCheckIcon, TruckIcon, ZapIcon } from "@/components/ui/Icons";

const iconMap = {
  headset: HeadsetIcon,
  shield: ShieldCheckIcon,
  truck: TruckIcon,
  tag: ZapIcon,
} as const;

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
          <h2 className="text-section mt-4 font-display font-extrabold text-offwhite">
            ¿Por Qué Caribbean?
          </h2>
        </div>

        {/* Value Props Grid */}
        <ScrollReveal selector=".value-card" stagger={0.15}>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {VALUE_PROPS.map((prop) => {
              const IconComp = iconMap[prop.icon];
              return (
                <SpotlightCard
                  key={prop.number}
                  className="value-card rounded-2xl border border-offwhite/8 bg-offwhite/[0.04] p-8 lg:p-10 hover:border-accent/20 transition-colors duration-300"
                  spotlightColor="#e8a81725"
                >
                  {/* Large watermark number */}
                  <span className="absolute -top-4 -right-2 font-display text-[80px] sm:text-[120px] font-extrabold leading-none text-offwhite/[0.06] select-none">
                    {prop.number}
                  </span>

                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                      <IconComp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-offwhite lg:text-xl">
                      {prop.title}
                    </h3>
                    <p className="mt-3 text-sm text-offwhite/70 leading-relaxed lg:text-base">
                      {prop.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
