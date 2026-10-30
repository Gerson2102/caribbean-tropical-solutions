"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import Button from "@/components/ui/Button";
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
    icon: <SearchIcon className="h-6 w-6" aria-hidden="true" />,
    title: "Explorá Nuestro Catálogo",
    description:
      "Revisá nuestra selección de productos arriba o preguntanos por WhatsApp qué tenemos disponible.",
  },
  {
    number: "02",
    icon: <WhatsAppIcon className="h-6 w-6" aria-hidden="true" />,
    title: "Escribinos por WhatsApp",
    description:
      "Envianos un mensaje con los productos que te interesan. Te respondemos en minutos.",
    accent: true,
  },
  {
    number: "03",
    icon: <ClipboardCheckIcon className="h-6 w-6" aria-hidden="true" />,
    title: "Confirmá tu Pedido",
    description:
      "Te enviamos cotización, confirmás cantidades y coordinamos los detalles de pago.",
  },
  {
    number: "04",
    icon: <TruckIcon className="h-6 w-6" aria-hidden="true" />,
    title: "Recibí tu Entrega",
    description:
      "Preparamos tu pedido y lo enviamos a cualquier punto del Caribe y Costa Rica.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const iconPulse = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: [0.8, 1.12, 1],
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" as const, delay: 0.3 },
  },
};

// Walk loop timing, in seconds.
const STEP_DWELL = 0.4; // a lit step holds this long before the line travels on
const END_HOLD = 1.2; // the finished walk holds this long before it resets
const ENTRANCE = 1.6; // the entrance above finishes before the first pass

// Overlay the walk loop lights on a step's tile; invisible until the loop runs.
function TileHighlight({ step }: { step: Step }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`loop-ring pointer-events-none absolute inset-0 rounded-xl border-2 opacity-0 ${
          step.accent ? "border-accent" : "border-primary"
        }`}
      />
      <span
        aria-hidden="true"
        className={`loop-fill absolute inset-0 flex items-center justify-center rounded-xl opacity-0 ${
          step.accent
            ? "bg-accent text-charcoal-deep shadow-[var(--shadow-cta)]"
            : "bg-primary text-offwhite shadow-[var(--shadow-card-hover)]"
        }`}
      >
        {step.icon}
      </span>
    </>
  );
}

export default function HowToBuy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Walk loop: each step's tile lights up as the connector draws in from the
  // previous one; after the last step everything clears and the walk repeats.
  // Only the overlays move, so the steps read the same with or without it.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return;

    let walk: gsap.core.Timeline | null = null;
    const ctx = gsap.context(() => {
      // fromTo everywhere: explicit start values keep every repeat identical.
      const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "expo.out", immediateRender: false } });
      STEPS.forEach((_, i) => {
        const step = `[data-step="${i}"]`;
        if (i > 0) {
          const prev = `[data-step="${i - 1}"]`;
          // opacity sits in both halves: a from-only value is set once and lost after the first repeat.
          tl.fromTo(`${prev} .loop-link-x`, { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }, `+=${STEP_DWELL}`)
            .fromTo(`${prev} .loop-link-y`, { scaleY: 0, opacity: 1 }, { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<")
            .fromTo(`${prev} .loop-num`, { opacity: 0.25 }, { opacity: 0.08, duration: 0.5, ease: "power2.out" }, "<");
        }
        tl.fromTo(`${step} .loop-fill`, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6 }, i > 0 ? "-=0.15" : 0)
          .fromTo(`${step} .loop-ring`, { opacity: 0.6, scale: 1 }, { opacity: 0, scale: 1.7, duration: 0.9, ease: "power2.out" }, "<")
          .fromTo(`${step} .loop-num`, { opacity: 0.08 }, { opacity: 0.25, duration: 0.6 }, "<");
      });
      tl.to(".loop-fill", { opacity: 0, scale: 0.6, duration: 0.5, ease: "power2.inOut" }, `+=${END_HOLD}`)
        .to(".loop-link-x, .loop-link-y", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "<")
        .to(`[data-step="${STEPS.length - 1}"] .loop-num`, { opacity: 0.08, duration: 0.5, ease: "power2.inOut" }, "<")
        .to({}, { duration: 0.3 }); // a breath before step one relights
      walk = tl;
    }, root);

    // Runs only while the steps are on screen; the first pass waits for the entrance.
    let visible = false;
    const firstPass = gsap.delayedCall(ENTRANCE, () => {
      if (visible) walk?.play();
    }).pause();
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) walk?.pause();
        else if (firstPass.progress() < 1) firstPass.play();
        else walk?.play();
      },
      { threshold: 0.3 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      firstPass.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="como-comprar"
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionLabel>Proceso</SectionLabel>
          <ScrollTextReveal className="text-section mt-4 font-display font-extrabold text-charcoal-deep">
            ¿Cómo Comprar?
          </ScrollTextReveal>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
            Pedir es fácil. En 4 simples pasos tenés tus productos.
          </p>
        </div>

        <div ref={sectionRef}>
          {/* Desktop: horizontal 4-column grid */}
          <motion.ol
            className="hidden lg:grid lg:grid-cols-4 lg:gap-0 list-none"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                data-step={i}
                className="relative flex flex-col items-center text-center px-6"
                variants={itemVariants}
              >
                {/* Connector line (between icons, not on last item) */}
                {i < STEPS.length - 1 && (
                  <svg
                    className="absolute top-7 left-[calc(50%+28px)] h-[2px] overflow-visible"
                    style={{ width: "calc(100% - 56px)" }}
                    aria-hidden="true"
                  >
                    <motion.line
                      x1="0"
                      y1="1"
                      x2="100%"
                      y2="1"
                      stroke="rgba(61,122,61,0.3)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      variants={lineDraw}
                    />
                  </svg>
                )}

                {/* Walk-loop progress over the connector */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="loop-link-x absolute top-7 left-[calc(50%+28px)] h-[2px] w-[calc(100%-56px)] origin-left rounded-full bg-primary opacity-0"
                  />
                )}

                {/* Step number watermark */}
                <span
                  className="loop-num absolute -top-2 right-4 font-display text-7xl font-black text-primary opacity-[0.08] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon circle with pulse */}
                <motion.div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl ${
                    step.accent
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                  variants={iconPulse}
                >
                  {step.icon}
                  <TileHighlight step={step} />
                </motion.div>

                {/* Text */}
                <h3 className="mt-5 font-display text-lg font-bold text-charcoal-deep">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          {/* Mobile/Tablet: vertical timeline */}
          <motion.div
            className="relative lg:hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Vertical timeline line */}
            <svg
              className="absolute left-[22px] top-0 h-full w-[2px] overflow-visible"
              aria-hidden="true"
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="rgba(61,122,61,0.15)"
                strokeWidth="2"
                variants={lineDraw}
              />
            </svg>

            <ol className="flex flex-col gap-5 list-none">
              {STEPS.map((step, i) => (
                <motion.li
                  key={step.number}
                  data-step={i}
                  className="relative flex items-start gap-4 pl-0"
                  variants={itemVariants}
                >
                  {/* Walk-loop progress down to the next step's icon */}
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="loop-link-y absolute left-[22px] top-11 -bottom-5 w-[2px] origin-top rounded-full bg-primary opacity-0"
                    />
                  )}

                  {/* Icon circle (overlapping the timeline) */}
                  <motion.div
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      step.accent
                        ? "bg-accent/15 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                    variants={iconPulse}
                  >
                    {step.icon}
                    <TileHighlight step={step} />
                  </motion.div>

                  {/* Text */}
                  <div className="pt-0.5">
                    <span className="font-display text-[10px] font-bold uppercase tracking-widest text-primary/40">
                      Paso {step.number}
                    </span>
                    <h3 className="mt-0.5 font-display text-sm font-bold text-charcoal-deep">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal-light">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>

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
