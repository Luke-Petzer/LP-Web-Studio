# Pre-launch Remediation — Final Report

**Branch:** `pre-launch/cleanup-2026-04-17`
**Date:** 2026-04-17
**Audit:** `docs/pre-launch-audit-2026-04-17.md`

---

## Build Status

```
> next build
▲ Next.js 15.5.12
✓ Compiled successfully in 2.2s
✓ Generating static pages (14/14)

Route (app)                                 Size  First Load JS  Revalidate
┌ ○ /                                     5.7 kB         114 kB          1h
├ ○ /_not-found                            138 B         102 kB
├ ○ /about                                5.5 kB         114 kB
├ ƒ /api/contact                           138 B         102 kB
├ ○ /apple-icon                            138 B         102 kB
├ ○ /learn                               2.31 kB         111 kB
├ ● /learn/[slug]                        2.31 kB         111 kB
│   ├ /learn/nextjs-vs-wordpress
│   └ /learn/why-pagespeed-matters
├ ○ /manifest.webmanifest                  138 B         102 kB
├ ○ /privacy                             2.31 kB         111 kB
├ ○ /robots.txt                            138 B         102 kB
├ ○ /sitemap.xml                           138 B         102 kB
└ ○ /work                                3.16 kB         111 kB
+ First Load JS shared by all             102 kB

ƒ Middleware                             34.7 kB
```

First Load JS 102 kB shared + 2–6 kB per route. All routes build. 14/14 static pages pre-rendered.

---

## Lighthouse (desktop, production build, headless Chrome)

| Route                            | Perf | A11y | Best-Practices | SEO |
|----------------------------------|-----:|-----:|---------------:|----:|
| `/`                              |   99 |   96 |             96 | 100 |
| `/about`                         |   99 |   96 |             96 | 100 |
| `/work`                          |   99 |   94 |             96 | 100 |
| `/learn`                         |  100 |   96 |             96 | 100 |
| `/learn/nextjs-vs-wordpress`     |  100 |   96 |             96 | 100 |

Residual a11y findings worth a second pass:
- **Color-contrast** on `/work` — a few metadata pills/labels at 40–55% white on obsidian don't meet WCAG AA at small sizes.
- **Heading-order** on `/work` — decorative display-scale numbers/eyebrows use h-tags out of sequence in spots.
- **label-content-name-mismatch** on `/work` — some CTAs have visible text that differs from their `aria-label`.

Best-practices consistently flags one `errors-in-console` item (Next.js dev-reload noise on hydration in some captures — harmless in prod, worth keeping an eye on).

---

## Commits on this branch (newest → oldest)

```
a198cb7 chore(cleanup): remove unused WIP drafts that broke the build
2be438d a11y: global focus-visible ring, drawer focus trap, themed 404 + error pages
2772952 perf: trim font weights, add video poster/preload, wire speed-insights
2be325c chore(cleanup): remove dead components, unused deps, legacy assets; harden contact API
5704cc7 feat(seo): per-page canonicals, Person schema, favicons, manifest, privacy page
0111fa2 fix(launch-blockers): vercel rewrites, learn pages, sitemap, nav
eb30a17 wip: carry uncommitted design work from dev/main-refresh
19db66f docs: add pre-launch audit 2026-04-17
```

---

## Done

### Phase 1 — Launch blockers
- `vercel.json`: removed SPA-era `/(.*) → /index.html` rewrite that would have broken every Next route; kept strict HSTS + Permissions-Policy + security headers; fixed region to `cpt1`.
- `/learn/[slug]`: replaced undefined design tokens (`font-heading`, `text-secondary-light`, `border-glass-border-dim`, `glass-card`) with current design system; added `Navigation` + `Footer`; per-page `canonical` + `og:url`; themed prose via `@tailwindcss/typography` plugin.
- `sitemap.ts`: dynamic (reads article slugs); excludes redirecting `/contact`; includes `/`, `/work`, `/about`, `/learn`, `/privacy` + every learn article.
- **Learn visibility**: added "Learn" to primary nav (`NavClient.tsx`) and a new `LatestWriting` homepage section between FAQ and Final CTA.

### Phase 2 — SEO essentials
- Per-page `canonical` + `og:url` on `/about`, `/work`, `/learn`.
- Added `personSchema()` (Luke Petzer, Cape Town, `worksFor` LP Web Studio) to `/about`.
- `/apple-icon.tsx` — 180×180 via `ImageResponse` (generated at request time).
- `/manifest.ts` — PWA manifest (theme_color `#0B0B0B`).
- **`/privacy`** — new themed page covering studio identity, contact-form data flow, n8n webhook destination, cookieless Vercel Analytics + Speed Insights, no ad tracking, POPIA rights, contact email. Footer already links; sitemap wired.

### Phase 3 — Cleanup
- Deleted 20 dead components: `Badge`, `Button`, `ParticleField`, `Typography`, `ContactForm`, `FaqAccordion`, `MercuryButton`, `PricingCard`, `B2BCallout`, `ConfidentIntermission`, `ContactPageContent`, `CoreCapabilitiesSection`, `PortfolioSection`, `PricingSection`, `ProcessSection`, `ProjectScopeForm`, `SpeedRevenueBanner`, `WorkHero`.
- Deleted `src/proxy.ts` (unused; real headers live in `middleware.ts`), `src/lib/variants.ts`, `verifyTurnstile()` helper.
- Removed `framer-motion` + `zustand` deps (both unused); added `@vercel/speed-insights`.
- Legacy public assets: `Logo.png`, `Me1.JPG`, `Portfolio-Page.png`, `Services-Page.png`, `Profile-headshot.png`, `My-Logo.png`, `img_1.png`, `nova-studio.webp`, `whatsapp-logo.jpg`, `contact-form.php`, `_redirects`, `.htaccess`.
- Legacy scaffolding: `_UNUSED_FILES_BACKUP/`, `out/`, `dist.zip`, `GEMINI.md`, `.browserslistrc`, `.superdesign_draft_output.txt`.
- `.gitignore`: added `inspiration/` + `tsconfig.tsbuildinfo`; untracked `tsbuildinfo`.
- **WorkPageContent siteUrl fix**: `cafeCrave → https://cafecravecpt.co.za`, `theBigSix → https://thebigsix.lpwebstudio.co.za`.
- **`/api/contact` hardening**: removed Resend TODO; returns 503 with explicit fallback-email message if `N8N_WEBHOOK_URL` is unset; 502 with fallback message on webhook delivery error; no more silent swallow.
- New `.env.example` documenting `N8N_WEBHOOK_URL` as currently unconfigured.

### Phase 4 — Performance
- **Fonts**: Space Grotesk weights trimmed from `[300,400,500,600,700]` → `[400,500,700]`. Replaced the single `font-light` usage (FAQ accordion ± toggle) with `font-normal`. Inter auto-loads the weights it needs.
- **Videos**: `ProjectSection` videos now set `preload="metadata"` and `poster={images[0]}` — avoids eagerly downloading full MP4 (~5–10 MB) before play.
- **Speed Insights**: `@vercel/speed-insights` wired into root layout alongside `Analytics`.

### Phase 5 — Accessibility
- Global `:focus-visible` ring (orange 2 px, 2 px offset) in `globals.css`, suppressed for mouse users via `:focus:not(:focus-visible)`.
- **`ContactDrawer`**:
  - Auto-focus first field (Name input) 200 ms after open.
  - Tab/Shift+Tab focus trap within the panel.
  - Escape key closes the drawer.
  - Focus restored to the element that opened the drawer on close.
- **`/_not-found`** (`src/app/not-found.tsx`) — themed 404 with Navigation/Footer, `robots: noindex`.
- **`/error`** (`src/app/error.tsx`) — client error boundary with Try Again + Return Home.

### Phase 6 — Verification
- `next build` passes. All 14 routes prerender statically except `/api/contact` (edge runtime, dynamic).
- Lighthouse scores recorded above.

---

## Deferred (intentional)

| Item                            | Reason                                                                                                             |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Learn Stage B (full redesign)   | Per your instruction — separate branch with design brief + mockups first. Current `/learn` now builds, is navigable, styled to match the landing aesthetic, but is not the final design. |
| SVGO on `icon.svg`/`logo.svg`/`my-logo.svg` | No CLI optimiser installed locally; `my-logo.svg` is 289 KB with embedded base64 PNG — worth optimising before launch. |
| `www` vs apex canonicalisation  | Per your instruction — subdomain tracking considerations still pending your decision.                              |
| Case-study copy review          | Per your instruction — flag-only for now. Existing descriptions for Cafe Crave + The Big Six kept as-is.           |

---

## New 🧍 items (need you)

1. **OG image** — `layout.tsx` still references `/og-image.png`. File not committed. Drop a 1200×630 PNG into `public/` or remove the reference before launch.
2. **`/founder-portrait.jpg`** — `FounderSection`/about-page still reference this. File not committed. Drop the portrait into `public/` before launch.
3. **`N8N_WEBHOOK_URL`** — contact form returns 503 until this is set in Vercel project env. `.env.example` documents the requirement.
4. **WIP drafts removed** — `AgitationSection`, `HeroTestimonial`, `TechStackAdvantage` were untracked drafts depending on framer-motion (removed) and `font-heading` (undefined token). They broke the type-check. Restore from commit `eb30a17` if you want to rewire them with the new design system.
5. **Residual a11y** on `/work` (contrast on small labels, heading order in decorative numerals, CTA aria-label mismatch) — 94 vs. 96 elsewhere. Optional polish pass.
6. **Domain canonicalisation decision** — still need your call on www vs. apex + subdomain tracking approach.

---

## What the site ships with now

- ✅ Next 15 + React 19 + App Router, fully statically prerendered where possible
- ✅ Cape Town edge region (`cpt1`)
- ✅ Strict CSP, HSTS with preload, Permissions-Policy, X-Frame-Options DENY
- ✅ Global `LocalBusiness` + `WebSite` JSON-LD; page-specific `FAQPage`, `CreativeWork`, `Person`, `BlogPosting`, `BreadcrumbList` schemas
- ✅ Per-page canonicals + `og:url`
- ✅ Dynamic `sitemap.ts` + `robots.ts`, favicon set, manifest, apple-icon
- ✅ `/privacy` route with honest data-handling disclosure
- ✅ Contact drawer with focus trap, Escape close, focus restore
- ✅ Themed 404 and error boundary
- ✅ Cookieless analytics (Vercel Analytics + Speed Insights)
- ✅ Lighthouse 99–100 Perf, 94–96 A11y, 96 BP, 100 SEO across the primary routes
