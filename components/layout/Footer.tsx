"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  EMAIL,
  PHONE,
  ADDRESS,
  WHATSAPP_URL_WITH_MESSAGE,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  NAV_LINKS,
} from "@/lib/constants";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from "@/components/ui/Icons";

/* ── Animated wrapper ── */
function AnimatedBlock({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Social icon data ── */
const SOCIALS = [
  {
    href: WHATSAPP_URL_WITH_MESSAGE,
    label: "WhatsApp",
    Icon: WhatsAppIcon,
  },
  {
    href: FACEBOOK_URL,
    label: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: INSTAGRAM_URL,
    label: "Instagram",
    Icon: InstagramIcon,
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-green text-offwhite/75">
      {/* ── Top glow line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,168,23,0.35) 50%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-2/3"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,168,23,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* ── Brand ── */}
          <AnimatedBlock delay={0.1}>
            <Image
              src="/images/logo.webp"
              alt="Caribbean Tropical Solutions logo"
              width={160}
              height={55}
              className="h-12 w-auto rounded-lg bg-white px-2 py-1 shadow-sm"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Distribuidora de productos de mantenimiento, limpieza,
              desinfección, oficina y ferretería en el Caribe de Costa Rica.
            </p>
            <p className="mt-4 text-xs font-display font-semibold uppercase tracking-widest text-accent/70">
              Soluciones que transforman
            </p>
          </AnimatedBlock>

          {/* ── Quick Links ── */}
          <AnimatedBlock delay={0.2}>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-offwhite">
              Enlaces
            </h4>
            <nav className="flex flex-col gap-0">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex w-fit items-center py-2 text-sm transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                  style={{ transitionProperty: "color" }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </AnimatedBlock>

          {/* ── Contact ── */}
          <AnimatedBlock delay={0.3}>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-offwhite">
              Contacto
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2.5 rounded transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                style={{ transitionProperty: "color" }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-offwhite/5 transition-colors duration-200 group-hover:bg-accent/15"
                  style={{ transitionProperty: "background-color" }}
                >
                  <MailIcon className="h-4 w-4" />
                </span>
                {EMAIL}
              </a>
              <a
                href={`tel:+506${PHONE.replace("-", "")}`}
                className="group inline-flex items-center gap-2.5 rounded transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                style={{ transitionProperty: "color" }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-offwhite/5 transition-colors duration-200 group-hover:bg-accent/15"
                  style={{ transitionProperty: "background-color" }}
                >
                  <PhoneIcon className="h-4 w-4" />
                </span>
                {PHONE}
              </a>
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-offwhite/5">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                {ADDRESS}
              </span>
            </div>

            {/* ── Socials ── */}
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-offwhite/10 transition-[background-color,color,box-shadow] duration-200 hover:bg-accent hover:text-charcoal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                  whileHover={{
                    scale: 1.12,
                    boxShadow: "0 0 20px rgba(232,168,23,0.25)",
                  }}
                  whileTap={{ scale: 0.92 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </AnimatedBlock>
        </div>

        {/* ── Bottom Bar ── */}
        <AnimatedBlock delay={0.45} className="mt-14">
          {/* Gradient divider */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(232,168,23,0.25) 30%, rgba(250,250,248,0.12) 50%, rgba(232,168,23,0.25) 70%, transparent 100%)",
            }}
          />
          <p className="pt-6 text-center text-xs text-offwhite/40">
            &copy; 2026 Caribbean Tropical Solutions S.A. Todos los derechos
            reservados.
          </p>
        </AnimatedBlock>
      </div>
    </footer>
  );
}
