"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import { WhatsAppIcon, MenuIcon, XIcon } from "@/components/ui/Icons";
import QuoteCartButton from "@/components/ui/QuoteCartButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  useEffect(() => {
    // Use a sentinel element at 60px to detect scroll via IntersectionObserver
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:60px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.appendChild(sentinel);
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 1 }
    );
    observer.observe(sentinel);
    return () => { observer.disconnect(); sentinel.remove(); };
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape key to close menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Focus trap within mobile menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-deep-green/95 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={{
          transitionProperty: "background-color, box-shadow",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo */}
          <a href="#inicio" className="relative shrink-0 rounded focus-ring-accent" onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}>
            <Image
              src="/images/logo.webp"
              alt="Caribbean Tropical Solutions logo"
              width={140}
              height={48}
              className="h-10 w-auto rounded-lg bg-white px-2 py-1 shadow-sm lg:h-11"
              priority
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative pb-1 text-sm font-medium transition-colors duration-200 hover:text-accent focus-ring-accent rounded ${
                  activeSection === link.href ? "text-accent" : "text-offwhite/80"
                }`}
                style={{ transitionProperty: "color" }}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-1.5">
            <QuoteCartButton />

            {/* Desktop WhatsApp CTA */}
            <a
              href={WHATSAPP_URL_WITH_MESSAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-charcoal-deep transition-transform duration-200 hover:scale-105 active:scale-95 animate-gold-glow-pulse focus-ring-accent lg:inline-flex"
              style={{ transitionProperty: "transform" }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-offwhite lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            onKeyDown={handleMenuKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-deep-green/98 backdrop-blur-lg lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.2 }}
                className="font-display text-2xl font-bold text-offwhite transition-colors duration-200 hover:text-accent focus-ring-accent rounded-lg"
                style={{ transitionProperty: "color" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={WHATSAPP_URL_WITH_MESSAGE}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.2 }}
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 text-base font-bold text-charcoal-deep transition-transform duration-200 hover:scale-105 active:scale-95 focus-ring-accent"
              style={{ transitionProperty: "transform" }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escríbenos
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
