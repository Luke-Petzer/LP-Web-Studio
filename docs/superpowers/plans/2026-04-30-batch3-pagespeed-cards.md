# Batch 3 — PageSpeed Metric + CoreInfrastructure Card Redesign (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Anchor the "90+" PageSpeed metric with a denominator + Google attribution. Redesign the home-page service-cards section to a four-color full-bleed panel layout with hand-built SVG visualizations.

**Architecture:** Single-file edit for the metric. Single-file rewrite for the card section, keeping the public component name and section ID. Hand-built SVG visualizations live inline in the same file (4 small components, ~30 lines each, tightly coupled to this section's design). No new files except the spec/plan docs already saved.

**Tech Stack:** Next 15, React 19, Tailwind 3.4, TypeScript. No new deps, no new images, no JS-heavy interactions — pure CSS hover.

**Spec:** `docs/superpowers/specs/2026-04-30-batch3-pagespeed-cards-design.md`
**Branch:** `pre-launch/cleanup-2026-04-17` (continuation; no child branch).

**Out of scope:** Architectural Method section, pre-existing a11y on `/work`, missing `/founder-portrait.jpg` & `/og-image.png`, Lighthouse re-run, `M src/app/learn/[slug]/page.tsx` working-tree change.

---

## File structure

| File | Change |
|---|---|
| `src/components/organisms/MetricsBanner.tsx` | MODIFY — value/label one-line edit (Task 1) |
| `src/components/organisms/CoreInfrastructure.tsx` | REWRITE — full-bleed panel layout + inline SVG visualizations (Task 2) |
| `STATUS.md` | APPEND — Batch 3 changelog (Task 3) |

---

## Task 1: PageSpeed metric anchor

**Files:**
- Modify: `src/components/organisms/MetricsBanner.tsx:3`

- [ ] **Step 1: Replace the value/label**

In `MetricsBanner.tsx` line 3, change:
```ts
{ value: "90+",   label: "PageSpeed Guarantee" },
```
to:
```ts
{ value: "90+/100", label: "Google PageSpeed Guarantee" },
```

(Whitespace alignment with siblings can be tightened — final form: `{ value: "90+/100", label: "Google PageSpeed Guarantee" },`. The two-space alignment between `value:` and `"90+"` was a vestige; do NOT preserve it.)

- [ ] **Step 2: Verify in browser**

Run `npm run build` and confirm successful prod build, then load home page; metrics banner second tile shows `90+/100` over `Google PageSpeed Guarantee` (uppercase rendered by Tailwind `uppercase` class).

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/MetricsBanner.tsx
git commit -m "copy(metrics): anchor PageSpeed metric — 90+/100 Google PageSpeed Guarantee"
```

---

## Task 2: CoreInfrastructure card redesign

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx` (full rewrite — see below)

This is a single coordinated rewrite. The component name (`CoreInfrastructure`), section `id="capabilities"`, and `aria-label` stay the same so all internal anchor links and a11y bindings keep working.

- [ ] **Step 1: Replace the entire file contents**

Open `src/components/organisms/CoreInfrastructure.tsx` and replace the entire file with:

```tsx
"use client";

import React from "react";

type Viz = "grid" | "wave" | "sunburst" | "curve";

type Card = {
    module: string;
    title: string;
    body: string;
    bg: string;
    isLight: boolean;
    viz: Viz;
};

const cards: Card[] = [
    {
        module: "MODULE_01",
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        bg: "#0B0B0B",
        isLight: false,
        viz: "grid",
    },
    {
        module: "MODULE_02",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        bg: "#1a1c1e",
        isLight: false,
        viz: "wave",
    },
    {
        module: "MODULE_03",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        bg: "#FF4D00",
        isLight: true,
        viz: "sunburst",
    },
    {
        module: "MODULE_04",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        bg: "#B81D1D",
        isLight: true,
        viz: "curve",
    },
];

function VizGrid() {
    const cols = 14;
    const rows = 14;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // density falls from top-left to bottom-right
            const distance = (r + c) / (rows + cols);
            const opacity = Math.max(0.1, 1 - distance * 1.1);
            dots.push(
                <circle
                    key={`${r}-${c}`}
                    cx={10 + c * 13}
                    cy={10 + r * 13}
                    r={1.4}
                    fill="currentColor"
                    opacity={opacity}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizWave() {
    const cols = 30;
    const dotsPerCol = 24;
    const dots: React.ReactElement[] = [];
    for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * 200;
        const phase = (c / cols) * Math.PI * 2;
        const amplitude = 50;
        for (let d = 0; d < dotsPerCol; d++) {
            const y = 100 + Math.sin(phase + d * 0.18) * amplitude * (0.4 + d / dotsPerCol);
            dots.push(
                <circle
                    key={`${c}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.3 + (d / dotsPerCol) * 0.5}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizSunburst() {
    const rays = 30;
    const dotsPerRay = 18;
    const cx = 100;
    const cy = 100;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rays; r++) {
        const angle = (r / rays) * Math.PI * 2;
        for (let d = 1; d <= dotsPerRay; d++) {
            const distance = (d / dotsPerRay) * 95;
            const x = cx + Math.cos(angle) * distance;
            const y = cy + Math.sin(angle) * distance;
            dots.push(
                <circle
                    key={`${r}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.25 + (d / dotsPerRay) * 0.6}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizCurve() {
    const rows = 22;
    const dotsPerRow = 26;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rows; r++) {
        const baseY = 30 + r * 7;
        for (let d = 0; d < dotsPerRow; d++) {
            const x = 10 + (d / (dotsPerRow - 1)) * 180;
            const phase = (d / dotsPerRow) * Math.PI * 2 + r * 0.18;
            const offset = Math.sin(phase) * 12;
            const y = baseY + offset;
            dots.push(
                <circle
                    key={`${r}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.25 + ((rows - r) / rows) * 0.55}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function Visualization({ viz }: { viz: Viz }) {
    if (viz === "grid") return <VizGrid />;
    if (viz === "wave") return <VizWave />;
    if (viz === "sunburst") return <VizSunburst />;
    return <VizCurve />;
}

export function CoreInfrastructure() {
    return (
        <section
            id="capabilities"
            aria-label="Core Infrastructure"
            className="bg-obsidian px-8 md:px-12 pt-24 md:pt-32"
        >
            {/* Header row — preserved from previous design */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6">
                <div>
                    <h2
                        className="font-headline font-bold uppercase tracking-[-0.04em] text-white mb-3"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                    >
                        Web Development & Automation Services
                    </h2>
                    <p className="font-body text-white/50 max-w-md text-sm leading-relaxed">
                        Proprietary methodologies engineered for scale and absolute structural integrity.
                    </p>
                </div>
                <span className="section-label whitespace-nowrap">01 — Capabilities</span>
            </div>

            {/* Full-bleed panel row */}
            <div className="-mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, i) => (
                    <article
                        key={card.module}
                        className="card-panel group relative flex flex-col"
                        style={{
                            background: card.bg,
                            color: "#ffffff",
                            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                            transition: "filter 200ms ease",
                            minHeight: "520px",
                        }}
                    >
                        <div className="flex flex-col h-full p-8 lg:p-10">
                            {/* Title */}
                            <h3
                                className="font-headline font-bold uppercase whitespace-pre-line tracking-tight"
                                style={{
                                    fontSize: "clamp(1.25rem, 1.6vw, 1.875rem)",
                                    lineHeight: 1.05,
                                }}
                            >
                                {card.title}
                            </h3>

                            {/* Visualization (centered, fills the slack) */}
                            <div
                                className="flex-1 flex items-center justify-center my-8"
                                style={{
                                    color: "#ffffff",
                                    maxWidth: "100%",
                                }}
                            >
                                <div className="w-full max-w-[200px] aspect-square">
                                    <Visualization viz={card.viz} />
                                </div>
                            </div>

                            {/* Counter */}
                            <p
                                className="font-mono uppercase tracking-[0.18em] mb-3"
                                style={{
                                    fontSize: "10px",
                                    color: card.isLight
                                        ? "rgba(255,255,255,0.7)"
                                        : "rgba(255,255,255,0.4)",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")} / 04
                            </p>

                            {/* Body */}
                            <p
                                className="text-[10px] font-bold tracking-[0.18em] uppercase leading-relaxed"
                                style={{
                                    color: card.isLight
                                        ? "rgba(255,255,255,1)"
                                        : "rgba(255,255,255,0.65)",
                                }}
                            >
                                {card.body}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add the hover style to globals.css**

The Tailwind arbitrary `hover:[filter:brightness(1.06)]` would work but is awkward. Add a tiny utility class.

In `src/app/globals.css`, inside the existing `@layer components { ... }` block (after `.btn-cta-orange:active`, before the closing brace), add:

```css
  /* ─── Service-card panel hover (subtle brighten, no scale) ─── */
  .card-panel:hover {
    filter: brightness(1.06);
  }
```

Verify the rest of `@layer components` block is intact; this is a simple append.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected output: `✓ Compiled successfully`. Bundle size for `/` should be roughly the same as Batch 2 (5.6 kB) — the SVGs are inline and small.

- [ ] **Step 4: Manual viewport check**

```bash
npm run start
```

Then in DevTools at widths 320, 375, 768, 1024, 1440, on `http://localhost:3000`, scroll to the "Web Development & Automation Services" section and confirm:

- 320–767: panels stack 1-up, full bleed
- 768–1023: 2×2 grid, no gaps, shared seams
- 1024+: 4 in a row, no gaps, shared seams
- All four cards same height
- No SVG line-accents visible anywhere in the section
- Hover any card: brightens subtly, no other card reaction
- No horizontal scroll at 320px

If anything looks broken visually, fix in place before committing — do not commit a regression.

- [ ] **Step 5: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx src/app/globals.css
git commit -m "feat(services): full-bleed colored-panel card layout with hand-built SVG visualizations"
```

---

## Task 3: STATUS changelog

- [ ] **Step 1: Append Batch 3 entry**

Append to `STATUS.md` immediately before the existing `## Mobile audit — 2026-04-27` heading (i.e., directly under `---` after `## Active Branch`):

```markdown
## Batch 3 — PageSpeed Metric + Service-Cards Redesign — 2026-04-30

Plan: `docs/superpowers/plans/2026-04-30-batch3-pagespeed-cards.md`
Spec: `docs/superpowers/specs/2026-04-30-batch3-pagespeed-cards-design.md`

### Changes
1. **MetricsBanner** — `90+ / PageSpeed Guarantee` → `90+/100 / Google PageSpeed Guarantee`. Anchors the unanchored "90+" metric with a denominator and source attribution for non-technical readers.
2. **CoreInfrastructure (Web Development & Automation Services)** — full rewrite. Four full-bleed colored panels (`#0B0B0B`, `#1a1c1e`, `#FF4D00`, `#B81D1D`) replacing the previous bordered grid. Each panel: title-top → SVG visualization (grid / wave / sunburst / curve) → counter `0X / 04` → small caps body. Same height across all four. Subtle 6% brightness hover. Decorative SVG line-accents deleted (were bleeding through the section). Tags array dropped from card 1 (was the only card with tags — visual inconsistency).

### What's preserved
- Section `id="capabilities"`, `aria-label`, header row (H2 + section-label), copy verbatim.
- Component public API (`<CoreInfrastructure />`).

### Out of scope this batch
- "Architectural Method" section (user still thinking about it)
- Pre-existing `/work` a11y findings (separate batch)
- `M src/app/learn/[slug]/page.tsx` working-tree change (untouched)

---
```

- [ ] **Step 2: Commit**

```bash
git add STATUS.md
git commit -m "docs(status): record Batch 3 (PageSpeed metric + cards redesign)"
```

---

## Self-review checklist

- [ ] **Spec coverage:**
  - PageSpeed metric anchor → Task 1 ✅
  - Card redesign (palette, visualizations, hover, layout, no SVG line-accents, no tags, uniform height) → Task 2 ✅
  - STATUS update → Task 3 ✅
- [ ] **No placeholders:** Every step shows actual code or actual command. ✅
- [ ] **Type consistency:** `Card` type matches data shape; `Viz` union matches `Visualization` switch and `card.viz` strings. ✅
- [ ] **Order:** Task 1 (small) before Task 2 (large) — small wins commit cleanly first. STATUS at end. ✅
- [ ] **No `overflow-x: hidden` shortcuts:** Card row uses `-mx-8 md:-mx-12` to bleed past the section's outer padding; this is a deliberate full-bleed pattern, not an overflow hack. Section's parent (page) has `overflow-x: hidden` on body for safety. ✅
- [ ] **A11y:** SVG visualizations have `aria-hidden`. `<h3>` per card preserves heading hierarchy. ✅
- [ ] **Performance:** Hand-built SVGs are tiny (~14×14 dots = 196 circles for grid, similar for others). Total inline payload increase ~3-4 kB. No images, no JS interaction beyond CSS hover. No CWV impact. ✅
