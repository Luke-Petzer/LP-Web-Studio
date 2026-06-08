# Mobile Responsiveness Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 5 confirmed mobile layout issues at 375px viewport so no content overflows, touch targets are adequate, and padding is proportionate on small screens.

**Architecture:** Each fix is a targeted Tailwind class or inline style change in a single component file. Mobile-first approach: base classes target mobile, `md:` prefixes restore desktop sizing. No desktop styling is changed. No new components created.

**Tech Stack:** Next.js 15, Tailwind CSS (custom theme with `obsidian`, `slate-dark`, `structural` spacing tokens), React inline styles where Tailwind cannot override specificity.

---

## File Map

| File | Issue | Fix type |
|------|-------|----------|
| `src/components/organisms/MetricsBanner.tsx` | `p-10` cell padding + `clamp(2.5rem)` font floor overflows 375px cells | Tailwind class + inline style value |
| `src/components/organisms/CoreInfrastructure.tsx` | `minHeight: "524px"` inline style can't be overridden by Tailwind on mobile | Move from inline style → responsive Tailwind class |
| `src/components/organisms/ArchitecturalMethod.tsx` | `p-12 min-h-[360px]` per card × 3 cards = excessive height on mobile | Tailwind responsive class swap |
| `src/components/organisms/B2BPlatform.tsx` | `p-10 min-h-[320px]` per card × 3 cards — min-h applies on all viewports | Tailwind responsive class swap |
| `src/components/organisms/FinalCTA.tsx` | `py-40` = 320px combined vertical padding wasted on mobile | Tailwind responsive class swap |

---

### Task 1: Fix MetricsBanner cell padding and font overflow

**Files:**
- Modify: `src/components/organisms/MetricsBanner.tsx:18,22`

**Context:** The metrics grid is `grid-cols-2` at 375px. Each cell is ~(375 - 2×32px outer padding) / 2 ≈ 155px wide. With `p-10` (40px) padding, content area shrinks to ~75px. "Next.js" at `clamp(2.5rem=40px, ...)` is ~182px — far wider than the cell, causing overflow. Fix: reduce padding to `p-4` (16px) on mobile, reduce font floor to `1.5rem` (24px).

- [ ] **Step 1: Apply the fix**

In `src/components/organisms/MetricsBanner.tsx`, make two changes:

Line 18 — change padding class:
```tsx
// Before
className="flex flex-col gap-3 p-10 md:p-12"

// After
className="flex flex-col gap-3 p-4 md:p-10"
```

Line 22 — change font clamp minimum:
```tsx
// Before
style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}

// After
style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}
```

- [ ] **Step 2: Verify in browser at 375px**

Open http://localhost:3000 (or `npm run dev` if not running). Open DevTools → toggle device toolbar → set width to 375px. Scroll to the metrics banner. Confirm:
- All 4 metric values ("100%", "Next.js", "Cape Town", "Yours.") are fully visible within their cells
- No horizontal scroll bar appears
- Cell borders align correctly

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/MetricsBanner.tsx
git commit -m "fix(mobile): MetricsBanner — reduce cell padding and font floor at 375px"
```

---

### Task 2: Fix CoreInfrastructure card min-height on mobile

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx:253-258`

**Context:** The `article` element has `minHeight: "524px"` in its inline `style` prop. Inline styles have higher CSS specificity than Tailwind classes, so adding a Tailwind `min-h-*` class has no effect. On mobile the 4 cards stack (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`), creating 4 × 524px = 2096px minimum — far too tall. Fix: remove `minHeight` from the style object, add responsive `min-h-[300px] md:min-h-[524px]` Tailwind classes instead.

- [ ] **Step 1: Apply the fix**

In `src/components/organisms/CoreInfrastructure.tsx`, on the `article` element (around line 243):

```tsx
// Before
<article
  key={card.module}
  className="card-panel group relative flex flex-col"
  tabIndex={0}
  aria-label={`${card.module}: ${card.title.replace("\n", " ")}`}
  onMouseEnter={() => setHoveredIdx(i)}
  onMouseLeave={() => setHoveredIdx(null)}
  onFocus={() => setHoveredIdx(i)}
  onBlur={() => setHoveredIdx(null)}
  style={{
    background: card.bg,
    color: "#ffffff",
    transition: "filter 500ms ease-in-out",
    minHeight: "524px",
  }}
>

// After
<article
  key={card.module}
  className="card-panel group relative flex flex-col min-h-[300px] md:min-h-[524px]"
  tabIndex={0}
  aria-label={`${card.module}: ${card.title.replace("\n", " ")}`}
  onMouseEnter={() => setHoveredIdx(i)}
  onMouseLeave={() => setHoveredIdx(null)}
  onFocus={() => setHoveredIdx(i)}
  onBlur={() => setHoveredIdx(null)}
  style={{
    background: card.bg,
    color: "#ffffff",
    transition: "filter 500ms ease-in-out",
  }}
>
```

- [ ] **Step 2: Verify in browser at 375px**

Scroll to the "Web Development & Automation Services" section. Confirm:
- Cards are readable and not excessively tall on mobile (each ~300px)
- All card content (title, visualization, body text) is visible
- At desktop (≥768px), cards are still 524px tall
- The hover-expansion animation still works on desktop (hover a card — it should expand)

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx
git commit -m "fix(mobile): CoreInfrastructure — move minHeight from inline style to responsive Tailwind"
```

---

### Task 3: Fix ArchitecturalMethod card padding and min-height on mobile

**Files:**
- Modify: `src/components/organisms/ArchitecturalMethod.tsx:71`

**Context:** Each step card uses `p-12 md:p-16 min-h-[360px]`. On mobile, `p-12` = 48px padding on all sides (96px eaten vertically by padding alone) and `min-h-[360px]` applies to all viewports. Three cards × 360px = 1080px minimum on mobile. Fix: reduce to `p-8 md:p-16` and make min-height responsive: `min-h-[240px] md:min-h-[360px]`.

- [ ] **Step 1: Apply the fix**

In `src/components/organisms/ArchitecturalMethod.tsx`, line 71:

```tsx
// Before
className="group dark-card relative p-12 md:p-16 min-h-[360px] flex flex-col justify-between overflow-hidden"

// After
className="group dark-card relative p-8 md:p-16 min-h-[240px] md:min-h-[360px] flex flex-col justify-between overflow-hidden"
```

- [ ] **Step 2: Verify in browser at 375px**

Scroll to the "How We Build" section. Confirm:
- Three step cards are compact but readable on mobile
- Step label, rule divider, title, and body text are all visible
- Corner icon (material symbol) is not obscured
- At desktop the cards are still 360px tall with `p-16` padding

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/ArchitecturalMethod.tsx
git commit -m "fix(mobile): ArchitecturalMethod — reduce card padding and min-height on mobile"
```

---

### Task 4: Fix B2BPlatform card padding and min-height on mobile

**Files:**
- Modify: `src/components/organisms/B2BPlatform.tsx:55`

**Context:** Each card uses `p-10 md:p-12 min-h-[320px]`. On mobile, `p-10` = 40px padding on all sides (80px vertical minimum from padding), and `min-h-[320px]` applies at all viewports. Three cards × 320px = 960px+ on mobile. Fix: reduce to `p-6 md:p-12` and remove mobile min-height (let content determine height): `md:min-h-[320px]`.

- [ ] **Step 1: Apply the fix**

In `src/components/organisms/B2BPlatform.tsx`, line 55:

```tsx
// Before
<div key={card.label} className="dark-card p-10 md:p-12 min-h-[320px] flex flex-col justify-between">

// After
<div key={card.label} className="dark-card p-6 md:p-12 md:min-h-[320px] flex flex-col justify-between">
```

- [ ] **Step 2: Verify in browser at 375px**

Scroll to the "B2B Ordering Platform" section. Confirm:
- Three problem/solution/impact cards stack correctly
- Content (label, rule, title, body) is readable with appropriate breathing room
- Cards are not excessively tall on mobile
- At desktop (≥768px), left panel is 6-col and cards maintain 320px min-height

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/B2BPlatform.tsx
git commit -m "fix(mobile): B2BPlatform — reduce card padding and remove mobile min-height"
```

---

### Task 5: Fix FinalCTA excessive vertical padding on mobile

**Files:**
- Modify: `src/components/organisms/FinalCTA.tsx:11`

**Context:** The section uses `py-40 md:py-48`. `py-40` = 160px top + 160px bottom = 320px of vertical padding alone on mobile. That's wasted whitespace pushing content far down the page. The custom Tailwind token `epic` = `160px`, same as `py-40`. Fix: reduce to `py-20 md:py-48` (80px top+bottom on mobile, 192px on desktop).

- [ ] **Step 1: Apply the fix**

In `src/components/organisms/FinalCTA.tsx`, line 11:

```tsx
// Before
className="relative py-40 md:py-48 px-8 md:px-12 bg-slate-dark overflow-hidden"

// After
className="relative py-20 md:py-48 px-8 md:px-12 bg-slate-dark overflow-hidden"
```

- [ ] **Step 2: Verify in browser at 375px**

Scroll to the "Stop Managing. Start Building." section at the bottom of the homepage. Confirm:
- Section is proportionate — not dwarfed by empty whitespace above/below
- Headline, micro-timeline, and CTA buttons are all visible and accessible
- "Start a Project" and "Request Audit" buttons have adequate touch targets (≥44px height)
- At desktop the section still has generous `py-48` (192px) padding

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/FinalCTA.tsx
git commit -m "fix(mobile): FinalCTA — reduce vertical padding from py-40 to py-20 on mobile"
```

---

## Self-Review

**1. Spec coverage:**
- MetricsBanner overflow at 375px ✓ (Task 1)
- CoreInfrastructure 2096px stack height ✓ (Task 2)
- ArchitecturalMethod 1080px stack height ✓ (Task 3)
- B2BPlatform 960px stack height ✓ (Task 4)
- FinalCTA 320px wasted padding ✓ (Task 5)
- All other components confirmed fine in audit (NavClient, ContactDrawer, ScaleBanner, Footer, ProjectSection, SubpageHero — no fixes needed)

**2. Placeholder scan:** No TBDs, TODOs, or vague instructions. Every step has exact before/after code.

**3. Consistency:** All class changes follow the same mobile-first pattern: base class = mobile value, `md:` prefix = desktop value. No type definitions to check (pure Tailwind/style changes).
