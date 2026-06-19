import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { EMAIL, WHATSAPP_NUMBER, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/constants";
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
  title: "EPP, Limpieza y Ferretería en Limón | Caribbean Tropical",
  description:
    "Distribuidora en Guácimo, Limón. Productos de limpieza, EPP, ferretería y desinfección de DeWalt, IONICS, EVACOL y más. Cotizá por WhatsApp.",
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
    description:
      "Distribuidora de productos industriales, limpieza, EPP y ferretería en el Caribe de Costa Rica.",
    locale: "es_CR",
    type: "website",
    siteName: "Caribbean Tropical Solutions S.A.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribbean Tropical Solutions S.A.",
    description:
      "Distribuidora de productos industriales, limpieza, EPP y ferretería en el Caribe de Costa Rica.",
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
              description:
                "Distribuidora de productos de mantenimiento, limpieza, desinfección, EPP, oficina y ferretería en el Caribe de Costa Rica.",
              url: "https://www.caribbeantropicalsolutions.com",
              logo: "https://www.caribbeantropicalsolutions.com/images/logo.webp",
              image: "https://www.caribbeantropicalsolutions.com/images/logo.webp",
              telephone: `+${WHATSAPP_NUMBER}`,
              email: EMAIL,
              priceRange: "$$",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
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
              areaServed: {
                "@type": "Country",
                name: "Costa Rica",
              },
              sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${WHATSAPP_NUMBER}`,
                contactType: "sales",
                availableLanguage: "Spanish",
              },
              knowsAbout: [
                "Equipo de Protección Personal",
                "Limpieza y Desinfección",
                "Fumigación y Control",
                "Ferretería Especializada",
              ],
            }),
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
