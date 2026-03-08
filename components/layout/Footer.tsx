"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
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
  ArrowRightIcon,
} from "@/components/ui/Icons";

/* ═══════════════════════════════════════════════════════
   Animated block — blur + fade + slide on scroll
   ═══════════════════════════════════════════════════════ */
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
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Magnetic wrapper — element subtly follows cursor
   ═══════════════════════════════════════════════════════ */
function Magnetic({
  children,
  intensity = 0.35,
}: {
  children: ReactNode;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current || !hovered) {
        x.set(0);
        y.set(0);
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * intensity);
      y.set(dy * intensity);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [hovered, intensity, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SVG Text Hover Effect — large brand text with
   stroke animation + gradient reveal on cursor move
   ═══════════════════════════════════════════════════════ */
function TextHoverEffect({ text, textLine2 }: { text: string; textLine2?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((cursor.x - rect.left) / rect.width) * 100;
    const cy = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPos({ cx: `${cx}%`, cy: `${cy}%` });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={textLine2 ? "0 0 900 150" : "0 0 900 100"}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e: ReactMouseEvent<SVGSVGElement>) =>
        setCursor({ x: e.clientX, y: e.clientY })
      }
      className="select-none"
    >
      <defs>
        <linearGradient id="footerTextGrad" gradientUnits="userSpaceOnUse">
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#3d7a3d" />
              <stop offset="25%" stopColor="#e8a817" />
              <stop offset="50%" stopColor="#c0392b" />
              <stop offset="75%" stopColor="#3d7a3d" />
              <stop offset="100%" stopColor="#e8a817" />
            </>
          ) : (
            <stop offset="0%" stopColor="#fafaf8" />
          )}
        </linearGradient>

        <motion.radialGradient
          id="footerRevealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={maskPos}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="footerTextMask">
          <rect width="100%" height="100%" fill="url(#footerRevealMask)" />
        </mask>
      </defs>

      {/* Ghost outline on hover */}
      <text
        x="50%"
        y={textLine2 ? "38%" : "50%"}
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent font-bold"
        style={{
          fontFamily: "Sora, Helvetica, Arial, sans-serif",
          fontSize: 72,
          stroke: "rgba(250,250,248,0.15)",
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {text}
      </text>
      {textLine2 && (
        <text
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent font-bold"
          style={{
            fontFamily: "Sora, Helvetica, Arial, sans-serif",
            fontSize: 46,
            letterSpacing: "0.3em",
            stroke: "rgba(250,250,248,0.15)",
            opacity: hovered ? 0.7 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {textLine2}
        </text>
      )}

      {/* Animated stroke draw */}
      <motion.text
        x="50%"
        y={textLine2 ? "38%" : "50%"}
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent font-bold"
        style={{
          fontFamily: "Sora, Helvetica, Arial, sans-serif",
          fontSize: 72,
          stroke: "rgba(250,250,248,0.12)",
        }}
        initial={
          shouldReduceMotion
            ? { strokeDashoffset: 0, strokeDasharray: 1000 }
            : { strokeDashoffset: 1000, strokeDasharray: 1000 }
        }
        whileInView={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        viewport={{ once: true }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      {textLine2 && (
        <motion.text
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent font-bold"
          style={{
            fontFamily: "Sora, Helvetica, Arial, sans-serif",
            fontSize: 46,
            letterSpacing: "0.3em",
            stroke: "rgba(250,250,248,0.12)",
          }}
          initial={
            shouldReduceMotion
              ? { strokeDashoffset: 0, strokeDasharray: 1000 }
              : { strokeDashoffset: 1000, strokeDasharray: 1000 }
          }
          whileInView={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "easeInOut", delay: 0.3 }}
        >
          {textLine2}
        </motion.text>
      )}

      {/* Gradient reveal layer */}
      <text
        x="50%"
        y={textLine2 ? "38%" : "50%"}
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#footerTextGrad)"
        strokeWidth="0.3"
        mask="url(#footerTextMask)"
        className="fill-transparent font-bold"
        style={{
          fontFamily: "Sora, Helvetica, Arial, sans-serif",
          fontSize: 72,
        }}
      >
        {text}
      </text>
      {textLine2 && (
        <text
          x="50%"
          y="72%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#footerTextGrad)"
          strokeWidth="0.3"
          mask="url(#footerTextMask)"
          className="fill-transparent font-bold"
          style={{
            fontFamily: "Sora, Helvetica, Arial, sans-serif",
            fontSize: 46,
            letterSpacing: "0.3em",
          }}
        >
          {textLine2}
        </text>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Social data
   ═══════════════════════════════════════════════════════ */
const SOCIALS = [
  { href: WHATSAPP_URL_WITH_MESSAGE, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
] as const;

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-green text-offwhite/75">
      {/* ── Animated background orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #e8a817 0%, transparent 70%)",
            animation: "footerOrb1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, #3d7a3d 0%, transparent 70%)",
            animation: "footerOrb2 10s ease-in-out infinite alternate-reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, #e8a817 0%, transparent 60%)",
            animation: "footerOrb3 15s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* ── Glowing top border ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(232,168,23,0.5) 50%, transparent 95%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-40 w-2/3"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,168,23,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-0 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {/* ──────── Brand Column ──────── */}
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
            <p className="mt-4 text-xs font-display font-semibold uppercase tracking-[0.2em] text-accent/60">
              Soluciones que transforman
            </p>
          </AnimatedBlock>

          {/* ──────── Links Column ──────── */}
          <AnimatedBlock delay={0.2}>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-offwhite">
              Enlaces
            </h4>
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex w-fit items-center gap-1 py-2 text-sm transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                  style={{ transitionProperty: "color" }}
                >
                  {/* Slide-in arrow */}
                  <ArrowRightIcon className="h-3 w-3 -translate-x-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    style={{ transitionProperty: "transform, opacity" }}
                  />
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    style={{ transitionProperty: "transform" }}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-1.5 left-4 right-0 h-px origin-left scale-x-0 bg-accent/50 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                    style={{ transitionProperty: "transform" }}
                  />
                </a>
              ))}
            </nav>
          </AnimatedBlock>

          {/* ──────── Contact Column ──────── */}
          <AnimatedBlock delay={0.3}>
            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-offwhite">
              Contacto
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                style={{ transitionProperty: "color" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-offwhite/[0.06] ring-1 ring-offwhite/10 transition-all duration-200 group-hover:bg-accent/15 group-hover:ring-accent/30"
                  style={{
                    transitionProperty: "background-color, box-shadow",
                  }}
                >
                  <MailIcon className="h-4 w-4" />
                </span>
                {EMAIL}
              </a>

              {/* Phone — links to WhatsApp */}
              <a
                href={WHATSAPP_URL_WITH_MESSAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                style={{ transitionProperty: "color" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-offwhite/[0.06] ring-1 ring-offwhite/10 transition-all duration-200 group-hover:bg-accent/15 group-hover:ring-accent/30"
                  style={{
                    transitionProperty: "background-color, box-shadow",
                  }}
                >
                  <PhoneIcon className="h-4 w-4" />
                </span>
                {PHONE}
              </a>

              {/* Address — links to Google Maps */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                style={{ transitionProperty: "color" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-offwhite/[0.06] ring-1 ring-offwhite/10 transition-all duration-200 group-hover:bg-accent/15 group-hover:ring-accent/30"
                  style={{
                    transitionProperty: "background-color, box-shadow",
                  }}
                >
                  <MapPinIcon className="h-4 w-4" />
                </span>
                {ADDRESS}
              </a>
            </div>

            {/* ── Magnetic Social Icons ── */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <Magnetic key={label} intensity={0.35}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-offwhite/[0.08] ring-1 ring-offwhite/10 transition-[background-color,color,box-shadow] duration-200 hover:bg-accent hover:text-charcoal-deep hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 0 24px rgba(232,168,23,0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </AnimatedBlock>
        </div>

        {/* ── Large Interactive Brand Text ── */}
        <div className="mt-4 hidden lg:flex h-56 items-center justify-center -mb-4">
          <TextHoverEffect text="CARIBBEAN TROPICAL" textLine2="SOLUTIONS" />
        </div>

        {/* ── Gradient Divider ── */}
        <div className="mt-6 lg:mt-0">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(232,168,23,0.3) 25%, rgba(250,250,248,0.1) 50%, rgba(232,168,23,0.3) 75%, transparent 100%)",
            }}
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-2">
            <p className="text-xs text-offwhite/35 text-center md:text-left">
              &copy; 2026 Caribbean Tropical Solutions S.A. Todos los derechos
              reservados.
            </p>
            <p className="inline-flex items-center justify-center gap-1.5 text-xs text-offwhite/35">
              <span>Hecho con</span>
              <span
                className="inline-block text-red-500"
                style={{ animation: "heartbeat 1s ease-in-out infinite" }}
                aria-label="amor"
              >
                &#10084;
              </span>
              <span>por</span>
              <a
                href="https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-offwhite/35 font-medium hover:text-red-500 border-b border-offwhite/15 hover:border-red-500/40"
                style={{ transitionProperty: "color, border-color", transitionDuration: "200ms" }}
              >
                @websites_by_ger
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations for background orbs ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes footerOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 40px) scale(1.3); }
        }
        @keyframes footerOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-60px, -50px) scale(1.2); }
        }
        @keyframes footerOrb3 {
          0% { transform: translate(-50%, -50%) scale(0.8); }
          100% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
      `}} />
    </footer>
  );
}
