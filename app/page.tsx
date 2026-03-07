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
      <ScrollProgress />
      <Navbar />
      <FloatingWhatsApp />
      <main>
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
