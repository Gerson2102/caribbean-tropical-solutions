# Caribbean Tropical Solutions

Single-page Next.js marketing site for a Costa Rican industrial distributor (Guácimo, Limón).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3 · Framer Motion 12 · Lenis

## Getting Started

This project uses **pnpm** for dependency management. The pnpm version is pinned via the `packageManager` field in `package.json`, so [Corepack](https://nodejs.org/api/corepack.html) (bundled with Node 20+) will use the correct version automatically — no global install required.

```bash
corepack enable      # one-time, activates Corepack for this Node install
pnpm install         # install dependencies
pnpm dev             # http://localhost:3000
pnpm build           # production build (must produce 9/9 pages)
pnpm lint            # ESLint (must report 0 errors, 0 warnings)
```

Open [http://localhost:3000](http://localhost:3000) to see the result. The page auto-reloads on edits to `app/page.tsx`.

### Why pnpm

- **Isolated `node_modules`** — code can only import what `package.json` declares, eliminating phantom dependencies.
- **Postinstall script gating** — third-party install scripts are blocked by default; only packages listed under `allowBuilds:` in `pnpm-workspace.yaml` (currently `sharp`, `unrs-resolver`) are permitted to run, closing a common supply-chain vector.
- **Content-addressable store** — disk-efficient and reproducible across machines.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
