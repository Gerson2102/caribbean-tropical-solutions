import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
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
  metadataBase: new URL("https://caribbeantropical.cr"),
  title: "Caribbean Tropical Solutions S.A. | Distribuidora en Guácimo, Costa Rica",
  description:
    "Distribuidora de productos de mantenimiento, limpieza, desinfección, EPP, oficina y ferretería en el Caribe de Costa Rica. DeWalt, Elmerc, EVACOL, Try Me, Senior+Plus, IONICS y más.",
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
              "@type": "LocalBusiness",
              name: "Caribbean Tropical Solutions S.A.",
              description:
                "Distribuidora de productos de mantenimiento, limpieza, desinfección, EPP, oficina y ferretería en el Caribe de Costa Rica.",
              url: "https://caribbeantropical.cr",
              logo: "https://caribbeantropical.cr/images/logo.webp",
              image: "https://caribbeantropical.cr/images/logo.webp",
              telephone: "+506-7103-5467",
              email: "ventas@3dcaribbean.com",
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
              sameAs: [
                "https://www.instagram.com/caribbean_troprical_solutions/",
                "https://www.facebook.com/people/Caribbean-Tropical-Solutions-SA/61561018101440/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+506-7103-5467",
                contactType: "sales",
                availableLanguage: "Spanish",
              },
              knowsAbout: [
                "Equipo de Protección Personal",
                "Limpieza y Desinfección",
                "Fumigación y Control",
                "Ferretería Especializada",
                "Cuidado Personal y Bienestar",
              ],
            }),
          }}
        />
        <noscript>
          <style>{`.hero-badge,.hero-title-word,.hero-subtitle,.hero-cta,.hero-scroll,.hero-bg,.hero-float-back,.hero-float-mid,.hero-float-front,.contact-animate,.category-card,.value-card,.step-item,.fp-header{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
