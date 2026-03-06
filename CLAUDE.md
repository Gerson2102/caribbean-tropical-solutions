# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read `design-system/PREMIUM-QUALITY-CHECKLIST.md`** before designing any section. This is the quality baseline — it defines the exact spacing values, animation curves, opacity scales, card recipes, and micro-interactions that make a site feel premium. Adapt colors, fonts, and brand to the current project (see `design-system/brand.md`), but maintain the same structural quality patterns.
- **Read `design-system/brand.md`** to load this project's specific accent color, fonts, background shades, and any brand-specific overrides.

## Design System Files
- `design-system/PREMIUM-QUALITY-CHECKLIST.md` — Condensed quality patterns, copy-paste recipes, animation values, micro-interaction checklist. Reference this constantly.
- `design-system/brand.md` — Project-specific: accent color, fonts, background shades, logo, any overrides.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch using the quality checklist as your foundation. Every section must pass the Quality Gate at the bottom of the checklist.
- Screenshot your output using playwright-tester, compare against reference, fix mismatches, re-test. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server for the project (e.g., `npm run dev` or the framework's default dev command).
- Ensure the server is running before any visual testing.
- If the server is already running, do not start a second instance.

## Visual Testing & Screenshot Workflow
- Use the **playwright-tester** agent for all visual QA, screenshots, and responsive testing.
- **After building each section**, launch playwright-tester against localhost to:
  1. Take full-page screenshots at key viewports (Mobile 390×844, Tablet 768×1024, Desktop 1920×1080 at minimum)
  2. Compare output against reference images (if provided) or the Quality Gate checklist
  3. Document any mismatches with specific measurements
- **When comparing, be specific:** "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- **Check:** spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- Do at least 2 visual comparison rounds per section. Fix issues, re-test, repeat.
- **Before final delivery**, run playwright-tester in Comprehensive mode to test all viewports, accessibility (WCAG 2.1 AA), component states (hover/focus/active), and console errors.

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails (with proven values)
- **Colors:** Never use default Tailwind palette. Use the accent color from `brand.md` and derive all variants using the opacity scale in the checklist (30%, 15%, 8% for borders/glows/fills).
- **Shadows:** Never use flat `shadow-md`. Use the dual-layer pattern: glow layer `0 0 40px rgba(accent,0.15)` + depth layer `0 8px 30px rgba(0,0,0,0.3)`.
- **Typography:** Never use the same font for headings and body. Use the font pair from `brand.md`. Apply `leading-tight` on headings, `leading-relaxed` (1.625) on body. Wide `tracking-[0.2em]` on labels/badges.
- **Gradients:** Layer multiple radial gradients. ALWAYS add SVG fractal noise at `opacity: 0.02–0.03` — pure gradients look cheap without it.
- **Animations:** Only animate `transform` and `opacity`. Use `[0.4, 0, 0.2, 1]` as the ONE standard easing curve. Stagger at 0.08–0.15s per item. Never `transition-all`.
- **Interactive states:** Every clickable element needs hover + focus-visible + active states. Cards: translate-y + green border + glow. Buttons: scale 1.02 hover, 0.98 active.
- **Images:** Desaturate to 0.85 by default, saturate(1) + scale 1.04 on hover. Add gradient overlays on hero/feature images.
- **Spacing:** Sections: `py-20 lg:py-32` minimum. Cards: `p-6 sm:p-8`. Container: `px-6 lg:px-8`. Premium design BREATHES.
- **Depth:** Three background shades (deepest/dark/mid). Alternating section backgrounds. Card bg at 0.03 opacity. Navbar glass-morphism on scroll.
- **Text hierarchy:** ONLY white at varying opacities (100%, 80%, 60%, 50%, 40%, 30%). Never use gray hex values.

## Quality Gate (run before every delivery)
Before delivering any section or page, verify against the 10-point Quality Gate in `PREMIUM-QUALITY-CHECKLIST.md`:
1. Card hover states (glow + translate + border)
2. Staggered entrances (not simultaneous)
3. Noise texture on gradients
4. Navbar glass-morphism
5. Image desaturation pattern
6. Generous spacing
7. Opacity-based text hierarchy
8. Button triple-state (hover + focus + active)
9. `prefers-reduced-motion` respected
10. Edge-fade on scrollable areas

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one playwright-tester pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not skip micro-interactions — every card needs a glow hover, every section needs staggered reveals
- Do not use gray hex values for text — use white at opacity
- Do not ship gradients without noise texture overlay