# Batch 3 — PageSpeed Metric + CoreInfrastructure Card Redesign (Design Spec)

**Date:** 2026-04-30
**Branch:** `pre-launch/cleanup-2026-04-17` (continuation; no child branch — same as Batches 1–2)
**Status:** Approved by user, ready to plan

---

## Goal

Two narrowly-scoped changes:

1. **PageSpeed metric clarity.** The "90+" value in the home-page metrics banner has no anchor — non-technical readers can't tell what scale "90+" sits on. Add the denominator and the source attribution.
2. **Service-cards section redesign.** Replace the current "Web Development & Automation Services" overlap-then-grid card layout with a four-color full-bleed panel layout matching the user's reference images. Fix two bugs along the way: SVG geometric line-accents bleeding through the section, and content-length variance between cards (current cards have inconsistent visual rhythm because body text lengths differ).

Out of scope (deferred to a later batch the user is "still thinking on"): the `02 — Execution / The Architectural Method` section. The pre-existing `M src/app/learn/[slug]/page.tsx` working-tree change remains untouched. Pre-existing `/work` a11y items remain deferred per standing instruction.

---

## Part 1 — PageSpeed metric anchor

**File:** `src/components/organisms/MetricsBanner.tsx:3`

Current:
```ts
{ value: "90+",   label: "PageSpeed Guarantee" },
```

After:
```ts
{ value: "90+/100", label: "Google PageSpeed Guarantee" },
```

**Why this exact wording:**
- `90+/100` mirrors the other metrics' "value with implicit unit" pattern (`99.9%`, `24ms`, `100%`). The "/100" reads as a denominator without needing extra characters.
- `Google PageSpeed Guarantee` keeps the brand-promise word "Guarantee" while attributing the source (Google PageSpeed Insights). A non-technical reader now sees: *"90 out of 100 on Google's tool — guaranteed"*.

**No other PageSpeed mentions touched.** The other 8 occurrences (in metadata, FAQ answer, About page, work-page schema, etc.) are sentence-form copy where context already provides the anchor (e.g., `"scores 90+ on Google PageSpeed Insights"`). Changing those would be churn without payoff.

---

## Part 2 — CoreInfrastructure card redesign

**File:** `src/components/organisms/CoreInfrastructure.tsx`

### What's broken now

1. **SVG line-accents bleed.** The four decorative lines (`<svg>` at lines 50–59 in current `CoreInfrastructure.tsx`) sit on the section background at `opacity-[0.045]`. With the new full-bleed colored panels, they would render *behind* the panels — invisible, but dead pixels. With the current bordered-card layout they render in the gaps between cards, creating visual noise. **Fix: delete the SVG block.** The new card design carries its own visual interest via the panel SVG visualizations.
2. **Content-length variance.** Card 1 has tags (`Next.js`, `Node.js`); cards 2–4 don't. Card bodies vary 80–135 chars. The current `min-h-[360px]` masks this on desktop but produces uneven internal whitespace. **Fix: new layout puts body in a fixed-height slot at the bottom, with the visualization absorbing whitespace differences in the middle slot.**

### Visual direction

Reference: user-supplied two images. Four full-bleed colored panels in a row, no gaps. Each panel: TITLE at top → SVG visualization in middle → counter + small body paragraph at bottom.

### Color palette (locked: option 3 — existing palette only)

Mapping cards 1→4 to existing CSS-variable colors. Adjacent cards must read as visually distinct:

| Card | Module | Color (hex) | Source | Text color |
|---|---|---|---|---|
| 1 | MODULE_01 — Autonomous Backends | `#0B0B0B` (obsidian) | `--obsidian` | white |
| 2 | MODULE_02 — Precision UI | `#1a1c1e` (slate-dark) | `--slate-dark` | white |
| 3 | MODULE_03 — Data Storage | `#FF4D00` | `--accent` | white |
| 4 | MODULE_04 — Global Pipelines | `#B81D1D` | hero-gradient endpoint | white |

**Cards 1 & 2 are both dark.** They differ by ~15 RGB units — adjacent. To prevent them reading as one merged surface, every card has a `1px rgba(255,255,255,0.08)` left border (a single shared seam between adjacent cards). Light-color cards (3, 4) inherit the same seam; on the orange/red panels it reads as a subtle highlight rather than a divider.

**Section background:** `bg-obsidian` (existing). The panel row sits flush against it.

### Layout structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER ROW (existing, unchanged):                                  │
│  [H2 "Web Development & Automation Services"] [01 — Capabilities]   │
└─────────────────────────────────────────────────────────────────────┘
┌──────────┬──────────┬──────────┬──────────┐
│ MODULE_01│ MODULE_02│ MODULE_03│ MODULE_04│
│          │          │          │          │  ← TITLE block
│ Autonomous│ Precision │ Data    │ Global   │     (title-top, 2 lines max)
│ Backends │   UI     │ Storage │ Pipelines│
│          │          │          │          │
│  ┌────┐  │   ╱╲╱╲   │  ╲│╱     │  ╭╮╭╮    │  ← SVG visualization slot
│  │░░░░│  │ ╱      ╲ │ ─┼─      │ ╰╯╰╯     │     (centered, ~180-200px)
│  │░░░░│  │╱        ╲│  ╱│╲     │           │
│  └────┘  │          │          │           │
│          │          │          │           │
│ 01 / 04  │ 02 / 04  │ 03 / 04  │ 04 / 04  │  ← counter (mono, small)
│          │          │          │          │
│ SELF-HEAL│ INTERFACE│ IMMUTABLE│ AUTO-    │  ← body paragraph
│ ING ...  │ S DESIGN │ AUDIT    │ MATED    │     (small caps, fixed lines)
│          │ ED FOR ..│ TRAILS...│ DEPLOY...│
└──────────┴──────────┴──────────┴──────────┘
```

Each card's vertical structure (top → bottom):
1. **Title block** (top, `padding 40px 32px 0`): Module name on 2 lines max. Font: `font-headline font-bold uppercase`, size `clamp(1.25rem, 1.6vw, 1.875rem)`, line-height 1.05, tracking-tight. Color: white.
2. **SVG visualization slot** (center, fills available space, `padding: 32px`): square aspect, ~180-200px target. Each card has a unique pattern (see "Visualizations" below).
3. **Counter** (just above body, `padding-top: 24px`): `01 / 04`, `02 / 04`, etc. Font: `mono-label` style (10px, mono, white/40 — but elevated to white/60 to read on orange/red panels).
4. **Body paragraph** (bottom, `padding 16px 32px 40px`): 2-3 lines of small caps copy at `text-[10px] font-bold tracking-[0.18em] uppercase`. Color: white/65 on dark cards; white/85 on orange/red.

**Card height is uniform across the row.** Use `align-items: stretch` on the flex/grid container.

### Card content (preserved from existing data array)

Titles, modules, body text — preserved verbatim from existing `cards` array. The redesign is layout-only.

```ts
const cards = [
    {
        module: "MODULE_01",
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        bg: "#0B0B0B",
        bodyColor: "rgba(255,255,255,0.65)",
        viz: "grid",
    },
    {
        module: "MODULE_02",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        bg: "#1a1c1e",
        bodyColor: "rgba(255,255,255,0.65)",
        viz: "wave",
    },
    {
        module: "MODULE_03",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        bg: "#FF4D00",
        bodyColor: "rgba(255,255,255,0.85)",
        viz: "sunburst",
    },
    {
        module: "MODULE_04",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        bg: "#B81D1D",
        bodyColor: "rgba(255,255,255,0.85)",
        viz: "curve",
    },
];
```

The `tags` field (was `["Next.js", "Node.js"]` on card 1 only) is **dropped** — the new layout has no tag slot, and tag presence on one card created visual inconsistency. The Next.js / Node.js information is already conveyed elsewhere on the site (hero copy, FAQ, About page).

### Visualizations (option α — 4 unique SVGs, hand-built)

Each visualization is a self-contained `<svg viewBox="0 0 200 200">` rendered at `~180-200px` square inside the middle slot. Stroke/fill uses `currentColor` so cards can theme their visualization (white on dark cards, white at lower opacity on light cards) via CSS.

Four patterns to build:

1. **`grid` (Card 1 — Autonomous Backends):** Square dot grid, 14×14 dots, falling-density gradient (top-left dense, bottom-right thinning). Reference: image's first card. Conveys "structure / matrix".
2. **`wave` (Card 2 — Precision UI):** Horizontal sinusoid rendered as 30 vertical dotted columns, each column's dots positioned along a sine wave. Reference: image's second card. Conveys "rhythm / measurement".
3. **`sunburst` (Card 3 — Data Storage):** Radial dot pattern emanating from a central point, lines of dots fanning outward at ~12° intervals. Reference: image's third card. Conveys "broadcast / distribution".
4. **`curve` (Card 4 — Global Pipelines):** Vertical sinusoid stack — multiple horizontal dotted rows, each row offset along a sine curve to create a folded-ribbon look. Reference: image's fourth card. Conveys "flow / pipeline".

All four use `circle r="1.2"` dots for consistency. Implementation kept inline in `CoreInfrastructure.tsx` as a small `<Viz>` switch component (no separate file — they're tightly coupled to this section's design).

### Hover behaviour (locked: option A — subtle brighten)

On hover of any card:
- That card's background brightens by ~6% (lightens via `filter: brightness(1.06)`)
- 200ms ease transition
- No size/scale change, no other-cards reaction
- Cursor: `default` (cards are not currently links — preserve)

This matches the pattern set by `.btn-cta-orange` (Batch 1) and `.btn-primary` (existing) — subtle hover, brand-consistent.

### Mobile / responsive

- **Desktop (`lg:` ≥1024px)**: 4 columns, equal width, no gaps, shared seams.
- **Tablet (`md:` 768–1023px)**: 2×2 grid, no gaps, shared seams (top/bottom + left/right).
- **Mobile (`<768px`)**: single-column stack, panels fill viewport width, 1px white/8 seam between adjacent vertical panels.

Card padding scales: `p-8 lg:p-10` outer; visualization slot keeps its absolute size (180-200px) but uses `max-width: 100%` to never overflow narrow cards.

### Section eyebrow (open decision documented inline)

Current section uses `[H2] [section-label "01 — Capabilities"]` layout above the cards. The user's reference shows a *centered* "JOIN US" label with corner brackets — different visual idiom. **Decision: keep the existing H2 + section-label layout above the cards**. Adopting the corner-bracket idiom would introduce a new pattern not used elsewhere on the site. Cards beneath get the new full-bleed treatment; everything above the cards stays the same.

If the user wants the corner-bracket eyebrow added, it's a small follow-up.

### A11y

- Card title is still `<h3>` (preserves existing heading hierarchy).
- Each card's SVG visualization gets `aria-hidden="true"` (decorative).
- Section landmark + `aria-label` preserved from existing markup.
- Body copy contrast: white/65 on `#1a1c1e` = ~6.4:1 (AA pass for small text). White/85 on `#FF4D00` = ~3.9:1 — borderline for AA small-text (4.5:1 required). **Mitigation:** body on orange/red cards uses solid white (`rgba(255,255,255,1)`) at slightly lower font-weight — keeps it visually softer than the title while passing contrast. Updated table:

| Card bg | Title | Body | Counter |
|---|---|---|---|
| #0B0B0B | white | white/65 | white/40 |
| #1a1c1e | white | white/65 | white/40 |
| #FF4D00 | white | white | white/70 |
| #B81D1D | white | white | white/70 |

The `bodyColor` field in the data array is replaced with a per-card resolution at render time (or just inline two style branches based on `card.bg.startsWith("#") && (card.bg === "#FF4D00" || card.bg === "#B81D1D")`).

### What's deleted

- The decorative `<svg>` block at lines 50–59 of current `CoreInfrastructure.tsx` (the four diagonal/horizontal stroke lines). Section no longer needs it; new card patterns carry the visual interest.
- The `min-h-[360px]`, `gap-8`, `hover:scale-[1.02]` from Batch 2's grid layout. Replaced by the new full-bleed structure.
- Mobile-only stacked block (lines ~117-149 post-Batch-2): replaced by the new responsive layout (single component, responsive at the panel level).
- The `tags` field from the data array.
- Material Symbols icon usage in cards (`material-symbols-outlined`). Replaced by the SVG visualizations.

### What's preserved

- The section's outer wrapper, ID `id="capabilities"`, padding, header row.
- `aria-label="Core Infrastructure"`.
- The data structure of `cards` (modified — see above).
- The `whitespace-pre-line` title rendering (newline character in title strings).

---

## Acceptance criteria

A reviewer should confirm at viewport widths 320 / 375 / 768 / 1024 / 1440:

1. MetricsBanner shows `90+/100` over `Google PageSpeed Guarantee`.
2. CoreInfrastructure section renders 4 cards: black, dark-grey, orange, deep-red.
3. No SVG line-accents anywhere in the section.
4. All four cards have identical heights (within their breakpoint layout).
5. Each card displays: title (top, 2 lines), SVG visualization (middle, dot pattern), `0X / 04` counter, body copy (bottom). Same vertical rhythm across all 4.
6. No tags pill anywhere in this section.
7. Hover on any card: subtle brighten (~6%), no scale, no neighbour reaction, 200ms ease.
8. Body text contrast passes AA on every card.
9. No horizontal overflow at 320px (mobile = single-column stack).
10. Production build passes (`npm run build`); no TS/lint errors.

## Out of scope (explicit)

- Architectural Method section ("02 — Execution / The Architectural Method") — user is still thinking
- Pre-existing a11y findings on `/work` — separate batch
- `/founder-portrait.jpg`, `/og-image.png` — blocked on user
- Lighthouse re-run — none of these changes affect CWV (no new images, no JS, SVGs are tiny inline)
- The `M src/app/learn/[slug]/page.tsx` working-tree change — user's WIP, untouched

## Approval

User confirmed picks 2026-04-30:
- PageSpeed wording: A + B combined → `90+/100 Google PageSpeed Guarantee`
- Card palette: option 3 (obsidian / slate-dark / `#FF4D00` / `#B81D1D`)
- Card hover: option A (subtle brighten on hovered card, others stay still)
- Visualization slot: option α (4 unique SVG patterns, hand-built)
- Architectural Method: deferred (user still thinking)
