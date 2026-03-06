"use client";

import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import {
  ShieldCheckIcon,
  BriefcaseIcon,
  SparklesIcon,
  WrenchIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  HeadsetIcon,
  TruckIcon,
  TagIcon,
} from "@/components/icons";

const WHATSAPP_URL =
  "https://wa.me/50671035467?text=Hola,%20me%20gustaría%20obtener%20más%20información";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#por-que-elegirnos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />

      <main>
        {/* ============================================= */}
        {/* HERO */}
        {/* ============================================= */}
        <section
          id="inicio"
          className="noise-overlay relative overflow-hidden"
          style={{ background: "var(--bg-deepest)" }}
        >
          {/* Gradient overlays */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(61,165,74,0.12), transparent), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(232,168,23,0.06), transparent)",
            }}
          />

          {/* Floating shapes */}
          <div
            className="pointer-events-none absolute top-20 right-[15%] h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(61,165,74,0.3), transparent 70%)",
              animation: "float-slow 8s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-32 left-[10%] h-48 w-48 rounded-full opacity-15 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(232,168,23,0.25), transparent 70%)",
              animation: "float-medium 6s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute top-[60%] right-[5%] h-32 w-32 rounded-full opacity-10 blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(61,165,74,0.4), transparent 70%)",
              animation: "float-slow 10s ease-in-out infinite 2s",
            }}
          />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
            {/* Left content */}
            <div className="hero-entrance flex-1">
              <div>
                <span
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(61,165,74,0.3)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Distribuidora Industrial
                </span>
              </div>

              <h1
                className="mt-6 text-[32px] font-extrabold leading-tight sm:text-[40px] md:text-[48px] lg:text-[56px]"
                style={{
                  fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                Su aliado estratégico en suministros industriales
              </h1>

              <p
                className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Distribuidora de productos de mantenimiento, limpieza, protección personal, oficina y ferretería. Asesoría técnica en todas nuestras líneas.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {/* Primary CTA — Yellow / WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-bold"
                  style={{
                    background: "var(--secondary)",
                    color: "var(--bg-deepest)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(232,168,23,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                >
                  {/* Shine sweep */}
                  <span
                    className="pointer-events-none absolute inset-0 w-1/2 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      animation: "shine-sweep 0.6s ease-out",
                    }}
                  />
                  Solicitar Cotización
                </a>

                {/* Secondary CTA — Green outline */}
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold"
                  style={{
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    transition: "background 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(61,165,74,0.08)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                >
                  Ver Servicios
                </a>
              </div>
            </div>

            {/* Right visual */}
            <div className="hero-entrance mt-12 flex-1 lg:mt-0" style={{ animationDelay: "0.15s" }}>
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
                style={{
                  background: "var(--bg-mid)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src="https://placehold.co/800x600/162420/3DA54A?text=CTS"
                  alt="Caribbean Tropical Solutions — Suministros industriales"
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.85)" }}
                  loading="eager"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(11,20,16,0.6) 0%, transparent 50%, rgba(11,20,16,0.4) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* SERVICIOS */}
        {/* ============================================= */}
        <section
          id="servicios"
          className="relative py-20 lg:py-32"
          style={{ background: "var(--bg-dark)" }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection stagger={0.1}>
              <div>
                <span
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(61,165,74,0.3)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Nuestros Servicios
                </span>
              </div>
              <h2
                className="mt-6 text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px]"
                style={{
                  fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                Soluciones para cada necesidad
              </h2>
              <p
                className="mt-4 max-w-2xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Ofrecemos una amplia gama de productos industriales con asesoría técnica especializada en cada línea.
              </p>
            </AnimatedSection>

            <AnimatedSection className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
              <ServiceCard
                icon={<ShieldCheckIcon size={28} />}
                title="Equipo de Protección Personal"
                description="Cascos, guantes, lentes, arneses y más. Equipamos a su equipo con los mejores estándares de seguridad."
              />
              <ServiceCard
                icon={<BriefcaseIcon size={28} />}
                title="Suministros de Oficina"
                description="Todo lo que su oficina necesita: papel, tóner, organizadores y más, con entregas confiables."
              />
              <ServiceCard
                icon={<SparklesIcon size={28} />}
                title="Limpieza y Desinfección"
                description="Productos profesionales para mantener sus instalaciones impecables y libres de contaminantes."
              />
              <ServiceCard
                icon={<WrenchIcon size={28} />}
                title="Ferretería"
                description="Herramientas, fijaciones, material eléctrico y todo lo necesario para el mantenimiento de sus instalaciones."
              />
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================= */}
        {/* POR QUÉ ELEGIRNOS */}
        {/* ============================================= */}
        <section
          id="por-que-elegirnos"
          className="relative py-20 lg:py-32"
          style={{ background: "var(--bg-deepest)" }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection stagger={0.1}>
              <div>
                <span
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(61,165,74,0.3)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Por Qué Elegirnos
                </span>
              </div>
              <h2
                className="mt-6 text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px]"
                style={{
                  fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                Su socio de confianza
              </h2>
            </AnimatedSection>

            <AnimatedSection className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3" stagger={0.15}>
              {/* Value Prop 1 */}
              <div
                className="group relative overflow-hidden rounded-2xl p-6 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderTop: "3px solid var(--accent)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="absolute top-4 right-4 text-[64px] font-extrabold leading-none select-none"
                  style={{
                    color: "var(--accent)",
                    opacity: 0.07,
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  01
                </span>
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <HeadsetIcon size={28} className="text-[var(--accent)]" />
                  </div>
                  <h3
                    className="mb-2 text-xl font-bold leading-tight"
                    style={{
                      fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    Asesoría Técnica
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-secondary)" }}>
                    Nuestro equipo le guía en la selección de los productos ideales para su operación.
                  </p>
                </div>
              </div>

              {/* Value Prop 2 */}
              <div
                className="group relative overflow-hidden rounded-2xl p-6 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderTop: "3px solid var(--accent)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="absolute top-4 right-4 text-[64px] font-extrabold leading-none select-none"
                  style={{
                    color: "var(--accent)",
                    opacity: 0.07,
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  02
                </span>
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <TruckIcon size={28} className="text-[var(--accent)]" />
                  </div>
                  <h3
                    className="mb-2 text-xl font-bold leading-tight"
                    style={{
                      fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    Entregas Confiables
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-secondary)" }}>
                    Servicio de distribución puntual en todo el territorio nacional.
                  </p>
                </div>
              </div>

              {/* Value Prop 3 */}
              <div
                className="group relative overflow-hidden rounded-2xl p-6 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderTop: "3px solid var(--accent)",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="absolute top-4 right-4 text-[64px] font-extrabold leading-none select-none"
                  style={{
                    color: "var(--accent)",
                    opacity: 0.07,
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  03
                </span>
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <TagIcon size={28} className="text-[var(--accent)]" />
                  </div>
                  <h3
                    className="mb-2 text-xl font-bold leading-tight"
                    style={{
                      fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    Precios Competitivos
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-secondary)" }}>
                    Trabajamos directamente con fabricantes para ofrecerle la mejor relación costo-beneficio.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================= */}
        {/* CTA / CONTACTO */}
        {/* ============================================= */}
        <section
          id="contacto"
          className="noise-overlay relative py-20 lg:py-32"
          style={{ background: "var(--bg-dark)" }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(61,165,74,0.08), transparent)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
            <AnimatedSection stagger={0.12}>
              <h2
                className="text-[28px] font-bold leading-tight sm:text-[36px] md:text-[44px]"
                style={{
                  fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                ¿Listo para optimizar sus compras?
              </h2>

              <p
                className="mt-4 text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Contáctenos hoy y reciba asesoría personalizada sin compromiso.
              </p>

              <div className="mt-8">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg px-10 py-4 text-lg font-bold"
                  style={{
                    background: "var(--secondary)",
                    color: "var(--bg-deepest)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(232,168,23,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                >
                  <WhatsAppIcon size={22} />
                  Solicitar Cotización
                  {/* Shine sweep */}
                  <span
                    className="pointer-events-none absolute inset-0 w-1/2 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      animation: "shine-sweep 0.6s ease-out",
                    }}
                  />
                </a>
              </div>

              {/* Divider */}
              <div
                className="mx-auto mt-10 mb-10 max-w-xs"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              />

              {/* Contact info */}
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
                <a
                  href="mailto:ventas@3dcaribbean.com"
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <MailIcon size={18} />
                  ventas@3dcaribbean.com
                </a>
                <a
                  href="tel:+50671035467"
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <PhoneIcon size={18} />
                  7103-5467
                </a>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/caribbean_troprical_solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="https://www.facebook.com/people/Caribbean-Tropical-Solutions-SA/61561018101440/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <FacebookIcon size={20} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================= */}
        {/* FOOTER */}
        {/* ============================================= */}
        <footer
          className="relative py-12 lg:py-16"
          style={{
            background: "var(--bg-deepest)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {/* Brand column */}
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-deepest)",
                      fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    CTS
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Caribbean Tropical Solutions S.A.
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Distribuidora integral de productos industriales con asesoría técnica en todas las líneas.
                </p>
              </div>

              {/* Quick links */}
              <div>
                <h4
                  className="mb-4 text-xs font-semibold uppercase"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Enlaces
                </h4>
                <ul className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact column */}
              <div>
                <h4
                  className="mb-4 text-xs font-semibold uppercase"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  Contacto
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:ventas@3dcaribbean.com"
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    >
                      <MailIcon size={14} />
                      ventas@3dcaribbean.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+50671035467"
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    >
                      <PhoneIcon size={14} />
                      7103-5467
                    </a>
                  </li>
                </ul>

                {/* Social */}
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/caribbean_troprical_solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      transition: "color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/people/Caribbean-Tropical-Solutions-SA/61561018101440/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      transition: "color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-10 pt-6 pb-24 text-center text-xs sm:pb-0"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              © 2025 Caribbean Tropical Solutions S.A. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
