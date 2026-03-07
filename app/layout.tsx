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
      <body className="antialiased">{children}</body>
    </html>
  );
}
