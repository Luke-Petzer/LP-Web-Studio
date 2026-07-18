# LP Web Studio — Design Architecture Log
### Single Source of Truth | Frontend Rebuild

> **Last Updated:** 2026-04-01 — **REBUILD COMPLETE**
> **Stack:** Next.js 15 · React · Tailwind CSS · Framer Motion
> **Terminology Rule:** Never use "tech-noir." Use "premium," "editorial," "spatial," or "atmospheric."

---

## 1. Master Strategy — The Confidence Gap

### Core Diagnosis
The current site is technically excellent and visually competent. The gap between it and the WorldQuant Foundry / ZettaJoule references is not technical sophistication — it is **typographic conviction and motion discipline**.

- The inspiration references use *less* — less color, less decoration, less visual variety — but apply each decision **more boldly**
- The lesson is not to add more; it is to **commit harder to fewer decisions**

### Three-Sentence Visual Direction
LP Web Studio's rebuilt aesthetic is **editorial-meets-spatial**: vocabulary borrowed from high-end design publications, applied to the confidence of a technical performance studio. Every dark section should feel like a crafted surface, not a void. Every headline should feel load-bearing, not typeset.

### The Three Highest-Leverage Changes (70% of the gap)
1. Fix the scroll-reveal animation system (`whileInView` + real `y` values) — currently broken
2. Scale hero display type to architectural proportions using `clamp()`
3. Add dot-matrix grain texture to all dark sections

---

## 2. Global Mechanics

### 2.1 Ambient Grain Texture (Dot-Matrix)

**Decision:** CSS `radial-gradient` tiled pattern (Option A). Zero bundle cost, perfectly sharp at all DPR, matches the WorldQuant dot-matrix aesthetic exactly.

**The Rule:** Every `bg-void` section gets a `<GrainOverlay />` atom child. The overlay sits at `z-0`, all content at `z-10` minimum.

```css
/* globals.css */
.grain-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  animation: grain-breathe 4s ease-in-out infinite alternate;
}

@keyframes grain-breathe {
  from { opacity: 0.4; }
  to   { opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  .grain-overlay { animation: none; opacity: 0.5; }
}
```

**Usage pattern:**
```tsx
<section className="relative bg-void ...">
  <div className="grain-overlay" aria-hidden="true" />
  <div className="relative z-10 ...">
    {/* content */}
  </div>
</section>
```

---

### 2.2 Typography Scaling — `clamp()` Rule

**Decision:** `clamp()` fluid scaling for all display/headline type. Discrete breakpoints for body and sub-copy only.

**The Rule:** Display headlines use a single `text-[clamp()]` arbitrary Tailwind value that scales linearly between mobile and large desktop. Never use `text-5xl md:text-7xl xl:text-8xl` for hero/display text — this creates discontinuous jumps and does not maintain viewport-proportional weight.

| Usage | Tailwind Class | Scale |
|---|---|---|
| Hero H1 (display) | `text-[clamp(48px,7vw,96px)]` | 48px → 96px |
| Intermission H2 | `text-[clamp(40px,6.5vw,88px)]` | 40px → 88px |
| Section H2 | `text-4xl md:text-5xl` | Discrete (ok here) |
| Body copy | `text-base md:text-lg` | Discrete |

**Display type rules (always apply together):**
- `tracking-[-0.04em]` — negative tracking at large sizes makes type feel monolithic
- `leading-[0.92]` or `leading-[0.95]` — tighter than 1.0, display lines should feel like a single mass
- `font-black` or `font-extrabold` — never below 700 weight for display

---

### 2.3 Scroll Animation Engine — The Bug Fix

**Current bug (all components):** `fadeUp` variants have `y: 0` in *both* `hidden` and `visible` — no vertical movement occurs. All animations fire with `animate` on mount, not on scroll entry.

**The Fix — Two rules that must apply to every animated section:**

**Rule 1:** Replace `animate="visible"` with `whileInView="visible"` + `viewport={{ once: true, amount: 0.2 }}` on all scroll-triggered animations.

**Rule 2:** Give `hidden` a real `y` value. Standard is `y: 18` for cards and body, `y: 16` for headlines (slightly less travel at larger scale).

**Corrected standard variant (replace in all components):**
```tsx
// CORRECT — use this everywhere
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 28 },
  },
};

// Applied as:
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"          // ← was: animate="visible"
  viewport={{ once: true, amount: 0.2 }}
>
```

**Per-line stagger variant (for display headlines):**
```tsx
const lineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 200, damping: 30 },
  },
};

// Applied to H1/H2 — each line is a separate motion.span block:
<motion.h1
  variants={lineContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  <motion.span className="block" variants={lineReveal}>Line one</motion.span>
  <motion.span className="block" variants={lineReveal}>Line two</motion.span>
</motion.h1>
```

---

## 3. Component Blueprints

---

### 3.1 Hero Depth Layer (ZettaJoule Effect)

**Concept:** Three z-indexed layers create spatial depth. The foreground object (logo mark or abstract SVG at ~7% opacity) sits at `z-20`, the headline at `z-10`. Where they overlap, the headline renders *behind* the object — text-behind-object. Framer `useScroll` parallax adds scroll-time depth.

**Layer architecture:**
| Layer | z-index | Scroll velocity | Content |
|---|---|---|---|
| Background | z-0 | 0% | `bg-void` + `GrainOverlay` |
| Headline | z-10 | 20% (slow) | H1 display text |
| Foreground object | z-20 | 50% (fast) | Large ghost logo/SVG |

**Framer hooks:**
```tsx
// "use client" — HeroDepthLayer.tsx
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});

const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
const objectY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
```

**JSX skeleton:**
```tsx
<section ref={heroRef} className="relative min-h-screen overflow-hidden bg-void">
  <div className="grain-overlay" aria-hidden="true" />

  {/* Headline — moves slow */}
  <motion.div style={{ y: textY }}
    className="absolute inset-0 z-10 flex items-start px-12 pt-40 md:pt-48">
    <H1DisplayBlock /> {/* per-line stagger variants */}
  </motion.div>

  {/* Foreground ghost object — moves fast, sits in front of text */}
  <motion.div style={{ y: objectY }}
    className="absolute right-0 top-0 z-20 w-1/2 h-full pointer-events-none">
    <LogoMarkLarge className="opacity-[0.07] w-full h-full" aria-hidden="true" />
  </motion.div>
</section>
```

**Key rules:**
- `overflow-hidden` on section clips parallax layers at boundaries
- Foreground object at exactly `opacity-[0.07]` — ghost form, not competing
- `pointer-events-none` on foreground object — must not block clicks on headline or CTA
- Hero H1 positioned `text-left`, not `text-center` (left-aligned spatial layout, not centered block)

---

### 3.2 "Confident Intermission" Section

**Concept:** An atmospheric pause section placed between `CoreCapabilitiesSection` and `PortfolioSection`. 15% content, 85% negative space. Dark atmospheric background with grain. The restraint is the message.

**Section rules:**
- Height: `min-h-[85vh]` — deep breath, not a full wall
- Content: label + 2-line headline + sub-copy, centered, `max-w-4xl`
- No decorative elements — the only exception is an optional `1px opacity-[0.06]` hairline above the label
- Grain overlay runs at slightly higher base opacity than the hero

**Typography:**
```tsx
// Label
<motion.p variants={labelIn} className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">
  The Architecture
</motion.p>

// Headline — 2 lines with per-line stagger
<motion.h2
  variants={lineContainer}
  className="font-heading font-black tracking-[-0.04em] leading-[0.92]
             text-[clamp(40px,6.5vw,88px)] text-white text-center mb-8"
>
  <motion.span className="block" variants={lineReveal}>
    Engineered for Speed.
  </motion.span>
  <motion.span className="block text-white/70" variants={lineReveal}>
    Zero Bloat. Zero Compromise.
  </motion.span>
</motion.h2>

// Sub-copy — arrives last
<motion.p variants={subIn}
  className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed text-center">
  Sub-copy here.
</motion.p>
```

**Framer variants:**
```tsx
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 200, damping: 30 } },
};

const labelIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const subIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } },
};

// Container trigger:
<motion.div
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}  // fires when 50% in view
>
```

**File location:** `src/components/organisms/ConfidentIntermission.tsx`
**Page placement:** Between `<CoreCapabilitiesSection />` and `<PortfolioSection />` in `page.tsx`

---

### 3.3 Horizontal Accordion Columns (replaces CoreCapabilitiesSection)

**Concept:** Four full-height poster columns. Equal width at rest. On hover, active column expands to ~40% width; others compress. Title always visible. Body copy appears only in the expanded state. Uses Framer `layout` + `flexBasis` for zero-jank FLIP animation.

**Color palette (per column):**
| Column | Background | Text |
|---|---|---|
| 1 — Lead Capture | `bg-[#0A0A0A]` | white |
| 2 — Edge Rendering | `bg-[#111827]` | white |
| 3 — GEO | `bg-accent` (`#1e40af`) | white |
| 4 — Automations | `bg-[#F4F4F2]` | dark (`text-ink`) |

**State management:** Single `activeIndex: number | null` lifted to parent `CoreCapabilitiesSection`.

**Column component mechanic:**
```tsx
// CapabilityColumn — "use client"
<motion.div
  layout                        // ← FLIP: Framer animates flex layout change
  className="relative flex flex-col justify-between p-8 cursor-pointer overflow-hidden min-h-[560px]"
  style={{ flexBasis: isActive ? "40%" : "20%" }}
  transition={{ type: "spring", stiffness: 300, damping: 35 }}
  onHoverStart={() => setActiveIndex(index)}
  onHoverEnd={() => setActiveIndex(null)}
>
  {/* Counter — top left, always visible */}
  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
    0{index + 1} / 04
  </span>

  {/* Gestural graphic — dot-matrix SVG at center, opacity-[0.15] */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <GeometricGesture className="w-48 h-48 opacity-[0.15]" />
  </div>

  {/* Title — bottom left, always visible */}
  <div>
    <h3 className="font-heading font-black text-xl leading-tight mb-4">{cap.title}</h3>

    {/* Body — only in active state */}
    <AnimatePresence>
      {isActive && (
        <motion.p
          className="text-sm leading-relaxed opacity-70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, y: 4, transition: { duration: 0.1 } }}
        >
          {cap.body}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
</motion.div>
```

**Why `layout` + `flexBasis`, not `width`:** Animating `width` triggers layout reflow on every frame. `flexBasis` with Framer `layout` uses FLIP — measures positions before/after, then animates only `transform`. GPU-composited. Zero jank.

**Mobile fallback:** At `< md`, columns become full-width stacked rows. Tap to expand body copy via same `AnimatePresence` reveal. Remove `flexBasis` manipulation — use `height` accordion instead.

**File location:** `src/components/organisms/CoreCapabilitiesSection.tsx` (refactor in place)

---

### 3.4 Sticky Left / Scrolling Right (Process Section)

**Concept:** Left panel is the stable narrative anchor (section identity, headline, optional CTA, scroll progress indicator). Right panel is the argument — cards enter from the right as the user scrolls, one by one. Applied to `ProcessSection` (3 narrative beats).

**The critical decision — CSS sticky, not Framer `useScroll`:**
`position: sticky` for the left panel is handled by the browser's scroll compositor at OS level — zero JS cost. `useScroll` would add a scroll listener firing JS on every frame. Reserve `useScroll` for the optional progress indicator only.

**Division of responsibility:**
| Element | Technology |
|---|---|
| Left panel position | CSS `position: sticky` |
| Right card entrance | Framer `whileInView` |
| Scroll progress line | Framer `useScroll` + `useTransform` (optional) |

**Outer structure:**
```tsx
<section id="process" className="relative bg-void">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">

    {/* LEFT — sticky anchor */}
    <div className="md:w-[38%] md:sticky md:top-[72px] md:h-[calc(100vh-72px)]
                    md:flex md:flex-col md:justify-center py-24 shrink-0">
      {/* Label, H2, sub-copy, CTA, progress indicator */}
    </div>

    {/* RIGHT — scrolling cards */}
    <div className="md:w-[62%] flex flex-col gap-16 py-24">
      {processCards.map((card, i) => (
        <ProcessCard key={card.title} card={card} index={i} />
      ))}
    </div>

  </div>
</section>
```

**Why `top-[72px]` not `top-0`:** Nav is `fixed top-6` — 72px clears it. Left panel content must not render behind the nav.

**Card entrance — directional from right:**
```tsx
// ProcessCard
<motion.div
  className="p-10 rounded-[2rem] border border-white/8 bg-white/4"
  initial={{ opacity: 0, x: 40 }}    // enters from right — semantically correct
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ type: "spring", stiffness: 160, damping: 28 }}
>
```

**Optional scroll progress line in left panel:**
```tsx
// "use client" — only needed if progress indicator is used
const sectionRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start center", "end center"],
});
const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

// JSX in left panel:
<div className="absolute left-0 top-0 w-[2px] h-full bg-white/10">
  <motion.div className="w-full bg-accent origin-top" style={{ height: lineHeight }} />
</div>
```

**Mobile:** `md:sticky` is prefixed — on mobile the left panel renders as a normal block header above stacked cards. `whileInView` card animations still fire. No mobile-specific logic required.

**File location:** `src/components/organisms/ProcessSection.tsx` (refactor in place)

---

## 4. Implementation Sequence (Build Order)

The correct sequence, sequenced by dependency and risk:

```
Phase 1 — Foundation
  [ ] 1a. Add .grain-overlay CSS + @keyframes to globals.css
  [ ] 1b. Create GrainOverlay atom: src/components/atoms/GrainOverlay.tsx
           - Accepts optional className prop for per-section opacity tweaks
  [ ] 1c. Fix animation engine globally:
           - Replace animate="visible" → whileInView="visible" in ALL components
           - Fix fadeUp: hidden.y: 0 → hidden.y: 18 in ALL components
           - Add viewport={{ once: true, amount: 0.2 }} to ALL whileInView triggers

Phase 2 — Intermission Section (simplest new component, validates the pattern)
  [ ] 2a. Create src/components/organisms/ConfidentIntermission.tsx
           - GrainOverlay inside
           - Per-line stagger H2 with clamp() scale
           - whileInView trigger at amount: 0.5
  [ ] 2b. Insert between CoreCapabilitiesSection and PortfolioSection in page.tsx
  [ ] 2c. Fill in final label text, headline, and sub-copy

Phase 3 — Sticky Left / Scrolling Right (ProcessSection refactor)
  [x] 3a. Refactor ProcessSection.tsx to sticky-left layout
           - CSS sticky left panel (38% width)
           - Cards in right column (62% width)
           - Card entrance: x: 40 → x: 0 from right, whileInView
  [x] 3b. Optional: Add scroll progress indicator (useScroll + thin accent line)
  [x] 3c. Verify mobile collapse (sticky must not apply below md breakpoint)

Phase 4 — Horizontal Accordion Columns (CoreCapabilitiesSection refactor)
  [x] 4a. Refactor CoreCapabilitiesSection.tsx to accordion layout
           - activeIndex state lifted to CoreCapabilitiesSection (parent)
           - flexGrow: 2.5 (active) / 1 (inactive) via Framer layout FLIP
           - 4-column palette: #0A0A0A / #111827 / #1e40af / #F4F4F2
           - AnimatePresence body copy + expand-hint reveal per column
           - Inline SVG gestures: ConcentricRings / DiagonalGrid / RadiatingSpokes / DotMatrix
           - useReducedMotion() disables all spring/layout animations
           - onClick as primary (not hover-only) — mobile safe
           - cursor-pointer + role="button" + keyboard (Enter/Space) + aria-expanded
  [x] 4b. Implement mobile vertical accordion fallback (flex-col, full-width cards)
  [ ] 4c. QA all four columns at 375px, 768px, 1024px, 1440px

Phase 5 — Hero Depth Layer
  [x] 5a. Refactor HeroSection.tsx / HeroContent.tsx to layered depth architecture
           - z-0: GrainOverlay (opacity-55)
           - z-10: Headline layer — textY at 18% scroll velocity (slow, anchored)
           - z-20: GhostGeometry inline SVG — objectY at 42% velocity (fast, closer)
           - useScroll scoped to heroRef, offset ["start start","end start"]
           - overflow-hidden clips both layers at section boundary
           - pointer-events-none on geometry — CTAs remain clickable
  [x] 5b. H1 at clamp(44px, 6.5vw, 92px), tracking-[-0.04em], leading-[0.93]
           Per-line stagger: label → line1 → line2 → line3 → sub-copy → CTA
           staggerChildren: 0.09, delayChildren: 0.15, spring stiffness: 200/30
  [x] 5c. Hero text left-aligned (not centered) — spatial/editorial posture
           Scroll indicator: fade-in at delay 1.2s, scaleY pulse animation

Batch 2 — Design System Unification (all 5 untouched sections)
  [x] PortfolioSection — animation fixed (y:18, whileInView), H2 clamp(), accent stripped from
           category labels (→ white/50) and "View Live Site" links (→ white/70)
           Portfolio card deck: x offset 120→180, added rotateY: offset*5, min opacity 0.3→0.5
  [x] SpeedRevenueBanner — animation fixed, H2 clamp() font-black, bg changed from white
           to bg-void (editorial data interruption), stat values accent→white,
           TrendingUp icon accent→white/40, stat cards redesigned as glass panels
  [x] PricingSection — animation fixed, H2 clamp() font-black, check icons accent→neutral
           per-card (slate-400 on light, white/40 on dark), price displays use clamp()
  [x] TestimonialSection — animation fixed, full pull-quote redesign:
           typographic " watermark (font-heading 160px+ opacity-[0.04]),
           unified quote size text-xl md:text-2xl, "Verified Client" accent→white/40
  [x] ContactPageContent — animation fixed, H1 clamp(), all icons accent→white/50 or ink/40,
           audit offer card border/bg neutralized, form focus border→ink/40

Phase 6 — Polish Pass
  [x] 6a. Nav CTA — remove Zap icon, add draw-in underline on desktop link hover
  [x] 6b. Global prefers-reduced-motion audit across all remaining Framer components
  [x] 6c. Final QA: CoreCapabilities at 375px, 768px, 1024px, 1440px
```

---

## 5. Design Tokens (Current)

```css
--accent:    30 64 175     /* #1e40af — blue */
--bg-void:   10 10 10      /* #0A0A0A — near-black */
--ink:       26 26 26      /* #1A1A1A — near-black text */
--slate:     148 163 184   /* #94A3B8 — muted text */
```

**Fonts loaded:**
- `--font-jakarta` — Plus Jakarta Sans (headings, `font-heading`)
- `--font-inter` — Inter (body, `font-body`)
- `--font-jetbrains` — JetBrains Mono (code/mono accents)

---

## 6. Key Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-03-31 | CSS radial-gradient for grain (not SVG feTurbulence, not Canvas) | Zero bundle cost, dot-matrix pattern matches WorldQuant reference |
| 2026-03-31 | clamp() for display headlines (not discrete breakpoints) | Viewport-proportional weight at all screen sizes |
| 2026-03-31 | CSS sticky for left panel (not Framer useScroll) | Browser compositor level, zero JS cost |
| 2026-03-31 | Framer layout + flexBasis for accordion (not width animation) | FLIP prevents layout reflow; GPU composited |
| 2026-03-31 | whileInView replaces animate for all scroll sections | Current animate fires on mount before user sees content |
| 2026-03-31 | No new dependencies for any of the above | Everything runs on Framer Motion + CSS already in bundle |

---

*End of Document*
