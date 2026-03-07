"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import { WhatsAppIcon, MenuIcon, XIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            ? "bg-deep-green/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={{ transitionProperty: "background-color, box-shadow" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo */}
          <a href="#inicio" className="relative shrink-0" onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}>
            <Image
              src="/images/logo.webp"
              alt="Caribbean Tropical Solutions logo"
              width={140}
              height={48}
              className="h-10 w-auto rounded bg-white/90 px-2 py-1 lg:h-11"
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
                className="text-sm font-medium text-offwhite/80 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green rounded"
                style={{ transitionProperty: "color" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop WhatsApp CTA */}
          <a
            href={WHATSAPP_URL_WITH_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-charcoal-deep transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green lg:inline-flex"
            style={{ transitionProperty: "transform" }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-offwhite lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-deep-green/98 backdrop-blur-lg lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="font-display text-2xl font-bold text-offwhite transition-colors duration-200 hover:text-accent"
              style={{ transitionProperty: "color" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL_WITH_MESSAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 text-base font-bold text-charcoal-deep"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Escríbenos
          </a>
        </div>
      )}
    </>
  );
}
