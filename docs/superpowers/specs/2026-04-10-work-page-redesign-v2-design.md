# Work Page Redesign v2 — Quantum Studio Split-Screen Layout
**Date:** 2026-04-10
**Branch:** dev/main-refresh
**Status:** Approved for implementation planning

---

## Overview

Full replacement of `WorkStickyArchive` with a vertically-stacked, chapter-driven project layout modelled on the Quantum Studio split-screen reference. The page reads as a scrolling storybook: chapter hooks raise questions, project sections answer them. Two projects (Cafe Crave, The Big Six). Nova Studio removed entirely.

Changes to existing components are minimal and surgical. New components handle the project display.

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Hero border | `border-[#FF4D00]/60` | User requested accent colour match (orange dot / existing brand) |
| Scroll reveal animation | Intersection Observer, not Framer | User specified — premium, no heavy library |
| Scroll reveal text | 3 lines, 150ms stagger | "Every project starts with a problem. / Every solution leaves a mark. / This is how we grew." |
| Project layout | Vertical stack (not sticky scroll) | Quantum Studio reference — 60/40 split per project |
| Corner brackets | CSS `::before`/`::after` pseudo-elements or inline divs, accent colour `#FF4D00`, 2px | No images |
| Chapter hooks | Centered mono text, `text-white/40`, `py-24` | Psychological curiosity between sections |
| Nova Studio | Removed | User instruction |
| STATUS.md | Project root, covers all site changes | Running changelog, not scoped to this feature |
| Placeholder copy | Used for The Big Six metadata fields | User confirmed copy will be replaced |

---

## Architecture

### Files Changed

| File | Action |
|---|---|
| `src/components/organisms/WorkHero.tsx` | EDIT — border colour only |
| `src/components/organisms/WorkScrollReveal.tsx` | REPLACE — new text, Intersection Observer animation |
| `src/components/organisms/WorkStickyArchive.tsx` | DELETE |
| `src/components/molecules/ChapterHook.tsx` | CREATE |
| `src/components/organisms/ProjectSection.tsx` | CREATE |
| `src/components/organisms/WorkPageContent.tsx` | EDIT — remove WorkStickyArchive, add ChapterHook + ProjectSection |
| `STATUS.md` | CREATE — project-root running changelog |

---

## Component Specs

### 1. `WorkHero.tsx` (edit only)

One line change: `border-white/10` → `border-[#FF4D00]/60`.

No other changes.

---

### 2. `WorkScrollReveal.tsx` (full replacement)

**Purpose:** Full-width section that reveals three editorial lines as they enter the viewport.

**Animation:** Intersection Observer on each line element. On intersection:
- `opacity: 0 → 1`
- `transform: translateY(16px) → translateY(0)`
- `transition: opacity 0.6s ease, transform 0.6s ease`
- Stagger: line 1 = 0ms delay, line 2 = 150ms, line 3 = 300ms (applied via `transitionDelay`)

**No Framer Motion.** Plain CSS transitions triggered by adding a class on intersection.

**Layout:**
```
<section className="py-32 px-8 md:px-16 flex flex-col items-center justify-center text-center">
  <p line 1>Every project starts with a problem.</p>
  <p line 2>Every solution leaves a mark.</p>
  <p line 3>This is how we grew.</p>
</section>
```

**Typography:** `font-headline font-black uppercase text-white leading-snug` at `clamp(2rem, 4vw, 4rem)`. Each line is an independent `<span>` or `<p>` element with its own observer ref and `transitionDelay`.

**`prefers-reduced-motion`:** When `prefers-reduced-motion: reduce` matches, skip animation — lines render visible immediately.

---

### 3. `ChapterHook.tsx` (new — molecules)

**Purpose:** Atmospheric inter-project text that creates narrative tension.

**Props:** `{ text: string }`

**Layout:**
```tsx
<div className="py-24 flex items-center justify-center px-8">
  <p className="font-mono text-white/40 text-center text-sm md:text-base tracking-widest uppercase max-w-xl">
    {text}
  </p>
</div>
```

No animation. Static, purely typographic.

---

### 4. `ProjectSection.tsx` (new — organisms)

**Purpose:** One full project displayed in the Quantum Studio 60/40 split-screen format.

**Props:**
```ts
type ProjectSectionProps = {
  ident: string;           // "CAFE CRAVE"
  sector: string;          // "HOSPITALITY"
  timeline: string;        // "Q4_2023 – PRESENT"
  status: string;          // "ACTIVE_TERMINAL"
  statusActive: boolean;   // true = green pulse dot
  authority: string;       // "ELITE_TIER"
  score: number;           // 93
  stack: string[];         // ["REACT", "NEXT.JS", "TAILWIND", "VERCEL"]
  descriptionHeading: string; // "THE_CONVERSION_ENGINE"
  descriptionBody: string;
  videoSrc: string;        // "/videos/CafeCrave.mp4"
  images: [string, string]; // two image paths
  imageAlts: [string, string];
  siteUrl: string;         // "#" or real URL
}
```

**Desktop layout (md+):** `flex flex-row`, `py-24 px-8 md:px-16`
- Left col: `w-[60%] flex flex-col gap-8 pr-16`
- Right col: `w-[40%] sticky top-24 self-start flex flex-col gap-8`

**Mobile layout:** stacked column, right col first (project name/score/metadata visible above fold), then left col (video/images/description). No sticky on mobile.

#### Left Column Contents

1. **Video container** with corner brackets:
   - Outer: `relative` wrapper
   - Corner brackets: four `<div>` elements positioned absolute at each corner. Each is `w-6 h-6`, `border-t-2 border-l-2 border-[#FF4D00]` (top-left), rotated variants for other corners. `pointer-events-none absolute`.
   - `<video autoPlay muted loop playsInline className="w-full aspect-video object-cover">` with `<source src={videoSrc} type="video/mp4">`
   - No border on the video itself — brackets are the framing device

2. **Two images side by side:**
   - `<div className="grid grid-cols-2 gap-4">`
   - Each: `<img src={images[n]} alt={imageAlts[n]} className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700">`

3. **Description block:**
   - Heading: `font-headline font-black uppercase text-white text-2xl md:text-3xl` — e.g. `THE_CONVERSION_ENGINE`
   - Body: `text-white/60 text-base leading-relaxed mt-2`

#### Right Column Contents

1. **Label row (top):**
   - Left: `<span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">PROJECT_IDENT</span>`
   - Right (same row): `<span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">PERFORMANCE</span>`

2. **Name + Score row:**
   - Left: project name in `font-headline font-black text-5xl md:text-7xl uppercase leading-none text-white` (2 lines if needed)
   - Right: `<span style={accentGradientStyle} className="font-headline font-black text-5xl md:text-6xl">93/100</span>`

3. **2×2 Metadata grid:** `grid grid-cols-2 gap-6 border-t border-white/10 pt-6`
   - Each cell: label `font-mono text-[10px] tracking-widest text-white/40 uppercase mb-1`, value `font-headline font-bold uppercase text-white text-sm md:text-base`
   - SECTOR | TIMELINE
   - STATUS (with optional green pulse dot if `statusActive`) | AUTHORITY

4. **Tech stack pills:** `flex flex-wrap gap-2`
   - Each: `<span className="px-3 py-1 border border-white/20 font-mono text-[11px] tracking-tight text-white/70 uppercase">`

5. **CTA button:** `<a href={siteUrl}>`
   - `w-full flex items-center justify-between px-6 py-5 bg-white/5 border border-white/10 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/5 transition-all duration-300 font-headline font-black uppercase tracking-widest text-white text-sm`
   - Label: `LAUNCH_EXPERIENCE` + `↗` icon (right-aligned)

---

### 5. `WorkPageContent.tsx` (edit)

```tsx
export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <WorkHero />
      <WorkScrollReveal />

      <ChapterHook text="A cafe losing customers before they even walked in." />
      <ProjectSection {...cafeCrave} />

      <ChapterHook text="Wanting to tell a story that actually stops people scrolling?" />
      <ProjectSection {...theBigSix} />
    </div>
  );
}
```

Project data objects defined in the same file as constants (not a separate data file — YAGNI).

---

## Project Data

### Cafe Crave
```ts
{
  ident: "CAFE CRAVE",
  sector: "HOSPITALITY",
  timeline: "Q4_2023 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "ELITE_TIER",
  score: 93,
  stack: ["REACT", "NEXT.JS", "TAILWIND", "VERCEL"],
  descriptionHeading: "THE_CONVERSION_ENGINE",
  descriptionBody: "Cafe Crave needed more than a menu online. They needed every visitor to feel the space before they arrived. We rebuilt their digital presence from the ground up — a React stack with live Google review integration and a reservation flow that converts.",
  videoSrc: "/videos/CafeCrave.mp4",
  images: ["/images/cafe-crave-1.jpg", "/images/cafe-crave-2.jpg"],
  imageAlts: ["Cafe Crave mobile UI", "Cafe Crave brand detail"],
  siteUrl: "#",
}
```

### The Big Six
```ts
{
  ident: "THE BIG SIX",
  sector: "BRANDING",
  timeline: "Q1_2024 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "PREMIUM_TIER",
  score: 95,
  stack: ["REACT", "TAILWIND CSS", "VERCEL"],
  descriptionHeading: "THE_RESTORATION_ARCHIVE",
  descriptionBody: "A restoration worth remembering deserves a site that can tell the story. Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
  videoSrc: "/videos/BigSix.mp4",
  images: ["/images/big-six-1.jpg", "/images/big-six-2.jpg"],
  imageAlts: ["The Big Six brand identity", "The Big Six detail shot"],
  siteUrl: "#",
}
```

---

## STATUS.md Structure

Located at project root. Sections:

```markdown
# LP Web Studio — Site Status

## Active Branch
## Completed Changes (log — newest first)
## Needs Testing
## Known Issues / Compromises
## SEO Checklist (per-page)
## Next Steps
```

---

## Mobile Responsiveness

| Section | Mobile behaviour |
|---|---|
| WorkHero | No change |
| WorkScrollReveal | Same observer animation, text scales down |
| ChapterHook | Full width, padding reduces to `py-16` |
| ProjectSection | Column layout — right col (metadata) first, left col (media) second. No sticky. |

---

## Out of Scope

- Changes to Navigation, Footer, or any other page
- Real image assets (placeholders used; user replaces)
- Writing final copy (user confirmed placeholder copy acceptable)
- Nova Studio (removed)
