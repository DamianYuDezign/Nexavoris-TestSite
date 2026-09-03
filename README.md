# Nexavoris website — Vercel-viable copy

**A standard Next.js app, kept deliberately separate from `07 Website\`.**

## Why two copies exist

`07 Website\nexavoris-website\` is built and hosted through **OpenAI's Sites
product**: it uses `vinext` (a beta Vite-based framework), OpenAI's own
`@openai/sites-vite-plugin`, and deploys as a **Cloudflare Worker** via
`wrangler`, with D1/R2 bindings wired in. That stack has no `next` package at
all — `next build` cannot run against it, and Vercel's framework
auto-detection would not recognize it. Full findings in the chat that produced
this folder, 2026-09-03.

**This folder is a from-scratch port to plain Next.js** — same pages, same
components, same look, same content — with the OpenAI/Cloudflare-specific
tooling removed and `next`, real Tailwind v4 PostCSS config, and a standard
`tsconfig.json` in their place. It builds with `next build` and deploys on
Vercel with zero special configuration.

**Do not merge these two folders, and do not point this folder's git remote at
`theyukongroup/nexavoris-website`.** They are two separate GitHub repos on
purpose, so a push to one can never silently affect the other.

| | `07 Website\nexavoris-website\` | `08 Website (Vercel)\` (here) |
|---|---|---|
| Framework | `vinext` (beta) via Vite | Next.js |
| Deploy target | Cloudflare Workers, via OpenAI Sites | Vercel |
| GitHub repo | `theyukongroup/nexavoris-website` | *(new repo — see below)* |
| Edit via | OpenAI Codex / Sites | Any normal Next.js workflow |

## What was verified before porting (2026-09-03)

- No page or component reads `process.env`, and none touches the Cloudflare
  D1/R2 bindings the original config wires in — the contact form is
  client-side only (`useState`, no `fetch`/API call). Nothing functional was
  lost in the port.
- Every runtime package the pages actually import (`@base-ui/react`,
  `@shadcn/react`, `lucide-react`, `recharts`, etc.) is a real, independently
  published npm package — none of it is OpenAI- or Cloudflare-specific.
- All content files (`app/`, `components/`, `hooks/`, `lib/`, `public/`,
  `components.json`) were copied byte-for-byte from the **outer** `07 Website\`
  copy, which is the more complete of the two existing copies there (it has
  the Pricing page the nested one lacks).

## Local development

```
npm install
npm run dev
```

**Note on Turbopack:** `dev`/`build` are pinned to `--webpack`. This project
lives on a mapped network drive (`K:\` → `\\UFS-FILE-SERVER\public folder\...`),
and Turbopack's path-containment check gets confused by the two different
Windows path forms for the same UNC location, failing with `Cannot depend on
path ... outside of root directory` even though nothing actually is. Webpack
doesn't have this problem. This is purely a local-machine/network-drive quirk —
**Vercel builds from a normal local path and is unaffected**; Turbopack would
work fine there. If this folder is ever moved to local disk, feel free to drop
`--webpack` and use Turbopack's faster builds instead.

## Deploying

Push to the GitHub repo, then in Vercel: **Add New → Project → Import** that
repo. No framework preset override needed — Vercel detects Next.js
automatically from `next` in `package.json`.

## Content changes going forward

If a page is edited in the OpenAI-hosted copy (`07 Website\`), the same change
needs to be **manually re-applied here** — there is no automatic sync between
the two. If that becomes painful, the honest fix is to pick one as the single
source of truth and stop maintaining both.

## Sync state (2026-09-03)

Content is synced through origin commit **`efef4a6` "Update equipment product
links"** — the editorial redesign (Manrope/Newsreader fonts, paper/green/
terracotta theme, product galleries, /website-design, restored /pricing) plus
the /equipment hardware page and the reduced AI/ERP/support pricing.

## Deliberate divergences from the origin

Fixes and additions that exist only in this copy — re-apply them after any
future re-sync from `07 Website\nexavoris-website`:

1. **Pricing CSS collision fix** — `extended.css`, `pricing.css`, and
   `theme-v2.css` all define `.pricing-grid`/`.price`/`.popular` globally, so
   `/pricing` and `/website-design` corrupt each other (e.g. extended.css makes
   `/pricing`'s `article.popular` position:absolute). Fixed by scoping the
   website-design rules under `.pricing` and the services-pricing rules under
   `.pricing-group` (see `scope_css.py` history in the work log). The origin
   still has this bug.
2. **`app/fixes.css` + `components/mobile-nav.tsx`** — mobile menu (origin
   hides the nav below 1000px with no fallback at all), `:focus-visible`
   outlines, `prefers-reduced-motion` guard, and a fix for the orphaned empty
   cells in the 7-item solution feature grid. Wired into `layout.tsx`.
3. **Transparent logo + real favicons** — `nexavoris-logo.png` had a baked
   white background that clashed with the paper header; it is now transparent.
   `favicon.png` / `favicon.ico` / `apple-touch-icon.png` are cropped from the
   hexagon mark (the origin's `favicon.svg` is a generic placeholder and is no
   longer referenced).
4. **SEO/AEO** — per-page canonical URLs, Organization + WebSite JSON-LD in
   `layout.tsx`, and `public/llms.txt`. `robots.ts`/`sitemap.ts` come from the
   origin and were kept as-is. The share image `/og.png` is the origin's.
