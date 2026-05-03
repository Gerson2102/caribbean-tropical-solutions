import Image from "next/image";
import { FOUNDER, FOUNDER_WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function Founder() {
  return (
    <section id="cofundador" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionLabel>Liderazgo</SectionLabel>
          <ScrollTextReveal className="text-section mt-4 font-display font-extrabold text-charcoal-deep">
            Conocé a Nuestro Cofundador
          </ScrollTextReveal>
        </div>

        {/* Two-column body */}
        <ScrollReveal selector=".founder-block" stagger={0.15}>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            {/* Portrait */}
            <div className="founder-block lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Decorative offset accent (desktop only) */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-3xl bg-accent/20 lg:block"
                />
                {/* Portrait card */}
                <div
                  className="relative overflow-hidden rounded-3xl ring-1 ring-charcoal/[0.08]"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <Image
                    src={FOUNDER.image}
                    alt={FOUNDER.altText}
                    width={853}
                    height={1280}
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                {/* Floating role chip */}
                <span
                  className="absolute -bottom-3 left-6 rounded-full bg-deep-green px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  Cofundador
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="founder-block lg:col-span-7">
              <h3 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-charcoal-deep lg:text-4xl">
                {FOUNDER.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                {FOUNDER.role}
              </p>
              <div className="mt-6 space-y-5 text-base leading-[1.7] text-charcoal-light">
                {FOUNDER.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  variant="primary"
                  href={FOUNDER_WHATSAPP_URL_WITH_MESSAGE}
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                >
                  Hablá con Kendall por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
