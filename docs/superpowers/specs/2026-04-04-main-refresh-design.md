# LP Web Studio — Main Refresh Design Spec
**Date:** 2026-04-04
**Branch:** dev/main-refresh
**Scope:** Full homepage audit and redesign against WorldQuant Foundry style guide

---

## Context

This spec covers all changes required to bring the LP Web Studio homepage from "capable portfolio"
to "confident studio." The reference framework is the WorldQuant Foundry style guide provided by
the client. Every change traces back to one of three root problems identified in the audit:

1. Copy is feature-led, not outcome-led
2. Social proof is almost absent
3. The design system has no signature pattern

---

## Assets Required Before Implementation

These must be in `/public/` before the relevant components are built:

| Asset | Filename suggestion | Used in |
|---|---|---|
| Platform screenshot — client-side UI | `platform-screenshot.png` | B2BCallout |
| Cafe Crave logo | `cafe-crave-logo.svg` | TestimonialSection |
| Luke's photo (enhanced from real photo) | `luke-petzer.jpg` | FounderSection (new) |

---

## Section 1 — ParticleField Bug Fix

**File:** `src/components/atoms/ParticleField.tsx`

**Problem:** `setSize()` reads `canvas.offsetWidth / offsetHeight` synchronously inside `useEffect`.
At hydration time, CSS layout may not yet be computed, producing a 0×0 canvas. Particles draw
into a zero-size buffer and nothing renders.

**Fix:** Replace the `window.addEventListener("resize", setSize)` pattern with a `ResizeObserver`
that fires once the canvas has real dimensions, then initialises the particle loop.

```ts
// Replace the setSize + window.addEventListener block with:
const observer = new ResizeObserver(() => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
observer.observe(canvas);
// Call setSize once immediately after observing as a fallback:
canvas.width = canvas.offsetWidth || window.innerWidth;
canvas.height = canvas.offsetHeight || window.innerHeight;
// Start tick after dimensions are confirmed
tick();
// Cleanup: observer.disconnect()
```

---

## Section 2 — Navigation

**File:** `src/components/molecules/NavClient.tsx`

### Changes

**Remove Zap icon** from the desktop nav CTA and mobile overlay CTA entirely. No replacement icon.

**Unify CTA label** across all three surfaces to `"Book a Call"`:
- Desktop nav button: `"Book a Call"`
- Mobile overlay button: `"Book a Call"`

**Nav link hover state:** Replace `whileHover={{ opacity: 0.7 }}` with a proper text-flip hover.
Two spans stacked — on hover, top span translates Y -100%, bottom span translates Y 0. Same
`--easing` cubic-bezier used throughout. Apply to all three nav links.

**Corner accent marks on nav CTA button:** Add four 8×8px L-bracket SVG marks at the corners
of the nav CTA. Opacity 0.15 at rest, 0.35 on hover. Stroke: white (dark bg) or ink (light bg).
This is the beginning of the signature pattern.

```tsx
// Corner SVG — reuse across all primary CTAs
const CornerMark = ({ className }: { className?: string }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={className}>
    <path d="M0.5 0.5L0.5 7.5M0.5 0.5L7.5 0.5" stroke="currentColor" strokeWidth="1"/>
  </svg>
);
```

---

## Section 3 — Hero

**File:** `src/components/molecules/HeroContent.tsx`
**File:** `src/components/molecules/MercuryButton.tsx`
**File:** `src/app/globals.css`

### 3a. CTA Button Color

**Problem:** `mercury-btn` renders as amber gradient (`#feb05d → #e8963a`) on warm white
background. Near-invisible.

**Fix:** Change `mercury-btn` CSS to dark fill on light backgrounds. The button gets two contexts:
- On light background (hero, contact): `background: #111`, `color: #fff`
- On dark background: amber gradient (existing) — no change needed there

The cleanest solution: remove the gradient from `.mercury-btn` entirely. Make the base style dark.
Any component that needs amber-on-dark applies an explicit override class or inline style.

```css
.mercury-btn {
  position: relative;
  background: #111111;
  border-radius: 9999px;
}
```

Add corner marks to `MercuryButton` component (same `CornerMark` SVG, positioned absolutely).

### 3b. Hero Headline Restructure

**Problem:** Line 1 is `clamp(28px, 4vw, 58px)` at 40% opacity. Line 2 is `clamp(46px, 7.5vw, 108px)`
at full amber. Reader sees "on Spreadsheets." before the sentence starts.

**Fix:** Both lines at the same scale. Amber accent is on the key word only, not the whole second line.

**New headline — Option A (keep the current concept):**
```
Still running your business    ← full size, ink/80
on spreadsheets?               ← full size, ink (no amber)
```
With amber used only for the word "spreadsheets" or as an underline accent.

**New headline — Option B (more declarative, WQF-style):**
```
Your business               ← line 1, ink/50 (lighter)
runs on manual work.        ← line 2, ink full
                            ← line 3 (amber accent): "We fix that."
```

**New headline — Option C (current structure, fixed proportions):**
Both lines at `clamp(44px, 6.5vw, 96px)`. Line 1 at `ink/70`. Line 2 at `ink` full. Amber only
on the word "Spreadsheets" as a colour token, not the full line.

**Recommendation:** Option C is the lowest-risk change. Option B is most WQF-aligned.
**Decision needed from Luke before implementation.**

### 3c. Sub-headline Rewrite

**Current:** "We engineer custom B2B ordering portals and automated SaaS systems for scaling
businesses. High-performance infrastructure designed to eliminate manual admin."

**New:** "Custom B2B portals and automation systems for businesses that have outgrown their
current process. Your competitors are automating. Now you can too."

Or, shorter and more declarative:
"Custom systems for businesses that have outgrown manual processes.
No templates. No shortcuts. No admin overhead."

### 3d. Bottom-Anchored Metadata

Add a three-stat strip absolutely positioned to the bottom of the hero, above the scroll indicator.
Uses the same mono font, small size, left-aligned on desktop.

```
94         ·    Cape Town, ZA    ·    15 min
avg. PageSpeed     location         avg. response
```

Implementation: `absolute bottom-10 left-6 md:left-12 lg:left-20` flex row with gap-8.
Each stat: large number in `font-heading font-black`, label in `font-mono text-[10px] uppercase
tracking-widest ink/35` below it.

---

## Section 4 — Process Cards

**File:** `src/components/organisms/ProcessSection.tsx`

### Changes

**Card height:** Reduce `min-h-[75vh]` → `min-h-[60vh]` on all three cards.

**Body text opacity:** `rgba(245,242,242,0.50)` → `rgba(245,242,242,0.65)` on all three cards.

**Visual differentiation — triplet pattern:**
- Card 1 (Direct Lead Capture): keep current dark glass `rgba(245,242,242,0.05)` with `rgba(245,242,242,0.07)` border
- Card 2 (Edge Performance): `background: rgba(245,242,242,0.07)`, add top border `2px solid rgba(254,176,93,0.25)`, background `#161616`
- Card 3 (AI Search Visibility): `background: #1F1E1E`, border `1px solid rgba(245,242,242,0.12)` — warmest/lightest of the three

**SVG gesture size:** Increase from `w-40 h-40 md:w-52 md:h-52` → `w-56 h-56 md:w-72 md:h-72`.
The gestures are meant to be atmospheric — at current size they're decorations, not atmosphere.

**Narrative bridge:** The `motion.p` sub-copy below the heading changes from:
> "Every site we ship runs all three. No exceptions, no shortcuts."

To:
> "Every site ships with all three built in. The capabilities section shows you how we deliver each one."

This creates explicit continuity into the next section.

---

## Section 5 — Capabilities

**File:** `src/components/organisms/CoreCapabilitiesSection.tsx`

### Changes

**Delete entirely:**
- The `motion.p` "Select a capability to learn more." — remove from JSX
- Every `AnimatePresence` block rendering "Tap to expand" — remove both the block and the `!isActive` condition

**Section header copy:**
- Mono label: `"Capabilities"` → `"The Build"`
- Heading: `"High-Performance Engineering. Zero Bloat."` → `"Four disciplines. One complete system."`
- Sub-copy (right side): `"Select a capability to learn more."` → remove entirely

**Active glow intensity:** `rgba(254,176,93,0.08)` → `rgba(254,176,93,0.20)`

**Column contrast — dark three:**
- Col 1 (#0A0A0A): keep
- Col 2 (#131313): change to `#1A1918` (warmer, more distinct)
- Col 3 (#2B2A2A): keep (already the lightest dark)
- Col 4 (#F4F4F2): keep (already correct)

**CTA row below accordion:** Add below the `hidden md:flex` accordion and the `flex md:hidden`
mobile accordion:

```tsx
<div className="px-6 md:px-10 lg:px-16 py-16 max-w-7xl mx-auto flex items-center justify-between">
  <p className="font-mono text-xs uppercase tracking-widest text-white/30">
    Ready to scope a project?
  </p>
  <a href="#contact" className="font-mono text-xs uppercase tracking-widest text-accent
                                 hover:opacity-70 transition-opacity flex items-center gap-2">
    Start a conversation →
  </a>
</div>
```

**Capability descriptions — outcome-led rewrites:**

| Capability | New body copy |
|---|---|
| Custom Next.js Applications | "Your site loads in under a second. Your competitors' doesn't. We build from scratch — no templates, no page builders, no compromises. Pure Next.js, engineered for conversion." |
| B2B Wholesale Portals | "Your B2B clients stop calling to place orders. They log in, browse live pricing, and check out — automatically notified via WhatsApp. Zero manual data entry from your team." |
| Technical SEO & Architecture | "When someone asks ChatGPT or Gemini to recommend a business like yours, we engineer the architecture so your name comes up. Standard SEO is no longer the only game." |
| n8n Business Automations | "Your site captures a lead. n8n enriches it, routes it to your CRM, and fires you a WhatsApp notification — before you've opened your laptop." |

---

## Section 6 — B2BCallout

**File:** `src/components/organisms/B2BCallout.tsx`

### Pivot: Case Study → Capability Showcase

This section cannot function as a case study (no client name, no production metrics). Reframe as
a showcase of what LP Web Studio builds.

**Section label:** `"Proof of System"` → `"What We Build"`

**Headline:** `"B2B Ordering Platform."` → `"End-to-end ordering. Zero manual admin."`

**Description:** Keep current copy — it's descriptive and accurate. Minor edit:
> "End-to-end trade ordering system built for repeat B2B operations. Product catalogue, cart flow,
> order management, and real-time WhatsApp notifications via n8n — all custom-engineered from
> scratch. This is the class of system we build."
(Add final sentence to make the showcase framing explicit.)

**Remove entirely:** The right-side "Build Value: R18,000+" block and its label. Replace with:

```tsx
// Right side: a simple capabilities summary
<div className="flex flex-col gap-6 shrink-0">
  <div>
    <p className="font-mono text-[10px] uppercase tracking-widest mb-2"
       style={{ color: "rgba(43,42,42,0.40)" }}>
      Included in every build
    </p>
    <ul className="space-y-2">
      {["Live product catalogue", "Cart + checkout flow",
        "WhatsApp order notifications", "Admin order management",
        "Role-based client access"].map(item => (
        <li key={item} className="font-mono text-xs" style={{ color: "rgba(43,42,42,0.70)" }}>
          — {item}
        </li>
      ))}
    </ul>
  </div>
  <a href="/work" ...>View all work →</a>
</div>
```

**Platform screenshot:** Add a large visual below the copy block (full width on mobile, right-side
float on desktop). Use `next/image` with a subtle drop shadow and `rounded-[1.5rem]` border radius.
If client-identifying elements exist in the screenshot, apply a CSS blur to those specific regions
using an absolutely positioned `backdrop-filter: blur(8px)` overlay.

---

## Section 7 — Testimonial

**File:** `src/components/organisms/TestimonialSection.tsx`

### Changes

**Replace letter avatar with Cafe Crave logo:**

```tsx
// Replace the w-11 h-11 rounded-full div with:
<div className="w-11 h-11 rounded-full bg-black/[0.06] border border-black/[0.08]
                flex items-center justify-center shrink-0 overflow-hidden p-2">
  <Image src="/cafe-crave-logo.svg" alt="Cafe Crave" width={32} height={32}
         className="w-full h-full object-contain" />
</div>
```

**No other copy changes.** The quote is the site's strongest asset. Leave it.

---

## Section 8 — NEW: FounderSection

**File:** `src/components/organisms/FounderSection.tsx` (new component)
**Position in page.tsx:** Between TestimonialSection and PricingSection

### Purpose

The page has zero human presence. This section is a single, restrained dark panel that puts
a face and a conviction statement between the social proof and the pricing decision.

### Layout

Full-width, `background: #0d0d0d`. Two columns on desktop, stacked on mobile.

**Left:** Luke's photo, `400×500px`, `rounded-[1.5rem]`, subtle amber drop shadow
(`box-shadow: 0 0 60px rgba(254,176,93,0.08)`).

**Right:** Conviction statement + attribution.

### Copy

```
(mono label, amber)  "The Studio"

(heading, h3 size, white)
"I build systems that remove the friction
between your business and your customers."

(body, white/60)
"Every site that leaves this studio is
performance-tested, schema-engineered, and
built to run without manual intervention.
That is the standard. No exceptions."

(attribution, mono, white/40)
— Luke Petzer
  Founder, LP Web Studio · Cape Town
```

### Animation

Clip-path reveal on scroll entry — photo wipes in from left, text block from right,
offset by 150ms.

---

## Section 9 — Pricing

**File:** `src/components/organisms/PricingSection.tsx`

### Changes

**Framing paragraph** — add between section header and cards grid:

```tsx
<p className="text-sm max-w-lg mt-4" style={{ color: "rgba(245,242,242,0.45)" }}>
  Three scopes. Every project is hand-coded, performance-tested, and delivered on time.
  No templates, no page builders, no surprises.
</p>
```

**"Popular" badge:** Remove `<Zap />` icon. Change label to `"Recommended"`. Keep dark pill style.

**Starter CTA:** `"Get Started"` → `"Start a Project"`

**Dark flanking cards:** Increase visual weight:
- `backgroundColor: "rgba(245,242,242,0.05)"` → `"rgba(245,242,242,0.08)"`
- `border: "1px solid rgba(245,242,242,0.08)"` → `"1px solid rgba(245,242,242,0.13)"`

**Feature lists — rewritten:**

*Starter:*
- 1-Page Custom Next.js Build
- WhatsApp Enquiry Integration
- 90+ PageSpeed Score — Guaranteed
- Cape Town Local SEO Setup
- Vercel Edge Hosting Included

*Professional:*
- 3-Page Custom Architecture
- Booking / Calendar Integration
- Dynamic Photo Gallery
- Google Business Profile Setup
- AI Search Visibility (Schema + llms.txt)

*Custom Systems & AI:*
- Full Next.js + Database Architecture
- n8n Automation Pipeline
- B2B Ordering Portal Development
- Multi-system API Integration
- Dedicated Engineering Partnership

---

## Section 10 — Contact

**File:** `src/components/organisms/ContactPageContent.tsx`

### Pivot: "Free Speed Audit" → "Book a Discovery Call"

The entire section reframes around a conversation, not a technical audit. The offer is:
first call free, we scope your project, you leave with a clear plan.

**Section headline:** `"Stop Losing Leads. Start Converting."` →
```
"Let's talk about your system."
```

**Sub-headline:** `"Your competitors are already on WhatsApp. Are you?"` →
```
"Your competitors are already automating. First call is free — we scope your project,
identify what's possible, and you leave with a clear plan."
```

**Left column — unify both cards:**

Replace the two jarring cards (dark void + zinc-50 light) with two cards that share a visual
register — both use `bg-black/[0.04] border border-black/[0.07]` on the light section background.

Card 1 — "Reach us directly": WhatsApp + Email (keep current links, update icon colors to `ink/40`)
Card 2 — "How it works":
```
01. Fill in the form with your project brief.
02. We reply within 15 minutes on WhatsApp.
03. First call is free. We scope, you decide.
```

**Form:**
- Title: `"Request a Free Speed Audit"` → `"Book a Discovery Call"`
- Remove URL field entirely
- Fields: Full Name · Email Address · Tell us about your project (textarea, 4 rows)
- Placeholder for textarea: `"What are you building? What's broken? What do you want to automate?"`
- Submit button: keep `"Initiate Audit"` → change to `"Send Brief"`

**Backend — n8n webhook integration:**
On submit, POST to an n8n webhook URL (stored in env var `NEXT_PUBLIC_N8N_WEBHOOK_URL`).
n8n workflow:
1. Receives form payload (name, email, message)
2. Sends Luke a WhatsApp notification via existing WhatsApp API integration
3. Sends prospect an auto-reply email: "Got your brief. You'll hear from me within 15 minutes."

This replaces the current `e.preventDefault()` no-op. Proper loading state + success/error
feedback on the form button.

**FAQ:** Move the `<FaqAccordion />` below the contact grid into a visually separated block
with its own section header:
```tsx
<div className="mt-24 pt-24 border-t border-black/[0.06]">
  <p className="font-mono text-xs uppercase tracking-widest text-ink/35 mb-8">
    Common Questions
  </p>
  <FaqAccordion />
</div>
```

---

## Section 11 — Footer

**File:** `src/components/organisms/Footer.tsx`

### Changes

**Add nav links row:**
```tsx
<nav className="flex gap-8">
  {["Work", "About", "Contact"].map(link => (
    <a key={link} href={`/${link.toLowerCase()}`}
       className="text-white/40 hover:text-white/70 transition-colors
                  font-mono text-[10px] uppercase tracking-widest">
      {link}
    </a>
  ))}
</nav>
```

**Add email address:**
```tsx
<a href="mailto:contact@lpwebstudio.co.za"
   className="text-white/30 hover:text-white/50 transition-colors text-xs">
  contact@lpwebstudio.co.za
</a>
```

**Replace tagline:** `"Engineered for speed"` →
```
"High-performance systems.
Built in Cape Town."
```
(Two lines, mono uppercase, white/30)

**Add legal row** at very bottom of footer:
```tsx
<div className="mt-12 pt-8 border-t border-white/[0.05] flex justify-between items-center">
  <span className="text-white/20 text-[10px]">© 2026 LP Web Studio</span>
  <a href="/privacy" className="text-white/20 hover:text-white/30 text-[10px] transition-colors">
    Privacy Policy
  </a>
</div>
```

---

## Cross-cutting: Clip-Path Scroll Reveals

**Scope:** Section headers only (mono label + heading). Applied to: ProcessSection,
CoreCapabilitiesSection, PricingSection, ContactPageContent.

**Pattern:** Add a `clipReveal` Framer Motion variant:
```ts
const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.62, 0.16, 0.13, 1.01] }
  }
};
```

Apply to: the `motion.p` mono label in each section header.
The heading beneath it keeps the existing `fadeUp` variant.
Stagger: label clip-reveal first, heading fadeUp delayed 80ms.

Cards, body copy, and CTAs within sections keep existing `fadeUp` animations.

---

## Cross-cutting: Button System Unification

**Define two canonical variants in a shared atom:**

**File:** `src/components/atoms/Button.tsx` (check existing file first)

```
Primary (dark):   bg #111, white text, rounded-full — light backgrounds
Primary (amber):  amber gradient, dark text, rounded-full — dark backgrounds
Ghost:            transparent, border rgba(245,242,242,0.20), white text — dark bg secondary
```

Remove `mercury-btn` CSS class gradient. Update all usages:
- Hero CTA → Primary dark
- Nav CTA → Primary dark (scrolled light context) / Primary amber (if on dark bg)
- Contact submit → Primary dark
- Pricing amber card CTA → Primary amber (already dark bg context)
- Pricing flanking CTAs → Ghost

Corner marks applied to all Primary buttons.

---

## Cross-cutting: Heading Weight Standardisation

**Rule:** All display headings (`h1`, `h2`, large `h3`) → `font-black`.
All sub-headings and card titles → `font-extrabold`.
Body → `font-medium` or `font-normal`.

Current inconsistency: some sections use `font-extrabold` for display headings, others
`font-black`. Standardise to `font-black` for all display-level text across all sections.

---

## Page Composition (final order in page.tsx)

```
1. Navigation
2. HeroSection
3. ProcessSection
4. CoreCapabilitiesSection
5. B2BCallout
6. TestimonialSection
7. FounderSection         ← NEW
8. PricingSection
9. Contact section
10. Footer
```

---

## Out of Scope (deferred to traffic strategy project)

- SEO content strategy
- Local search optimisation
- Social media / content calendar
- Paid acquisition
- Backlink building

These are addressed in a separate planning session after this redesign ships.

---

## Open Decisions (need Luke's sign-off before implementation)

1. **Hero headline option:** A, B, or C (see Section 3b above)
2. **Sub-headline copy:** confirm preferred version or provide your own
3. **B2BCallout screenshot:** provide client-side UI screenshot
4. **Cafe Crave logo:** provide file
5. **Luke's photo:** provide enhanced photo
6. **n8n webhook URL:** provide env var value, or confirm this gets wired up separately
