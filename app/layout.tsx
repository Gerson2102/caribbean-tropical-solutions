import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { EMAIL, WHATSAPP_NUMBER, INSTAGRAM_URL, FACEBOOK_URL, CATEGORIES, BUSINESS_SENTENCE } from "@/lib/constants";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.caribbeantropicalsolutions.com"),
  title: {
    default: "EPP, Limpieza y Ferretería en Limón | Caribbean Tropical",
    template: "%s | Caribbean Tropical",
  },
  description: `${BUSINESS_SENTENCE} Cotizá por WhatsApp.`,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Caribbean Tropical Solutions S.A.",
    description: BUSINESS_SENTENCE,
    locale: "es_CR",
    type: "website",
    siteName: "Caribbean Tropical Solutions S.A.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Tropical Solutions S.A.",
    description: BUSINESS_SENTENCE,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${dmSans.variable}`} style={{ colorScheme: "dark" }}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Caribbean Tropical Solutions S.A.",
              alternateName: "Caribbean Tropical Solutions",
              description: `${BUSINESS_SENTENCE} Envíos a todo Costa Rica y retiro en el local.`,
              url: "https://www.caribbeantropicalsolutions.com",
              logo: "https://www.caribbeantropicalsolutions.com/images/logo.webp",
              image: "https://www.caribbeantropicalsolutions.com/images/logo.webp",
              telephone: `+${WHATSAPP_NUMBER}`,
              email: EMAIL,
              priceRange: "$$",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
              // Matches OPENING_HOURS in lib/constants.ts.
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "17:00",
              },
              hasMap: "https://www.google.com/maps?q=10.2167,-83.6833",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Luis de Guácimo",
                addressRegion: "Limón",
                addressCountry: "CR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 10.2167,
                longitude: -83.6833,
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Limón" },
                { "@type": "Country", name: "Costa Rica" },
              ],
              sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${WHATSAPP_NUMBER}`,
                contactType: "sales",
                availableLanguage: "Spanish",
              },
              knowsAbout: [
                "Equipo de Protección Personal (EPP)",
                "Calzado de seguridad",
                "Ropa de trabajo",
                "Productos de limpieza industrial",
                "Limpieza y Desinfección",
                "Fumigación y Control",
                "Herramientas de mantenimiento",
                "Ferretería Especializada",
                "Suministros de oficina",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Líneas de productos",
                itemListElement: CATEGORIES.map((c) => ({
                  "@type": "OfferCatalog",
                  name: c.name,
                  description: c.subtitle,
                })),
              },
              // Some values come from the CMS: escape "<" so none can close the <script> tag.
            }).replace(/</g, "\\u003c"),
          }}
        />
        <noscript>
          <style>{`.hero-badge,.hero-title-word,.hero-subtitle,.hero-cta,.hero-bg,.hero-float-back,.hero-float-mid,.hero-float-front,.contact-animate,.category-card,.value-card,.fp-header{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
