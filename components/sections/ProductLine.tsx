import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_PAGES,
  PRODUCTS,
  SUBCATEGORY_ORDER,
  WHATSAPP_URL,
  groupProductsBySubcategory,
  type Category,
  type CategoryPage,
} from "@/lib/constants";
import Button from "@/components/ui/Button";
import ProductCarousel from "@/components/ui/ProductCarousel";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import { WhatsAppIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";

const SITE = "https://www.caribbeantropicalsolutions.com";

// Body of a product line page (/productos/[linea]): hero, what the line
// carries, and the CMS products once the catalog has any.
export default function ProductLine({ category, page }: { category: Category; page: CategoryPage }) {
  const quoteUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(page.quoteMessage)}`;
  const groups = groupProductsBySubcategory(
    PRODUCTS.filter((p) => p.category === category.slug),
    category.slug
  );
  const otherLines = CATEGORIES.filter((c) => c.slug !== category.slug && CATEGORY_PAGES[c.slug]);

  return (
    <>
      <section className="noise-overlay relative overflow-hidden bg-deep-green pt-32 pb-20 lg:pt-40 lg:pb-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
                { "@type": "ListItem", position: 2, name: category.name, item: `${SITE}/productos/${category.slug}` },
              ],
            }),
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-8">
          <div>
            <nav aria-label="Ruta de navegación" className="text-sm text-offwhite/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="focus-ring-accent rounded transition-colors duration-200 hover:text-accent active:opacity-80">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-offwhite">
                  {category.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-offwhite">
              {page.heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/75 md:text-lg">{page.intro}</p>
            <div className="mt-8">
              <Button href={quoteUrl} icon={<WhatsAppIcon className="h-5 w-5" />}>
                Cotizá por WhatsApp
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
            <Image
              src={category.image}
              alt={category.altText}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-8">
          <div>
            <ScrollTextReveal className="text-section font-display font-extrabold tracking-[-0.03em] text-charcoal-deep">
              Lo Que Distribuimos
            </ScrollTextReveal>
            <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-light lg:text-lg">
              Cotizamos cada pedido según el producto y la cantidad, y te asesoramos para elegir lo correcto.
            </p>
            <p className="mt-8 font-display text-sm font-bold text-charcoal-deep">Marcas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {page.brands.map((brand) => (
                <li key={brand} className="rounded-full bg-primary/10 px-4 py-1.5 font-display text-sm font-semibold text-primary-dark">
                  {brand}
                </li>
              ))}
            </ul>
            {otherLines.length > 0 && (
              <>
                <p className="mt-8 font-display text-sm font-bold text-charcoal-deep">También distribuimos</p>
                <ul className="mt-3 space-y-2">
                  {otherLines.map((line) => (
                    <li key={line.slug}>
                      <Link
                        href={`/productos/${line.slug}`}
                        className="focus-ring-accent group inline-flex items-center gap-2 rounded font-display text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-dark active:opacity-80"
                      >
                        {line.name}
                        <ArrowRightIcon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {SUBCATEGORY_ORDER[category.slug].map((type) => (
              <li
                key={type}
                className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 font-display text-base font-semibold text-charcoal-deep"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckIcon className="h-4 w-4" />
                </span>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {groups.length > 0 && (
        <section className="bg-deep-green py-20 lg:py-28">
          <div className="mx-auto max-w-7xl space-y-12 px-5 lg:px-8">
            <ScrollTextReveal className="text-section font-display font-extrabold text-offwhite">Catálogo</ScrollTextReveal>
            {groups.map((g) => (
              <ProductCarousel key={g.subcategory} title={g.subcategory} products={g.products} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
