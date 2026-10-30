import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import QuoteDrawer from "@/components/layout/QuoteDrawer";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import ProductLine from "@/components/sections/ProductLine";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { CATEGORIES, CATEGORY_PAGES, type CategorySlug } from "@/lib/constants";

type Props = { params: Promise<{ linea: string }> };

// Only lines with a CATEGORY_PAGES entry get a page; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CATEGORY_PAGES).map((linea) => ({ linea }));
}

function findLine(linea: string) {
  const page = CATEGORY_PAGES[linea as CategorySlug];
  const category = CATEGORIES.find((c) => c.slug === linea);
  return page && category ? { page, category } : null;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const line = findLine((await params).linea);
  if (!line) return {};
  const url = `/productos/${line.category.slug}`;
  const title = `${line.page.title} | Caribbean Tropical`;
  // A page-level openGraph replaces the root one, so carry over its shared image.
  const ogImages = (await parent).openGraph?.images;

  return {
    title: line.page.title,
    description: line.page.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: line.page.description,
      url,
      siteName: "Caribbean Tropical Solutions S.A.",
      locale: "es_CR",
      type: "website",
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title, description: line.page.description },
  };
}

export default async function ProductLinePage({ params }: Props) {
  const line = findLine((await params).linea);
  if (!line) notFound();

  return (
    <>
      <SkipLink />
      <Navbar />
      <FloatingWhatsApp />
      <QuoteDrawer />
      <main id="main-content">
        <ProductLine category={line.category} page={line.page} />
        <FAQ faqs={line.page.faqs} intro={`Lo que más nos consultan sobre ${line.category.name.toLowerCase()}.`} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
