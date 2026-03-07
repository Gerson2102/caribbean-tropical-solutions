"use client";

import { useEffect, useRef } from "react";
import { CATEGORIES } from "@/lib/constants";
import { animateSectionEntrance } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import CategoryCard from "@/components/ui/CategoryCard";

export default function ProductCategories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".category-card");
    const tl = animateSectionEntrance(sectionRef.current, cards, { stagger: 0.15 });
    return () => { tl?.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categorias"
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <SectionLabel>Lo Que Distribuimos</SectionLabel>
          <h2 className="text-section mt-4 font-display font-extrabold text-charcoal-deep">
            Nuestras Líneas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
            Cinco líneas de productos para cubrir todas las necesidades de tu empresa.
            Desde protección personal hasta cuidado y bienestar.
          </p>
        </div>

        {/* Uniform Grid: 3 top + 2 bottom */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <div key={cat.slug} className="category-card">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-4 grid max-w-[66.666%] grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 max-md:max-w-full">
          {CATEGORIES.slice(3).map((cat) => (
            <div key={cat.slug} className="category-card">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
