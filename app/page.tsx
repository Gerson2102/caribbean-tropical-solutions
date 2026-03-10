import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Footer from "@/components/layout/Footer";

// Above fold — static
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";

// Below fold — code-split
const ProductCategories = dynamic(() => import("@/components/sections/ProductCategories"));
const FeaturedProducts = dynamic(() => import("@/components/sections/FeaturedProducts"));
const WhyCaribbean = dynamic(() => import("@/components/sections/WhyCaribbean"));
const HowToBuy = dynamic(() => import("@/components/sections/HowToBuy"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-charcoal-deep focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-deep-green"
      >
        Ir al contenido
      </a>
      <ScrollProgress />
      <Navbar />
      <FloatingWhatsApp />
      <main id="main-content">
        <Hero />
        <BrandMarquee />
        <ProductCategories />
        <FeaturedProducts />
        <WhyCaribbean />
        <HowToBuy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
