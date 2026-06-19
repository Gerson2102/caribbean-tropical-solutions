// Aggregates content/products/*.json (managed by Decap CMS) into a single
// lib/products.generated.json that lib/constants.ts imports.
// Called from next.config.ts so it runs on EVERY build/dev start — including
// Vercel's `next build` — guaranteeing CMS edits always reach the live site.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export function buildProducts() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const srcDir = join(root, "content", "products");
  const outFile = join(root, "lib", "products.generated.json");

  const products = readdirSync(srcDir)
    .filter((f) => f.endsWith(".json"))
    // `id` is the filename without extension — keeps ids stable for the quote cart.
    .map((file) => ({ id: file.replace(/\.json$/, ""), ...JSON.parse(readFileSync(join(srcDir, file), "utf8")) }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.name.localeCompare(b.name));

  writeFileSync(outFile, JSON.stringify(products, null, 2) + "\n");
  return products.length;
}

// Allow running directly: `node scripts/build-products.mjs`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(`Built ${buildProducts()} products -> lib/products.generated.json`);
}
