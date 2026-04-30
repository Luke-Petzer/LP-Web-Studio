# LP Web Studio — Site Status

A running changelog of all changes made to this website. Newest entries first.

---

## Active Branch
`pre-launch/cleanup-2026-04-17`

---

## Batch 3 — PageSpeed Metric + Service-Cards Redesign — 2026-04-30

Plan: `docs/superpowers/plans/2026-04-30-batch3-pagespeed-cards.md`
Spec: `docs/superpowers/specs/2026-04-30-batch3-pagespeed-cards-design.md`

### Changes
1. **MetricsBanner** — `90+ / PageSpeed Guarantee` → `90+/100 / Google PageSpeed Guarantee`. Anchors the unanchored "90+" metric with a denominator and source attribution for non-technical readers.
2. **CoreInfrastructure (Web Development & Automation Services)** — full rewrite. Four full-bleed colored panels (`#0B0B0B` obsidian, `#1a1c1e` slate-dark, `#FF4D00` orange, `#B81D1D` deep red) replacing the previous bordered grid. Each panel: title-top → SVG visualization (grid / wave / sunburst / curve, hand-built with ~200-720 dots each) → counter `0X / 04` → small caps body. Same `min-h-[520px]` across all four. Subtle 6% brightness hover via new `.card-panel:hover { filter: brightness(1.06) }` in globals.css. Decorative SVG line-accents (the four faint `opacity-[0.045]` strokes) deleted — they were bleeding through the section. `tags` field dropped from card 1 (was the only card with tags — visual inconsistency).

### What's preserved
- Section `id="capabilities"`, `aria-label="Core Infrastructure"`.
- Header row layout: `<h2>` "Web Development & Automation Services" + `.section-label` "01 — Capabilities".
- Body copy verbatim per card.
- Component public API (`<CoreInfrastructure />`).

### Verified server-side
- `MetricsBanner` HTML contains `90+/100` and `Google PageSpeed Guarantee`.
- `CoreInfrastructure` panel row renders 4 `.card-panel` `<article>` elements, each with a unique `background:` style matching the locked palette.
- 2028 inline `<circle>` elements rendered across the 4 visualizations (matches expected: 196 + 720 + 540 + 572).
- No `opacity-[0.045]` strokes anywhere in the section.
- No `Next.js` / `Node.js` tag pills inside `.card-panel` (the `>Next.js<` instances elsewhere are from the B2BPlatform tech-stack pills — pre-existing, unrelated).
- Production build clean. `/` bundle 5.63 → 6.07 kB (+440 bytes for inline SVG dots). First Load JS unchanged at 114 kB.

### Out of scope this batch
- "02 — Execution / The Architectural Method" section (user still thinking)
- Pre-existing `/work` a11y findings (separate batch)
- `M src/app/learn/[slug]/page.tsx` working-tree change (untouched)
- Lighthouse re-run (no CWV-affecting changes)

---

## Mobile audit — 2026-04-27

Source: `superpowers:code-reviewer` agent run, viewports 320/375/390/414. `body { overflow-x: hidden }` is in place (`globals.css:36`) — it currently masks any underlying overflow as content-clipping rather than visible page scroll. Findings below are the root causes that the body shortcut is masking.

### Horizontal-overflow findings (must-fix)

| Severity | File:line | Problem | Fix status |
|---|---|---|---|
| HIGH | `src/components/organisms/Footer.tsx:19` | `flex gap-10` 4 children → ~280px content overflows 256px usable at 320px | ✅ applied (`flex-wrap gap-x-6 gap-y-2 + py-3` per link) |
| HIGH | `src/components/molecules/HeroContent.tsx:77` | 3 numbered pillars with `gap-10` overflow at 320px on Android with system font scaling | ✅ applied (`flex-wrap gap-6 sm:gap-10`) |
| HIGH | `src/components/organisms/WorkScrollReveal.tsx:55` | `min-h-screen` for 3-line text wastes mobile scroll | ✅ applied (`min-h-[60vh] md:min-h-screen`) |
| HIGH | `src/components/organisms/AboutPageContent.tsx:152` | Terminal `font-mono text-sm` line `"Web Developer & Automation Engineer"` overflows by ~28px at 320px | ✅ applied (`text-xs md:text-sm break-words`) |
| HIGH | `src/components/organisms/ContactDrawer.tsx:23` | Form inputs `padding: 12px 0` → ~38px total tap height (below 44px) | ✅ applied (`14px 0` + `minHeight: 44px`) |
| HIGH | `src/components/organisms/ProjectSection.tsx:151` | H2 + score row at 40px floor risks future-content overflow when ident is one long word | ✅ applied (`min-w-0 break-words`, floor lowered to `2rem`) |
| HIGH | `src/components/organisms/FinalCTA.tsx:19-23` | H2 `clamp(3rem, 8vw, 6.5rem)` with hard `<br />` after `"Managing."` overflows by ~150px at 320px because words can't wrap independently | ⏳ Task 2 (non-trivial — clamp floor + remove `<br />`) |
| HIGH | `src/components/molecules/NavClient.tsx:153` | Mobile menu links `text-3xl` (~62px floor) + `"Infrastructure"` (14 chars) overflow 256px content area | ⏳ Task 2 (style override needed) |
| HIGH | `src/components/molecules/NavClient.tsx:139` | Hamburger button `w-8 h-8` (32×32) below 44×44 tap target | ✅ applied (`w-11 h-11`) |
| HIGH | `src/components/organisms/Footer.tsx:50,59` | Social icon tap targets ~16px | ✅ applied (`w-11 h-11 inline-flex` wrapper) |
| HIGH | `src/app/learn/[slug]/page.tsx:86` | Breadcrumb truncate fails without `min-w-0 flex-1` on parent | 🚫 BLOCKED — file has pre-existing user WIP, untouched |
| HIGH | `src/app/learn/[slug]/page.tsx:131` | `prose` markdown lacks `prose-a:break-words` and `prose-pre:overflow-x-auto` for long URLs | 🚫 BLOCKED — same |

### Mobile-scaling findings (advisory — not auto-fixed this round)

- **Tap targets below 44×44**:
  - Footer `mono-label` text-only links — addressed in Task 1 (`py-3`).
  - `LatestWriting.tsx` "Read →" decorative within larger `<a>` tap area — OK in practice.
- **Text size <12px**:
  - `mono-label` everywhere is 10px — decorative, acceptable.
  - `LatestWriting.tsx` date pill `9px` is below floor.
  - `SubpageHero` subtitle `11px` below floor.
- **Hover-only interactions** (no mobile equivalent):
  - `infra-card:hover` border/glow reveal
  - `dark-card:hover` border/shadow reveal
  - `ProjectSection` image grayscale→colour on hover
  - `FAQSection` button hover bg
  - All decorative — no information lost on mobile.
- **Excessive top spacing (>96px)**:
  - `/privacy` `pt-[120px]` on main
  - Home: hero `py-20` + MetricsBanner `py-24` = 176px gap
- **Suppressed advisory**:
  - `text-white/40` contrast on `/work` metadata pills — out of scope (separate prompt).

### Applied during audit (Task 1 trivial fixes)

- `src/components/organisms/Footer.tsx` — flex-wrap, py-3 on links, w-11 h-11 wrappers on social icons
- `src/components/molecules/NavClient.tsx` — hamburger `w-8 h-8` → `w-11 h-11`
- `src/components/molecules/HeroContent.tsx` — pillars `flex-wrap gap-6 sm:gap-10`
- `src/components/organisms/WorkScrollReveal.tsx` — `min-h-[60vh] md:min-h-screen`
- `src/components/organisms/AboutPageContent.tsx` — terminal `text-xs md:text-sm break-words`
- `src/components/organisms/ContactDrawer.tsx` — input padding `14px 0`, `minHeight: 44px`
- `src/components/organisms/ProjectSection.tsx` — H2 `min-w-0 break-words`, clamp floor `2rem`

---

## UI/UX Refinement — 2026-04-27

Plan: `docs/superpowers/plans/2026-04-27-website-uiux-refinement.md`

### Changes
1. FAQ smooth accordion open/close transition (`grid-template-rows` 0fr↔1fr, 250ms eased)
2. Latest Writing card hover: bg lightens, "Read" gets animated left-to-right underline via shared `.read-link` class
3. Orange CTA on FinalCTA: signature `.btn-cta-orange` — slight brighten + brand-coloured glow on hover, scale on active
4. CoreInfrastructure desktop layout: replaced absolute-positioned overlap (which clipped card 4) with 2/4-column grid; identical hover for all cards
5. SubpageHero `breadcrumb` prop now optional; removed from `/work` (still shown on `/about`, `/learn`)
6. Work closing CTA buttons: now use canonical `.btn-primary` and `.btn-ghost` for consistent hover
7. About `READY TO DEPLOY?` button: same `.btn-primary` hover (flagged: spec said "Work page" but section only exists on About)
8. Learn `RECENT WRITING` card hover: matches Latest Writing — same `.read-link` underline + bg lightening

### Low-risk wins applied
- Consolidated robots: deleted duplicate `public/robots.txt`, fixed `app/robots.ts` to serve identical content (apex domain + `/api/` and `/_next/` disallows). Eliminates the dev-server 500 conflict on `/robots.txt`. Production response unchanged.

### Lighthouse (production build, headless Chrome, localhost — no CDN/edge)
| Route   | Perf | A11y | BP | SEO |
|---------|-----:|-----:|---:|----:|
| `/`     |   88 |   96 |  96 | 100 |
| `/work` |   85 |   94 |  96 | 100 |
| `/about`|   89 |   96 |  96 | 100 |
| `/learn`|   89 |   96 |  96 | 100 |

A11y / BP / SEO match the production Lighthouse baseline recorded in `docs/pre-launch-summary-2026-04-17.md`. Perf is naturally lower without Vercel's CDN/edge cache (production-deployed run scored 99-100).

### Top remaining issues (per Lighthouse)
1. `/work` — `color-contrast` on `text-white/40` 10px metadata pills (pre-existing, listed as "optional polish" in pre-launch summary). Not auto-fixed because it changes brand colour values; flag for design review.
2. `/work` — `heading-order` and `label-content-name-mismatch` on decorative numerals/CTAs (pre-existing).
3. All routes — `unused-javascript` (~150ms saving). Marginal; defer until a real bundle review.
4. All routes — `render-blocking-resources` (~36-120ms). Likely Google Fonts. Defer.

### Deferred (not in scope this pass)
- Mobile-pass beyond visual smoke check
- Color-contrast on small white/40 labels (visual brand decision)
- `/og-image.png` and `/founder-portrait.jpg` still missing in `public/` (pre-existing pre-launch flag)

---

## Batch 2 — Mobile, Copy, CTA Wiring — 2026-04-27

Plan: `docs/superpowers/plans/2026-04-27-batch2-mobile-copy-cta.md`
Spec: `docs/superpowers/specs/2026-04-27-batch2-mobile-copy-cta-design.md`

### Changes
1. **Mobile audit + horizontal-overflow fixes** — see `## Mobile audit — 2026-04-27` section above for findings (10 high-severity, 8 fixed in-batch, 2 blocked by pre-existing user WIP)
2. **`FinalCTA` H2 + `NavClient` mobile menu** root-cause fixes for word-break overflow at 320px
3. **Module-card content-fit** (`CoreInfrastructure.tsx`) — desktop heading floor `1.5rem→1.25rem`, padding `p-10→p-8 lg:p-10`, `min-h-[420px]→min-h-[360px]`, `gap-8`. Mobile padding `p-8→p-6`, title `text-2xl→text-xl md:text-2xl`.
4. **Cafe Crave chapter hook** rewritten: `"Real foot traffic. Zero digital footprint."`
5. **Work closing CTA** — body tightened (3rd sentence dropped); `VIEW PRICING` → `INITIATE PROJECT` (drawer); `RUN FREE AUDIT` now links to `/audit`
6. **`/audit` page** — new route, `SubpageHero`, 5-area explanation grid, working form (`AuditForm`) with name/email/url + `company_field` honeypot, edge API at `/api/audit`, sitemap entry. Webhook URL is a placeholder pending n8n workflow (see `// TODO` in `route.ts:78`)
7. **Home FinalCTA wiring** — `Initiate Protocol` opens drawer; `Request Audit` links to `/audit`

### Smoke verification (production build, localhost:3000)
- `/audit` GET → 200; HTML contains `company_field`, `audit-name`, `audit-email`, `audit-url`, `REQUEST AUDIT`, `FREE PERFORMANCE`
- `POST /api/audit` valid payload → 502 (placeholder webhook unreachable; correct fallback message in body)
- `POST /api/audit` already-`https://`-prefixed URL → 502 (no double-prepend; reaches webhook step)
- `POST /api/audit` honeypot tripped → 200 `{success:true}` (silent reject; no webhook fetch)
- `POST /api/audit` invalid email → 422 with Zod error
- `/sitemap.xml` includes `lpwebstudio.co.za/audit`
- `/work` HTML contains `Real foot traffic.`, `INITIATE PROJECT`, `RUN FREE AUDIT`; no `VIEW PRICING`
- `/` HTML contains `Initiate Protocol` (button), `Request Audit` (anchor with `href="/audit"`)

### Known limitations
- `/api/audit` webhook URL is `https://placeholder.lpwebstudio.co.za/api/audit-webhook` — every submission currently 502s with a fallback-email message. One-line swap when the n8n workflow is built: change `webhookUrl` in `src/app/api/audit/route.ts:78`.
- Pre-existing a11y findings on `/work` deferred to a separate pass per user instruction.
- `src/app/learn/[slug]/page.tsx` working-tree changes left untouched: high-severity overflow findings on that file (breadcrumb truncate, prose long-URL break-words) are documented in the Mobile audit section above as 🚫 BLOCKED until the user finishes their in-flight work.
- Lighthouse intentionally not re-run this round; previous baseline (88-89/94-96/96/100) holds barring CWV-affecting changes (none introduced).

---

## Shared Components

| Component | Path | Props | Used On |
|---|---|---|---|
| `SubpageHero` | `src/components/organisms/SubpageHero.tsx` | `breadcrumb`, `title`, `subtitle` | `/work`, `/about` |

---

## Contact Drawer

**Date:** 2026-04-10

### Files Created
- `src/lib/contact-drawer-context.tsx` — React context (isOpen, openDrawer, closeDrawer), body scroll lock, Escape handler
- `src/components/organisms/ContactDrawer.tsx` — Slide-in (desktop 460px) / bottom sheet (mobile), architecture selector 2×2, 4 form fields, success state
- `src/app/api/contact/route.ts` — POST handler with Zod validation, console.log, n8n webhook forwarding

### Files Modified
- `src/app/layout.tsx` — DrawerProvider wraps body, ContactDrawer mounted at root
- `src/components/molecules/NavClient.tsx` — "Contact" nav + "Get Started" → openDrawer()
- `src/components/molecules/HeroContent.tsx` — "Deploy System" → openDrawer()
- `src/components/organisms/WorkClosingCTA.tsx` — "RUN FREE AUDIT" → openDrawer()
- `src/components/organisms/AboutPageContent.tsx` — "INITIATE PROJECT" → openDrawer()
- `src/components/organisms/FinalCTA.tsx` — "Request Audit" → openDrawer()
- `src/components/organisms/Footer.tsx` — "Contact" footer link → openDrawer()
- `next.config.ts` — 301 redirect `/contact` → `/`

### Files Deleted
- `src/app/contact/page.tsx` — replaced by drawer

### Needs Testing
- [ ] Drawer opens from every CTA entry point (nav, hero, work, about, finalcta, footer)
- [ ] Escape key closes drawer
- [ ] Clicking backdrop closes drawer
- [ ] Body scroll locks when open (no scrollbar jump)
- [ ] Desktop: slides in from right at 460px
- [ ] Mobile: slides up from bottom, rounded top corners
- [ ] Architecture selector toggles active state (white bg when selected)
- [ ] Form submits to /api/contact (check Network tab + server console.log)
- [ ] Success state shows after submit ("MESSAGE RECEIVED.")
- [ ] WhatsApp link opens wa.me/27673852286
- [ ] Email link opens mailto:contact@lpwebstudio.co.za
- [ ] /contact URL redirects to /
- [ ] prefers-reduced-motion: no CSS transition

---

## SEO Overhaul

**Date:** 2026-04-10

### Files Modified
- `public/robots.txt` — corrected domain to lpwebstudio.co.za, added /api/ and /_next/ disallows
- `public/sitemap.xml` — replaced stale sitemap, correct domain, current routes only
- `public/llms.txt` — full rewrite with accurate pricing, portfolio, and contact
- `src/app/layout.tsx` — metadataBase set to lpwebstudio.co.za, global title/desc/keywords rewritten
- `src/app/page.tsx` — homepage metadata + homepageFaqs updated to 5 pricing/value questions
- `src/app/work/page.tsx` — work page metadata + CreativeWork JSON-LD for Cafe Crave and The Big Six
- `src/app/about/page.tsx` — about page metadata updated
- `content/knowledge-base/nextjs-vs-wordpress.md` — frontmatter title + description updated
- `content/knowledge-base/why-pagespeed-matters.md` — frontmatter title + description updated
- `src/components/seo/SchemaTemplates.ts` — LocalBusiness schema overhauled (pricing, offerCatalog, knowsAbout, correct domain)
- `src/components/organisms/FAQSection.tsx` — replaced 3 FAQs with 5 new pricing/value questions
- `src/components/organisms/CoreInfrastructure.tsx` — heading changed to "Web Development & Automation Services"
- `src/components/organisms/B2BPlatform.tsx` — label changed to "RECENT WORK"
- `src/components/organisms/FinalCTA.tsx` — micro-timeline labels updated
- `src/components/organisms/AboutPageContent.tsx` — founder bio, philosophy body, engine teaser, WHY_LP_WEB descriptions rewritten
- `src/components/organisms/WorkPageContent.tsx` — chapter hooks and project descriptions rewritten
- `src/components/organisms/WorkClosingCTA.tsx` — CTA heading and body rewritten, /pricing link removed
- `src/components/organisms/Footer.tsx` — copyright year updated to 2025

### Files Created
- `src/app/learn/page.tsx` — /learn index page with article cards

### SEO Changes Summary
- Domain unified to lpwebstudio.co.za (no www) throughout
- All page titles target Cape Town / South Africa search intent
- LocalBusiness schema includes pricing tiers, offerCatalog, knowsAbout
- CreativeWork schemas added for both portfolio projects
- FAQ updated with pricing questions that match search intent
- llms.txt updated for AI citation (ChatGPT, Claude, Perplexity)
- /learn index page gives the knowledge base a valid route
- Broken /pricing link removed from WorkClosingCTA

---

## Infrastructure Page

**File:** `src/components/organisms/AboutPageContent.tsx`
**Route:** `/about`
**Date:** 2026-04-10

### Changes Made
- **Section 1 (Hero):** SubpageHero already wired in `about/page.tsx` with breadcrumb "LP WEB / INFRASTRUCTURE", title "INFRASTRUCTURE", subtitle "ENGINEERED FOR PERFORMANCE". Removed legacy `pt-[160px]` from main.
- **Section 2 (Founder Block):** Replaced old header + terminal block with 60/40 split. Left: SYSTEM_OPERATOR label, "THE ARCHITECT." heading, "Luke Petzer" in orange gradient, existing body copy, dark pill tags. Right: rebuilt terminal card with dark bg `#0D0D0D`, border `#222222`, traffic light dots, monospace content.
- **Section 3 (Philosophy):** Heading replaced with "THE_PHILOSOPHY" (display, all-caps, white). Quote kept with orange left border. Body text white/70. Divider added below.
- **Section 4 (Tech Stack):** Label "CORE STACK" added (orange). Heading changed to "THE_ENGINE". White cards replaced with dark cards `#111111` / border `#222222` / radius `8px`. Icons changed to `#FF4500`. Hover: border animates to `#FF4500`. Grid: 3 col desktop / 2 tablet / 1 mobile. All existing copy preserved.
- **Section 5 (Why LP Web):** Label "THE CASE FOR WORKING TOGETHER" added. Heading changed to "WHY_LP_WEB". Icon circles removed, replaced with 2×24px orange accent lines. Column titles all-caps display 18px. Body white/65 15px. No card backgrounds.
- **Section 6 (Closing CTA):** New full-width section added. "READY TO DEPLOY?" 56px display. Subtext "One engineer. Full stack. No account managers." white/60. "INITIATE PROJECT" primary white button.
- **Global:** Page background `#0A0A0A` throughout. `1px solid #1A1A1A` dividers between every section. Section padding 96px desktop / 56px mobile. Orange `#FF4500` used only for labels, accent lines, icon colour, one gradient text per section.

### Needs Testing
- [ ] Hover states on tech stack cards (border colour transition)
- [ ] Mobile layout: founder block stacks correctly (terminal below left column)
- [ ] Section spacing at mobile breakpoint
- [ ] "INITIATE PROJECT" button routes to `/contact`
- [ ] SubpageHero ghost text clipping correctly on mobile

---

## Completed Changes

### 2026-04-10 — Work Page Redesign v2
**Branch:** `dev/main-refresh`

#### Completed
- `WorkHero.tsx` — border colour changed to accent orange-red (`#FF4D00/60`)
- `WorkScrollReveal.tsx` — replaced sticky Framer reveal with 3-line Intersection Observer fade-up (`"Every project starts with a problem. / Every solution leaves a mark. / This is how we grew."`)
- `WorkStickyArchive.tsx` — deleted (replaced by chapter + project layout)
- `ChapterHook.tsx` — new molecule: narrative inter-section text hooks
- `ProjectSection.tsx` — new organism: 60/40 split-screen project display (Quantum Studio reference)
- `WorkPageContent.tsx` — updated compositor with two projects (Cafe Crave, The Big Six) and chapter hooks
- `STATUS.md` — this file, project-root site changelog

#### Needs Testing
- [ ] Video playback on mobile (Safari iOS, Chrome Android) — `CafeCrave.mp4`, `BigSix.mp4`
- [ ] Scroll reveal animation fires correctly at all scroll speeds
- [ ] `prefers-reduced-motion` — lines should appear immediately without animation
- [ ] Sticky right column on desktop — confirm it stays in view while scrolling left column
- [ ] CTA hover state (orange-red border + tint)
- [ ] Mobile stacked layout — right col (metadata) appears above left col (video)
- [ ] Image placeholders — replace `/images/cafe-crave-1.jpg`, `/images/cafe-crave-2.jpg`, `/images/big-six-1.jpg`, `/images/big-six-2.jpg` with real assets

#### Known Issues / Compromises
- Project images use placeholder paths that don't exist yet — broken `<img>` tags will render as empty space until real images are added to `public/images/`
- The Big Six metadata (timeline, authority) uses placeholder values — update when confirmed
- Cafe Crave description body is placeholder — copy to be rewritten
- `siteUrl` for both projects is `"#"` — update when live URLs are confirmed

---

## SEO Checklist

### /work
- [x] Page title set (`Our Work — LP Web Studio`)
- [x] Meta description set
- [ ] JSON-LD structured data added for Cafe Crave project
- [ ] JSON-LD structured data added for The Big Six project
- [x] Videos have accessible descriptions (`<figcaption class="sr-only">`)
- [x] Images have `alt` text
- [x] Videos use `autoPlay muted loop playsInline` (no autoplay audio)
- [x] Images use `loading="lazy"`
- [x] `prefers-reduced-motion` respected in WorkScrollReveal

---

## Next Steps

1. **Add real project images** — drop into `public/images/` matching paths in `WorkPageContent.tsx`
2. **Replace placeholder copy** — rewrite all description bodies and chapter hook text
3. **Update live site URLs** — set `siteUrl` for both projects once live
4. **Add JSON-LD structured data** — `WebPage` + `CreativeWork` schema for each project in `/work/page.tsx`
5. **Google Search Console** — submit updated sitemap after branch merges to `main`
6. **Google Business Profile** — ensure NAP consistency and link to live site
7. **Performance audit** — run Lighthouse on `/work` after real assets added
8. **Open Graph image** — add `/og/work.jpg` for social sharing
