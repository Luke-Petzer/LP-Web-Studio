# Batch 4 — Original Visualizations + Hover Expansion (Design Spec)

**Date:** 2026-04-30
**Branch:** `pre-launch/cleanup-2026-04-17` (continuation; no child branch)
**Status:** Approved by user, ready to plan

---

## Goal

Two refinements to the Batch 3 service-cards section:

1. **Replace the four SVG visualizations** with original dot-pattern concepts that are conceptually distinct from the reference images (currently too close to the reference's grid / wave / sunburst / curve — IP/originality concern).
2. **Add hover & keyboard expansion** so the focused/hovered card grows and the others compress proportionally — desktop only, single column unaffected.

Out of scope (deferred): "Architectural Method" section, pre-existing `/work` a11y, missing assets, `M src/app/learn/[slug]/page.tsx`, Lighthouse re-run, test-framework setup.

---

## Part 1 — New visualization concepts

Each replaces a Batch 3 visualization in `CoreInfrastructure.tsx`. All keep `<svg viewBox="0 0 200 200">`, all-white `currentColor` dots, `aria-hidden="true"`. Total dot count stays in the same range as Batch 3 (~2000) so bundle impact is neutral.

### Card 1 — `VizConcentricSquares` (replaces `VizGrid`)

**Concept:** 7 nested square outlines, each made of evenly-spaced dots. Outer rings are denser (dots closer together); inner rings sparser. Suggests "self-healing shells expanding outward" / scaling layers.

**Specifics:**
- 7 rings, sized 24/48/72/96/120/144/168 (centered at 100,100)
- Each ring has dots evenly placed along its perimeter (more dots on larger rings — perimeter scales linearly)
- All dots `r=1.2`, opacity falls from 0.95 (outer) to 0.4 (inner)
- ~140-180 dots total

### Card 2 — `VizCrosshair` (replaces `VizWave`)

**Concept:** Vertical and horizontal axis lines crossing at center, each marked by regularly-spaced tick-dots. Plus 4 small diagonal corner-tick clusters indicating "alignment grid". Suggests measurement, mathematical rigour.

**Specifics:**
- Horizontal axis: 41 dots evenly spaced from x=0 to x=200 at y=100
- Vertical axis: 41 dots evenly spaced from y=0 to y=200 at x=100
- 4 corner-clusters at the four 50/150 corners: 9-dot 3×3 micro-grids, each `r=1.0` and `opacity=0.55` for subtle weight
- Center dot at (100,100) reinforced (`r=2`, `opacity=1`)
- ~120 dots total

### Card 3 — `VizStrata` (replaces `VizSunburst`)

**Concept:** 12 horizontal rows of dots at varying density, stacked from top to bottom. Each row has its own dot count (denser rows alternate with sparser ones). Suggests sedimented archival layers, immutable history.

**Specifics:**
- 12 rows from y=20 to y=180, evenly spaced
- Per-row dot counts cycle [38, 22, 38, 26, 38, 18, 38, 30, 38, 22, 38, 28] — denser rows feel like "active layers", sparser feel like "thinner archive layers"
- Each row's dots are evenly distributed across x=10 to x=190
- All dots `r=1.2`. Opacity: rows 1-3 at 0.95 (newest/top), 4-9 at 0.65 (mid-archive), 10-12 at 0.45 (oldest/bottom)
- ~370 dots total

### Card 4 — `VizFlowLines` (replaces `VizCurve`)

**Concept:** 8 parallel diagonal dotted streams running top-left → bottom-right. Each stream has dots fading in along its length (light at start, full opacity at end), suggesting directional pipeline flow.

**Specifics:**
- 8 parallel diagonal lines, perpendicular offset spacing 18px
- Each line: 30 dots distributed from start to end
- Diagonal angle: 45°. Start points span the upper-left quadrant; end points span the lower-right
- Dot opacity ramps from 0.2 at the line's start to 0.95 at the end
- Line stagger: each line starts with a slight phase offset so the 8 lines don't synchronise visually
- ~240 dots total

**Approximate total dot count:** ~870. Down from Batch 3's 2028 — fewer, simpler, but still plenty of visual texture.

---

## Part 2 — Hover/focus expansion

### Behaviour (locked: option A)

- **Default state (`lg:` ≥1024px):** 4 cards equal width via `grid-template-columns: 1fr 1fr 1fr 1fr`.
- **Hover/focus on any card:** that card's column expands to `2fr`; others stay `1fr`. Total width unchanged. Cards 1 and 4 stay anchored to their respective edges (left/right of section); inner cards shift to make room.
- **Transition:** 300ms `cubic-bezier(0.2, 0, 0.2, 1)` (matches `--easing` in `globals.css:23`).
- **Visualization slot stays fixed size** during expansion (200×200 max), centered in the now-wider card. Title and body text stay the same size.
- **Existing 6% brightness hover** continues to fire alongside the expansion.

### Where it applies

- **Desktop ≥1024px (`lg:`):** full expansion behaviour.
- **Tablet 768-1023px (`md:`, 2×2):** **NO expansion** — there's no horizontal slack. Static layout stays. Brightness hover still fires.
- **Mobile <768px (single column):** **NO expansion**. Static layout. Brightness hover still fires.

### Implementation pattern

Modern CSS `:has()` driving `grid-template-columns`. Supported in Chrome 105+, Safari 16+, Firefox 121+ — all evergreen browsers as of 2026. No JS needed.

In `globals.css` `@layer components`:

```css
.panel-row {
    transition: grid-template-columns 300ms cubic-bezier(0.2, 0, 0.2, 1);
}

@media (min-width: 1024px) and (hover: hover) {
    .panel-row:has(.card-panel:nth-child(1):hover),
    .panel-row:has(.card-panel:nth-child(1):focus-within) {
        grid-template-columns: 2fr 1fr 1fr 1fr;
    }
    .panel-row:has(.card-panel:nth-child(2):hover),
    .panel-row:has(.card-panel:nth-child(2):focus-within) {
        grid-template-columns: 1fr 2fr 1fr 1fr;
    }
    .panel-row:has(.card-panel:nth-child(3):hover),
    .panel-row:has(.card-panel:nth-child(3):focus-within) {
        grid-template-columns: 1fr 1fr 2fr 1fr;
    }
    .panel-row:has(.card-panel:nth-child(4):hover),
    .panel-row:has(.card-panel:nth-child(4):focus-within) {
        grid-template-columns: 1fr 1fr 1fr 2fr;
    }
}

@media (prefers-reduced-motion: reduce) {
    .panel-row { transition-duration: 0ms; }
}
```

The `(hover: hover)` guard ensures touch devices on a desktop window don't trigger expansion accidentally. The `:focus-within` pairing makes keyboard navigation produce the same expansion. The reduced-motion override removes the animation but keeps the layout change instant.

### Markup changes in `CoreInfrastructure.tsx`

- Add `panel-row` class to the existing grid wrapper (`<div className="-mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">` becomes `<div className="panel-row -mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">`).
- Add `tabIndex={0}` to each `<article>` so keyboard users can focus and trigger the expansion.
- The visualization slot `max-w-[200px]` stays as-is (visualization stays fixed size as the user requested).

### Accessibility

- `tabIndex={0}` makes cards focusable. They aren't links and don't activate anything on Enter — focus alone reveals the expansion (via `:focus-within`).
- Focus ring uses the global `:focus-visible` rule from `globals.css:46` (orange 2px ring at 2px offset). Visible on the dark cards; on the orange/red cards (3, 4) the ring will read as a slightly different orange — acceptable, still visible against the panel background.
- The card has no semantic role beyond `<article>`. We don't add `role="button"` because the card has no action; it's content.
- Body-copy contrast already verified in Batch 3.

### Performance

- `:has()` selectors and `grid-template-columns` transitions are GPU-friendly in modern Chromium/WebKit/Gecko. No JavaScript involved. No layout thrash beyond the four columns.
- `will-change: grid-template-columns` could be added for safety but isn't necessary at 4 elements; skipping.

---

## What changes in code

| File | Change |
|---|---|
| `src/components/organisms/CoreInfrastructure.tsx` | Replace 4 viz functions; add `panel-row` class to wrapper; add `tabIndex={0}` to each `<article>` |
| `src/app/globals.css` | Add `.panel-row` transition + `:has()` rules + reduced-motion override |
| `STATUS.md` | Append Batch 4 changelog |

No new files. No new dependencies.

---

## Acceptance criteria

A reviewer should confirm at viewport widths 320 / 375 / 768 / 1024 / 1440:

1. All 4 cards render with NEW visualizations (concentric squares / crosshair-grid / strata / flow-lines).
2. None of the new visualizations resemble the reference images' patterns.
3. **Desktop ≥1024px:** hover any card → that card expands smoothly, others compress, 300ms ease. Outer cards stay edge-anchored.
4. **Desktop ≥1024px:** Tab key cycles focus through cards 1→2→3→4 in order. Each focused card shows the same expansion as hover (via `:focus-within`). Focus ring visible on each card.
5. **Tablet 768–1023:** static 2×2 grid; no expansion on hover or focus. Brightness hover still fires.
6. **Mobile <768px:** static 1-column stack; no expansion. Brightness hover still fires (though largely irrelevant on touch).
7. `prefers-reduced-motion: reduce`: layout change happens instantly (no 300ms animation); brightness hover still fires.
8. Production build passes (`npm run build`); no TS/lint errors. Bundle on `/` does not regress more than ~200 bytes.

---

## Approval

User confirmed picks 2026-04-30:
- Hover behaviour: Option A (natural expanding-panels)
- Visualization concepts: approve all 4 (concentric squares, crosshair, strata, flow-lines)
- Visualization scale on expand: stay fixed
- `tabIndex={0}` on cards: yes
- Test-framework setup: NOT in scope (no Playwright/Vitest added)
