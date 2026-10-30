import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import QuoteDrawer from "@/components/layout/QuoteDrawer";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";

// Above fold — static
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";

// Below fold — code-split
const ProductCategories = dynamic(() => import("@/components/sections/ProductCategories"));
const FeaturedProducts = dynamic(() => import("@/components/sections/FeaturedProducts"));
const WhyCaribbean = dynamic(() => import("@/components/sections/WhyCaribbean"));
const HowToBuy = dynamic(() => import("@/components/sections/HowToBuy"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <SkipLink />
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
        <HowToBuy />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
