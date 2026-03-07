import { type ReactNode } from "react";
import { WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  SearchIcon,
  WhatsAppIcon,
  ClipboardCheckIcon,
  TruckIcon,
} from "@/components/ui/Icons";

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: <SearchIcon className="h-6 w-6" />,
    title: "Explorá Nuestro Catálogo",
    description:
      "Revisá nuestra selección de productos arriba o preguntanos por WhatsApp qué tenemos disponible.",
  },
  {
    number: "02",
    icon: <WhatsAppIcon className="h-6 w-6" />,
    title: "Escribinos por WhatsApp",
    description:
      "Envianos un mensaje con los productos que te interesan. Te respondemos en minutos.",
    accent: true,
  },
  {
    number: "03",
    icon: <ClipboardCheckIcon className="h-6 w-6" />,
    title: "Confirmá tu Pedido",
    description:
      "Te enviamos cotización, confirmás cantidades y coordinamos los detalles de pago.",
  },
  {
    number: "04",
    icon: <TruckIcon className="h-6 w-6" />,
    title: "Recibí tu Entrega",
    description:
      "Preparamos tu pedido y lo enviamos a cualquier punto del Caribe y Costa Rica.",
  },
];

export default function HowToBuy() {
  return (
    <section
      id="como-comprar"
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionLabel>Proceso</SectionLabel>
          <h2 className="text-section mt-4 font-display font-extrabold text-charcoal-deep">
            ¿Cómo Comprar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
            Pedir es fácil. En 4 simples pasos tenés tus productos.
          </p>
        </div>

        <ScrollReveal selector=".step-item" stagger={0.15}>
          {/* Desktop: horizontal 4-column grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
            {STEPS.map((step, i) => (
              <div key={step.number} className="step-item relative flex flex-col items-center text-center px-6">
                {/* Connector line (between icons, not on last item) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] border-t-2 border-dashed border-primary/30"
                    aria-hidden="true"
                  />
                )}

                {/* Step number watermark */}
                <span
                  className="absolute -top-2 right-4 font-display text-7xl font-black text-primary/[0.08] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon circle */}
                <div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl ${
                    step.accent
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="mt-5 font-display text-lg font-bold text-charcoal-deep">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: vertical timeline */}
          <div className="relative lg:hidden">
            {/* Vertical timeline line */}
            <div
              className="absolute left-7 top-0 bottom-0 w-0.5 bg-primary/15"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10">
              {STEPS.map((step) => (
                <div key={step.number} className="step-item relative flex items-start gap-5 pl-0">
                  {/* Icon circle (overlapping the timeline) */}
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                      step.accent
                        ? "bg-accent/15 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="pt-1">
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-primary/40">
                      Paso {step.number}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold text-charcoal-deep">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button
            variant="primary"
            href={WHATSAPP_URL_WITH_MESSAGE}
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Hacé tu Pedido por WhatsApp
          </Button>
          <p className="mt-3 text-sm text-charcoal-light">
            Respondemos en minutos — sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
