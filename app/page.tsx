import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
import ProductCategories from "@/components/sections/ProductCategories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyCaribbean from "@/components/sections/WhyCaribbean";
import HowToBuy from "@/components/sections/HowToBuy";
import Contact from "@/components/sections/Contact";

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
