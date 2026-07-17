# Website Rework — Agent Handoff Report

Architect: Claude (Fable), 11 Jul 2026. Executor: cheaper agents, ONE task per session, in order.
Each task: investigate → implement → verify (`npm run build && npm run lint`) → commit on branch
`feature/systems-repositioning` → STOP for Luke's review. Update STATUS.md per house convention.

## Why (positioning brief — read before touching anything)

Luke no longer builds websites. The business is: (a) custom web/mobile systems from R35,000,
(b) products — the B2B ordering platform (demo at demo.lpwebstudio.co.za once live) and lp-os,
(c) monthly care plans. The current site sells R5,500 one-pagers, "how much does a website cost"
FAQs, and dev jargon ("PROJECT INITIATION", "ARCHITECTURE TYPE: WEB_APP", stack badges). All of
that must go. New positioning, one line: **"We build the systems that run your business —
ordering portals, client platforms, and automations that replace manual admin."**

Proof assets available: B2B ordering platform case study (real figures pending client sign-off —
use "R1.5m+ in orders processed in the first 12 weeks" ONLY after Luke confirms permission;
until then use non-numeric outcomes), Gio/Cafe Crave testimonial (already on site, keep).

## Audit summary (current site)

- Next.js 15/React 19, Tailwind, atomic components (`src/components/{atoms,molecules,organisms}`),
  content collections for /learn, dark-only design. Pages: home, /work, /learn(+slugs), /about,
  /audit, /privacy. Contact = drawer form + WhatsApp. Recent responsive audit already applied
  (see STATUS.md); don't regress those fixes.
- Tone problem, not tech problem. The build quality is fine; the words sell the wrong business.

## Constraints

1. Restyle/rewrite within the existing component system — no new UI libraries, no redesign of
   the visual language (it's already strong). This is a copy + information-architecture job.
2. Keep SEO plumbing (sitemap, robots, metadata patterns, /learn) — rewrite metadata content to
   systems keywords: "custom ordering system South Africa", "B2B client portal", "business
   automation Cape Town", "custom web application".
3. No pricing below R35,000 anywhere. Care plans may show "from R1,950/month".
4. Never publish client-specific figures without the flag from Luke (see brief).
5. Build + lint green before every commit.

## Tasks

### Task 1 — Content inventory (investigation only)
Deliverable: `docs/rework-task1-content-map.md`. Every headline, section, FAQ, CTA and metadata
string on home/work/about/audit, mapped to: KEEP / REWRITE / DELETE, with the replacement copy
drafted inline for REWRITEs. Follow the positioning brief. Flag anything ambiguous for Luke
instead of guessing.

### Task 2 — Homepage rewrite
Using the approved Task 1 map:
- Hero: outcome-led ("systems that run your business"), subline naming ordering portals /
  client platforms / automation. CTA: "See the platform in action" → demo link (placeholder env
  var `NEXT_PUBLIC_DEMO_URL` until demo ships) + "Book a discovery call".
- Replace capabilities jargon with 3 outcome blocks (orders without admin; one source of truth;
  automations while you sleep).
- Move Gio testimonial + B2B case-study teaser above the fold-2 position.
- Replace the FAQ's website pricing with systems FAQs (what does a system cost → "projects start
  at R35,000"; how long; do I own it; what happens after launch → care plan).
- Contact drawer: rename "PROJECT INITIATION" and friends to human labels; architecture-type
  chips become "Ordering portal / Client platform / Automation / Mobile app / Something else".

### Task 3 — /work → case study structure
Convert /work into case-study format. Entry 1: B2B ordering platform — problem (WhatsApp +
spreadsheet chaos) → build (portal, credit checkout, admin, automation) → outcome (non-numeric
until flag; numeric after). Entry 2: lp-os as an internal-product story. Placeholder entry for
Meridian demo linking out. Reuse existing WorkScrollReveal composition.

### Task 4 — /products page (new)
One page, two products: the ordering platform (features, demo CTA, "from R3,000 setup +
monthly" positioning kept vague pending Luke's final pricing) and lp-os (business command
centre, pilot programme note). Nav gains "Products". This page is the outreach landing target.

### Task 5 — /about + metadata + /learn alignment
About: reposition Luke as systems builder (honours CS background, ships production systems solo,
AI-accelerated delivery). Site-wide metadata/OG rewrite to systems keywords. Add 2 /learn article
stubs (titles + outlines only, flagged draft): "What a custom ordering system costs in South
Africa" and "WhatsApp orders are costing you more than a system would".

### Task 6 — Sweep + ship checklist
Full-site grep for leftover website-era language ("PageSpeed guarantee" claims can stay only if
Luke confirms, "custom websites", "R5,500", "R12,500", "R350/month hosting"). Verify all internal
links, run build, update STATUS.md, final review note for Luke before merge to main.

## Sequencing
1 → Luke approves map → 2 → 3 → 4 → 5 → 6. Task 4 can run parallel to 3.

## Definition of done
A wholesaler who lands here from a cold email understands within 10 seconds that Luke builds
ordering systems like the one in the demo, sees proof, sees a price floor that signals quality,
and can book a call in two clicks. Zero traces of the R5,500 website business.
