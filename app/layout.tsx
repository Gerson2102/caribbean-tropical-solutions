import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caribbean Tropical Solutions S.A. | Distribuidora en Guácimo, Costa Rica",
  description:
    "Distribuidora de productos de mantenimiento, limpieza, desinfección, EPP, oficina y ferretería en el Caribe de Costa Rica. DeWalt, Elmerc, EVACOL, Try Me, Senior+Plus, IONICS y más.",
  openGraph: {
    title: "Caribbean Tropical Solutions S.A.",
    description:
      "Distribuidora de productos industriales, limpieza, EPP y ferretería en el Caribe de Costa Rica.",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://wa.me" />
      </head>
      <body className="antialiased">
        <noscript>
          <style>{`.hero-badge,.hero-title-word,.hero-subtitle,.hero-cta,.hero-scroll,.hero-bg,.hero-float-back,.hero-float-mid,.hero-float-front,.contact-animate,.category-card,.value-card,.step-item,.fp-header{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
