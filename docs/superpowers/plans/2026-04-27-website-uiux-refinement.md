# Website UI/UX Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 8 targeted UI/UX refinements across the LP Web Studio site (FAQ smoothness, card hover unification, button hover consistency, broken layout fix, redundant tag removal) followed by a Lighthouse audit and low-risk wins.

**Architecture:** All motion is CSS-only (no framer-motion — it was removed). Shared idioms live in `globals.css` under `@layer components`. Per-component changes prefer Tailwind arbitrary values + inline style for one-offs that already exist in the codebase. Two shared utilities are introduced: `.read-link` (animated left-to-right underline) and `.btn-cta-orange` (orange-CTA hover signature). One layout fix changes `CoreInfrastructure` desktop from absolute-positioned overlap to a 4-column grid to eliminate card-4 clipping while preserving the dark-card aesthetic.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3.4, TypeScript. No new dependencies.

**Branch context:** Current branch is `pre-launch/cleanup-2026-04-17`. STATUS.md still references `dev/main-refresh` as "active" — that's stale and out of scope for this pass.

**Open clarification flagged for the user (does NOT block work):** Change 7 spec says "Work page → Ready to Deploy?" but that heading only exists in `AboutPageContent.tsx:306`. This plan applies Change 7 to the About page; if the user wanted a new section on the Work page, the task can be redone.

---

## File Structure

| File | Change |
|---|---|
| `src/app/globals.css` | ADD `.read-link` (Tasks 2/8), `.btn-cta-orange` (Task 3) |
| `src/components/organisms/FAQSection.tsx` | MODIFY — smooth open/close transition (Task 1) |
| `src/components/organisms/LatestWriting.tsx` | MODIFY — card hover + `.read-link` (Task 2) |
| `src/components/organisms/FinalCTA.tsx` | MODIFY — orange CTA hover (Task 3) |
| `src/components/organisms/CoreInfrastructure.tsx` | MODIFY — desktop grid layout (Task 4) |
| `src/components/organisms/SubpageHero.tsx` | MODIFY — `breadcrumb` prop optional (Task 5) |
| `src/components/organisms/WorkPageContent.tsx` | MODIFY — drop breadcrumb prop (Task 5) |
| `src/components/organisms/WorkClosingCTA.tsx` | MODIFY — button hover states (Task 6) |
| `src/components/organisms/AboutPageContent.tsx` | MODIFY — `INITIATE PROJECT` hover (Task 7) |
| `src/app/learn/page.tsx` | MODIFY — card hover + `.read-link` (Task 8) |

---

## Task 1: FAQ smooth accordion transition

**Files:**
- Modify: `src/components/organisms/FAQSection.tsx`

The component already enforces "one open at a time" via `openIndex` state. Only the transition is missing. Use the `grid-template-rows: 0fr ↔ 1fr` CSS trick (no JS height measurement, no framer-motion).

- [ ] **Step 1: Apply the smooth-open pattern**

Replace the answer panel block (lines 62-69) with a grid wrapper that animates `grid-template-rows`:

```tsx
{/* Answer panel — smooth height transition */}
<div
    className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out ${
        openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`}
>
    <div className="overflow-hidden">
        <p className="text-white/60 text-base leading-relaxed max-w-2xl px-2 pb-8">
            {faq.a}
        </p>
    </div>
</div>
```

Note: the answer must always be in the DOM (don't gate it with `{openIndex === i && ...}` — the transition needs both states present). Keep the `aria-expanded` on the button as-is.

- [ ] **Step 2: Verify behavior in browser**

Run `npm run dev`. Open `http://localhost:3000` and scroll to the FAQ section. Confirm:
1. Clicking a closed FAQ smoothly expands its answer (~250ms).
2. Clicking an open FAQ smoothly collapses it.
3. Clicking a different FAQ collapses the previously open one as the new one opens.
4. No content flash; max-height-jump artifacts absent.
5. `prefers-reduced-motion` honored (the `*` rule in `globals.css:208` clamps animation-duration).

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/FAQSection.tsx
git commit -m "feat(faq): smooth accordion open/close transition"
```

---

## Task 2: Latest Writing — card hover + animated Read underline

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/organisms/LatestWriting.tsx`

Reuse-able `.read-link` is added once to `globals.css` and consumed here + Task 8.

- [ ] **Step 1: Add `.read-link` utility to `globals.css`**

Inside the existing `@layer components { ... }` block (after `.mono-label`, before the closing brace at line 204), insert:

```css
  /* ─── Read Link (animated left-to-right underline on hover/focus) ─── */
  .read-link {
    position: relative;
    display: inline-block;
    color: #FF4D00;
    font-family: var(--font-space-grotesk), sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .read-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 220ms cubic-bezier(0.2, 0, 0.2, 1);
  }
  .group:hover .read-link::after,
  .group:focus-visible .read-link::after,
  .read-link:hover::after,
  .read-link:focus-visible::after {
    transform: scaleX(1);
  }
```

- [ ] **Step 2: Strengthen card hover on `LatestWriting.tsx`**

Locate the `<a>` (line 46-50). Change the className from:
```
className="group block border-b border-white/10 py-8 md:py-10 transition-colors duration-200 hover:bg-white/[0.02]"
```
to:
```
className="group block border-b border-white/10 py-8 md:py-10 transition-colors duration-200 hover:bg-white/[0.04]"
```

(Subtle bump from 2% to 4% so the lightening reads on hover without becoming heavy. Keep the `group` class — Step 3 depends on it.)

- [ ] **Step 3: Replace the `Read →` span with `.read-link`**

Locate the `<span>` block (lines 87-99). Replace with:

```tsx
<span className="read-link shrink-0 md:pt-1">
    Read <span aria-hidden="true">→</span>
</span>
```

Remove the inline `style={{...}}` on that span entirely — `.read-link` covers all of it. The arrow stays inside the span so the underline runs under both the word and arrow.

- [ ] **Step 4: Verify behavior in browser**

Open `http://localhost:3000` and scroll to "Knowledge Base — Latest Writing". Confirm:
1. Hovering anywhere on a card lightens its background.
2. The "Read →" link grows an underline left-to-right over ~220ms.
3. Underline retracts on mouse leave.
4. Keyboard: tab to a card; underline appears (focus-visible).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/organisms/LatestWriting.tsx
git commit -m "feat(landing): subtle card lightening + animated read underline on Latest Writing"
```

---

## Task 3: Orange CTA hover signature on FinalCTA

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/organisms/FinalCTA.tsx`

Existing site button hover patterns:
- `.btn-primary` — subtle darken (white → #e5e5e5)
- `.btn-ghost` — invert (transparent → white bg + black text)

The orange CTA signature extends `btn-primary`'s "subtle hover" pattern with a brand-coloured glow — cohesive, not novel.

- [ ] **Step 1: Add `.btn-cta-orange` to `globals.css`**

Inside `@layer components { ... }`, after `.btn-ghost { ... }` block (around line 173):

```css
  /* ─── Orange CTA Button (signature — slight brighten + brand glow) ─── */
  .btn-cta-orange {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FF4D00;
    color: #ffffff;
    font-family: var(--font-space-grotesk), sans-serif;
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 240ms var(--easing),
                box-shadow 240ms var(--easing),
                transform  120ms var(--easing);
  }
  .btn-cta-orange:hover {
    background: #FF6020;
    box-shadow: 0 0 0 1px rgba(255, 96, 32, 0.35),
                0 12px 32px -8px rgba(255, 77, 0, 0.45),
                0 0 60px -15px rgba(255, 77, 0, 0.55);
  }
  .btn-cta-orange:active { transform: scale(0.98); }
```

- [ ] **Step 2: Wire `FinalCTA.tsx` to use `.btn-cta-orange`**

Replace the orange anchor (lines 37-39):
```tsx
<a href="mailto:luke@lpwebstudio.co.za" className="btn-primary px-12 py-5 w-full md:w-auto text-center" style={{ background: "#FF4D00", color: "#ffffff" }}>
    Initiate Protocol
</a>
```
with:
```tsx
<a href="mailto:luke@lpwebstudio.co.za" className="btn-cta-orange px-12 py-5 w-full md:w-auto text-center">
    Initiate Protocol
</a>
```

(Drop the `btn-primary` class and the inline style — both are subsumed by the new class.)

- [ ] **Step 3: Verify behavior in browser**

Scroll to "Stop Managing. Start Building." Hover the orange "Initiate Protocol" button:
1. Background brightens slightly (#FF4D00 → #FF6020).
2. A soft orange glow appears around the button.
3. Click animates a slight scale-down.
4. White "Request Audit" ghost button next to it still uses its existing invert hover (no regression).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/organisms/FinalCTA.tsx
git commit -m "feat(cta): signature hover on orange CTA — brand glow + subtle brighten"
```

---

## Task 4: Web Development & Automation Services — fix card-4 hover overflow

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx`

The desktop layout is 4 absolute-positioned cards at `left: 0/25/50/75%`, each `width: 46%`. Card 4 spans 75% → 121%, so its hover box-shadow is clipped by the parent's `overflow-hidden`. Fix by switching desktop to a 4-column CSS grid (mobile is already a clean stacked layout — leave untouched). Hover keeps the dark-card aesthetic via the existing `.infra-card` styles plus a subtle `scale(1.02)`.

- [ ] **Step 1: Replace the desktop block (lines 77-120)**

Replace the entire `<div className="hidden md:block">...</div>` block with:

```tsx
{/* ── Grid layout (desktop) — every card behaves identically, no clipping ── */}
<div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
    {cards.map((card) => (
        <div
            key={card.module}
            className="infra-card p-10 flex flex-col justify-between min-h-[420px] transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
            {/* Top row */}
            <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-white">
                    {card.icon}
                </span>
                <span className="mono-label">{card.module}</span>
            </div>

            {/* Bottom content */}
            <div>
                <h3
                    className="font-headline font-bold uppercase leading-none text-white mb-5 whitespace-pre-line"
                    style={{ fontSize: "clamp(1.5rem, 1.8vw, 1.875rem)" }}
                >
                    {card.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {card.body}
                </p>
                {card.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {card.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-obsidian border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    ))}
</div>
```

Notes:
- Removed inline `left/zIndex` props (no longer needed) and `onMouseEnter/Leave` z-index handlers (grid layout doesn't overlap).
- Reduced heading clamp slightly (`2.25rem` → `1.875rem`) so 4 columns fit comfortably at the lg breakpoint.
- Preserves the dark-card aesthetic via the existing `.infra-card` class. Keeps existing border/glow on hover from `globals.css:101-108`. Adds a `scale(1.02)` for subtle in-place lift.

- [ ] **Step 2: Drop the now-unused `zIndex`/`left` fields from the `cards` array**

Lines 5-40 — remove `zIndex` and `left` properties from each card object. Keep `module/icon/title/body/tags`. Final shape:

```tsx
const cards = [
    {
        module: "MODULE_01",
        icon: "terminal",
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        tags: ["Next.js", "Node.js"],
    },
    {
        module: "MODULE_02",
        icon: "architecture",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        tags: [],
    },
    {
        module: "MODULE_03",
        icon: "storage",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        tags: [],
    },
    {
        module: "MODULE_04",
        icon: "language",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        tags: [],
    },
];
```

- [ ] **Step 3: Verify behavior in browser**

Scroll to "Web Development & Automation Services". Confirm:
1. Desktop ≥1024px: 4 cards in a single row, equal widths, no overlap.
2. md (768-1023px): 2x2 grid (`md:grid-cols-2 lg:grid-cols-4`).
3. Mobile <768px: stacked layout unchanged (uses existing block at lines 122-152).
4. Hover any card: border lightens, soft glow + slight scale 1.02. Card 4 hover: no clipping anywhere.
5. Keyboard tab through cards still produces the focus ring (handled by global `:focus-visible`).

- [ ] **Step 4: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx
git commit -m "fix(services): replace overlap layout with 4-col grid; eliminate card-4 hover clipping"
```

---

## Task 5: Remove redundant breadcrumb tag from Work hero

**Files:**
- Modify: `src/components/organisms/SubpageHero.tsx`
- Modify: `src/components/organisms/WorkPageContent.tsx`

Make `breadcrumb` optional. Render the `<p>` only when a non-empty value is provided. Then drop the prop from the Work page caller. About / Learn pages keep their breadcrumbs intact.

- [ ] **Step 1: Make `breadcrumb` optional in `SubpageHero.tsx`**

Update the props interface (lines 7-11):

```tsx
export interface SubpageHeroProps {
  breadcrumb?: string;
  title: string;
  subtitle: string;
}
```

Wrap the breadcrumb `<p>` (lines 26-37) in a conditional:

```tsx
{breadcrumb && (
    <p
        className="absolute font-headline text-white/45 uppercase"
        style={{
            top: "clamp(16px, 3vh, 24px)",
            left: "clamp(20px, 4vw, 32px)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            fontWeight: 400,
        }}
    >
        {breadcrumb}
    </p>
)}
```

- [ ] **Step 2: Drop the `breadcrumb` prop from the Work page caller**

In `WorkPageContent.tsx`, find the `<SubpageHero ... />` (lines 49-53). Change from:
```tsx
<SubpageHero
    breadcrumb="LP WEB / WORK"
    title="WORK"
    subtitle="SELECTED CLIENT ENGAGEMENTS"
/>
```
to:
```tsx
<SubpageHero
    title="WORK"
    subtitle="SELECTED CLIENT ENGAGEMENTS"
/>
```

- [ ] **Step 3: Verify behavior in browser**

Visit `http://localhost:3000/work`. Confirm:
1. Top-left of hero card: no "LP WEB / WORK" tag.
2. The orange-red gradient hero, ghost watermark, title, subtitle, and bottom-right corner bracket all still render.
3. Visit `http://localhost:3000/about` — breadcrumb "LP WEB / INFRASTRUCTURE" still visible (no regression).
4. Visit `http://localhost:3000/learn` — breadcrumb "LP WEB / LEARN" still visible (no regression).
5. Confirm corner balance feels OK on /work hero. If it now feels empty, flag — do **not** improvise a replacement.

- [ ] **Step 4: Commit**

```bash
git add src/components/organisms/SubpageHero.tsx src/components/organisms/WorkPageContent.tsx
git commit -m "ui(work): remove redundant breadcrumb tag from work hero"
```

---

## Task 6: Work closing CTA — button hover consistency

**Files:**
- Modify: `src/components/organisms/WorkClosingCTA.tsx`

The two inline-styled buttons mimic `.btn-primary` and `.btn-ghost` but with custom padding (14px 28px) and 4px radius. Replace inline styles with the canonical classes; keep size/radius via Tailwind utilities so the visual stays identical at rest.

- [ ] **Step 1: Replace both buttons in `WorkClosingCTA.tsx`**

Replace the entire `<div className="flex flex-wrap items-center justify-center gap-4 mt-2">...</div>` block (lines 24-49) with:

```tsx
<div className="flex flex-wrap items-center justify-center gap-4 mt-2">
    <button
        onClick={openDrawer}
        className="btn-primary"
        style={{ padding: "14px 28px", borderRadius: "4px" }}
    >
        RUN FREE AUDIT
    </button>
    <button
        onClick={openDrawer}
        className="btn-ghost"
        style={{ padding: "14px 28px", borderRadius: "4px" }}
    >
        VIEW PRICING
    </button>
</div>
```

Both buttons now inherit:
- `RUN FREE AUDIT` (white) → background lightens to #e5e5e5 on hover, scales to 0.98 on active.
- `VIEW PRICING` (ghost) → inverts to white bg + black text on hover.

- [ ] **Step 2: Verify behavior in browser**

Visit `http://localhost:3000/work` and scroll to "IS YOUR WEBSITE COSTING YOU CUSTOMERS?". Confirm:
1. "RUN FREE AUDIT": hover subtly darkens; click animates scale-down.
2. "VIEW PRICING": hover inverts to white bg + black text.
3. Padding and rounded corners look the same as before.
4. Both buttons still open the contact drawer.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkClosingCTA.tsx
git commit -m "ui(work): align closing-CTA buttons with site hover patterns"
```

---

## Task 7: About-page closing CTA button hover (flagged: spec says "Work page" but section lives on /about)

**Files:**
- Modify: `src/components/organisms/AboutPageContent.tsx`

`READY TO DEPLOY?` lives at `AboutPageContent.tsx:296-322`, with one button: `INITIATE PROJECT`. Apply the same `.btn-primary` treatment as Task 6 so both end-of-page CTAs behave identically.

- [ ] **Step 1: Replace the `INITIATE PROJECT` button**

Replace lines 311-321:
```tsx
<button
    onClick={openDrawer}
    className="inline-flex items-center justify-center bg-white text-black font-headline font-bold uppercase text-sm border-none cursor-pointer"
    style={{
        padding: "14px 32px",
        borderRadius: "4px",
        letterSpacing: "0.08em",
    }}
>
    INITIATE PROJECT
</button>
```
with:
```tsx
<button
    onClick={openDrawer}
    className="btn-primary"
    style={{ padding: "14px 32px", borderRadius: "4px" }}
>
    INITIATE PROJECT
</button>
```

- [ ] **Step 2: Verify behavior in browser**

Visit `http://localhost:3000/about` and scroll to "READY TO DEPLOY?". Confirm:
1. Hover: background darkens to #e5e5e5.
2. Click: scale-down active state.
3. Drawer opens.
4. Visual at rest is identical to before.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/AboutPageContent.tsx
git commit -m "ui(about): align Ready-to-Deploy CTA with site button hover"
```

---

## Task 8: Learn page Recent Writing — match Latest Writing card hover

**Files:**
- Modify: `src/app/learn/page.tsx`

Apply the exact same hover treatment as Task 2: subtle card lightening + animated `.read-link` underline. The READ span currently uses an arrow-gap animation (`group-hover:gap-3`) — replace it.

- [ ] **Step 1: Strengthen card hover (line 72)**

Change the `<a>` className from:
```
className="group block border-b border-white/10 py-10 md:py-12 transition-colors duration-200 hover:bg-white/[0.02]"
```
to:
```
className="group block border-b border-white/10 py-10 md:py-12 transition-colors duration-200 hover:bg-white/[0.04]"
```

- [ ] **Step 2: Replace the READ span with `.read-link`**

Replace lines 111-125 (the `lg:col-span-2 lg:text-right lg:pt-2` div + inner span) with:

```tsx
<div className="lg:col-span-2 lg:text-right lg:pt-2">
    <span className="read-link">
        READ <span aria-hidden="true">→</span>
    </span>
</div>
```

Drops the inline `style={{...}}` and the `inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200` className. The `.read-link` class (added in Task 2) handles colour, type, and underline-on-group-hover.

- [ ] **Step 3: Verify behavior in browser**

Visit `http://localhost:3000/learn`. Confirm:
1. Each article row lightens subtly on hover.
2. The "READ →" link grows a left-to-right underline over ~220ms on row hover (since it lives inside `.group`).
3. Same behavior on keyboard focus.
4. Behavior matches the Knowledge Base section on `/` (Change 2).

- [ ] **Step 4: Commit**

```bash
git add src/app/learn/page.tsx
git commit -m "ui(learn): unify Recent Writing card hover with Latest Writing"
```

---

## Task 9: Verification — full-build, regressions, Lighthouse audit, low-risk wins

**Files:** none modified directly here unless low-risk wins surface (track those in a separate commit).

- [ ] **Step 1: Production build**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully`. All 14 routes prerender. No TypeScript or lint errors.

- [ ] **Step 2: Regression smoke (manual, browser)**

Run `npm run dev`. Walk through:
1. Landing `/`: nav works, hero CTAs open drawer, FAQ smooth, Latest Writing hovers, Final CTA orange button glows on hover, all other sections render.
2. `/work`: hero renders without breadcrumb tag, project sections play video, closing CTA buttons hover, drawer opens.
3. `/about`: breadcrumb "LP WEB / INFRASTRUCTURE" still shows, "READY TO DEPLOY?" button hovers.
4. `/learn`: breadcrumb still shows, article cards hover with underline.
5. `/learn/nextjs-vs-wordpress` and `/learn/why-pagespeed-matters`: still render.
6. Mobile breakpoint check (DevTools 375px) on each page: no horizontal scroll, CoreInfrastructure stacks correctly, FAQ still smooth, no layout breaks.

- [ ] **Step 3: Lighthouse audit on production build**

```bash
npm run build && npm run start &
# wait ~3s for boot, then in another shell:
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-home.json --chrome-flags="--headless" --quiet
npx lighthouse http://localhost:3000/work --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-work.json --chrome-flags="--headless" --quiet
npx lighthouse http://localhost:3000/about --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-about.json --chrome-flags="--headless" --quiet
npx lighthouse http://localhost:3000/learn --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-learn.json --chrome-flags="--headless" --quiet
```

Then extract scores + top failing audits with `jq`:
```bash
for f in /tmp/lh-home.json /tmp/lh-work.json /tmp/lh-about.json /tmp/lh-learn.json; do
  echo "── $f ──"
  jq '{perf: .categories.performance.score, a11y: .categories.accessibility.score, bp: .categories["best-practices"].score, seo: .categories.seo.score}' "$f"
  jq '[.audits | to_entries[] | select(.value.score != null and .value.score < 1) | {id: .key, score: .value.score, title: .value.title}] | sort_by(.score) | .[0:5]' "$f"
done
```

Kill the server when done: `kill %1`.

If `npx lighthouse` is not installed locally, install with `npm i -D lighthouse` (devDep, no impact on prod bundle), or skip and report which routes weren't audited.

- [ ] **Step 4: Surface and apply low-risk wins**

For each issue in the top-5 lists, classify:
- **Apply now** — alt text, missing meta, render-blocking CSS hint, missing canonical, image dimensions missing.
- **Defer** — anything requiring design judgement, copy rewrites, asset regeneration, or library changes.

Apply quick wins as a single commit:
```bash
git add <changed files>
git commit -m "perf/a11y: low-risk Lighthouse wins from 2026-04-27 audit"
```

If nothing trivial surfaces, skip the commit and note "no low-risk wins available — all flagged issues require design or content decisions."

- [ ] **Step 5: Record results**

Append a short table to `STATUS.md` under a new section:

```markdown
## UI/UX Refinement — 2026-04-27

### Changes
1. FAQ smooth accordion transition
2. Latest Writing card hover + animated read underline
3. Orange CTA hover signature on FinalCTA
4. CoreInfrastructure → 4-col grid (fixes card-4 clipping)
5. SubpageHero breadcrumb optional; removed from /work
6. Work closing CTA buttons → standard hover
7. About closing CTA button → standard hover (flagged: spec said /work)
8. Learn Recent Writing → matches Latest Writing hover

### Lighthouse (production build, headless)
| Route   | Perf | A11y | BP | SEO |
|---------|-----:|-----:|---:|----:|
| /       | … | … | … | … |
| /work   | … | … | … | … |
| /about  | … | … | … | … |
| /learn  | … | … | … | … |

### Low-risk wins applied
- (list)

### Deferred
- (list)
```

- [ ] **Step 6: Commit STATUS update**

```bash
git add STATUS.md
git commit -m "docs(status): record 2026-04-27 ui/ux refinement + lighthouse"
```

---

## Self-review checklist (run before reporting done)

- [ ] All 8 user-listed changes mapped to a task above (1→T1, 2→T2, 3→T3, 4→T4, 5→T5, 6→T6, 7→T7, 8→T8). ✅
- [ ] No "TBD" / "implement later" / "similar to" placeholders. ✅
- [ ] Each task names exact files and shows actual code, not pseudocode. ✅
- [ ] Shared utilities (`.read-link`, `.btn-cta-orange`) are defined in earlier tasks before consumers reference them (T2 defines `.read-link`, T8 consumes; T3 defines `.btn-cta-orange`). ✅
- [ ] Mobile breakpoints addressed in regression smoke (T9 step 2). ✅
- [ ] No regressions for /about and /learn breadcrumbs (verified in T5 step 3). ✅
- [ ] Lighthouse plan covers all 4 user-requested pages + reporting format. ✅
- [ ] One open question flagged for the user (Change 7 page mismatch). ✅
