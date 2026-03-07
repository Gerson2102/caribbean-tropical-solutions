import { CATEGORIES } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import CategoryCard from "@/components/ui/CategoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProductCategories() {
  return (
    <section
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

        {/* Uniform Grid: 3 top + 2 bottom (6-col) */}
        <ScrollReveal selector=".category-card" stagger={0.15}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.slug} className={`category-card ${i < 3 ? "md:col-span-2" : "md:col-span-3"}`}>
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
