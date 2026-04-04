# Main Site Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul LP Web Studio's homepage with a warm light hero, exponential spacing, ambient particle system, sticky-scroll dark process section, amber B2B callout, and a dark pricing section — all flowing as a coherent brand narrative.

**Architecture:** Nine sequential tasks — tokens first, atoms, then sections top-to-bottom, ending with page-level orchestration. Every task produces a working, visually correct result before the next begins.

**Tech Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS v3, Framer Motion, canvas API (particle system)

---

## Color System

| Token | Hex | Role |
|---|---|---|
| `--accent` | `#FEB05D` → `rgb(254 176 93)` | Amber — primary accent, replaces blue-700 |
| bg-paper | `#F5F2F2` | Warm off-white — hero, testimonial, contact |
| bg-carbon | `#2B2A2A` | Warm near-black — capabilities, pricing |
| bg-deep | `#0d0d0d` | Near-black — process section only |
| B2B callout | `#FEB05D` | Amber — full-bleed proof section |

## Section Color Rhythm (7 sections)

```
1. Hero           #F5F2F2  light    HOOK       — unexpected light start
2. Process        #0d0d0d  dark     METHOD     — dramatic shift, sticky scroll
3. Capabilities   #2B2A2A  dark     WHAT       — dark continuation
4. B2B Callout    #FEB05D  amber    PROOF      — amber punctuation mark
5. Testimonial    #F5F2F2  light    TRUST      — warm, human, breathing room
6. Pricing        #2B2A2A  dark     DECISION   — serious, commit
7. Contact        #F5F2F2  light    ACTION     — open, welcoming
```

Rhythm: **LIGHT → dark → dark → AMBER → LIGHT → dark → LIGHT**

Removed from original plan: `SpeedRevenueBanner` (redundant with hero hook), `PortfolioSection` (replaced by B2BCallout; full portfolio lives at `/work`).

---

## File Map

| File | Action | What Changes |
|---|---|---|
| `src/app/globals.css` | Modify | `--accent` token, spacing, `mercury-btn` gradient, `mesh-transition` → paper |
| `tailwind.config.ts` | Modify | Add `paper`, `carbon` color tokens; update spacing |
| `src/components/atoms/ParticleField.tsx` | **Create** | Canvas particle system; `color` prop: `"light"` or `"dark"` |
| `src/components/molecules/HeroContent.tsx` | Modify | Light bg, dark text, dark particles, amber accent glow |
| `src/components/molecules/NavClient.tsx` | Modify | Always-light nav state (hero is now light, not dark) |
| `src/components/organisms/ProcessSection.tsx` | **Full rewrite** | `#0d0d0d` bg, sticky left, 3 dark-glass cards with amber accent only |
| `src/components/organisms/CoreCapabilitiesSection.tsx` | Modify | Amber glow, padding increase |
| `src/components/organisms/B2BCallout.tsx` | **Create** | Full-bleed amber `#FEB05D` proof section; replaces PortfolioSection |
| `src/components/organisms/TestimonialSection.tsx` | Modify | `#F5F2F2` bg, remove blue diagonal pattern, expand padding |
| `src/components/organisms/PricingSection.tsx` | **Full rewrite** | `#2B2A2A` bg, amber featured card |
| `src/app/page.tsx` | Modify | 7-section order, remove SpeedRevenueBanner + PortfolioSection, add B2BCallout |

---

## Task 1: Design Tokens

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `:root` block in `src/app/globals.css`**

```css
@layer base {
  :root {
    /* ─── Brand Tokens ─── */
    --accent: 254 176 93;           /* #FEB05D amber */
    --bg-void: 10 10 10;
    --bg-carbon: 43 42 42;          /* #2B2A2A warm near-black */
    --bg-paper: 245 242 242;        /* #F5F2F2 warm off-white */
    --bg-white: 255 255 255;
    --ink: 26 26 26;
    --slate: 148 163 184;
    --text-ghost: 248 250 252;

    /* ─── Exponential Spacing Scale ─── */
    --spacing-hairline: 4px;
    --spacing-base: 8px;
    --spacing-component: 16px;
    --spacing-sectional: 24px;
    --spacing-atmospheric: 40px;
    --spacing-structural: 96px;
    --spacing-grandeur: 128px;
    --spacing-epic: 160px;

    /* ─── Nav height tokens ─── */
    --nav-height-expanded: 72px;
    --nav-height-bubble: 64px;

    /* ─── Motion Easing ─── */
    --easing: cubic-bezier(.62, .16, .13, 1.01);

    /* ─── Glass Tokens ─── */
    --glass-bg: rgb(var(--bg-white) / 0.05);
    --glass-border: rgb(var(--bg-white) / 0.1);
    --glass-border-dim: rgb(var(--bg-white) / 0.05);
  }
```

- [ ] **Step 2: Update `.mercury-btn` gradient**

```css
  .mercury-btn {
    position: relative;
    background: linear-gradient(135deg, #feb05d 0%, #e8963a 100%);
    border-radius: 9999px;
  }
```

- [ ] **Step 3: Update `.mesh-transition` — hero is now paper/light**

```css
  .mesh-transition {
    background: #F5F2F2;
  }
```

- [ ] **Step 4: Update `tailwind.config.ts` colors block — add `paper` and `carbon`**

Inside `theme.extend.colors`, after `ghost`:

```ts
        paper: "rgb(var(--bg-paper) / <alpha-value>)",
        carbon: "rgb(var(--bg-carbon) / <alpha-value>)",
```

- [ ] **Step 5: Update spacing in `tailwind.config.ts`**

```ts
      spacing: {
        hairline: "4px",
        base: "8px",
        component: "16px",
        sectional: "24px",
        atmospheric: "40px",
        structural: "96px",
        grandeur: "128px",
        epic: "160px",
      },
```

- [ ] **Step 6: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 7: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/app/globals.css tailwind.config.ts
git commit -m "feat(tokens): amber accent, warm palette, exponential spacing, paper hero bg"
```

---

## Task 2: ParticleField Atom

**Files:**
- Create: `src/components/atoms/ParticleField.tsx`

The `color` prop controls particle color: `"dark"` renders `rgba(43,42,42,opacity)` for the light hero; `"light"` renders `rgba(255,255,255,opacity)` for dark sections if ever needed.

- [ ] **Step 1: Create `src/components/atoms/ParticleField.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

interface ParticleFieldProps {
    /** "dark" = dark particles for light backgrounds (hero).
     *  "light" = white particles for dark backgrounds. */
    color?: "dark" | "light";
}

/**
 * ParticleField — Client Atom
 * Canvas-based ambient particle system. 55 slow-drifting dots, wraps at edges.
 * Fully disabled when prefers-reduced-motion is set.
 */
export function ParticleField({ color = "light" }: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animFrameId: number;

        const setSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setSize();
        window.addEventListener("resize", setSize);

        const COUNT = 55;
        const particles: Particle[] = Array.from({ length: COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            radius: Math.random() * 1.4 + 0.4,
            opacity: Math.random() * 0.18 + 0.05,
        }));

        // Dark particles for light bg, white particles for dark bg
        const rgb = color === "dark" ? "43, 42, 42" : "255, 255, 255";

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
                ctx.fill();
            }
            animFrameId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener("resize", setSize);
        };
    }, [shouldReduceMotion, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            aria-hidden="true"
        />
    );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/atoms/ParticleField.tsx
git commit -m "feat(atom): ParticleField with dark/light color prop for hero"
```

---

## Task 3: HeroContent — Light Background

**Files:**
- Modify: `src/components/molecules/HeroContent.tsx`

Hero is now `#F5F2F2`. All text flips to dark (`#2B2A2A`). Particles use `color="dark"`. The amber glow becomes a subtle warm radial instead of the blue one.

- [ ] **Step 1: Rewrite `src/components/molecules/HeroContent.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";
import { ParticleField } from "@/components/atoms/ParticleField";
import { MercuryButton } from "@/components/molecules/MercuryButton";

const lineContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
};

const lineReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 30 },
    },
};

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut", delay: 0.55 },
    },
};

const ctaReveal: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.75 },
    },
};

export function HeroContent() {
    const heroRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"]
    );

    return (
        <div
            ref={heroRef}
            className="mesh-transition relative min-h-screen overflow-hidden flex items-center"
        >
            {/* ── Layer 0: Grain texture — lighter opacity on light bg ── */}
            <GrainOverlay className="opacity-30" />

            {/* ── Layer 1: Dark ambient particles on light bg ─────────── */}
            <ParticleField color="dark" />

            {/* ── Layer 2: Warm amber radial glow — bottom-right ──────── */}
            <div
                aria-hidden="true"
                className="absolute z-[2] pointer-events-none inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 50% at 80% 70%, rgba(254,176,93,0.12) 0%, transparent 70%)",
                }}
            />

            {/* ── Layer 3: Headline (slow parallax) ─────────────────── */}
            <motion.div
                style={{ y: textY }}
                className="absolute inset-0 z-10 flex flex-col justify-center
                           px-6 md:px-12 lg:px-20"
            >
                <motion.div
                    variants={lineContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl"
                >
                    {/* Label */}
                    <motion.p
                        variants={lineReveal}
                        className="font-mono text-[11px] uppercase tracking-[0.35em] mb-6"
                        style={{ color: "rgba(43,42,42,0.35)" }}
                    >
                        LP Web Studio — Cape Town
                    </motion.p>

                    {/* H1 */}
                    <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.93] text-left">
                        <motion.span
                            variants={lineReveal}
                            className="block text-[clamp(28px,4vw,58px)]"
                            style={{ color: "rgba(43,42,42,0.40)" }}
                        >
                            Your website is
                        </motion.span>
                        <motion.span
                            variants={lineReveal}
                            className="block text-accent text-[clamp(46px,7.5vw,108px)]"
                        >
                            Leaking Revenue.
                        </motion.span>
                    </h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-base md:text-lg max-w-lg leading-relaxed mt-12 mb-12"
                        style={{ color: "rgba(43,42,42,0.55)" }}
                    >
                        Custom-engineered React applications.{" "}
                        <span style={{ color: "#2B2A2A" }} className="font-medium">
                            Guaranteed 90+ PageSpeed.
                        </span>{" "}
                        Built for businesses that can&apos;t afford to be slow.
                    </motion.p>

                    {/* CTA row */}
                    <motion.div
                        variants={ctaReveal}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col md:flex-row items-start md:items-center gap-4"
                    >
                        <MercuryButton />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── Scroll indicator ─────────────────────────────────────── */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
                           flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: "rgba(43,42,42,0.25)" }}>
                    Scroll
                </span>
                <motion.div
                    className="w-[1px] h-8"
                    style={{ background: "linear-gradient(to bottom, rgba(43,42,42,0.20), transparent)" }}
                    animate={shouldReduceMotion ? {} : { scaleY: [1, 0.3, 1], originY: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}
```

- [ ] **Step 2: Update `MercuryButton` secondary link color for light bg**

In `src/components/molecules/MercuryButton.tsx`, the secondary link is currently `text-white/40`. On a light hero this is invisible. Change line 52:

```tsx
// OLD
className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-2"

// NEW
className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
style={{ color: "rgba(43,42,42,0.40)" }}
```

And remove the Framer `animate` color override on the same element — replace `whileHover` color:

```tsx
// OLD
whileHover={shouldReduceMotion ? {} : { color: "rgba(255,255,255,0.8)", x: 3 }}

// NEW
whileHover={shouldReduceMotion ? {} : { color: "rgba(43,42,42,0.80)", x: 3 }}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/molecules/HeroContent.tsx src/components/molecules/MercuryButton.tsx
git commit -m "feat(hero): light paper bg, dark text, dark particles, amber radial glow"
```

---

## Task 4: NavClient — Always-Light State

**Files:**
- Modify: `src/components/molecules/NavClient.tsx`

The hero is now light (`#F5F2F2`). The nav must show dark text and dark logo from scroll=0. The current logic sets `isLight = false` on the homepage at scroll=0, which was correct for a dark hero but is now wrong.

**One-line fix:** remove the `scrolled` condition from `isLight` on the homepage — the nav is always light since both the hero and the bubble state use light glass.

- [ ] **Step 1: Update `isLight` logic in `NavClient.tsx`**

Find line 46:

```tsx
// OLD
const forceLight = !isHomepage;
const isLight = forceLight || scrolled;

// NEW — hero is light, so homepage nav is always light too
const forceLight = !isHomepage;
const isLight = forceLight || isHomepage || scrolled;
```

This means on the homepage: `isLight = true` always. The nav logo won't be inverted, nav text is dark from the first scroll position.

- [ ] **Step 2: Update scrolled bubble background for homepage**

Currently on homepage at scroll=0 the nav bg is `rgba(0,0,0,0.0)` (transparent dark). With `isLight = true`, it correctly switches to `rgba(255,255,255,0.0)` transparent light. The bubble at scroll>80 becomes `rgba(255,255,255,0.88)` — a white glass pill. This is correct for scrolling over the dark Process section (the white bubble floats over dark content cleanly).

No further code changes needed — the existing `isLight` conditional already handles bg and border colors correctly.

- [ ] **Step 3: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/molecules/NavClient.tsx
git commit -m "fix(nav): always-light state for light hero — dark text from scroll-0"
```

---

## Task 5: ProcessSection — Dark Glass Cards

**Files:**
- Modify: `src/components/organisms/ProcessSection.tsx`

All three cards use the same dark glass treatment — `rgba(245,242,242,0.05)` on `#0d0d0d`. Numbers are amber. Titles are paper. No multi-color cards. The sticky left panel stays. Progress line removed.

- [ ] **Step 1: Rewrite `src/components/organisms/ProcessSection.tsx`**

```tsx
"use client";

import { motion, type Variants } from "framer-motion";

const processCards = [
    {
        index: "01",
        title: "Direct Lead Capture",
        body: "Traditional forms are dead. We integrate WhatsApp, Telegram, and n8n webhook pipelines to capture, enrich, and route leads directly to your phone in milliseconds.",
    },
    {
        index: "02",
        title: "Edge Performance",
        body: "Every millisecond costs money. Your Next.js application runs on Vercel's global CDN — bypassing shared hosting and delivering sub-second load times from Cape Town to London.",
    },
    {
        index: "03",
        title: "AI Search Visibility",
        body: "Standard SEO is no longer enough. We engineer your site architecture and llms.txt so AI models like Gemini and ChatGPT accurately recommend your business when customers ask.",
    },
];

const cardReveal: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 140, damping: 24 },
    },
};

const labelReveal: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const headlineReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 28, delay: 0.08 },
    },
};

export function ProcessSection() {
    return (
        <section
            id="process"
            className="relative overflow-hidden"
            style={{ backgroundColor: "#0d0d0d" }}
        >
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                {/* ── LEFT PANEL — sticky anchor ──────────────────────────
                    h-screen + sticky top-0: stays pinned while right scrolls.
                    Mobile: normal block above the cards.
                ──────────────────────────────────────────────────────────── */}
                <div
                    className="
                        md:w-[42%] shrink-0
                        py-24 md:py-0
                        md:sticky md:top-0
                        md:h-screen
                        md:flex md:flex-col md:justify-center
                        md:pr-16
                    "
                >
                    <motion.p
                        className="font-mono text-[11px] uppercase tracking-[0.3em] mb-8"
                        style={{ color: "rgba(245,242,242,0.35)" }}
                        variants={labelReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        The Method
                    </motion.p>

                    <motion.h2
                        className="font-heading font-extrabold
                                   text-[clamp(32px,3.5vw,52px)]
                                   tracking-[-0.03em] leading-[1.0] mb-6"
                        style={{ color: "#F5F2F2" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Three Systems.{" "}
                        <br className="hidden lg:block" />
                        Every Site.
                    </motion.h2>

                    <motion.p
                        className="text-sm leading-relaxed max-w-xs mb-10"
                        style={{ color: "rgba(245,242,242,0.40)" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Every site we ship runs all three. No exceptions, no shortcuts.
                    </motion.p>

                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 font-mono text-xs
                                   uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                        style={{ color: "#FEB05D" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Start a project →
                    </motion.a>
                </div>

                {/* ── RIGHT PANEL — scrolling cards ─────────────────────────
                    py-24: top/bottom padding gives breathing room.
                    Each card is min-h-[75vh], creating the "scroll through"
                    feel without any JavaScript scroll-locking.
                ──────────────────────────────────────────────────────────── */}
                <div className="md:w-[58%] flex flex-col gap-8 py-24">
                    {processCards.map((card) => (
                        <motion.div
                            key={card.index}
                            className="relative rounded-[2rem] flex flex-col justify-between overflow-hidden"
                            style={{
                                backgroundColor: "rgba(245,242,242,0.05)",
                                border: "1px solid rgba(245,242,242,0.07)",
                                minHeight: "75vh",
                                padding: "clamp(2rem, 4vw, 3rem)",
                            }}
                            variants={cardReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            {/* Title — top of card */}
                            <h3
                                className="font-heading font-black uppercase
                                           text-[clamp(22px,3vw,36px)]
                                           tracking-[-0.02em] leading-tight
                                           max-w-[80%]"
                                style={{ color: "#F5F2F2" }}
                            >
                                {card.title}
                            </h3>

                            {/* Number + rule + body — bottom */}
                            <div>
                                <p
                                    className="font-mono text-xs mb-3"
                                    style={{ color: "#FEB05D" }}
                                >
                                    {card.index}
                                </p>
                                <div
                                    className="w-full h-px mb-5"
                                    style={{ backgroundColor: "rgba(245,242,242,0.08)" }}
                                />
                                <p
                                    className="text-sm md:text-base leading-relaxed max-w-md"
                                    style={{ color: "rgba(245,242,242,0.50)" }}
                                >
                                    {card.body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/organisms/ProcessSection.tsx
git commit -m "feat(process): dark glass cards with amber accent, sticky left, no progress line"
```

---

## Task 6: CoreCapabilitiesSection — Accent + Padding

**Files:**
- Modify: `src/components/organisms/CoreCapabilitiesSection.tsx`

- [ ] **Step 1: Update section header padding (line 322)**

```tsx
// OLD
<div className="relative px-6 md:px-10 lg:px-16 pt-24 pb-16 max-w-7xl mx-auto">
// NEW
<div className="relative px-6 md:px-10 lg:px-16 pt-32 pb-20 max-w-7xl mx-auto">
```

- [ ] **Step 2: Update card internal padding (line 239)**

```tsx
// OLD
<div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-8 gap-6">
// NEW
<div className="relative z-10 flex flex-col justify-between h-full p-10 md:p-12 gap-8">
```

- [ ] **Step 3: Update card min-height (line 197)**

```tsx
// OLD
min-h-[480px] md:min-h-[560px]
// NEW
min-h-[520px] md:min-h-[620px]
```

- [ ] **Step 4: Update active glow from blue to amber (line 208)**

```tsx
// OLD
animate={isActive ? { boxShadow: "inset 0 0 60px rgba(30,64,175,0.08)" } : { boxShadow: "none" }}
// NEW
animate={isActive ? { boxShadow: "inset 0 0 60px rgba(254,176,93,0.08)" } : { boxShadow: "none" }}
```

- [ ] **Step 5: Update bottom spacer (line 410)**

```tsx
// OLD
<div className="h-28 bg-void" />
// NEW
<div className="h-32 bg-void" />
```

- [ ] **Step 6: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 7: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/organisms/CoreCapabilitiesSection.tsx
git commit -m "feat(capabilities): amber glow, expanded padding, taller cards"
```

---

## Task 7: B2BCallout — New Section

**Files:**
- Create: `src/components/organisms/B2BCallout.tsx`

Full-bleed `#FEB05D` amber section. Dark carbon text. One prominent piece of proof — no screenshots, no cards, no complex layout. Just the system name, its value, the stack, and a secondary link to the full work page.

- [ ] **Step 1: Create `src/components/organisms/B2BCallout.tsx`**

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const stack = ["Next.js", "PostgreSQL", "n8n", "WhatsApp API", "Vercel Edge"];

/**
 * B2BCallout — Server-safe Organism
 * Full-bleed amber section. The amber is the loudest color on the page —
 * this section earns that. One proof point, maximum weight.
 */
export function B2BCallout() {
    return (
        <section
            id="platform"
            className="relative px-6 md:px-10 lg:px-16 py-32 md:py-40 overflow-hidden"
            style={{ backgroundColor: "#FEB05D" }}
        >
            {/* Subtle grain on amber — same GrainOverlay pattern, low opacity */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(43,42,42,0.06) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Left — headline + description */}
                    <div className="max-w-2xl">
                        <p
                            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6"
                            style={{ color: "rgba(43,42,42,0.50)" }}
                        >
                            Proof of System
                        </p>

                        <h2
                            className="font-heading font-black uppercase
                                       text-[clamp(36px,5vw,72px)]
                                       tracking-[-0.03em] leading-[0.92] mb-8"
                            style={{ color: "#2B2A2A" }}
                        >
                            B2B Ordering Platform.
                        </h2>

                        <p
                            className="text-base md:text-lg leading-relaxed max-w-lg mb-10"
                            style={{ color: "rgba(43,42,42,0.65)" }}
                        >
                            End-to-end trade ordering system built for repeat B2B operations.
                            Product catalogue, cart flow, order management, and real-time
                            WhatsApp notifications via n8n — all custom-engineered from scratch.
                        </p>

                        {/* Stack tags */}
                        <div className="flex flex-wrap gap-2">
                            {stack.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider"
                                    style={{
                                        backgroundColor: "rgba(43,42,42,0.10)",
                                        color: "#2B2A2A",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — value callout + work link */}
                    <div className="flex flex-col items-start md:items-end gap-8 shrink-0">
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-widest mb-2"
                                style={{ color: "rgba(43,42,42,0.40)" }}
                            >
                                Build Value
                            </p>
                            <p
                                className="font-heading font-black text-[clamp(32px,4vw,56px)] tracking-[-0.03em]"
                                style={{ color: "#2B2A2A" }}
                            >
                                R18,000+
                            </p>
                        </div>

                        <a
                            href="/work"
                            className="inline-flex items-center gap-2 font-mono text-xs
                                       uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                            style={{ color: "rgba(43,42,42,0.60)" }}
                        >
                            View all work
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/organisms/B2BCallout.tsx
git commit -m "feat(b2b): full-bleed amber callout section with stack tags and value"
```

---

## Task 8: TestimonialSection — Warm Background

**Files:**
- Modify: `src/components/organisms/TestimonialSection.tsx`

- [ ] **Step 1: Update section background and padding (line 49)**

```tsx
// OLD
<section className="relative bg-zinc-50 py-28 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden">
// NEW
<section
    className="relative py-32 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
    style={{ backgroundColor: "#F5F2F2" }}
>
```

- [ ] **Step 2: Delete the blue diagonal pattern div (lines 52–58)**

Remove this entire block:

```tsx
// DELETE:
<div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
        backgroundImage: "repeating-linear-gradient(135deg, #1e40af 0px, #1e40af 1px, transparent 1px, transparent 40px)",
    }}
/>
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/organisms/TestimonialSection.tsx
git commit -m "feat(testimonial): warm paper bg #F5F2F2, remove blue pattern, expanded padding"
```

---

## Task 9: PricingSection — Dark Theme + Amber Featured Card

**Files:**
- Modify: `src/components/organisms/PricingSection.tsx`

- [ ] **Step 1: Rewrite `src/components/organisms/PricingSection.tsx`**

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const tiers = [
    {
        name: "Starter",
        price: "R5,500",
        subtext: "Once-Off + R350/pm hosting",
        description: "Fast, professional digital footprint for businesses going online.",
        features: [
            "1-Page High-Performance Build",
            "WhatsApp Lead Capture",
            "Mobile-First Layout",
            "Local SEO & Google Maps",
            "Lightning-Fast Edge Hosting",
        ],
        cta: "Get Started",
        recommended: false,
        card: {
            backgroundColor: "rgba(245,242,242,0.05)",
            border: "1px solid rgba(245,242,242,0.08)",
        },
        priceColor: "#F5F2F2",
        bodyColor: "rgba(245,242,242,0.50)",
        checkColor: "rgba(245,242,242,0.25)",
        featureColor: "rgba(245,242,242,0.80)",
        cta_style: {
            border: "1px solid rgba(245,242,242,0.20)",
            color: "#F5F2F2",
            background: "transparent",
        },
    },
    {
        name: "Professional",
        price: "R12,500",
        subtext: "Once-Off + R350/pm hosting",
        description: "Built for lead generation, search visibility, and conversion.",
        features: [
            "3-Page Custom Architecture",
            "Automated Booking Integration",
            "Dynamic Photo Gallery",
            "Google Business Profile Setup",
            "Guaranteed 90+ PageSpeed",
        ],
        cta: "Partner with Us",
        recommended: true,
        card: { backgroundColor: "#FEB05D" },
        priceColor: "#2B2A2A",
        bodyColor: "rgba(43,42,42,0.60)",
        checkColor: "rgba(43,42,42,0.35)",
        featureColor: "#2B2A2A",
        cta_style: { backgroundColor: "#2B2A2A", color: "#F5F2F2" },
    },
    {
        name: "Custom Systems & AI",
        price: "From R21,500",
        subtext: "Custom scope — monthly retainer based on usage",
        description: "Autonomous B2B pipelines and AI-powered systems built to scale.",
        features: [
            "Full Next.js & DB Architecture",
            "AI Lead Generation Engines",
            "n8n Business Automations",
            "Advanced Technical SEO",
            "Priority Engineering Support",
        ],
        cta: "Contact Studio",
        recommended: false,
        card: {
            backgroundColor: "rgba(245,242,242,0.05)",
            border: "1px solid rgba(245,242,242,0.08)",
        },
        priceColor: "#F5F2F2",
        bodyColor: "rgba(245,242,242,0.50)",
        checkColor: "rgba(245,242,242,0.25)",
        featureColor: "rgba(245,242,242,0.80)",
        cta_style: {
            border: "1px solid rgba(245,242,242,0.20)",
            color: "#F5F2F2",
            background: "transparent",
        },
    },
];

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="px-6 md:px-10 lg:px-16 py-32 md:py-40"
            style={{ backgroundColor: "#2B2A2A" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    className="mb-16 md:mb-20"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p
                        className="font-mono text-[11px] uppercase tracking-[0.3em] mb-5"
                        style={{ color: "rgba(254,176,93,0.70)" }}
                    >
                        Pricing
                    </p>
                    <h2
                        className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                                   text-[clamp(32px,4vw,56px)] mb-4"
                        style={{ color: "#F5F2F2" }}
                    >
                        The Performance Packages
                    </h2>
                    <p
                        className="text-sm max-w-sm"
                        style={{ color: "rgba(245,242,242,0.40)" }}
                    >
                        Hand-coded performance. Zero compromise. Pick your tier.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            className="group relative overflow-hidden rounded-[2rem] flex flex-col
                                       hover:-translate-y-2 transition-transform duration-300 ease-out"
                            style={{
                                ...tier.card,
                                padding: tier.recommended ? "2.5rem" : "2rem",
                            }}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ ...spring, delay: i * 0.1 }}
                        >
                            <div className="flex-1 flex flex-col">

                                {/* Name + badge */}
                                <div className="flex items-start justify-between mb-8">
                                    <h3
                                        className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                        style={{ color: tier.bodyColor }}
                                    >
                                        {tier.name}
                                    </h3>
                                    {tier.recommended && (
                                        <span
                                            className="flex items-center gap-1 px-2 py-1 rounded-full
                                                       font-mono text-[10px] uppercase tracking-wider"
                                            style={{ backgroundColor: "#2B2A2A", color: "#F5F2F2" }}
                                        >
                                            <Zap className="w-2.5 h-2.5" strokeWidth={2.5} />
                                            Popular
                                        </span>
                                    )}
                                </div>

                                {/* Price */}
                                <div
                                    className="font-heading font-black tracking-[-0.03em]
                                               text-[clamp(28px,3vw,44px)] mb-1"
                                    style={{ color: tier.priceColor }}
                                >
                                    {tier.price}
                                </div>
                                <p
                                    className="font-mono text-xs mb-8"
                                    style={{ color: tier.bodyColor }}
                                >
                                    {tier.subtext}
                                </p>

                                {/* Description */}
                                <p
                                    className="text-sm mb-8 leading-relaxed"
                                    style={{ color: tier.bodyColor }}
                                >
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-4 mb-10 flex-1">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check
                                                className="w-4 h-4 shrink-0 mt-0.5"
                                                style={{ color: tier.checkColor }}
                                                strokeWidth={2.5}
                                            />
                                            <span
                                                className="text-sm leading-snug"
                                                style={{ color: tier.featureColor }}
                                            >
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <motion.a
                                href="#contact"
                                className="block text-center rounded-full font-mono font-bold
                                           uppercase tracking-widest cursor-pointer
                                           transition-opacity duration-200 hover:opacity-80"
                                style={{
                                    ...tier.cta_style,
                                    padding: tier.recommended ? "1.25rem 1.5rem" : "1rem 1.5rem",
                                    fontSize: "0.7rem",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={spring}
                            >
                                {tier.cta}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/components/organisms/PricingSection.tsx
git commit -m "feat(pricing): dark carbon bg, amber featured card, mono type"
```

---

## Task 10: Page Orchestration

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/organisms/Footer.tsx`

Final wiring: remove `SpeedRevenueBanner` and `PortfolioSection`, add `B2BCallout`, set 7-section order, update contact section bg.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/organisms/Navigation";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { CoreCapabilitiesSection } from "@/components/organisms/CoreCapabilitiesSection";
import { B2BCallout } from "@/components/organisms/B2BCallout";
import { TestimonialSection } from "@/components/organisms/TestimonialSection";
import { PricingSection } from "@/components/organisms/PricingSection";
import { ContactPageContent } from "@/components/organisms/ContactPageContent";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";

export const revalidate = 3600;

const homepageFaqs = [
    {
        question: "How much does a custom website cost?",
        answer:
            "Custom websites at LP Web Studio range from R5,500 for a professional 1-page site to R21,500+ for complex multi-page web applications and B2B systems built on Next.js.",
    },
    {
        question: "Do you use WordPress or custom code?",
        answer:
            "We specialize in custom-coded React and Next.js websites for superior speed and security. No templates, no bloat.",
    },
    {
        question: "How long does it take to build a website?",
        answer:
            "A Starter site takes 3-5 business days. A Professional site takes 1-2 weeks. Custom systems take 2-4 weeks depending on scope.",
    },
    {
        question: "Do you guarantee a 90+ PageSpeed score?",
        answer:
            "Yes. Every website we build is performance-tested before launch. If it doesn't hit 90+ on Google PageSpeed Insights, we optimize until it does.",
    },
];

/*
  Section narrative — colour rhythm:
  1. Hero        #F5F2F2  light   HOOK      — familiar, unexpected start
  2. Process     #0d0d0d  dark    METHOD    — dramatic shift, sticky scroll
  3. Capabilities #2B2A2A dark   WHAT      — dark continuation
  4. B2BCallout  #FEB05D  amber   PROOF     — amber punctuation
  5. Testimonial #F5F2F2  light   TRUST     — warm, human
  6. Pricing     #2B2A2A  dark    DECISION  — serious
  7. Contact     #F5F2F2  light   ACTION    — open, welcoming
*/
export default function HomePage() {
    return (
        <>
            <JsonLd data={faqPageSchema(homepageFaqs)} />

            <Suspense>
                <Navigation />
            </Suspense>

            <main>
                <Suspense>
                    <HeroSection />
                </Suspense>
                <Suspense>
                    <ProcessSection />
                </Suspense>
                <Suspense>
                    <CoreCapabilitiesSection />
                </Suspense>
                <Suspense>
                    <B2BCallout />
                </Suspense>
                <Suspense>
                    <TestimonialSection />
                </Suspense>
                <Suspense>
                    <PricingSection />
                </Suspense>
                <Suspense>
                    <section id="contact" style={{ backgroundColor: "#F5F2F2" }}>
                        <ContactPageContent />
                    </section>
                </Suspense>
            </main>

            <Suspense>
                <Footer />
            </Suspense>
        </>
    );
}
```

- [ ] **Step 2: Update Footer padding in `src/components/organisms/Footer.tsx` (line 6)**

```tsx
// OLD
<footer className="bg-void py-16 md:py-20 px-6 md:px-10 lg:px-16">
// NEW
<footer className="bg-void py-24 md:py-32 px-6 md:px-10 lg:px-16">
```

- [ ] **Step 3: Full production build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` with no type errors

- [ ] **Step 4: Lint check**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run lint 2>&1 | tail -20
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio
git add src/app/page.tsx src/components/organisms/Footer.tsx
git commit -m "feat(page): 7-section narrative, light hero, amber B2BCallout, remove SpeedRevenueBanner"
```

---

## Self-Review

**Spec coverage:**

| Requirement | Task |
|---|---|
| Amber accent replaces blue-700 | Task 1 (token cascade) |
| Exponential spacing | Task 1 |
| Hero → light `#F5F2F2` | Tasks 1, 3 |
| Dark text + dark particles in hero | Task 3 |
| Nav always-light for light hero | Task 4 |
| Process: dark `#0d0d0d`, sticky left, dark-glass cards | Task 5 |
| Process: amber number accent, no multi-color | Task 5 |
| Process: no progress line | Task 5 (rewrite has none) |
| Capabilities: amber glow, expanded padding | Task 6 |
| B2BCallout: full-bleed amber, stack tags, R18k+ value | Task 7 |
| Testimonial: `#F5F2F2`, no blue pattern, padding | Task 8 |
| Pricing: dark carbon bg, amber featured card | Task 9 |
| Remove SpeedRevenueBanner | Task 10 |
| Remove PortfolioSection from homepage | Task 10 |
| Section order: LIGHT → dark → dark → AMBER → LIGHT → dark → LIGHT | Task 10 |
| Contact section: `#F5F2F2` | Task 10 |
| Footer padding increased | Task 10 |

**No placeholders.** All steps contain exact code.

**Type consistency:** `ParticleField` created Task 2 with `color` prop, used in Task 3 as `color="dark"`. `B2BCallout` created Task 7, imported in Task 10. `cta_style` (snake_case) is consistent within Task 9 data array only — not a cross-task issue. No naming conflicts found.
