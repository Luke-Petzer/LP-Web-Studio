# Work Page Redesign v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sticky-archive project display with a vertically-stacked, chapter-driven split-screen layout (Quantum Studio reference) for two projects: Cafe Crave and The Big Six.

**Architecture:** Surgical edits to `WorkHero` (border colour), full replacement of `WorkScrollReveal` (Intersection Observer, 3-line stagger), deletion of `WorkStickyArchive`, creation of `ChapterHook` and `ProjectSection` components, thin update to `WorkPageContent` to wire them together, and creation of a `STATUS.md` changelog at project root.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, framer-motion (WorkHero only — not used in new components), Intersection Observer API, TypeScript.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/organisms/WorkHero.tsx` | Edit | Change 1 border class |
| `src/components/organisms/WorkScrollReveal.tsx` | Replace | 3-line IO-driven reveal |
| `src/components/organisms/WorkStickyArchive.tsx` | Delete | Removed per redesign |
| `src/components/molecules/ChapterHook.tsx` | Create | Narrative inter-section text |
| `src/components/organisms/ProjectSection.tsx` | Create | 60/40 split project display |
| `src/components/organisms/WorkPageContent.tsx` | Edit | Wire new components, inline project data |
| `STATUS.md` | Create | Project-root running changelog |

---

## Task 1: WorkHero border colour

**Files:**
- Modify: `src/components/organisms/WorkHero.tsx:18`

- [ ] **Step 1: Edit the border class**

Open `src/components/organisms/WorkHero.tsx`. On line 18, the inner `div` has `border border-white/10`. Change it to `border border-[#FF4D00]/60`:

```tsx
// Before:
<div className="relative w-full h-[92vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-[#0A0A0A] border border-white/10 flex flex-col justify-end pb-16 px-8 md:px-16">

// After:
<div className="relative w-full h-[92vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-[#0A0A0A] border border-[#FF4D00]/60 flex flex-col justify-end pb-16 px-8 md:px-16">
```

- [ ] **Step 2: Visual verify**

Run `npm run dev`, open `http://localhost:3000/work`. The hero card border should be a faint orange-red. Nothing else on the hero should change.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkHero.tsx
git commit -m "feat(work): change hero border to accent orange-red"
```

---

## Task 2: Replace WorkScrollReveal — Intersection Observer, 3-line stagger

**Files:**
- Replace: `src/components/organisms/WorkScrollReveal.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/organisms/WorkScrollReveal.tsx
"use client";

import React, { useEffect, useRef } from "react";

const lines = [
  "Every project starts with a problem.",
  "Every solution leaves a mark.",
  "This is how we grew.",
];

export function WorkScrollReveal() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Respect reduced motion — skip animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      lineRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
      return;
    }

    const observers: IntersectionObserver[] = [];

    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      // Initial state
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-32 px-8 md:px-16 flex flex-col items-center justify-center text-center gap-4">
      {lines.map((line, i) => (
        <span
          key={i}
          ref={(el) => { lineRefs.current[i] = el; }}
          className="block font-headline font-black uppercase text-white leading-snug"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
        >
          {line}
        </span>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Visual verify**

Reload `http://localhost:3000/work`. Scroll down past the hero. The three lines should fade up one at a time with a slight stagger. Lines should NOT be visible before scrolling into view.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkScrollReveal.tsx
git commit -m "feat(work): replace scroll reveal — IO-driven 3-line stagger"
```

---

## Task 3: Create ChapterHook molecule

**Files:**
- Create: `src/components/molecules/ChapterHook.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/molecules/ChapterHook.tsx
import React from "react";

type ChapterHookProps = {
  text: string;
};

export function ChapterHook({ text }: ChapterHookProps) {
  return (
    <div className="py-24 flex items-center justify-center px-8">
      <p className="font-mono text-white/40 text-center text-sm md:text-base tracking-widest uppercase max-w-xl">
        {text}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/molecules/ChapterHook.tsx
git commit -m "feat(work): add ChapterHook molecule"
```

---

## Task 4: Create ProjectSection organism

**Files:**
- Create: `src/components/organisms/ProjectSection.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/organisms/ProjectSection.tsx
import React from "react";

export type ProjectSectionProps = {
  ident: string;
  sector: string;
  timeline: string;
  status: string;
  statusActive: boolean;
  authority: string;
  score: number;
  stack: string[];
  descriptionHeading: string;
  descriptionBody: string;
  videoSrc: string;
  images: [string, string];
  imageAlts: [string, string];
  siteUrl: string;
};

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function ProjectSection({
  ident,
  sector,
  timeline,
  status,
  statusActive,
  authority,
  score,
  stack,
  descriptionHeading,
  descriptionBody,
  videoSrc,
  images,
  imageAlts,
  siteUrl,
}: ProjectSectionProps) {
  // Split ident into words so each line is large — e.g. "CAFE\nCRAVE"
  const identLines = ident.split(" ");

  return (
    <section className="flex flex-col md:flex-row py-16 md:py-24 px-6 md:px-16 gap-12 md:gap-16">

      {/* ── LEFT (60%) — Media + Description ── */}
      {/* On mobile: order-2 (below metadata) */}
      <div className="w-full md:w-[60%] flex flex-col gap-8 order-2 md:order-1">

        {/* Video with corner brackets */}
        <div className="relative">
          {/* Top-left bracket */}
          <div
            className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderTop: "2px solid #FF4D00",
              borderLeft: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Top-right bracket */}
          <div
            className="absolute -top-3 -right-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderTop: "2px solid #FF4D00",
              borderRight: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Bottom-left bracket */}
          <div
            className="absolute -bottom-3 -left-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderBottom: "2px solid #FF4D00",
              borderLeft: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Bottom-right bracket */}
          <div
            className="absolute -bottom-3 -right-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderBottom: "2px solid #FF4D00",
              borderRight: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />

          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
            aria-label={`${ident} project preview`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        {/* Two images side by side */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={imageAlts[i]}
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <h3 className="font-headline font-black uppercase text-white text-2xl md:text-3xl">
            {descriptionHeading}
          </h3>
          <p className="text-white/60 text-base leading-relaxed">
            {descriptionBody}
          </p>
        </div>
      </div>

      {/* ── RIGHT (40%) — Metadata, sticky on desktop ── */}
      {/* On mobile: order-1 (above media) */}
      <div className="w-full md:w-[40%] flex flex-col gap-8 order-1 md:order-2 md:sticky md:top-24 md:self-start">

        {/* Label row */}
        <div className="flex justify-between items-start">
          <span className="mono-label">PROJECT_IDENT</span>
          <span className="mono-label">PERFORMANCE</span>
        </div>

        {/* Name + Score row */}
        <div className="flex justify-between items-end gap-4">
          <h2
            className="font-headline font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {identLines.map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < identLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <span
            className="font-headline font-black leading-none shrink-0"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", ...accentStyle }}
          >
            {score}/100
          </span>
        </div>

        {/* 2×2 metadata grid */}
        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="mono-label mb-1">SECTOR</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {sector}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">TIMELINE</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {timeline}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">STATUS</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base flex items-center gap-2">
              {statusActive && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              )}
              {status}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">AUTHORITY</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {authority}
            </p>
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={siteUrl}
          target={siteUrl !== "#" ? "_blank" : undefined}
          rel={siteUrl !== "#" ? "noopener noreferrer" : undefined}
          className="w-full flex items-center justify-between px-6 py-5 border border-white/10 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/5 transition-all duration-300 font-headline font-black uppercase tracking-widest text-white text-sm"
        >
          LAUNCH_EXPERIENCE
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/organisms/ProjectSection.tsx
git commit -m "feat(work): add ProjectSection organism — 60/40 split screen"
```

---

## Task 5: Update WorkPageContent — wire chapter hooks and project sections, delete WorkStickyArchive

**Files:**
- Replace: `src/components/organisms/WorkPageContent.tsx`
- Delete: `src/components/organisms/WorkStickyArchive.tsx`

- [ ] **Step 1: Replace WorkPageContent.tsx**

```tsx
// src/components/organisms/WorkPageContent.tsx
import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { WorkHero } from "@/components/organisms/WorkHero";
import { WorkScrollReveal } from "@/components/organisms/WorkScrollReveal";
import { ChapterHook } from "@/components/molecules/ChapterHook";
import { ProjectSection, type ProjectSectionProps } from "@/components/organisms/ProjectSection";

const cafeCrave: ProjectSectionProps = {
  ident: "CAFE CRAVE",
  sector: "HOSPITALITY",
  timeline: "Q4_2023 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "ELITE_TIER",
  score: 93,
  stack: ["REACT", "NEXT.JS", "TAILWIND", "VERCEL"],
  descriptionHeading: "THE_CONVERSION_ENGINE",
  descriptionBody:
    "Cafe Crave needed more than a menu online. They needed every visitor to feel the space before they arrived. We rebuilt their digital presence from the ground up — a React stack with live Google review integration and a reservation flow that converts.",
  videoSrc: "/videos/CafeCrave.mp4",
  images: ["/images/cafe-crave-1.jpg", "/images/cafe-crave-2.jpg"],
  imageAlts: ["Cafe Crave mobile UI", "Cafe Crave brand detail"],
  siteUrl: "#",
};

const theBigSix: ProjectSectionProps = {
  ident: "THE BIG SIX",
  sector: "BRANDING",
  timeline: "Q1_2024 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "PREMIUM_TIER",
  score: 95,
  stack: ["REACT", "TAILWIND CSS", "VERCEL"],
  descriptionHeading: "THE_RESTORATION_ARCHIVE",
  descriptionBody:
    "A restoration worth remembering deserves a site that can tell the story. Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
  videoSrc: "/videos/BigSix.mp4",
  images: ["/images/big-six-1.jpg", "/images/big-six-2.jpg"],
  imageAlts: ["The Big Six brand identity", "The Big Six detail shot"],
  siteUrl: "#",
};

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

- [ ] **Step 2: Delete WorkStickyArchive**

```bash
rm src/components/organisms/WorkStickyArchive.tsx
```

- [ ] **Step 3: TypeScript build check**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors, they will be about `WorkStickyArchive` — confirm the file is deleted and no other file imports it.

```bash
grep -r "WorkStickyArchive" src/
```

Expected: no results.

- [ ] **Step 4: Visual verify**

Load `http://localhost:3000/work`. Expected flow:
1. Hero with orange-red border ✓
2. Scroll reveal — three lines fade up ✓
3. Chapter hook: "A cafe losing customers…" ✓
4. Cafe Crave project section — video (plays), two image placeholders (broken OK for now), description, right metadata, CTA ✓
5. Chapter hook: "Wanting to tell a story…" ✓
6. The Big Six — same structure ✓

- [ ] **Step 5: Commit**

```bash
git add src/components/organisms/WorkPageContent.tsx
git commit -m "feat(work): wire ChapterHook + ProjectSection, remove WorkStickyArchive"
```

---

## Task 6: Create STATUS.md at project root

**Files:**
- Create: `STATUS.md`

- [ ] **Step 1: Create the file**

```markdown
# LP Web Studio — Site Status

A running changelog of all changes made to this website. Newest entries first.

---

## Active Branch
`dev/main-refresh`

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
- `STATUS.md` entry dates are ISO absolute dates, not relative

---

## SEO Checklist

### /work
- [x] Page title set (`Our Work — LP Web Studio`)
- [x] Meta description set
- [ ] JSON-LD structured data added for Cafe Crave project
- [ ] JSON-LD structured data added for The Big Six project
- [x] Videos have `aria-label` attributes
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
```

- [ ] **Step 2: Commit**

```bash
git add STATUS.md
git commit -m "docs: add STATUS.md — project-root site changelog"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Hero border → Task 1
- [x] WorkScrollReveal 3-line IO → Task 2
- [x] ChapterHook molecule → Task 3
- [x] ProjectSection 60/40 split (video + corner brackets, 2 images, description left; metadata grid, score, pills, CTA right) → Task 4
- [x] WorkPageContent wired with both projects and 2 chapter hooks → Task 5
- [x] WorkStickyArchive deleted → Task 5
- [x] Nova Studio removed → not present in any task
- [x] STATUS.md at project root → Task 6
- [x] prefers-reduced-motion → Task 2 Step 1

**Placeholder scan:** None — all code blocks are complete.

**Type consistency:** `ProjectSectionProps` defined in Task 4 and imported by name in Task 5. `images` typed as `[string, string]` and used consistently. `accentStyle` is a local `React.CSSProperties` const in `ProjectSection.tsx` — not exported, not referenced elsewhere.

**Image paths:** `public/images/` does not exist yet. The `<img>` tags will render broken until images are added. This is documented in STATUS.md under Known Issues.
