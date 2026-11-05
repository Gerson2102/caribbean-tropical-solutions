"use client";

import { useState, startTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PRODUCTS,
  CATEGORIES,
  FILTER_TABS,
  groupProductsBySubcategory,
  type FilterSlug,
  type CategorySlug,
} from "@/lib/constants";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<FilterSlug>("todos");

  const carouselGroups = useMemo(() => {
    if (activeFilter === "todos") {
      return CATEGORIES
        .map((cat) => ({
          key: cat.slug,
          title: cat.name,
          products: PRODUCTS.filter((p) => p.category === cat.slug),
        }))
        .filter((g) => g.products.length > 0);
    }

    const filtered = PRODUCTS.filter((p) => p.category === activeFilter);
    const groups = groupProductsBySubcategory(filtered, activeFilter as CategorySlug);
    return groups.map((g) => ({
      key: g.subcategory,
      title: g.subcategory,
      products: g.products,
    }));
  }, [activeFilter]);

  const totalCount = carouselGroups.reduce((sum, g) => sum + g.products.length, 0);
  const isEmpty = totalCount === 0;
  // Tabs + intro hide only when there's nothing at all; an empty category keeps them so users can switch back.
  const catalogEmpty = PRODUCTS.length === 0;

  return (
    <section
      id="catalogo"
      className="overflow-x-clip bg-deep-green py-14 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal selector=".fp-header" stagger={0.12}>
          {/* Header */}
          <div className="fp-header mb-10 text-center">
            <ScrollTextReveal className="text-section font-display font-extrabold text-offwhite">
              Productos Destacados
            </ScrollTextReveal>
            {!catalogEmpty && (
              <p className="mx-auto mt-4 max-w-2xl text-offwhite/70">
                Explorá nuestra selección completa. Agregá los productos que te
                interesen a tu cotización y te pasamos los precios por WhatsApp.
              </p>
            )}
          </div>

          {/* Filter Tabs */}
          {/* Phones: one swipeable row edge to edge instead of a wrapped 2-row block */}
          <div className={`fp-header carousel-scroll -mx-5 mb-10 flex overflow-x-auto px-5 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 ${catalogEmpty ? "hidden" : ""}`}>
            <div className="flex shrink-0 gap-1 rounded-2xl bg-deep-green-light p-1.5 sm:shrink sm:flex-wrap sm:justify-center sm:gap-2 sm:p-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => {
                    startTransition(() => {
                      setActiveFilter(tab.slug);
                    });
                  }}
                  aria-current={activeFilter === tab.slug ? "true" : undefined}
                  className={`relative whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium sm:px-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    activeFilter === tab.slug
                      ? "text-charcoal-deep"
                      : "text-offwhite/50 hover:text-offwhite/80"
                  }`}
                >
                  {activeFilter === tab.slug && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Groups */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-12"
          >
            {isEmpty ? (
              <div className="rounded-2xl border border-offwhite/10 bg-deep-green-light/40 px-6 py-10 text-center md:px-8 md:py-16">
                <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Próximamente
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-offwhite md:text-2xl">
                  Catálogo en preparación
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-offwhite/60">
                  {PRODUCTS.length === 0
                    ? "Estamos renovando nuestro catálogo con nuevos productos. Contactanos por WhatsApp y con gusto te cotizamos lo que necesités."
                    : "Estamos curando la selección de productos para esta línea. Contactanos por WhatsApp si necesitás algo específico."}
                </p>
              </div>
            ) : (
              carouselGroups.map((group) => (
                <ProductCarousel
                  key={group.key}
                  title={group.title}
                  products={group.products}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Results count */}
        {!isEmpty && (
          <p className="mt-8 text-center text-sm text-offwhite/30">
            {totalCount} producto{totalCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </section>
  );
}
