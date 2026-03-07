import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [90, 120, 180, 220, 260],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
