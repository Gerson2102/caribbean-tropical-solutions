import type { NextConfig } from "next";
import { buildProducts } from "./scripts/build-products.mjs";

// Regenerate the product catalog from content/products/*.json before every
// build/dev start, so Decap CMS edits always reach the live site even when the
// host (Vercel) runs `next build` directly and skips the npm prebuild hook.
buildProducts();

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [90, 120, 180, 220, 260],
    minimumCacheTTL: 31536000,
    // Allow "Insertar desde URL" in the CMS: optimize images from any https host.
    // Safe here because only CMS editors (with repo access) set these URLs.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async rewrites() {
    // Serve the Decap CMS admin panel at /admin
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
