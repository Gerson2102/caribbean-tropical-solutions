import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import QuoteDrawer from "@/components/layout/QuoteDrawer";
import Footer from "@/components/layout/Footer";

// Above fold — static
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";

// Below fold — code-split
const ProductCategories = dynamic(() => import("@/components/sections/ProductCategories"));
const FeaturedProducts = dynamic(() => import("@/components/sections/FeaturedProducts"));
const WhyCaribbean = dynamic(() => import("@/components/sections/WhyCaribbean"));
const Founder = dynamic(() => import("@/components/sections/Founder"));
const HowToBuy = dynamic(() => import("@/components/sections/HowToBuy"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-charcoal-deep focus-visible:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
      >
        Ir al contenido
      </a>
      <ScrollProgress />
      <Navbar />
      <FloatingWhatsApp />
      <QuoteDrawer />
      <main id="main-content">
        <Hero />
        <BrandMarquee />
        <ProductCategories />
        <FeaturedProducts />
        <WhyCaribbean />
        <Founder />
        <HowToBuy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
