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
