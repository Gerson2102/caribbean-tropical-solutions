import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Caribbean Tropical Solutions S.A.",
    short_name: "CTS",
    description:
      "Distribuidora de productos industriales, limpieza, EPP y ferretería en el Caribe de Costa Rica.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1f0f",
    theme_color: "#0f1f0f",
    lang: "es",
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
