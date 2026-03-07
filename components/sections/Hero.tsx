"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Floating image slot definitions ---
interface FloatingSlot {
  images: string[];
  position: string; // tailwind classes for absolute positioning
  mobilePosition?: string; // override position on mobile
  size: number; // px width on desktop
  mobileSize?: number;
  rotation: number; // degrees
  layer: 1 | 2 | 4; // back=1, mid=2, front=4
  driftClass: string;
  hideOnMobile?: boolean;
}

const FLOATING_SLOTS: FloatingSlot[] = [
  {
    // Top-left, back layer
    images: ["/images/botas/bota1.webp", "/images/evacol/evacol3.webp", "/images/detectores/detector2.webp", "/images/cremas/crema4.webp"],
    position: "top-[8%] left-[3%]",
    size: 220,
    mobileSize: 120,
    rotation: -5,
    layer: 1,
    driftClass: "animate-hero-drift-1",
    hideOnMobile: true,
  },
  {
    // Top-right, mid layer
    images: ["/images/cremas/crema1.webp", "/images/evacol/evacol5.webp", "/images/botas/bota2.webp", "/images/cleaners/cleaner2.webp"],
    position: "top-[6%] right-[5%]",
    size: 180,
    mobileSize: 110,
    rotation: 6,
    layer: 2,
    driftClass: "animate-hero-drift-2",
  },
  {
    // Mid-left, mid layer
    images: ["/images/evacol/evacol1.webp", "/images/fumigacion/repelente.webp", "/images/cremas/crema3.webp", "/images/detectores/detector1.webp"],
    position: "top-[40%] left-[2%]",
    mobilePosition: "top-[25%] left-[2%]",
    size: 240,
    mobileSize: 130,
    rotation: -3,
    layer: 2,
    driftClass: "animate-hero-drift-3",
    hideOnMobile: true,
  },
  {
    // Mid-right, back layer
    images: ["/images/detectores/detector3.webp", "/images/botas/bota3.webp", "/images/cremas/crema5.webp", "/images/evacol/evacol7.webp"],
    position: "top-[38%] right-[3%]",
    size: 200,
    mobileSize: 110,
    rotation: 7,
    layer: 1,
    driftClass: "animate-hero-drift-1",
    hideOnMobile: true,
  },
  {
    // Bottom-left, mid layer
    images: ["/images/cremas/crema2.webp", "/images/fumigacion/silicone.webp", "/images/evacol/evacol4.webp", "/images/seguridad/casco-seguridad.webp"],
    position: "bottom-[10%] left-[5%]",
    size: 160,
    rotation: 4,
    layer: 2,
    driftClass: "animate-hero-drift-2",
    hideOnMobile: true,
  },
  {
    // Bottom-right, front layer
    images: ["/images/zapatos/zapatos1.webp", "/images/seguridad/mascara.webp", "/images/cremas/crema1.webp", "/images/evacol/evacol2.webp"],
    position: "bottom-[8%] right-[4%]",
    mobilePosition: "bottom-[10%] right-[2%]",
    size: 260,
    mobileSize: 130,
    rotation: -6,
    layer: 4,
    driftClass: "animate-hero-drift-3",
    hideOnMobile: true,
  },
  {
    // Top-center-right, front layer
    images: ["/images/fumigacion/repelente.webp", "/images/cremas/crema3.webp", "/images/botas/bota1.webp", "/images/evacol/evacol6.webp"],
    position: "top-[12%] right-[12%]",
    size: 120,
    mobileSize: 90,
    rotation: 8,
    layer: 4,
    driftClass: "animate-hero-drift-1",
    hideOnMobile: true,
  },
];

// Layer config: opacity, blur, parallax factor
const LAYER_CONFIG = {
  1: { opacity: 0.2, blur: "", parallaxFactor: -8, zIndex: "z-[5]" },
  2: { opacity: 0.45, blur: "", parallaxFactor: -15, zIndex: "z-[10]" },
  4: { opacity: 0.8, blur: "", parallaxFactor: 20, zIndex: "z-[35]" },
} as const;

// Hoisted static style objects to avoid re-creation on render
const BG_GRADIENT_STYLE = {
  background: "linear-gradient(135deg, #0f1f0f 0%, #142d14 40%, #1a1a1a 100%)",
} as const;

const BG_RADIAL_STYLE = {
  background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,168,23,0.06) 0%, transparent 70%)",
} as const;

const BG_NOISE_STYLE = {
  opacity: 0.035,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
  backgroundSize: "256px",
} as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageIndices, setImageIndices] = useState<number[]>(
    () => FLOATING_SLOTS.map(() => 0)
  );
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lerpedRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile detection
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Mouse parallax (desktop only)
  useEffect(() => {
    if (isMobile || prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      lerpedRef.current.x = lerp(lerpedRef.current.x, mouseRef.current.x, 0.08);
      lerpedRef.current.y = lerp(lerpedRef.current.y, mouseRef.current.y, 0.08);

      layerRefs.current.forEach((el) => {
        if (!el) return;
        const factor = parseFloat(el.dataset.parallax || "0");
        const tx = lerpedRef.current.x * factor;
        const ty = lerpedRef.current.y * factor;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Image rotation — staggered groups
  useEffect(() => {
    // Group A: slots 0, 2, 4 — every 4.5s
    const timerA = setInterval(() => {
      setImageIndices((prev) => {
        const next = [...prev];
        [0, 2, 4].forEach((i) => {
          next[i] = (prev[i] + 1) % FLOATING_SLOTS[i].images.length;
        });
        return next;
      });
    }, 4500);

    // Group B: slots 1, 3, 5, 6 — every 5s, offset by 2s
    const timerBDelay = setTimeout(() => {
      // Run once immediately after delay
      setImageIndices((prev) => {
        const next = [...prev];
        [1, 3, 5, 6].forEach((i) => {
          next[i] = (prev[i] + 1) % FLOATING_SLOTS[i].images.length;
        });
        return next;
      });
    }, 2000);

    let timerB: ReturnType<typeof setInterval>;
    const timerBStart = setTimeout(() => {
      timerB = setInterval(() => {
        setImageIndices((prev) => {
          const next = [...prev];
          [1, 3, 5, 6].forEach((i) => {
            next[i] = (prev[i] + 1) % FLOATING_SLOTS[i].images.length;
          });
          return next;
        });
      }, 5000);
    }, 2000);

    return () => {
      clearInterval(timerA);
      clearTimeout(timerBDelay);
      clearTimeout(timerBStart);
      if (timerB) clearInterval(timerB);
    };
  }, []);

  // GSAP entrance sequence
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Show everything immediately
      gsap.set(".hero-bg, .hero-float-back, .hero-float-mid, .hero-float-front", { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0ms: Background fade in
      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })

        // 200ms: Back-layer images
        .fromTo(
          ".hero-float-back",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          0.2
        )

        // 100ms: Pill badge (subtle y-only, already visible)
        .fromTo(
          ".hero-badge",
          { y: -12 },
          { y: 0, duration: 0.3, ease: "power2.out" },
          0.1
        )

        // 150ms: Headline words stagger (subtle y-only, already visible)
        .fromTo(
          ".hero-title-word",
          { y: 20 },
          { y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
          0.15
        )

        // 400ms: Subtitle (subtle y-only)
        .fromTo(
          ".hero-subtitle",
          { y: 10 },
          { y: 0, duration: 0.3, ease: "power3.out" },
          0.4
        )

        // 500ms: CTA buttons (subtle y-only)
        .fromTo(
          ".hero-cta",
          { y: 10 },
          { y: 0, duration: 0.3, stagger: 0.08, ease: "back.out(1.4)" },
          0.5
        )

        // 600ms: Mid-layer images
        .fromTo(
          ".hero-float-mid",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.6
        )

        // 800ms: Front-layer images last
        .fromTo(
          ".hero-float-front",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.2)" },
          0.8
        )

;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP scroll parallax + fade
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Hero content parallax + fade
      gsap.to(".hero-content", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Back images — slow parallax
      gsap.to(".hero-float-back", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mid images — medium parallax
      gsap.to(".hero-float-mid", {
        y: -140,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Front images — fast parallax
      gsap.to(".hero-float-front", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setLayerRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    layerRefs.current[index] = el;
  }, []);

  const titleWords = ["Soluciones", "que", "Trabajan", "Tan", "Duro", "Como", "Vos"];

  // Render a floating image slot
  const renderFloatingSlot = (slot: FloatingSlot, slotIndex: number) => {
    const config = LAYER_CONFIG[slot.layer];
    const layerClass =
      slot.layer === 1 ? "hero-float-back" :
      slot.layer === 2 ? "hero-float-mid" : "hero-float-front";
    const currentImage = slot.images[imageIndices[slotIndex]];
    const pos = isMobile && slot.mobilePosition ? slot.mobilePosition : slot.position;

    if (isMobile && slot.hideOnMobile) return null;

    return (
      <div
        key={slotIndex}
        ref={!isMobile ? setLayerRef(slotIndex) : undefined}
        data-parallax={config.parallaxFactor}
        className={`absolute ${pos} ${config.zIndex} ${layerClass} opacity-0 pointer-events-none ${isMobile ? slot.driftClass : ""}`}
      >
        <div
          className={`relative ${config.blur}`}
          style={{
            width: isMobile ? (slot.mobileSize || slot.size * 0.6) : slot.size,
            height: isMobile ? (slot.mobileSize || slot.size * 0.6) : slot.size,
            transform: `rotate(${slot.rotation}deg)`,
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: config.opacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-contain"
                sizes={`${isMobile ? (slot.mobileSize || slot.size * 0.6) : slot.size}px`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen min-h-[600px] overflow-hidden"
    >
      {/* Layer 0: Background */}
      <div className="hero-bg absolute inset-0 z-0 opacity-0">
        {/* Multi-stop gradient */}
        <div className="absolute inset-0" style={BG_GRADIENT_STYLE} />
        {/* Radial gold spotlight from center */}
        <div className="absolute inset-0" style={BG_RADIAL_STYLE} />
        {/* Noise overlay */}
        <div className="absolute inset-0 pointer-events-none" style={BG_NOISE_STYLE} />
      </div>

      {/* Floating product images — all layers */}
      {FLOATING_SLOTS.map((slot, i) => renderFloatingSlot(slot, i))}

      {/* Layer 3: Centered content */}
      <div className="hero-content relative z-40 flex min-h-screen items-center justify-center px-5 pt-20 pb-16">
        <div className="text-center max-w-[800px]">
          {/* Pill badge */}
          <div className="hero-badge mb-6">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Distribuidora en el Caribe
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-hero font-display font-extrabold leading-[1.05] tracking-[-0.04em] text-offwhite">
            {titleWords.map((word, i) => (
              <span key={i}>
                <span className="hero-title-word inline-block mr-[0.25em]">
                  {word === "Duro" || word === "Vos" ? (
                    <span className="text-accent italic">{word}</span>
                  ) : (
                    word
                  )}
                </span>
                {i < titleWords.length - 1 && " "}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mx-auto mt-6 max-w-[520px] text-base leading-relaxed text-offwhite/70 md:text-lg">
            Distribuidora de productos de mantenimiento, protección, limpieza,
            oficina y ferretería en el Caribe de Costa Rica.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="hero-cta w-full sm:w-auto">
              <Button
                variant="primary"
                href={WHATSAPP_URL_WITH_MESSAGE}
                icon={<WhatsAppIcon className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Escríbenos por WhatsApp
              </Button>
            </div>
            <div className="hero-cta w-full sm:w-auto">
              <Button variant="outline" href="#categorias" className="w-full sm:w-auto">
                Conocé Nuestros Productos
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
