# Work Page Redesign — Systems Archive
**Date:** 2026-04-05
**Branch:** dev/main-refresh
**Status:** Approved for implementation planning

---

## Overview

A full replacement of the existing `/work` page with a three-section, scroll-driven "Systems Archive" experience. The page is called internally "SYSTEMS_ARCHIVE" and presents LP Web Studio's portfolio projects in a brutalist, dark-mode, highly engineered aesthetic. The existing `WorkPageContent.tsx` is fully replaced. The `Navigation` and `Footer` wrappers in `page.tsx` remain unchanged.

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Accent color | `linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)` — matches homepage hero exactly | Applied as gradient text clip on period, score, project ID; `#FF4D00` for borders/strokes |
| Right-column media | `<video>` with stubbed paths | User will drop files in; architecture ready |
| Hero background | `/Portfolio-Page.png` + dark overlay | Matches reference image 1 |
| SVG geometric lines | Full-page fixed canvas, generous | Key brand element — continuous across all sections |
| CTA button | Links to live site (`siteUrl`), placeholder `#` for now | User confirmed |
| Project switching | scroll-progress → `activeIndex` state | Clean, no library deps beyond Framer |
| 3D flip | Desktop only, fade on mobile | Avoids layout jank on small screens |

---

## Architecture

```
src/
  components/
    atoms/
      GeometricCanvas.tsx        ← NEW: full-page fixed SVG layer
    organisms/
      WorkHero.tsx               ← NEW: hero section
      WorkScrollReveal.tsx       ← NEW: scroll-driven sentence
      WorkStickyArchive.tsx      ← NEW: sticky 35/65 project archive
      WorkPageContent.tsx        ← REPLACED: thin compositor only
  app/
    work/
      page.tsx                   ← UNCHANGED (Navigation + Footer wrappers)
public/
  videos/
    nova-studio.mp4              ← STUB (user provides)
    cafe-crave.mp4               ← STUB (user provides)
    big-six.mp4                  ← STUB (user provides)
```

---

## Component Specs

### 1. `GeometricCanvas.tsx`

**Purpose:** Persistent architectural SVG grid rendered behind all page content.

**Behaviour:**
- `fixed inset-0 w-full h-full pointer-events-none z-0`
- SVG `viewBox="0 0 1440 900"` with `preserveAspectRatio="xMidYMid slice"`
- Contents (all `stroke="white"`, opacity `0.03`):
  - 3–4 long diagonal lines spanning full viewBox at shallow angles
  - 2 right-angle corner bracket groups (top-left, bottom-right)
  - ~6 hairline horizontal rules at uneven vertical intervals
  - 1 large rectangle outline (inset ~10%), very faint
- No animation — purely static
- Used once: rendered in `WorkPageContent.tsx` as a page-level underlay

---

### 2. `WorkHero.tsx`

**Purpose:** Full-viewport opening section with architectural photo and headline.

**Layout:** `relative h-screen overflow-hidden flex flex-col justify-end pb-16 px-8 md:px-16`

**Elements:**
- Background: `<Image src="/Portfolio-Page.png" fill object-cover className="brightness-50">`
- Top-left label: `SYSTEM_PROTOCOL_001` using `.section-label` + `font-mono` — positioned `absolute top-8 left-8 md:left-16`
- Top-right corner bracket: small SVG `<svg>` — two lines forming an L-bracket, `stroke-white/20`, `absolute top-6 right-6`
- Headline block (bottom-left, `z-10`):
  - Line 1: `WE DON'T BUILD,`
  - Line 2: `WE BENCHMARK<span style="background:linear-gradient(135deg,#FF4D00,#B81D1D);-webkit-background-clip:text;color:transparent">.</span>`
  - Class: `font-headline font-black uppercase text-white leading-none`
  - Size: `text-5xl md:text-7xl lg:text-[7rem] xl:text-[9rem]`
- Scroll indicator: `SCROLL` text — `absolute right-6 bottom-24`, rotated `rotate-90`, `font-mono text-[10px] tracking-widest text-white/30`
- Entry animation: headline fades up on mount via Framer Motion `initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}`, spring `stiffness:80 damping:20`, 0.3s delay

**Mobile:** Same layout, headline scales down with fluid type, scroll indicator hidden below `md`.

---

### 3. `WorkScrollReveal.tsx`

**Purpose:** Tall scroll-pinned section that reveals a single editorial sentence as the user scrolls.

**Layout:**
- Outer: `ref={containerRef}` — `relative h-[150vh]`
- Inner (sticky): `sticky top-0 h-screen flex items-center justify-center overflow-hidden`

**Scroll mechanics:**
- `useScroll({ target: containerRef, offset: ["start end", "end start"] })`
- `useTransform(scrollYProgress, [0, 0.6], [0, 1])` → `opacity`
- `useTransform(scrollYProgress, [0, 0.6], [40, 0])` → `y` (pixels, applied via `style`)

**Text:**
- `ENGINEERING AT THE THRESHOLD OF HARDWARE LIMITATION<span style="background:linear-gradient(135deg,#FF4D00,#B81D1D);-webkit-background-clip:text;color:transparent">.</span>`
- Class: `font-headline font-black uppercase text-white text-center leading-tight`
- Size: `text-3xl md:text-5xl lg:text-[4.5rem]`
- Max-width: `max-w-5xl mx-auto px-8`

**Mobile:** Same behaviour, slightly smaller type. No special mobile override needed (opacity/y works on all sizes).

---

### 4. `WorkStickyArchive.tsx`

**Purpose:** The main portfolio display. Scroll-driven sticky layout that cycles through all 3 projects with a 3D flip transition on the right-column video container.

#### Data Shape

```ts
type Project = {
  id: string;           // "cafe-crave"
  index: string;        // "001"
  title: string;        // "REAL-TIME ORDERING ENGINE"
  category: string;     // "Hospitality"
  description: string;  // 2-sentence max
  score: string;        // "93"
  stack: string[];      // ["Next.js", "Tailwind", "Railway"]
  siteUrl: string;      // "#" placeholder or real URL
  videoSrc: string;     // "/videos/cafe-crave.mp4"
}
```

Three entries:
- **Nova Studio** — index `001`, score `91`, `/videos/nova-studio.mp4`, `siteUrl: "#"`
- **Cafe Crave** — index `002`, score `93`, `/videos/cafe-crave.mp4`, `siteUrl: "#"`
- **The Big Six** — index `003`, score `95`, `/videos/big-six.mp4`, `siteUrl: "#"`

#### Outer wrapper
`ref={containerRef}` — `relative h-[300vh]`

#### Sticky inner
`sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden bg-obsidian`

#### Left column (35% desktop, full-width mobile)
`w-full md:w-[35%] flex flex-col justify-center px-8 md:px-12 py-16 z-10`

Contents (animated on `activeIndex` change via `AnimatePresence mode="wait"`):
1. Section label: `PORTFOLIO.SYS` — `.section-label font-mono` (static, not animated)
2. Project ID: `//:.ID:.00{n}` — `font-mono text-xs tracking-widest mt-8` with inline gradient text style (`linear-gradient(135deg, #FF4D00, #B81D1D)` clipped to text)
3. Title: `font-headline font-black text-4xl md:text-5xl xl:text-6xl uppercase text-white leading-none mt-4`
4. Description: `text-white/60 text-sm leading-relaxed mt-6 max-w-sm`
5. Performance metric block (mt-8):
   - Label: `PERFORMANCE METRIC` — `font-mono text-[10px] tracking-widest text-white/40 uppercase`
   - Score: score number (`93`) — `font-headline font-black text-[6rem] md:text-[8rem] leading-none` with inline gradient text style (`linear-gradient(135deg, #FF4D00, #B81D1D)` clipped to text)
   - `/100` — `font-headline text-2xl text-white/40 align-top mt-4`
6. Stack pills: `.pill` — `flex flex-wrap gap-2 mt-6`
7. CTA: `<a href={siteUrl}>` — `.btn-ghost text-sm mt-8` — label `VISIT SITE ↗`

Left column transition: `AnimatePresence mode="wait"` with key=`activeIndex`. Exit: `opacity:0, x:-20`. Enter: `opacity:1, x:0`. Spring: `stiffness:120 damping:20`.

#### Right column (65% desktop, full-width mobile)
`w-full md:w-[65%] relative bg-[#141414] border-l border-white/10`

Top-right label: `LIVE_PREVIEW_00{n+1}.EXE` — `absolute top-6 right-6 font-mono text-[10px] text-white/30 tracking-widest`

Top-left corner bracket SVG: `absolute top-6 left-6`, `stroke-white/20`

Video container: `absolute inset-0` — `<video key={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover">`

**3D flip transition (desktop):**
- `AnimatePresence mode="wait"` wraps the video element, key=`project.videoSrc`
- Parent div: `style={{ perspective: "1200px" }}` + `overflow-hidden`
- Exit: `{ rotateX: -90, opacity: 0 }`, transition: `{ duration: 0.2, ease: "easeIn" }`
- Enter initial: `{ rotateX: 90, opacity: 0 }`
- Enter animate: `{ rotateX: 0, opacity: 1 }`, transition: `{ type: "spring", stiffness: 200, damping: 20 }`
- `style={{ transformOrigin: "center top" }}`

**Mobile override:** `useMediaQuery("(min-width: 768px)")` hook. When false: replace `rotateX` animation with simple `opacity` fade. Video becomes `aspect-video w-full` (not `absolute inset-0`). Stack layout becomes column.

#### Scroll → activeIndex logic
```ts
const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

useMotionValueEvent(scrollYProgress, "change", (v) => {
  if (v < 0.33)      setActiveIndex(0)
  else if (v < 0.66) setActiveIndex(1)
  else               setActiveIndex(2)
})
```

---

### 5. `WorkPageContent.tsx` (replaced)

Thin compositor only:

```tsx
export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <WorkHero />
      <WorkScrollReveal />
      <WorkStickyArchive />
    </div>
  )
}
```

`page.tsx` `<main>` loses its `pt-[160px]` — the hero manages its own top spacing via the `Navigation` overlap.

---

## Mobile Responsiveness Summary

| Section | Mobile Behaviour |
|---|---|
| Hero | Full height, headline scales to `text-5xl`, scroll indicator hidden |
| ScrollReveal | Same animation, text scales to `text-3xl` |
| StickyArchive | Stacked column, video is `aspect-video` not `inset-0`, 3D flip replaced with opacity fade |

---

## File Changelist

| File | Action |
|---|---|
| `src/components/atoms/GeometricCanvas.tsx` | CREATE |
| `src/components/organisms/WorkHero.tsx` | CREATE |
| `src/components/organisms/WorkScrollReveal.tsx` | CREATE |
| `src/components/organisms/WorkStickyArchive.tsx` | CREATE |
| `src/components/organisms/WorkPageContent.tsx` | REPLACE |
| `src/app/work/page.tsx` | EDIT (remove `pt-[160px]` from `<main>`) |

---

## Out of Scope

- Adding a 4th project
- Any changes to `Navigation`, `Footer`, or other pages
- SEO metadata changes beyond what already exists in `page.tsx`
- Actual video file creation (user provides)
