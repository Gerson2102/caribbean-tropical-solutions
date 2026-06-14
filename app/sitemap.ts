import type { MetadataRoute } from "next";

// Bump this when site content changes substantively. A static value avoids
// emitting a fresh `lastmod` on every crawl, which trains Google to ignore the field.
const LAST_UPDATED = "2026-05-02";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.caribbeantropicalsolutions.com",
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
