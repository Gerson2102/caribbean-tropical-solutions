"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import {
  buildQuoteUrl,
  clearQuote,
  closeDrawer,
  decrementItem,
  incrementItem,
  MAX_QTY,
  removeItem,
  useDrawerOpen,
  useQuoteItems,
} from "@/lib/quote-store";
import { CartIcon, TrashIcon, WhatsAppIcon, XIcon } from "@/components/ui/Icons";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { scrollToSection } from "@/lib/smooth-scroll";

const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
const ERROR_COLOR = "#ff8a80"; // semantic danger, readable on deep-green

export default function QuoteDrawer() {
  const open = useDrawerOpen();
  const items = useQuoteItems();
  const reduce = useReducedMotion();

  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nameError, setNameError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isEmpty = items.length === 0;
  const totalUnits = items.reduce((sum, item) => sum + item.qty, 0);

  // Lock body scroll, manage focus, and wire Escape while open.
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const raf = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(raf);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  // Auto-reset the "Vaciar" confirmation after a few seconds.
  useEffect(() => {
    if (!confirmClear) return;
    const t = window.setTimeout(() => setConfirmClear(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmClear]);

  // Focus trap within the panel.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
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

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedName = nombre.trim();
      const trimmedCompany = empresa.trim();
      const nameOk = trimmedName !== "";
      const companyOk = trimmedCompany !== "";
      if (!nameOk || !companyOk) {
        setNameError(!nameOk);
        setCompanyError(!companyOk);
        // Focus the first invalid field.
        if (!nameOk) nameInputRef.current?.focus();
        else companyInputRef.current?.focus();
        return;
      }
      setSubmitting(true);
      const url = buildQuoteUrl({ nombre: trimmedName, empresa: trimmedCompany, telefono }, items);
      // Trigger an anchor click rather than window.open() — far more reliable on
      // mobile WhatsApp / Safari, which often block scripted window.open().
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSubmitting(false);
    },
    [nombre, empresa, telefono, items],
  );

  const goToCatalog = useCallback(() => {
    closeDrawer();
    scrollToSection("catalogo");
  }, []);

  const handleClear = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearQuote();
    setConfirmClear(false);
  }, [confirmClear]);

  const inputClass =
    "w-full rounded-xl border bg-offwhite/[0.08] px-4 py-3 text-offwhite placeholder-offwhite/25 focus-visible:border-accent focus-ring-accent";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="quote-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-deep-green/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key="quote-panel"
            data-lenis-prevent
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-drawer-title"
            onKeyDown={handleKeyDown}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.28 }}
            className="fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-md flex-col bg-deep-green shadow-2xl"
          >
            {/* Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-offwhite/10 px-5 py-4">
              <h2
                id="quote-drawer-title"
                className="flex items-center gap-2.5 font-display text-lg font-bold text-offwhite"
              >
                <CartIcon className="h-5 w-5 text-accent" />
                Tu Cotización
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Cerrar cotización"
                className="flex h-11 w-11 items-center justify-center rounded-full text-offwhite/70 transition-colors duration-200 hover:text-accent focus-ring-accent"
                style={{ transitionProperty: "color" }}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </header>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {isEmpty ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-offwhite/[0.06]">
                    <CartIcon className="h-8 w-8 text-offwhite/40" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold text-offwhite">
                    Tu cotización está vacía
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-offwhite/60">
                    Agregá productos del catálogo y te ayudamos con los precios por WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={goToCatalog}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-offwhite/40 px-6 py-2.5 text-sm font-semibold text-offwhite transition-colors duration-200 hover:border-accent hover:text-accent focus-ring-accent"
                    style={{ transitionProperty: "color, border-color" }}
                  >
                    Explorar catálogo
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => {
                    const product = PRODUCT_BY_ID.get(item.id);
                    if (!product) return null;
                    return (
                      <li
                        key={item.id}
                        className="flex gap-3 rounded-2xl bg-offwhite/[0.04] p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f7f6f3]">
                          <Image
                            src={product.image}
                            alt={product.altText}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-offwhite">
                            {product.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-offwhite/50">{product.brand}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <QuantityStepper
                              value={item.qty}
                              max={MAX_QTY}
                              onIncrement={() => incrementItem(item.id)}
                              onDecrement={() => decrementItem(item.id)}
                              label={product.name}
                            />
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Quitar ${product.name} de la cotización`}
                              className="flex h-10 w-10 items-center justify-center rounded-lg text-offwhite/50 transition-colors duration-200 hover:text-[#ff8a80] focus-ring-accent"
                              style={{ transitionProperty: "color" }}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer / form */}
            {!isEmpty && (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="shrink-0 space-y-4 border-t border-offwhite/10 px-5 py-4"
              >
                <div className="flex items-center justify-between text-xs text-offwhite/50">
                  <span>
                    {items.length} {items.length === 1 ? "producto" : "productos"} ·{" "}
                    {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}
                  </span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded font-medium text-offwhite/50 transition-colors duration-200 hover:text-[#ff8a80] focus-ring-accent"
                    style={{ transitionProperty: "color", color: confirmClear ? ERROR_COLOR : undefined }}
                  >
                    {confirmClear ? "¿Seguro? Vaciar todo" : "Vaciar"}
                  </button>
                </div>

                <div>
                  <label htmlFor="quote-nombre" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                    Nombre <span style={{ color: ERROR_COLOR }}>*</span>
                  </label>
                  <input
                    id="quote-nombre"
                    ref={nameInputRef}
                    type="text"
                    name="nombre"
                    autoComplete="name"
                    required
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      if (nameError) setNameError(false);
                    }}
                    onBlur={() => setNameError(nombre.trim() === "")}
                    aria-invalid={nameError}
                    aria-describedby={nameError ? "quote-nombre-error" : undefined}
                    placeholder="Tu nombre completo…"
                    className={inputClass}
                    style={{ borderColor: nameError ? ERROR_COLOR : "rgba(250,250,248,0.2)" }}
                  />
                  {nameError && (
                    <p
                      id="quote-nombre-error"
                      role="alert"
                      className="mt-1.5 text-xs"
                      style={{ color: ERROR_COLOR }}
                    >
                      Ingresá tu nombre para enviar la cotización.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="quote-empresa" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                    Empresa <span style={{ color: ERROR_COLOR }}>*</span>
                  </label>
                  <input
                    id="quote-empresa"
                    ref={companyInputRef}
                    type="text"
                    name="empresa"
                    autoComplete="organization"
                    required
                    value={empresa}
                    onChange={(e) => {
                      setEmpresa(e.target.value);
                      if (companyError) setCompanyError(false);
                    }}
                    onBlur={() => setCompanyError(empresa.trim() === "")}
                    aria-invalid={companyError}
                    aria-describedby={companyError ? "quote-empresa-error" : undefined}
                    placeholder="Nombre de tu empresa…"
                    className={inputClass}
                    style={{ borderColor: companyError ? ERROR_COLOR : "rgba(250,250,248,0.2)" }}
                  />
                  {companyError && (
                    <p
                      id="quote-empresa-error"
                      role="alert"
                      className="mt-1.5 text-xs"
                      style={{ color: ERROR_COLOR }}
                    >
                      Ingresá el nombre de tu empresa para enviar la cotización.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="quote-telefono" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                    Teléfono <span className="text-offwhite/40">(opcional)</span>
                  </label>
                  <input
                    id="quote-telefono"
                    type="tel"
                    name="telefono"
                    autoComplete="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="8888-8888"
                    className={inputClass}
                    style={{ borderColor: "rgba(250,250,248,0.2)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-shine flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold font-display text-charcoal-deep shadow-[var(--shadow-cta)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-light hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.98] focus-ring-accent disabled:pointer-events-none disabled:opacity-60"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {submitting ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
