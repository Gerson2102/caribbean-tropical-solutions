"use client";

import { useState, useEffect } from "react";
import { MenuIcon, XIcon, PhoneIcon } from "./icons";

const WHATSAPP_URL =
  "https://wa.me/50671035467?text=Hola,%20me%20gustaría%20obtener%20más%20información";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#por-que-elegirnos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(11,20,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "background 0.3s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
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
            className="hidden text-sm font-bold sm:inline lg:text-base"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            Caribbean Tropical Solutions
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full"
                style={{
                  background: "var(--accent)",
                  transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </a>
          ))}
        </div>

        {/* Desktop WhatsApp CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold lg:inline-flex"
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
          <PhoneIcon size={16} />
          Contáctenos
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-lg p-2 lg:hidden"
          style={{ color: "var(--text-primary)" }}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          style={{ background: "rgba(11,20,16,0.97)", backdropFilter: "blur(16px)" }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 p-2"
            style={{ color: "var(--text-primary)" }}
            aria-label="Cerrar menú"
          >
            <XIcon size={24} />
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-bold"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold"
            style={{
              background: "var(--accent)",
              color: "var(--bg-deepest)",
              fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            <PhoneIcon size={18} />
            Contáctenos
          </a>
        </div>
      )}
    </nav>
  );
}
