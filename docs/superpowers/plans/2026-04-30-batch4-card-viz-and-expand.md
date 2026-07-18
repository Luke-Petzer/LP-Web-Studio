# Batch 4 — Original Visualizations + Hover Expansion (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four reference-style SVG visualizations with original dot-pattern concepts, and add desktop-only hover/focus expansion that grows the targeted card while compressing the others proportionally.

**Architecture:** Single-component scope (`CoreInfrastructure.tsx`) plus a CSS rule set in `globals.css`. Pure CSS expansion via `:has()` and `grid-template-columns` transition — no JavaScript. `tabindex={0}` on cards for keyboard parity.

**Tech Stack:** Next 15, React 19, Tailwind 3.4, TypeScript. No new deps.

**Spec:** `docs/superpowers/specs/2026-04-30-batch4-card-viz-and-expand-design.md`
**Branch:** `pre-launch/cleanup-2026-04-17` (continuation; no child branch).

**Out of scope:** Architectural Method section, pre-existing `/work` a11y, missing assets, `M src/app/learn/[slug]/page.tsx`, Lighthouse re-run, test framework.

**Verification model:** `npm run build` (type/lint), browser smoke at 320/375/768/1024/1440, server-side grep for HTML correctness. No automated test framework introduced.

---

## File structure

| File | Change |
|---|---|
| `src/components/organisms/CoreInfrastructure.tsx` | MODIFY — replace 4 Viz components, add `panel-row` class, `tabIndex={0}` (Tasks 1, 2) |
| `src/app/globals.css` | MODIFY — add `.panel-row` expansion rules + reduced-motion override (Task 2) |
| `STATUS.md` | APPEND — Batch 4 changelog (Task 3) |

---

## Task 1: Replace the four SVG visualizations

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx`

This task swaps the 4 `Viz*` components and renames them in the data. The dispatcher function `Visualization` updates accordingly.

- [ ] **Step 1: Replace the four `Viz*` function definitions**

In `CoreInfrastructure.tsx`, replace the existing `VizGrid`, `VizWave`, `VizSunburst`, `VizCurve` and the `Visualization` switch with the four new components. Find the block from `function VizGrid()` through `function Visualization({ viz }: { viz: Viz }) { ... return <VizCurve />; }` and replace with:

```tsx
function VizConcentricSquares() {
    const center = 100;
    const ringSizes = [24, 48, 72, 96, 120, 144, 168];
    const dots: React.ReactElement[] = [];
    ringSizes.forEach((size, ringIdx) => {
        const half = size / 2;
        const dotsPerSide = Math.max(4, Math.round(size / 8));
        const opacity = 0.95 - ringIdx * 0.08;
        // top + bottom edges
        for (let i = 0; i <= dotsPerSide; i++) {
            const x = center - half + (size * i) / dotsPerSide;
            dots.push(
                <circle key={`r${ringIdx}-t-${i}`} cx={x} cy={center - half} r={1.2} fill="currentColor" opacity={opacity} />
            );
            dots.push(
                <circle key={`r${ringIdx}-b-${i}`} cx={x} cy={center + half} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
        // left + right edges (skip corners — already drawn on top/bottom)
        for (let i = 1; i < dotsPerSide; i++) {
            const y = center - half + (size * i) / dotsPerSide;
            dots.push(
                <circle key={`r${ringIdx}-l-${i}`} cx={center - half} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
            dots.push(
                <circle key={`r${ringIdx}-r-${i}`} cx={center + half} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
    });
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizCrosshair() {
    const dots: React.ReactElement[] = [];
    // Horizontal axis at y=100
    for (let i = 0; i <= 40; i++) {
        const x = (i / 40) * 200;
        dots.push(
            <circle key={`h-${i}`} cx={x} cy={100} r={1.2} fill="currentColor" opacity={0.85} />
        );
    }
    // Vertical axis at x=100
    for (let i = 0; i <= 40; i++) {
        const y = (i / 40) * 200;
        dots.push(
            <circle key={`v-${i}`} cx={100} cy={y} r={1.2} fill="currentColor" opacity={0.85} />
        );
    }
    // Four 3x3 corner micro-grids at the (50,50), (150,50), (50,150), (150,150) anchors
    const corners = [
        [50, 50],
        [150, 50],
        [50, 150],
        [150, 150],
    ];
    corners.forEach(([cx, cy], cornerIdx) => {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                dots.push(
                    <circle
                        key={`c${cornerIdx}-${r}-${c}`}
                        cx={cx + c * 6}
                        cy={cy + r * 6}
                        r={1}
                        fill="currentColor"
                        opacity={0.55}
                    />
                );
            }
        }
    });
    // Reinforced center
    dots.push(
        <circle key="center" cx={100} cy={100} r={2} fill="currentColor" opacity={1} />
    );
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizStrata() {
    const rowYs = Array.from({ length: 12 }, (_, i) => 20 + i * (160 / 11));
    const dotsPerRow = [38, 22, 38, 26, 38, 18, 38, 30, 38, 22, 38, 28];
    const opacities = [
        0.95, 0.95, 0.95,
        0.65, 0.65, 0.65, 0.65, 0.65, 0.65,
        0.45, 0.45, 0.45,
    ];
    const dots: React.ReactElement[] = [];
    rowYs.forEach((y, rowIdx) => {
        const count = dotsPerRow[rowIdx];
        const opacity = opacities[rowIdx];
        for (let i = 0; i < count; i++) {
            const x = 10 + (180 * i) / Math.max(count - 1, 1);
            dots.push(
                <circle key={`s${rowIdx}-${i}`} cx={x} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
    });
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizFlowLines() {
    const lineCount = 8;
    const dotsPerLine = 30;
    const dots: React.ReactElement[] = [];
    // Each line runs at 45° from somewhere in the upper-left to somewhere in the lower-right.
    // Perpendicular spacing of 18 between lines, centered around the diagonal.
    for (let l = 0; l < lineCount; l++) {
        const perpOffset = (l - (lineCount - 1) / 2) * 18;
        // Translate the perpendicular offset into x/y shift (for a 45° line, perp dir is (1,-1)/sqrt2)
        const perpDx = perpOffset * Math.SQRT1_2;
        const perpDy = -perpOffset * Math.SQRT1_2;
        const startX = -20 + perpDx;
        const startY = -20 + perpDy;
        const endX = 220 + perpDx;
        const endY = 220 + perpDy;
        for (let d = 0; d < dotsPerLine; d++) {
            const t = d / (dotsPerLine - 1);
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            // Skip dots outside the viewBox
            if (x < -2 || x > 202 || y < -2 || y > 202) continue;
            const opacity = 0.2 + t * 0.75;
            dots.push(
                <circle key={`f${l}-${d}`} cx={x} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
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
    if (viz === "squares") return <VizConcentricSquares />;
    if (viz === "crosshair") return <VizCrosshair />;
    if (viz === "strata") return <VizStrata />;
    return <VizFlowLines />;
}
```

- [ ] **Step 2: Update the `Viz` type and the `cards` array**

Find the `Viz` type definition (currently `type Viz = "grid" | "wave" | "sunburst" | "curve";`) and replace with:

```ts
type Viz = "squares" | "crosshair" | "strata" | "flow";
```

In the `cards` array, update each card's `viz` field:

```ts
const cards: Card[] = [
    {
        module: "MODULE_01",
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        bg: "#0B0B0B",
        isLight: false,
        viz: "squares",
    },
    {
        module: "MODULE_02",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        bg: "#1a1c1e",
        isLight: false,
        viz: "crosshair",
    },
    {
        module: "MODULE_03",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        bg: "#FF4D00",
        isLight: true,
        viz: "strata",
    },
    {
        module: "MODULE_04",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        bg: "#B81D1D",
        isLight: true,
        viz: "flow",
    },
];
```

- [ ] **Step 3: Production build to verify type safety + render**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. No TS errors. `/` route bundle should drop slightly (Batch 3's 6.07 kB had 2028 dots; we now have ~870, so the inline payload shrinks).

- [ ] **Step 4: Smoke check — verify HTML output**

Start prod server (kill any existing one first). With `npm run start` running on port 3000:

```bash
echo "Total <circle in / HTML:"
curl -s http://localhost:3000 | grep -oE '<circle' | wc -l
echo "(Expected: ~870 — significantly less than Batch 3's 2028)"

echo "No leftover references to old viz names in HTML?"
curl -s http://localhost:3000 | grep -oE 'viz="(grid|wave|sunburst|curve)"' | head -3
echo "(Expected: empty — viz attribute isn't rendered to DOM, but this is a safety check)"
```

If circle count is reasonably ~870 (give or take 50 for edge dots clipped in `VizFlowLines`) and no leftovers, proceed.

- [ ] **Step 5: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx
git commit -m "feat(services): original SVG visualizations — concentric squares / crosshair / strata / flow lines"
```

---

## Task 2: Hover/focus expansion + reduced-motion override

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx` — add `panel-row` class + `tabIndex={0}`
- Modify: `src/app/globals.css` — add `.panel-row` rules

- [ ] **Step 1: Add `panel-row` class and `tabIndex={0}` to JSX**

In `CoreInfrastructure.tsx`, find the panel-row wrapper:
```tsx
<div className="-mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```
Replace with:
```tsx
<div className="panel-row -mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

Find the `<article>` open tag inside the map:
```tsx
<article
    key={card.module}
    className="card-panel group relative flex flex-col"
    style={{
        background: card.bg,
        color: "#ffffff",
        transition: "filter 200ms ease",
        minHeight: "520px",
    }}
>
```
Add `tabIndex={0}` and an `aria-label` so the focus state has clear assistive-technology context:
```tsx
<article
    key={card.module}
    className="card-panel group relative flex flex-col"
    tabIndex={0}
    aria-label={`${card.module}: ${card.title.replace("\n", " ")}`}
    style={{
        background: card.bg,
        color: "#ffffff",
        transition: "filter 200ms ease",
        minHeight: "520px",
    }}
>
```

- [ ] **Step 2: Add expansion rules to `globals.css`**

In `src/app/globals.css`, find the existing `.card-panel:hover` block (added in Batch 3). Immediately AFTER that block but BEFORE the existing `.card-panel:not(:first-child)` block, insert:

```css
  /* ─── Service-card row hover/focus expansion (desktop ≥1024px only) ─── */
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

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: clean. Bundle on `/` may shift slightly (CSS additions tiny).

- [ ] **Step 4: Manual smoke at all 5 viewports**

`npm run start`. In Chrome DevTools, test at 320 / 375 / 768 / 1024 / 1440:

- 320 / 375 (mobile): cards stack 1-up. No hover/focus expansion. Brightness hover may not be obvious on touch.
- 768 (tablet): 2×2 grid. No expansion on hover. Brightness hover fires.
- 1024+ (desktop): 4-up. Hover any card → that card's column grows from `1fr` to `2fr`, others compress, 300ms ease. Cards 1 and 4 stay anchored to their respective edges. Inner cards visibly shift.
- Tab key (1024+): cycle Tab through cards 1→2→3→4. Each focused card triggers the same column expansion (via `:focus-within`). Focus ring (orange, 2px) visible on each card.
- Enable `prefers-reduced-motion` in DevTools (Rendering tab → Emulate CSS media feature → reduce). Hover a card on desktop: layout change is instant (no 300ms animation). Brightness hover still fires.

- [ ] **Step 5: Server-side smoke**

```bash
echo "panel-row class on grid wrapper?"
curl -s http://localhost:3000 | grep -oE 'class="panel-row[^"]*"' | head -1
echo "tabindex on cards?"
curl -s http://localhost:3000 | grep -oE 'tabindex="0"' | wc -l
echo "(Expected: 4 — one per card, no other elements use tabindex=0)"
echo "aria-label on cards?"
curl -s http://localhost:3000 | grep -oE 'aria-label="MODULE_0[1-4]: [^"]+"' | sort -u
```

- [ ] **Step 6: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx src/app/globals.css
git commit -m "feat(services): hover/focus column expansion on desktop; tabindex + aria-label per card"
```

---

## Task 3: STATUS changelog

- [ ] **Step 1: Append Batch 4 entry**

Append to `STATUS.md` immediately under `## Active Branch` and the `---` separator (i.e., as the newest top entry):

```markdown
## Batch 4 — Original Visualizations + Hover Expansion — 2026-04-30

Plan: `docs/superpowers/plans/2026-04-30-batch4-card-viz-and-expand.md`
Spec: `docs/superpowers/specs/2026-04-30-batch4-card-viz-and-expand-design.md`

### Changes
1. **Replaced 4 SVG visualizations** in `CoreInfrastructure.tsx`. The reference-derived `grid` / `wave` / `sunburst` / `curve` patterns from Batch 3 are gone, replaced by:
   - **Concentric squares** (Autonomous Backends) — 7 nested square outlines, dot-perimeters, falling opacity from outer to inner ring
   - **Crosshair grid** (Precision UI) — orthogonal axis lines + 4 corner micro-grids + reinforced center
   - **Stacked strata** (Data Storage) — 12 horizontal rows of dots at varying density, opacity falling top→bottom
   - **Flow lines** (Global Pipelines) — 8 parallel diagonal dotted streams with directional opacity ramp
   
   Total dot count dropped from ~2028 (Batch 3) to ~870.

2. **Hover/focus column expansion** on desktop ≥1024px. Hovering or keyboard-focusing any card grows its column from `1fr` to `2fr`; the other three stay `1fr`. 300ms eased transition on `grid-template-columns` via `:has()`. Outer cards (1, 4) stay edge-anchored. Tablet (2×2) and mobile (1-up) get no expansion — no horizontal slack to redistribute. `prefers-reduced-motion` snaps the layout instantly.

3. **Keyboard parity** — added `tabIndex={0}` and `aria-label="${module}: ${title}"` to each card `<article>`. Tab cycles focus 1→2→3→4. Each focused card triggers the same expansion as hover.

### Verified server-side
- `panel-row` class on grid wrapper.
- 4 elements with `tabindex="0"` (one per card).
- 4 distinct aria-labels: `MODULE_01: Autonomous Backends`, `MODULE_02: Precision UI`, `MODULE_03: Data Storage`, `MODULE_04: Global Pipelines`.
- Production build clean.

### Out of scope this batch
- "02 — Execution / The Architectural Method" section (user still thinking)
- Pre-existing `/work` a11y findings (separate batch)
- `M src/app/learn/[slug]/page.tsx` working-tree change (untouched)
- Test framework setup (no Playwright/Vitest introduced)
- Lighthouse re-run (no CWV-affecting changes)

---
```

- [ ] **Step 2: Commit**

```bash
git add STATUS.md
git commit -m "docs(status): record Batch 4 (visualizations + hover expansion)"
```

---

## Self-review checklist

- [ ] **Spec coverage:**
  - 4 new visualizations with original concepts → Task 1 ✅
  - Hover expansion via `:has()` + `grid-template-columns` → Task 2 ✅
  - Focus parity via `:focus-within` + `tabIndex={0}` → Task 2 ✅
  - Reduced-motion snap → Task 2 step 2 ✅
  - Desktop-only via `@media (min-width: 1024px) and (hover: hover)` → Task 2 step 2 ✅
  - aria-label for assistive-tech context → Task 2 step 1 ✅
- [ ] **No placeholders:** Every step shows actual code or actual command. ✅
- [ ] **Type consistency:** `Viz = "squares" | "crosshair" | "strata" | "flow"` matches `Visualization` switch and the four data entries' `viz` strings. ✅
- [ ] **Order:** Visualizations (Task 1) before expansion (Task 2) — small, isolated change first; expansion adds CSS that reads cleanly with the new content. STATUS at end. ✅
- [ ] **A11y:** Every card focusable (`tabIndex=0`), each has aria-label, `:focus-within` triggers expansion, focus ring inherited from globals.css:46. ✅
- [ ] **Performance:** Pure CSS transition; no JS for hover. Dot count drops ~57% from Batch 3. CWV impact negative-or-neutral. ✅
- [ ] **Browser support:** `:has()` and animatable `grid-template-columns` both Chrome 105+ / Safari 16+ / Firefox 121+ — all evergreen as of 2026. ✅
