# LP Web Studio — Pre-Launch Audit
**Date:** 2026-04-17
**Branch (for remediation):** `pre-launch/cleanup-2026-04-17`
**Framework:** Next.js 15 App Router · React 19 · TS · Tailwind 3.4 · Vercel

Legend: ✅ done · ⚠️ needs work · ❌ missing · 🧍 needs Luke's input

---

## 1. Inventory — what's actually live

**Routes** (app router):
- `/` — home (HeroSection → MetricsBanner → CoreInfrastructure → ArchitecturalMethod → ScaleBanner → TestimonialSection → B2BPlatform → FounderSection → FAQSection → FinalCTA)
- `/about` — SubpageHero + AboutPageContent
- `/work` — WorkPageContent (2 case studies: Cafe Crave, The Big Six)
- `/learn` — article index
- `/learn/[slug]` — article detail (2 articles: `nextjs-vs-wordpress`, `why-pagespeed-matters`)
- `/api/contact` — edge POST handler → optional n8n webhook
- `/contact` → 301 redirect → `/` (drawer replaces the page)

**Global shell:** `layout.tsx` mounts Fonts (Space Grotesk, Inter, JetBrains Mono), DrawerProvider, ContactDrawer, Vercel Analytics, and global JSON-LD (LocalBusiness + WebSite).

**Assets in `public/`:**
- Icons/logos: `icon.svg` (168KB), `logo.svg` (168KB), `my-logo.svg` (284KB), `Logo.png` (352KB), `My-Logo.png` (752KB)
- Case studies: `cafe-crave.webp` (36KB), `big-six.webp` (40KB), `nova-studio.webp` (80KB, unused), `videos/CafeCrave.mp4` (472KB), `videos/BigSix.mp4` (572KB)
- Page screenshots from old site: `Portfolio-Page.png` (1.5MB), `Profile-headshot.png` (1.1MB), `Services-Page.png` (856KB), `Me1.JPG`, `img_1.png` — **all unused**
- Legacy cruft: `.htaccess`, `_redirects`, `contact-form.php`, `whatsapp-logo.jpg` — **all unused**
- Config: `robots.txt`, `sitemap.xml`, `llms.txt`

**Dead directories in repo root:**
- `dist.zip` (24 MB) — old SPA build, untracked
- `out/` (36 MB) — old `next export` output, untracked but on disk
- `_UNUSED_FILES_BACKUP/` (404 KB) — legacy React SPA files from pre-Next migration
- `inspiration/` (1.1 GB) — design reference images, untracked
- `.superdesign_draft_output.txt` (22 KB) — old scratch file
- `src/public/` — **second** public dir inside src containing stale `robots.txt`/`sitemap.xml` pointing to `lpwebstudio.com` (wrong TLD)

**Dead code inside `src/`** (19 components with zero imports — confirmed via grep):
- atoms: `Badge`, `ParticleField`, `Typography`
- molecules: `ContactForm`, `MercuryButton`, `PricingCard`
- organisms: `AgitationSection`, `B2BCallout`, `ConfidentIntermission`, `ContactPageContent`, `CoreCapabilitiesSection`, `HeroTestimonial`, `PortfolioSection`, `PricingSection`, `ProcessSection`, `ProjectScopeForm`, `SpeedRevenueBanner`, `TechStackAdvantage`, `WorkHero`
- lib: `variants.ts` (only imported by dead components); `security.ts::verifyTurnstile` (not called)
- `src/proxy.ts` — **orphan**. Next.js runs `middleware.ts`; there is no such thing as `proxy.ts`. The file comment claiming the opposite is false. Dead code.

**Stray files:** `GEMINI.md` (empty, 0 bytes).

---

## 2. SEO — technical

| Item | Status | Notes |
|---|---|---|
| Per-page `<title>` | ✅ | Global default + per-page overrides via `metadata` export on `/`, `/about`, `/work`, `/learn`, `/learn/[slug]` |
| Meta description | ✅ | Set on all pages above |
| Canonical URL | ⚠️ | Root layout sets `alternates.canonical: https://lpwebstudio.co.za`. **No per-page canonicals** on `/about`, `/work`, `/learn`, `/learn/[slug]` — they all inherit the homepage canonical, which is wrong. Each page needs its own. |
| Open Graph — site-wide | ⚠️ | `og:image` points to `/og-image.png` which **does not exist in `public/`**. Every social share will fall back with no preview. |
| Open Graph — per-page | ⚠️ | `og:title` and `og:description` set per page but `og:url` is never overridden, so it's always the homepage URL |
| Twitter card | ⚠️ | `summary_large_image` set, but image is the same missing `/og-image.png` |
| robots.txt | ⚠️ | Two sources of truth: `public/robots.txt` (static, correct) **and** `src/app/robots.ts` (Next dynamic, points to `www.lpwebstudio.co.za/sitemap.xml`). The dynamic one wins. Domain mismatch (`www.` vs no-www) and sitemap URL is slightly wrong. Consolidate to one. |
| sitemap.xml | ⚠️ | `src/app/sitemap.ts` lists `/` `/work` `/about` `/contact` — **`/contact` 301s to `/` and must be removed**; `/learn` and both article slugs are **missing**. Also `public/sitemap.xml` is a static duplicate (same URLs, different `lastmod`). Keep the dynamic one only. |
| JSON-LD — LocalBusiness / Organization | ✅ | Injected globally in `layout.tsx` with full pricing + offerCatalog |
| JSON-LD — WebSite | ✅ | Injected globally |
| JSON-LD — Person (Luke) | ❌ | No `Person` schema — you're the named founder on `/about`, this should exist |
| JSON-LD — FAQ | ✅ | Homepage has `FAQPage` schema via `faqPageSchema()` |
| JSON-LD — CreativeWork | ✅ | Both case studies on `/work` |
| JSON-LD — BlogPosting / Breadcrumb | ✅ | `/learn/[slug]` has both + QAPage |
| Favicon — svg | ✅ | `icon.svg` wired via `metadata.icons` |
| Favicon — 16/32/ico | ❌ | Missing. Some older browsers / crawlers still need `.ico`. |
| Apple touch icon | ⚠️ | Currently `apple: "/icon.svg"` — Apple wants a **180×180 PNG**, not SVG |
| Maskable icon | ❌ | Missing |
| manifest.json / PWA basics | ❌ | No manifest file; no `theme-color` meta |
| `<html lang>` | ✅ | `lang="en"` set |
| Viewport meta | ✅ | Provided by Next automatically |
| `og:locale` | ✅ | `en_ZA` set |
| `llms.txt` | ✅ | Present, up-to-date (updated 2026-04-10) |

**Hard blocker:** no OG image exists. Needs to be generated or supplied (1200×630, brand-aligned).

---

## 3. Performance (target ~99 Lighthouse)

| Item | Status | Notes |
|---|---|---|
| Images — AVIF/WebP | ⚠️ | `next.config.ts` sets `formats: ["image/avif", "image/webp"]` (correct). But two `next/image` `src="/founder-portrait.jpg"` references point to a **file that doesn't exist** → broken image on home hero and founder section. This is a launch blocker. |
| Images — responsive `sizes` | ✅ | All `next/image` usages specify `sizes` or `fill` appropriately |
| LCP image — preloaded | ⚠️ | Hero portrait uses `priority` ✅ but file is missing ❌ |
| CLS | ✅ | All images use `fill` or explicit dimensions |
| SVG size | ⚠️ | `icon.svg` (168KB), `logo.svg` (168KB), `my-logo.svg` (284KB) are unusually large for SVGs — they likely embed rasters or have uncompressed paths. Worth running SVGO. |
| Font — preload | ✅ | `next/font/google` handles preload automatically |
| Font — `display: swap` | ✅ | Explicit on all three fonts |
| Font — subset | ✅ | `subsets: ["latin"]` |
| Font count | ⚠️ | Space Grotesk has 5 weights (300/400/500/600/700). Verify all are used; trimming to 3 saves ~40KB |
| Bundle audit | ⚠️ | `framer-motion` (~40 KB gz) is imported only by dead code + `lib/variants.ts` (also dead). **Currently unused — can be removed.** `zustand` is declared but never imported. `remark` + `remark-html` + `gray-matter` are used only on the server for `/learn` (fine — edge/SSG only). |
| Code splitting | ✅ | Per-route automatic; `Suspense` boundaries around each homepage section |
| Static generation | ✅ | All pages are SSG; `/` has `revalidate = 3600` ISR; `/learn/[slug]` uses `generateStaticParams` |
| Unused CSS / Tailwind purge | ✅ | `content` globs are correct; only `src/app/**` and `src/components/**` |
| Third-party scripts | ✅ | Only Vercel Analytics (lightweight, deferred) |
| Video autoplay | ⚠️ | Both `/videos/*.mp4` autoplay on `/work`. Files are small (~500 KB each) but currently no `<video poster>` is set → first frame decode can delay LCP on that route. |
| Render-blocking resources | ✅ | None obvious |

---

## 4. Cleanup

| Item | Status | Notes |
|---|---|---|
| Remove unused components | ❌ | 19 unused components listed in §1 |
| Remove unused deps | ❌ | `framer-motion`, `zustand` are installed but no longer imported anywhere live |
| Remove orphan files | ❌ | `src/proxy.ts`, `src/public/`, `GEMINI.md` (empty), `.superdesign_draft_output.txt` |
| Delete `dist.zip` + `out/` | ❌ | 60 MB combined, dead build output |
| Delete `_UNUSED_FILES_BACKUP/` | 🧍 | Your call — purely legacy backups from pre-Next migration. Safe to delete since git has the history if needed. |
| Delete `inspiration/` | 🧍 | 1.1 GB. Untracked. Keep locally if you want, but add to `.gitignore` defensively. |
| `.gitignore` | ⚠️ | Missing: `.DS_Store`, `inspiration/`, `dist.zip`, `*.tsbuildinfo` (`tsconfig.tsbuildinfo` is currently tracked and 124 KB) |
| Remove `public/.htaccess`, `_redirects`, `contact-form.php`, `whatsapp-logo.jpg` | ❌ | Legacy Apache/Netlify/PHP era — totally unused, would be served as-is on Vercel |
| Remove unused images (`Logo.png`, `My-Logo.png`, `Portfolio-Page.png`, `Services-Page.png`, `Profile-headshot.png`, `Me1.JPG`, `img_1.png`, `nova-studio.webp`) | ❌ | Ship-saving: ~5 MB off public bundle |
| Console statements | ✅ | `compiler.removeConsole: true` in prod strips them. Leaving them in source is fine. |
| `TODO` / `FIXME` | ⚠️ | Only one: `api/contact/route.ts:50` — "Wire up email provider". n8n webhook already works as a path so this is informational, not a blocker. Decide: remove comment (webhook = final answer) or implement Resend. |
| Placeholder copy | ⚠️ | None left in copy itself. `STATUS.md` still calls some sections "placeholder" but the actual code has been updated. |
| Dead internal links | ❌ | `Footer.tsx` links to `/privacy` which **does not exist**. `WorkPageContent` sets `siteUrl: "#"` on both case-study CTAs ("LAUNCH_EXPERIENCE" → nowhere). |
| `STATUS.md` | 🧍 | Useful internal doc, but currently committed with a "Needs Testing" checklist from weeks ago. Decide: keep, move to `_Reference/`, or delete. |
| `middleware.ts` vs `proxy.ts` | ⚠️ | Both exist, only `middleware.ts` runs. Delete `proxy.ts`. |
| CSP (`middleware.ts`) | ⚠️ | CSP allows `'unsafe-inline' 'unsafe-eval'` for scripts — Next.js needs it for hydration without nonces, so this is acceptable for launch, but worth a ticket post-launch to move to nonces. |
| `vercel.json` rewrites | ❌ | **Big one.** Currently contains `{"source": "/(.*)", "destination": "/index.html"}` — that's a legacy SPA fallback and would route **all** pages to a nonexistent `/index.html`. On Vercel + Next App Router, this is either silently ignored or actively breaks things. The security headers section inside `vercel.json` is also duplicated by `middleware.ts`. Needs to be reduced to just the headers (or removed entirely and let middleware handle headers). |

---

## 5. Accessibility (launch-minimum)

| Item | Status | Notes |
|---|---|---|
| Image alt text | ⚠️ | All `next/image` usages have `alt` set ✅ — but two of them point at a missing file |
| Semantic HTML | ✅ | `<main>`, `<nav>`, `<footer>`, `<section aria-label>` used throughout |
| Heading order | ⚠️ | Homepage has one `<h1>` in hero, `<h2>` per section ✅. `/learn/[slug]` has `<h1>` + `<h2>` `<h3>` ✅. `/about` has no `<h1>` — `SubpageHero` uses a styled `<p>`/`<div>` for the big "INFRASTRUCTURE" word; need to confirm by reading `SubpageHero.tsx`. Flagging as ⚠️ pending that check. |
| Keyboard navigation — drawer | ⚠️ | Escape closes ✅. Backdrop click closes ✅. **No focus trap** — Tab can move to elements behind the drawer. **No auto-focus** on first form field when opened. **Close button has no visible focus ring** (uses inline styles). Launch-acceptable but worth fixing. |
| Colour contrast | ⚠️ | `text-white/40`, `text-white/30`, `text-white/25` used for mono labels over `#0B0B0B`. 40% white = ~#666 on black = ~4.5:1 (borderline AA for normal text, OK for large). 25% white fails AA. Spot-check with Lighthouse. |
| Visible focus states | ⚠️ | No global `:focus-visible` rule in `globals.css`. Buttons use inline styles that remove default focus outline. Should add a global focus-visible ring. |
| `prefers-reduced-motion` | ✅ | Respected in ContactDrawer + globals.css utility |

---

## 6. Content / assets — gaps

| Item | Status | Notes |
|---|---|---|
| **Missing personal photo** | ❌🧍 | **Referenced as `/founder-portrait.jpg`** in two places: [src/components/organisms/FounderSection.tsx:15](src/components/organisms/FounderSection.tsx#L15) (about-style portrait card, `aspect-[4/5]`, used on **home page** in the FounderSection) and [src/components/molecules/HeroContent.tsx:18](src/components/molecules/HeroContent.tsx#L18) (fills the entire **home hero** at `object-cover` with `mix-blend-multiply` on the gradient card).<br><br>**Recommended export:** one image, **1600×2000 px (4:5 portrait), JPEG quality ~85%**, around 400–600 KB. Next will derive AVIF/WebP + responsive sizes automatically. The hero uses `grayscale mix-blend-multiply opacity-30` so tonal range matters more than colour — aim for strong highlights/shadows. Filename: **exactly `founder-portrait.jpg`** in `/public/`. |
| OG image | ❌🧍 | Referenced as `/og-image.png` in layout metadata. **Needs creation.** 1200×630, dark background, brand lockup + tagline. I can generate a draft if you want (using the seo-image-gen skill or one-off Canva-style prompt). |
| Platform screenshot | N/A | `B2BCallout.tsx` expects `/platform-screenshot.png` — but B2BCallout is **unused**, so safe to delete the component. Flagged for visibility only. |
| Project "launch" URLs | 🧍 | `WorkPageContent.tsx` has `siteUrl: "#"` for both Cafe Crave and The Big Six. Need real URLs (or decide to hide the CTA). Known from STATUS.md: `cafecravecpt.co.za` and `thebigsix.lpwebstudio.co.za`. |
| Project case-study images | ⚠️ | Both projects use `images: ["/cafe-crave.webp", "/cafe-crave.webp"]` (same file twice). Want 2 distinct shots per project, or collapse to 1. |
| 404 page | ❌ | No `src/app/not-found.tsx` → you get Next's default "404 | This page could not be found." in a sans-serif typeface. Jarring against the rest of the site. Needs a themed 404. |
| Privacy notice | ❌🧍 | Footer links to `/privacy` (dead link) and Vercel Analytics is wired (cookie-less, but worth mentioning). Needs either a page or the link removed. |
| Draft copy | ✅ | No visible placeholder/lorem in rendered copy |
| `learn/[slug]` uses `prose` | ⚠️ | Article body uses `prose prose-invert prose-lg` plus `@tailwindcss/typography` modifiers — **typography plugin is not installed**, so those classes do nothing. Either install `@tailwindcss/typography` **or** replace with hand-rolled styles. The page also uses tokens like `font-heading`, `bg-glass-border-dim`, `text-secondary-light` that are **not in the Tailwind config** — so the learn article page is currently rendering unstyled. The learn *index* page works fine. |
| `learn/[slug]` missing nav/footer | ⚠️ | The article page renders content directly inside `<main>` with no `<Navigation/>` or `<Footer/>`. The article is reachable from the index but the user then can't get back to the main nav. |

---

## 7. Deployment readiness

| Item | Status | Notes |
|---|---|---|
| Build succeeds | 🧍 | Haven't run `next build` yet per your "don't change anything" instruction. Given the dead imports, `@tailwindcss/typography` absence, and missing images, build will likely succeed (Next tolerates all of these) but will log warnings. Will run once you greenlight remediation. |
| `.env.example` | ❌ | Missing. Runtime uses `N8N_WEBHOOK_URL` + `TURNSTILE_SECRET_KEY` + (future) `RESEND_API_KEY`. Should be documented. |
| Production domain | ⚠️ | Metadata uses `lpwebstudio.co.za` everywhere except `robots.ts` (`www.lpwebstudio.co.za`) and `/learn/[slug]` breadcrumbs (`www.lpwebstudio.co.za`). Decide: www or no-www, one answer, everywhere. |
| Analytics | ✅ | Vercel Analytics installed + mounted. Privacy-respecting. **No speed insights** (`@vercel/speed-insights`) — optional add, free tier, gives you real CWV data post-launch. Recommend adding. |
| Error boundary / fallback UI | ❌ | No `src/app/error.tsx` or route-level error boundaries. If a server component throws in prod, user gets Next's default error page. Needs a themed `error.tsx`. Similarly `loading.tsx` would smooth ISR navigation — nice-to-have. |
| `vercel.json` | ❌ | Contains the SPA-era rewrite that would break routing (see §4). Needs fix. |
| `.browserslistrc` | ⚠️ | Present in repo root but Next doesn't read it in the App Router pipeline. Harmless but dead. |

---

## Summary — remediation plan (pending your sign-off)

I'd execute in this order on branch `pre-launch/cleanup-2026-04-17`, one commit per logical chunk:

1. **Blockers**
   - Fix `vercel.json` (remove SPA rewrites; keep security headers or delete and rely on middleware)
   - Placeholder OG image so social shares don't 404 (until you supply the real one)
   - Either fix `/learn/[slug]` styling (install `@tailwindcss/typography` + add Navigation/Footer) **or** decide to ship without Learn on launch
   - Remove `/contact` from sitemap, add `/learn` + article slugs
   - Kill the stray `public/sitemap.xml` + `src/public/` duplicates; canonicalise domain (no-www everywhere)

2. **SEO essentials**
   - Per-page `alternates.canonical` on `/about`, `/work`, `/learn`, `/learn/[slug]`
   - Per-page `openGraph.url`
   - Add `Person` schema (you, as founder) to `/about`
   - Generate `og-image.png` placeholder; add proper `favicon.ico` + `apple-touch-icon.png` (180×180) + `manifest.json` (I can generate these from `icon.svg`)
   - Fix `/privacy` footer link — either add a one-pager privacy notice or remove the link

3. **Cleanup**
   - Delete 19 unused components + `proxy.ts` + `lib/variants.ts` + `verifyTurnstile`
   - Remove `framer-motion`, `zustand` from `package.json`
   - Delete legacy `public/` assets (`.htaccess`, `_redirects`, `contact-form.php`, `whatsapp-logo.jpg`, `Logo.png`, `My-Logo.png`, `Portfolio-Page.png`, `Services-Page.png`, `Profile-headshot.png`, `Me1.JPG`, `img_1.png`, `nova-studio.webp`, duplicate SVG)
   - Delete `dist.zip`, `out/`, `src/public/`, `GEMINI.md`, `.superdesign_draft_output.txt`, `.browserslistrc`, `tsconfig.tsbuildinfo` (+ gitignore it)
   - **Decide:** `_UNUSED_FILES_BACKUP/`, `inspiration/`
   - Fix duplicated case-study images (use one each or supply second)
   - Fix `siteUrl` on both project cards

4. **Performance wins**
   - Run SVGO on the three large SVGs (should drop 600 KB total)
   - Trim Space Grotesk weights to 400/600/700 if 300/500 are unused
   - Add `poster` images to the two case-study videos
   - Add `@vercel/speed-insights` (optional)

5. **A11y + polish**
   - Global `:focus-visible` ring in `globals.css`
   - Auto-focus first drawer field on open; focus trap inside drawer
   - Add `src/app/not-found.tsx` (themed 404)
   - Add `src/app/error.tsx` (themed error boundary)

6. **Verification**
   - `next build` clean
   - Lighthouse on `/`, `/about`, `/work`
   - Manual click-through of every CTA entry point and the drawer

---

## Things I need from you before I start (🧍)

1. **`founder-portrait.jpg`** — 1600×2000 JPEG, dropped into `/public/` with that exact filename.
2. **OG image approach** — do you want me to auto-generate a simple placeholder (dark bg + wordmark + tagline) so social shares work on day one, and you supply the hero one later? Or wait for a designed one?
3. **`/privacy` link** — write a one-paragraph privacy notice (I can draft, you edit), or remove the footer link and skip?
4. **www vs no-www** — canonical domain is `https://lpwebstudio.co.za`. Confirm, and I'll make it consistent everywhere including `robots.ts` and breadcrumbs.
5. **Case-study site URLs** — confirm `https://cafecravecpt.co.za` and `https://thebigsix.lpwebstudio.co.za` are the live ones to wire up.
6. **`/learn` route** — ship on launch or cut? Currently article pages are partly broken (missing Tailwind plugin + no nav/footer). Fix now or pull from nav/sitemap for v1?
7. **`_UNUSED_FILES_BACKUP/` + `inspiration/`** — delete both locally? Keep `inspiration/` but add to `.gitignore`?
8. **Email provider** — n8n webhook is the current path; leave it that way (remove the Resend TODO comment), or wire Resend now?
9. **Speed Insights** — add `@vercel/speed-insights`? (free, lightweight, gives real CWV)

Reply with answers to the 🧍 items and a go/no-go on the plan, and I'll execute.
