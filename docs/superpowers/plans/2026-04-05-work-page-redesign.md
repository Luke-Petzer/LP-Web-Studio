# Work Page Redesign — Systems Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `/work` page with a three-section scroll-driven "Systems Archive" — a full-viewport hero, a scroll-reveal editorial sentence, and a sticky 3D-flip project archive.

**Architecture:** Four new components (`GeometricCanvas`, `WorkHero`, `WorkScrollReveal`, `WorkStickyArchive`) replace `WorkPageContent.tsx`. A fixed SVG canvas persists behind all sections. Project switching is driven purely by `useScroll` progress mapped to `activeIndex` state; Framer Motion `AnimatePresence` handles the 3D flip on desktop.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS, Framer Motion, TypeScript. No test framework is installed — verification steps use `npx tsc --noEmit` and `npm run build`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/atoms/GeometricCanvas.tsx` | CREATE | Static full-page fixed SVG architectural line layer |
| `src/components/organisms/WorkHero.tsx` | CREATE | Full-viewport hero with background photo, headline, section label |
| `src/components/organisms/WorkScrollReveal.tsx` | CREATE | Scroll-pinned editorial sentence |
| `src/components/organisms/WorkStickyArchive.tsx` | CREATE | Sticky 35/65 project archive with 3D flip transitions |
| `src/components/organisms/WorkPageContent.tsx` | REPLACE | Thin compositor: assembles the four components above |
| `src/app/work/page.tsx` | EDIT | Remove `pt-[160px]` from `<main>` — hero owns its top spacing |

---

## Shared Constant — Gradient Text Style

This inline style object is used in `WorkHero`, `WorkScrollReveal`, and `WorkStickyArchive`. It is defined locally in each file (not extracted) to keep each component self-contained.

```ts
const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};
```

---

## Task 1: GeometricCanvas atom

**Files:**
- Create: `src/components/atoms/GeometricCanvas.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/atoms/GeometricCanvas.tsx

export function GeometricCanvas() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Long diagonals */}
      <line x1="0"   y1="200" x2="1440" y2="700" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="0"   y1="600" x2="1440" y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="200" y1="0"   x2="900"  y2="900" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="800" y1="0"   x2="1440" y2="600" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

      {/* Hairline horizontals */}
      <line x1="0" y1="150" x2="1440" y2="150" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="350" x2="1440" y2="350" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="550" x2="1440" y2="550" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="720" x2="1440" y2="720" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
      <line x1="0" y1="820" x2="1440" y2="820" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />

      {/* Hairline verticals */}
      <line x1="360"  y1="0" x2="360"  y2="900" stroke="white" strokeOpacity="0.02" strokeWidth="0.5" />
      <line x1="1080" y1="0" x2="1080" y2="900" stroke="white" strokeOpacity="0.02" strokeWidth="0.5" />

      {/* Large inset rectangle */}
      <rect x="72" y="45" width="1296" height="810" fill="none" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

      {/* Corner brackets — top-left */}
      <polyline points="72,120 72,45 147,45"    fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      {/* Corner brackets — bottom-right */}
      <polyline points="1368,780 1368,855 1293,855" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      {/* Corner brackets — top-right */}
      <polyline points="1293,45 1368,45 1368,120"   fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
      {/* Corner brackets — bottom-left */}
      <polyline points="147,855 72,855 72,780"       fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
    </svg>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors (this component has no imports, no hooks — it's trivially correct).

- [ ] **Step 3: Commit**

```bash
git add src/components/atoms/GeometricCanvas.tsx
git commit -m "feat(work): add GeometricCanvas fixed SVG background atom"
```

---

## Task 2: WorkHero organism

**Files:**
- Create: `src/components/organisms/WorkHero.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/organisms/WorkHero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function WorkHero() {
  return (
    <section className="relative h-screen overflow-hidden flex flex-col justify-end pb-16 px-8 md:px-16">
      {/* Background photo */}
      <Image
        src="/Portfolio-Page.png"
        alt=""
        fill
        priority
        className="object-cover brightness-50"
        sizes="100vw"
      />

      {/* Top-left label */}
      <div className="absolute top-8 left-8 md:left-16 z-10 flex items-center gap-4">
        <div className="w-8 h-[1px] bg-white/40" />
        <span className="section-label font-mono">SYSTEM_PROTOCOL_001</span>
      </div>

      {/* Top-right corner bracket */}
      <svg
        className="absolute top-6 right-6 z-10"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <polyline
          points="0,40 0,0 40,0"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Headline */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
      >
        <h1
          className="font-headline font-black uppercase text-white leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
        >
          WE DON&apos;T BUILD,
          <br />
          WE BENCHMARK<span style={accentStyle}>.</span>
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute right-6 bottom-24 z-10 hidden md:flex flex-col items-center gap-2">
        <span
          className="font-mono text-[10px] tracking-widest text-white/30 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkHero.tsx
git commit -m "feat(work): add WorkHero section with photo background and headline"
```

---

## Task 3: WorkScrollReveal organism

**Files:**
- Create: `src/components/organisms/WorkScrollReveal.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/organisms/WorkScrollReveal.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function WorkScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.p
          className="font-headline font-black uppercase text-white text-center leading-tight max-w-5xl mx-auto px-8"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)",
            opacity,
            y,
          }}
        >
          ENGINEERING AT THE THRESHOLD OF HARDWARE LIMITATION
          <span style={accentStyle}>.</span>
        </motion.p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkScrollReveal.tsx
git commit -m "feat(work): add WorkScrollReveal scroll-pinned editorial sentence"
```

---

## Task 4: WorkStickyArchive organism

**Files:**
- Create: `src/components/organisms/WorkStickyArchive.tsx`

This is the most complex component. Read the full code carefully before implementing.

- [ ] **Step 1: Create the file**

```tsx
// src/components/organisms/WorkStickyArchive.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  score: string;
  stack: string[];
  siteUrl: string;
  videoSrc: string;
};

const projects: Project[] = [
  {
    id: "nova-studio",
    index: "001",
    title: "Nova Studio",
    category: "Agency Demo",
    description:
      "Premium visual experience engineered without sacrificing technical SEO. Tailwind v4 with optimised Next.js image components and CSS-native masking.",
    score: "91",
    stack: ["Next.js 15", "Tailwind v4", "Vercel"],
    siteUrl: "#",
    videoSrc: "/videos/nova-studio.mp4",
  },
  {
    id: "cafe-crave",
    index: "002",
    title: "Cafe Crave",
    category: "Hospitality",
    description:
      "Real-time ordering engine built to bypass delivery apps and own customer data directly. Engineered for sub-100ms latency in retail environments.",
    score: "93",
    stack: ["Next.js", "Tailwind", "Railway"],
    siteUrl: "#",
    videoSrc: "/videos/cafe-crave.mp4",
  },
  {
    id: "big-six",
    index: "003",
    title: "The Big Six",
    category: "Branding",
    description:
      "Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
    score: "95",
    stack: ["React", "Tailwind CSS", "Vercel"],
    siteUrl: "#",
    videoSrc: "/videos/big-six.mp4",
  },
];

export function WorkStickyArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop without SSR mismatch
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveIndex(0);
    else if (v < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const active = projects[activeIndex];

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden bg-obsidian">

        {/* ── Left column (35%) ── */}
        <div className="w-full md:w-[35%] h-[55%] md:h-full flex flex-col justify-center px-8 md:px-12 py-8 md:py-16 z-10 border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto">

          {/* Static section label */}
          <span className="section-label font-mono">PORTFOLIO.SYS</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="flex flex-col"
            >
              {/* Project ID */}
              <span
                className="font-mono text-xs tracking-widest mt-8"
                style={accentStyle}
              >
                //:.ID:.{active.index}
              </span>

              {/* Title */}
              <h2
                className="font-headline font-black uppercase text-white leading-none mt-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
              >
                {active.title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mt-6 max-w-sm">
                {active.description}
              </p>

              {/* Performance metric */}
              <div className="mt-8">
                <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Performance Metric
                </p>
                <div className="flex items-start leading-none mt-1">
                  <span
                    className="font-headline font-black leading-none"
                    style={{
                      fontSize: "clamp(4rem, 7vw, 8rem)",
                      ...accentStyle,
                    }}
                  >
                    {active.score}
                  </span>
                  <span className="font-headline text-2xl text-white/40 mt-3 ml-1">
                    /100
                  </span>
                </div>
              </div>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {active.stack.map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={active.siteUrl}
                className="btn-ghost text-sm mt-8 w-fit"
                target={active.siteUrl !== "#" ? "_blank" : undefined}
                rel={
                  active.siteUrl !== "#" ? "noopener noreferrer" : undefined
                }
              >
                VISIT SITE ↗
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right column (65%) ── */}
        <div className="w-full md:w-[65%] flex-1 md:flex-none relative bg-[#141414]">

          {/* Live preview label */}
          <span className="absolute top-6 right-6 z-20 font-mono text-[10px] text-white/30 tracking-widest">
            LIVE_PREVIEW_{active.index}.EXE
          </span>

          {/* Corner bracket */}
          <svg
            className="absolute top-6 left-6 z-20"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <polyline
              points="32,0 0,0 0,32"
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="1"
              fill="none"
            />
          </svg>

          {/* Video container with 3D flip (desktop) or opacity fade (mobile) */}
          <div
            className="absolute inset-0"
            style={isDesktop ? { perspective: "1200px" } : undefined}
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={active.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                initial={
                  isDesktop
                    ? { rotateX: 90, opacity: 0 }
                    : { opacity: 0 }
                }
                animate={
                  isDesktop
                    ? { rotateX: 0, opacity: 1 }
                    : { opacity: 1 }
                }
                exit={
                  isDesktop
                    ? { rotateX: -90, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
                    : { opacity: 0 }
                }
                transition={
                  isDesktop
                    ? { type: "spring", stiffness: 200, damping: 20 }
                    : { duration: 0.3 }
                }
                style={
                  isDesktop
                    ? { transformOrigin: "center top" }
                    : undefined
                }
              >
                <source src={active.videoSrc} type="video/mp4" />
              </motion.video>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkStickyArchive.tsx
git commit -m "feat(work): add WorkStickyArchive with scroll-driven 3D flip transitions"
```

---

## Task 5: Replace WorkPageContent

**Files:**
- Modify: `src/components/organisms/WorkPageContent.tsx`

The existing file is a full component (~180 lines). Replace it entirely.

- [ ] **Step 1: Replace the file content**

```tsx
// src/components/organisms/WorkPageContent.tsx
import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { WorkHero } from "@/components/organisms/WorkHero";
import { WorkScrollReveal } from "@/components/organisms/WorkScrollReveal";
import { WorkStickyArchive } from "@/components/organisms/WorkStickyArchive";

export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <WorkHero />
      <WorkScrollReveal />
      <WorkStickyArchive />
    </div>
  );
}
```

Note: No `"use client"` directive — this is a Server Component that imports Client Component islands.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkPageContent.tsx
git commit -m "feat(work): replace WorkPageContent with compositor for new sections"
```

---

## Task 6: Edit work/page.tsx

**Files:**
- Modify: `src/app/work/page.tsx`

Remove `pt-[160px]` from `<main>`. The `WorkHero` is `h-screen` and owns its own top positioning — the old padding was for the previous layout that started below the nav.

- [ ] **Step 1: Edit the file**

Current `<main>` line:
```tsx
<main className="pt-[160px] pb-structural">
```

Replace with:
```tsx
<main className="pb-structural">
```

Full updated file for reference:
```tsx
import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Our Work — LP Web Studio",
    description:
        "Real businesses. Real code. 90+ Performance Scores. Explore our portfolio of high-performance websites built for Cape Town small businesses.",
    openGraph: {
        title: "Our Work — LP Web Studio",
        description:
            "We don't just build. We benchmark. Real businesses, real code, 90+ scores.",
    },
};

export default function WorkPage() {
    return (
        <>
            <Navigation />
            <main className="pb-structural">
                <WorkPageContent />
            </main>
            <Footer />
        </>
    );
}
```

- [ ] **Step 2: Type-check and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: clean build, no TypeScript errors. Next.js will report page sizes — the work page bundle should not be unexpectedly large.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000/work` and verify:
- Hero: full-viewport, architectural photo visible, headline scales, gradient period renders correctly
- Scroll down: editorial sentence fades in and slides up
- Continue scrolling: sticky archive locks, left column shows project 001 → 002 → 003 as you scroll through `h-[300vh]`
- Right column: 3D flip between projects (desktop), fade (mobile/narrow viewport)
- Performance metric: large gradient number visible, `/100` in muted white beside it
- GeometricCanvas lines visible faintly behind all sections
- Navigation pill behaviour unchanged
- Footer appears cleanly after the archive section

- [ ] **Step 4: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat(work): remove legacy top padding from work page, hero owns spacing"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task covering it |
|---|---|
| GeometricCanvas fixed layer, 3% opacity, diagonals + brackets + horizontals | Task 1 |
| Hero: architectural photo background, brightness overlay | Task 2 |
| Hero: `SYSTEM_PROTOCOL_001` label with dash | Task 2 |
| Hero: `WE DON'T BUILD, / WE BENCHMARK.` with gradient period | Task 2 |
| Hero: corner bracket top-right | Task 2 |
| Hero: vertical SCROLL indicator | Task 2 |
| Hero: Framer Motion entry animation on headline | Task 2 |
| Scroll reveal: `h-[150vh]` sticky pin | Task 3 |
| Scroll reveal: `ENGINEERING AT THE THRESHOLD...` with gradient period | Task 3 |
| Scroll reveal: opacity + y transform driven by scroll | Task 3 |
| Sticky archive: `h-[300vh]` outer, `sticky top-0 h-screen` inner | Task 4 |
| Sticky archive: 35/65 split, no alternating sides | Task 4 |
| Sticky archive: `PORTFOLIO.SYS` static label | Task 4 |
| Sticky archive: `//:.ID:.00n` project ID in gradient text | Task 4 |
| Sticky archive: title, description, stack pills, CTA | Task 4 |
| Sticky archive: performance metric (score + `/100`) in gradient text | Task 4 |
| Sticky archive: `LIVE_PREVIEW_00n.EXE` label on right | Task 4 |
| Sticky archive: corner bracket top-left of right column | Task 4 |
| Sticky archive: `<video autoPlay loop muted playsInline>` | Task 4 |
| Sticky archive: stubbed video paths `/videos/*.mp4` | Task 4 |
| Sticky archive: 3D flip on desktop (`rotateX`, `perspective: 1200px`) | Task 4 |
| Sticky archive: opacity fade on mobile | Task 4 |
| Sticky archive: `useMotionValueEvent` scroll → activeIndex | Task 4 |
| WorkPageContent replaced as thin compositor | Task 5 |
| `pt-[160px]` removed from `page.tsx` | Task 6 |
| Gradient text = `linear-gradient(135deg, #FF4D00, #B81D1D)` | All tasks |
| Navigation and Footer unchanged | Not in scope — no tasks needed |

All requirements covered. No placeholders found.
