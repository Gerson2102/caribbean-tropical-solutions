# CLAUDE.md — Caribbean Tropical Solutions

Single-page Next.js marketing site for a Costa Rican industrial distributor (Guácimo, Limón). Built and live — careful edits, not redesigns.

## Stack
- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict
- Tailwind CSS v4 via PostCSS (tokens in `app/globals.css` `@theme inline`, no CDN)
- GSAP 3 (ScrollTrigger) + Framer Motion 12 + Lenis smooth scroll
- Fonts: Sora (display) + DM Sans (body) via `next/font/google`

## Commands
Package manager: **pnpm** (pinned via `packageManager` field in `package.json`, run through Corepack — no global install needed).
- `pnpm install` — install/sync dependencies from `pnpm-lock.yaml`
- `pnpm dev` — local at http://localhost:3000
- `pnpm build` — production build (**must pass 9/9 pages** before claiming done)
- `pnpm lint` — ESLint (must be 0 errors, 0 warnings)

Postinstall scripts are gated for security. Only packages listed under `allowBuilds:` in `pnpm-workspace.yaml` (currently `sharp`, `unrs-resolver`) are allowed to run lifecycle scripts. If a new dependency needs one, vet it first, then run `pnpm approve-builds <pkg>`.

## File Layout
- `app/` — routes, metadata (`layout.tsx`), error boundaries, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- `app/globals.css` — design tokens, custom utilities (`.focus-ring-accent`, `.btn-shine`), keyframes
- `components/{layout,sections,ui}/` — follow existing file patterns
- `lib/constants.ts` — single source of truth for products, categories, brands, NAP/contact
- `lib/animations.ts` — `prefersReducedMotion()` + side-effect registers GSAP ScrollTrigger
- `public/images/` — logo + section/category images
- `public/product_images/` — catalog images by brand (index at `products_manifest.json`)

## Design System — use the tokens, never invent hex codes
- `bg-primary` `#3d7a3d` (green) · `bg-accent` `#e8a817` (gold) · `bg-deep-green` `#0f1f0f`
- `text-offwhite` `#fafaf8` · `text-charcoal` / `-light` / `-deep`
- Shadows: `var(--shadow-card)`, `var(--shadow-cta)`, `var(--shadow-cta-hover)`
- Focus states: **always** use the `focus-ring-accent` class — never re-paste the 5-class snippet inline

## Code Patterns (codified from past cleanup — don't regress)
- **Media queries:** `useSyncExternalStore` (see `Hero.tsx` `subscribeMobile`), never `useState + useEffect`
- **RAF loops:** never read `scrollWidth`/`offsetWidth` inside the frame — cache via `ResizeObserver` (see `BrandMarquee.tsx`)
- **Animation values:** Framer Motion `useMotionValue`/`useSpring` (no React re-render) or refs — not `useState`
- **`prefers-reduced-motion`:** always check via `prefersReducedMotion()` before starting animations
- **Global listeners:** attach only when needed (e.g. mousemove only while hovered) and pass `{ passive: true }` for scroll/touch/mousemove
- **RSC boundary:** sections are `"use client"`; `app/page.tsx` and `layout.tsx` stay Server Components. JSON-LD uses inline `<script type="application/ld+json">` (not `next/script`).

## SEO Constraints
- Title ≤ 60 chars · description ≤ 155 chars (`app/layout.tsx`)
- JSON-LD `@type: "Store"` with `priceRange`, `paymentAccepted`, `hasMap`, E.164 phone
- Sitemap uses static `LAST_UPDATED` constant — bump on real content changes, never `new Date()`
- Image `alt` text: include brand + product type when applicable

## Anti-Generic Design Rules
- **Colors:** never default Tailwind palette (no indigo/blue/etc.) — use brand tokens
- **Shadows:** layered, color-tinted, low-opacity — never flat `shadow-md`
- **Typography:** display + body must be different fonts; tight tracking on large headings, generous line-height on body
- **Animations:** only `transform` and `opacity`. Never `transition-all`. Spring easing.
- **Interactive states:** every clickable element needs hover + `focus-visible` + active. Use `focus-ring-accent`.
- **Depth:** surfaces layer (base → elevated → floating); don't flatten to one z-plane

## Hard Rules
- Bug fix = minimal change. Don't refactor neighbors.
- Don't introduce dead exports or unused imports — lint will catch
- Don't invent business facts (hours, payment methods, prices) in JSON-LD or copy — confirm first
- Don't claim "done" without `npm run build` passing
- Don't break visual fidelity for code-cleanliness wins without flagging the trade-off
- For risky operations (deletions, destructive git commands, schema changes) — confirm before acting

## Screenshot Workflow (UI iteration)
- `screenshot.mjs` lives in project root: `node screenshot.mjs http://localhost:3000 [label]`
- Saves to `./temporary screenshots/screenshot-N[-label].png` (auto-incremented, never overwritten)
- Read the PNG with the Read tool to compare against reference
- Critique specifically: "heading 32px vs reference 24px", "card gap 16px should be 24px"

## Product Images
`public/product_images/` organized by brand:
- `ionics/` — cleaning/disinfection · `limpieza/` — cleaning supplies
- `portwest/` — PPE/workwear · `salud_ocupacional/` — occupational health

Index at `public/products_manifest.json` (filename, path, source PDF page, width, height, size_kb, format).
Reference path in code: `/product_images/ionics/ionics_p03_img04.webp`

## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
