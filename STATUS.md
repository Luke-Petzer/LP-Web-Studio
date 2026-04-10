# LP Web Studio — Site Status

A running changelog of all changes made to this website. Newest entries first.

---

## Active Branch
`dev/main-refresh`

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
