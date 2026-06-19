// Converts client-uploaded images in public/images/uploads/ into resized WebP
// and rewrites their references in content/**/*.json. Idempotent: re-running
// does nothing once everything is optimized. Run by the GitHub Action on push,
// or manually via `pnpm optimize:images`.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const uploadsDir = join(root, "public", "images", "uploads");
const contentDir = join(root, "content");

const MAX_WIDTH = 1600; // next.config deviceSizes max is 1536 — small buffer above it
const QUALITY = 80;
const RASTER = new Set([".jpg", ".jpeg", ".png"]);

function listFiles(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name !== ".gitkeep")
      .map((d) => d.name);
  } catch {
    return [];
  }
}

function listJson(dir) {
  const out = [];
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) out.push(...listJson(p));
    else if (d.name.endsWith(".json")) out.push(p);
  }
  return out;
}

const toWebp = (input) =>
  sharp(input)
    .rotate() // honor EXIF orientation, then strip metadata (default)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

async function run() {
  const renames = []; // { from: "/images/uploads/x.jpg", to: "/images/uploads/x.webp" }

  for (const file of listFiles(uploadsDir)) {
    const ext = extname(file).toLowerCase();
    const abs = join(uploadsDir, file);

    if (RASTER.has(ext)) {
      const webpName = `${basename(file, ext)}.webp`;
      writeFileSync(join(uploadsDir, webpName), await toWebp(abs));
      rmSync(abs);
      renames.push({ from: `/images/uploads/${file}`, to: `/images/uploads/${webpName}` });
      console.log(`Converted ${file} -> ${webpName}`);
    } else if (ext === ".webp") {
      // Already WebP: only re-encode if it's wider than the cap (keeps idempotency).
      const { width = 0 } = await sharp(abs).metadata();
      if (width > MAX_WIDTH) {
        writeFileSync(abs, await toWebp(abs));
        console.log(`Resized ${file} (was ${width}px wide)`);
      }
    }
  }

  if (renames.length) {
    for (const jsonPath of listJson(contentDir)) {
      let text = readFileSync(jsonPath, "utf8");
      let changed = false;
      for (const { from, to } of renames) {
        const quoted = `"${from}"`;
        if (text.includes(quoted)) {
          text = text.split(quoted).join(`"${to}"`);
          changed = true;
        }
      }
      if (changed) writeFileSync(jsonPath, text);
    }
  }

  console.log(renames.length ? `Optimized ${renames.length} image(s).` : "No images to optimize.");
}

run();
