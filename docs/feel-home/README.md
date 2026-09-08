# feel: homepage motion pass (audit 2026-09)

Motion, easing, duration, press feedback and hover gating on the homepage.
**No copy, layout, colour, font or content changes** — with one deliberate
exception noted under *Visual deltas* below.

Source audit: `docs/feel-audit-2026-09.md`.
Base: `4dbf8c2` (`main`). 9 files changed, +208 / −108.

---

## What to FEEL on the preview

Stills cannot show motion. Open the preview and do these, on a real machine
and on a phone:

1. **Press a button.** Hero "See Our Work" / "Book a Discovery Call", the FAQ
   rows, the drawer's project-type chips. They should sink ~3% on
   *pointer-down* and spring back on release — not wait for the click.
2. **Hover a card** (desktop). The "What We Build" panels and the dark cards:
   the highlight should land inside ~200ms, not drift in over half a second.
3. **Open an FAQ.** The answer opens over 250ms and the `+` *rotates* 45°
   instead of swapping to a `−`.
4. **Open the drawer on a phone.** The sheet comes up from the bottom edge it
   is anchored to, the backdrop fades with it, and the form does not visibly
   reset while it is still closing.
5. **Scroll until the nav becomes a pill,** then scroll back up. The pill
   should move on `transform`, and the header should not shimmer through
   properties it has no business animating.
6. **Open the mobile menu.** It now slides from its own edge instead of
   teleporting in.
7. **Turn on Reduce Motion** in OS settings and reload. Everything above
   should land instantly, the footer's pulsing dot should stop (not blink
   fast), in-page anchors should jump rather than glide, and the header should
   stay pinned rather than sliding away on scroll.

---

## The probe (`docs/feel-home/probe.mjs`)

A Playwright script that reads `getComputedStyle` out of a real Chromium and
asserts the motion contract. It takes a base URL, prints PASS/FAIL with the
actual values, and exits 1 on any failure:

```
npm run build && npm run start -- -p 3100
node docs/feel-home/probe.mjs http://localhost:3100
```

It adds **no dependency to `package.json`** — it resolves Playwright from
`node_modules` if present, otherwise from the npx cache, and falls through to
the next candidate if a cached copy's Chromium build is missing. Install a
browser once with `npx playwright install chromium` if it cannot launch.

Full outputs: `probe-branch.txt` (11/11 PASS, exit 0) and `probe-main.txt`
(11/11 FAIL, exit 1). `main` is the "before" evidence.

| # | assertion | `main` | `feat/feel-home` |
| --- | --- | --- | --- |
| 1 | `.btn-primary` `transition-property` includes `transform` | ✗ `all` | ✓ `background, transform` |
| 2 | `.btn-primary` `transition-duration` includes `0.12s` | ✗ `0.2s` | ✓ `0.2s, 0.12s` |
| 3 | `.btn-ghost` `transition-property` includes `transform` | ✗ `background, color` | ✓ `background, color, transform` |
| 4 | `.btn-ghost` `transition-duration` includes `0.12s` | ✗ `0.2s, 0.2s` | ✓ `0.2s, 0.2s, 0.12s` |
| 5 | `.panel-row` `transition-duration` === `0.25s` | ✗ `0.45s` | ✓ `0.25s` |
| 6 | fixed `<header>` `transition-property` has no `all` / `top` | ✗ `all` | ✓ `transform, width, max-width` |
| 7 | `.pressable` `transition-property` starts with `transform` | ✗ no such element | ✓ `transform, color, background-color, border-color, box-shadow, opacity` |
| 8 | reduce: `.panel-row` `transition-duration` near-zero | ✗ `0s` * | ✓ `1e-05s` |
| 9 | reduce: `.animate-pulse` `animation-iteration-count` === `1` | ✗ `infinite` | ✓ `1` |
| 10 | reduce: `documentElement` `scroll-behavior` ≠ `smooth` | ✗ `smooth` | ✓ `auto` |
| 11 | touch context: `.dark-card` bg/border/shadow unchanged after `hover()` | ✗ border `rgba(255,255,255,0.05)` → `0.2`, shadow appears | ✓ unchanged |

\* Row 8 is the one place the FAIL overstates the defect: `main` did zero that
one selector's duration with a bespoke rule. What it did **not** have is the
global policy — which is why rows 9 and 10 fail on the same page. The branch
gets all three from one block.

The probe caught a live defect during this lane: `transition-colors` sat on
the shared class list of the desktop nav CTA, so in its expanded state
Tailwind's utilities layer out-ranked `.btn-primary`'s own `transition` and
the press transform never eased. Fixed in `b8a2ca7`.

---

## Before / after screenshots

`{before,after}-{frame}-{1440,375}.png` — `before` = `main` @ `4dbf8c2`,
`after` = this branch. Both served from a production build (`next start`).

| frame | what | viewports |
| --- | --- | --- |
| `top` | top of `/` | 1440, 375 |
| `nav` | scrolled to 600px, header in visible pill state | 1440, 375 |
| `panel-rest` | the "What We Build" panel row at rest | 1440, 375 |
| `panel-hover` | the same row with the first panel hovered | 1440 |
| `faq` | FAQ with the first item open | 1440, 375 |
| `drawer` | contact drawer open (hero CTA) | 1440, 375 |

**These stills prove nothing about the motion — that is what the probe and
your own hands are for. They exist to prove nothing *visual* regressed.**
Byte-for-byte, 6 of the 11 pairs are identical files (`top` ×2,
`panel-rest-1440`, `panel-hover-1440`, `drawer` ×2). `nav` and
`panel-rest-375` differ only by sub-pixel text positioning.

### Visual deltas (intentional)

* **FAQ open glyph.** `faq-1440` / `faq-375`: the open row's `−` is now a `+`
  rotated 45° (M4). One element that can animate, instead of two characters
  that swap instantly. This is the only content-level pixel change in the pass.

---

## Audit ids applied

| id | what | lane |
| --- | --- | --- |
| 2.1 | hover transitions pulled inside the 300ms ceiling (6 sites) | A, C |
| 2.2 | `--easing` house curve kept, easing tokens named | A |
| 2.3 | dead `--easing-spring` removed | A |
| 2.4 | drawer's hand-typed curve → `--ease-drawer` | C |
| 2.5 | backdrop eased with the sheet | C |
| 2.7 | hamburger bars on one timing | B |
| 2.8 | literal curves replaced by tokens | B |
| 3.1 | `.btn-primary` presses (`transform` in the transition list) | A |
| 3.2 | `.btn-ghost` gets a `:active` at all | A |
| 3.3 | `.pressable` — press feedback on FAQ rows, drawer chips, close button | A (class), C (applied) |
| 5.1 | `transition: all` named out (nav ×4, drawer) | B, C |
| 5.2 | layout properties: nav animates `transform`/`opacity`; panel row 450→250ms | A, B |
| 5.4 | scroll listener rAF-batched | B |
| 5.5 | header transform declared once, not twice | B |
| 5.6 | dead `fadeIn` keyframe removed from `tailwind.config.ts` | A |
| 6.1 | complete reduced-motion policy: `transition-duration` + `animation-iteration-count`, with a scoped exception for comprehension fades | A |
| 6.2 | `scroll-behavior: smooth` gated behind `prefers-reduced-motion: no-preference` | A |
| 6.3 | hover effects gated on touch (`hoverOnlyWhenSupported` + `@media (hover: hover) and (pointer: fine)`) | A |
| 6.4 | header pinned instead of sliding away under reduced motion | B |
| 7.1 | duration tokens (`--dur-press/hover/panel/drawer`) + Tailwind scale | A |
| 7.2 | one house curve, referenced not retyped | A |
| 7.3 | `.dark-card` / `.infra-card` on one timing | A |
| 7.4 | `.card-panel` filter hover consolidated into CSS; nav CTA stops out-layering `.btn-primary` | A, C, final |
| 4.2 | drawer form reset delay matches the close it waits for | C |
| M1 | mobile menu slides from its own edge | B |
| M4 | FAQ `+` rotates instead of swapping glyph | C |

## Audit ids deferred (with reasons)

| id | why |
| --- | --- |
| 5.2 (panel row) | **Ruling:** shorten to 250ms + `ease-in-out` and keep the `grid-template-columns` animation. The `scaleX` rewrite restructures `CoreInfrastructure.tsx` — too much risk for a branch Luke is judging on feel. Cost if wrong: still a layout animation, 45% shorter. |
| 5.2 (nav width) | **Ruling:** the pill keeps `width`/`max-width` in its transition list on `duration-panel`; only `top` snaps. Transitioning transform alone made the width change read as a glitch. Luke judges it on the preview. |
| 8.1, 8.2, 8.3 | Typography — out of scope for a motion pass (line-height and spacing scale are content-affecting). |
| 4.1 / M2 | Drag-to-dismiss on the mobile sheet — a feature, not a fix; L effort. |
| 1.3 / 5.3 | `.section-geo-lines` background-position drift — paint-bound 20s loop; a real fix is a rewrite, and it is off the critical path. |
| 4.3 | The mobile sheet's rules living in an injected `<style>` element — structural, explicitly out of scope. |
| 2.6, 7.5 | `WorkScrollReveal.tsx` — `/work`, not the homepage. |
| 1.2 (partial), 5.1 (partial) | `ProjectSection.tsx` is not rendered on `/`. Its `animate-pulse` and `transition: all` sites are untouched. `error.tsx` / `not-found.tsx` likewise. |
| 1.1 | The panel row's purpose question is answered by the 5.2 ruling above. |
| 3.4 | `.pill`'s hover on a non-interactive tag — removing it changes how a tag looks under the cursor; that is a visual call for Luke, not a motion fix. |
| M3 | Form → success crossfade — additive delight, not a defect. |

---

## Rulings that changed behaviour (not just values)

1. **`hoverOnlyWhenSupported`** is set in `tailwind.config.ts`, so *every*
   `hover:` utility on the site — not only the homepage — is now behind
   `@media (hover: hover)`. The three hand-written CSS hovers
   (`.dark-card`, `.infra-card`, `.card-panel`) are wrapped to match. On a
   phone, tapping a card no longer leaves it stuck in a hover state.
2. **`.pressable` owns a complete transition list.** `transition-property`
   does not compose: a `.pressable` that declared only `transform` collided
   with Tailwind's `transition-colors` on the FAQ row and lost outright to the
   drawer's inline `transition`. It now names
   `transform, color, background-color, border-color, box-shadow, opacity`
   with matching durations, sits deliberately **outside `@layer`** (Tailwind
   puts all layered CSS below unlayered CSS), and consumers drop their own
   `transition-*` utilities where it is present. The same defect showed up
   once more on the nav CTA and is fixed the same way (`b8a2ca7`).
3. **FAQ glyph.** One `+` that rotates, replacing the `+`/`−` character swap
   (M4) — see *Visual deltas*.

---

## Repo notes for Luke

* **No ESLint config is committed.** `npm run lint` on a fresh checkout drops
  into Next's interactive setup prompt. Every lane verified lint with a
  temporary config instead. Worth committing an `.eslintrc.json` so CI and
  agents have a non-interactive gate.
* **`main` already has 6 `@next/next/no-html-link-for-pages` errors** (raw
  `<a href="/…">` where `next/link` is expected). The lint gate for this pass
  was therefore "no *new* errors versus base", not "zero errors".
* **Your uncommitted `ContactDrawer.tsx` WIP.** The main checkout has a ~34-line
  uncommitted edit to `src/components/organisms/ContactDrawer.tsx`. This branch
  edits the committed version of that file (+24 lines: tokenised curve, eased
  backdrop, `.pressable` on the controls, honest reset delay). Reconcile your
  WIP against those hunks before or after merging — do not let a stash-pop
  silently revert them.
* Gates on this branch: `npx tsc --noEmit` → 0, `npm run build` → 0.
