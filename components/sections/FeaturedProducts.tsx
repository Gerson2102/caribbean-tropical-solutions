"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, FILTER_TABS, type FilterSlug } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

const INITIAL_COUNT = 12;

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<FilterSlug>("todos");
  const [showAll, setShowAll] = useState(false);

  const allFiltered =
    activeFilter === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const filtered = showAll || activeFilter !== "todos" ? allFiltered : allFiltered.slice(0, INITIAL_COUNT);
  const hasMore = activeFilter === "todos" && !showAll && allFiltered.length > INITIAL_COUNT;

  return (
    <section
      id="catalogo"
      className="bg-deep-green py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal selector=".fp-header" stagger={0.12}>
          {/* Header */}
          <div className="fp-header mb-10 text-center">
            <SectionLabel>Catálogo</SectionLabel>
            <h2 className="text-section mt-4 font-display font-extrabold text-offwhite">
              Productos Destacados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-offwhite/70">
              Explorá nuestra selección completa. Hacé clic en cualquier producto
              para cotizar por WhatsApp.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="fp-header mb-10 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-deep-green-light p-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => { setActiveFilter(tab.slug); setShowAll(false); }}
                  className={`relative rounded-xl px-3 py-2.5 text-sm font-medium sm:px-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-offwhite/40">
            No hay productos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border-2 border-offwhite/30 px-7 py-3 text-sm font-semibold text-offwhite transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Ver todos los productos ({allFiltered.length})
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="mt-8 text-center text-sm text-offwhite/30">
          {filtered.length}{hasMore ? ` de ${allFiltered.length}` : ""} producto{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
