# LP Web Studio — Full Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate LP Web Studio from "well-built" to "unmistakably premium" via navbar morphing, hero scale correction, spacing rhythm, accent-color injection on stats, and section-by-section polish across all 10 sections.

**Architecture:** All changes are surgical edits to existing component files — no new files except minor CSS utilities in globals.css. The navbar transformation is the highest-leverage change: it expands from bubble to full-width at the top, creating 20–30px of breathing room for the hero. Every subsequent change compounds that premium feel.

**Tech Stack:** Next.js 15, React, Tailwind CSS v3, Framer Motion, Lucide icons

---

## File Map

| File | Change Type | Summary |
|------|-------------|---------|
| `src/components/molecules/NavClient.tsx` | **Modify** | Full-width transparent at scroll=0, bubble morphs in at scroll>80 |
| `src/components/molecules/HeroContent.tsx` | **Modify** | "Leaking Revenue" 1.4× larger, right-side radial glow element, tighter CTA row |
| `src/app/globals.css` | **Modify** | Add `.nav-expanded` transition helpers, `--spacing-grand` token |
| `src/components/organisms/ProcessSection.tsx` | **Modify** | Larger counter numbers, card padding +12px, inter-card gap increase |
| `src/components/organisms/SpeedRevenueBanner.tsx` | **Modify** | Stat values → `text-accent`, inter-stat gap increase, thin accent divider |
| `src/components/organisms/CoreCapabilitiesSection.tsx` | **Modify** | Inter-column gap on mobile, active card elevation, title size increase |
| `src/components/organisms/ConfidentIntermission.tsx` | **Modify** | Horizontal accent rule above/below, subtle radial glow bg |
| `src/components/organisms/PortfolioSection.tsx` | **Modify** | "Selected Work" sub-description, "View Live Site" → prominent button |
| `src/components/organisms/TestimonialSection.tsx` | **Modify** | Faint diagonal-line bg pattern, accent rule above quote |
| `src/components/organisms/PricingSection.tsx` | **Modify** | Featured button larger + glow, card gap increase |
| `src/components/molecules/FaqAccordion.tsx` | **Modify** | Remove accent hover on questions, larger icons, add section intro line |
| `src/components/organisms/ContactPageContent.tsx` | **Modify** | Larger form field padding, visual bridge between left/right columns |

---

## Task 1: Navbar Morphing — Full-width → Bubble on Scroll

**Files:**
- Modify: `src/components/molecules/NavClient.tsx`

The current nav is `fixed top-6 left-1/2 w-[calc(100%-2rem)] max-w-[1200px]` always in bubble form.

The new behavior:
- **At top (scrolled=false):** `top-0`, full-width, transparent bg, no border-radius, generous padding
- **Scrolled (scrolled=true):** `top-4`, bubble with `rounded-full`, dark-glass bg, reduced padding

All morphing via Framer Motion `animate` on the `<motion.nav>` element — same pattern already used for bg/border color.

- [ ] **Step 1: Update the `<motion.header>` positioning**

Replace the static `top-6` with a scroll-driven top value. The header wrapper must move from `top-0` (flush) to `top-4` (floating).

In `NavClient.tsx`, change:
```tsx
<motion.header
    className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[1200px]"
    style={{ x: "-50%" }}
    aria-label="Main navigation"
>
```
to:
```tsx
<motion.header
    className="fixed left-1/2 z-50"
    style={{ x: "-50%" }}
    animate={{
        top: scrolled ? "1rem" : "0px",
        width: scrolled ? "calc(100% - 2rem)" : "100%",
        maxWidth: scrolled ? "1200px" : "100%",
    }}
    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.62, 0.16, 0.13, 1.01] }}
    aria-label="Main navigation"
>
```

- [ ] **Step 2: Update `<motion.nav>` to morph border-radius and padding**

Change the `<motion.nav>` animate block to include `borderRadius` and `paddingLeft`/`paddingRight`/`paddingTop`/`paddingBottom`:

```tsx
<motion.nav
    className="flex items-center justify-between"
    animate={{
        borderRadius: scrolled ? "9999px" : "0px",
        paddingLeft: scrolled ? "1.5rem" : "2.5rem",
        paddingRight: scrolled ? "1.5rem" : "2.5rem",
        paddingTop: scrolled ? "0.5rem" : "1.25rem",
        paddingBottom: scrolled ? "0.5rem" : "1.25rem",
        backgroundColor: isLight
            ? scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.0)"
            : scrolled ? "rgba(10,10,10,0.80)" : "rgba(0,0,0,0.0)",
        borderColor: isLight
            ? scrolled ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.0)"
            : scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.0)",
        boxShadow: scrolled && isLight
            ? "0 10px 30px -10px rgba(0,0,0,0.12)"
            : "none",
    }}
    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.62, 0.16, 0.13, 1.01] }}
    style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid" }}
>
```

- [ ] **Step 3: Keep logo filter logic unchanged — verify it still works**

The logo filter (`invert brightness-0` when dark) depends on `isLight`. No change needed. Confirm `isLight = forceLight || scrolled` is still intact after edits.

- [ ] **Step 4: Update `scrolled` threshold from 100 to 80**

The user is at the bottom of the hero fast. Trigger earlier for snappier feedback:

```tsx
// Change:
setScrolled(latest > 100);
// To:
setScrolled(latest > 80);
```

- [ ] **Step 5: Remove the `border` class from `<motion.nav>` className**

The border is now fully controlled by Framer Motion's `borderColor` animate. The static `border` Tailwind class conflicts. Remove it from `className="flex items-center justify-between px-6 py-[8px] rounded-full border"` → `className="flex items-center justify-between"`.

- [ ] **Step 6: Manual smoke test**
  - Open `localhost:3000`
  - At top: nav should be full-width, transparent, flush to top, generous vertical padding
  - Scroll 90px: nav should animate to bubble (top-4, rounded-full, dark-glass)
  - Scroll back to top: nav should return to full-width transparent
  - On non-homepage: nav should be in bubble/light state always (forceLight=true)

- [ ] **Step 7: Commit**
```bash
git add src/components/molecules/NavClient.tsx
git commit -m "feat(nav): morph from full-width transparent to bubble on scroll"
```

---

## Task 2: Hero — Scale "Leaking Revenue" + Right Radial Glow

**Files:**
- Modify: `src/components/molecules/HeroContent.tsx`

Two changes:
1. H1 line 2 ("Leaking Revenue.") should be visually ~1.4× the size of line 1 ("Your Website is")
2. The right side of the hero is dead space — add a subtle radial accent glow to give it intention

- [ ] **Step 1: Split H1 into two separate `clamp()` scales**

Current: both lines share `text-[clamp(44px,6.5vw,92px)]` on the `<h1>`.

New: line 1 uses a smaller clamp, line 2 uses a larger one. Move the font-size from the `<h1>` to each `<motion.span>`.

Replace:
```tsx
<h1
    className="font-heading font-extrabold
               text-[clamp(44px,6.5vw,92px)]
               tracking-[-0.04em] leading-[0.93]
               text-left"
>
    <motion.span
        variants={lineReveal}
        className="block text-white"
    >
        Your Website is
    </motion.span>
    <motion.span
        variants={lineReveal}
        className="block text-accent"
    >
        Leaking Revenue.
    </motion.span>
</h1>
```

With:
```tsx
<h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.93] text-left">
    <motion.span
        variants={lineReveal}
        className="block text-white text-[clamp(28px,4vw,58px)]"
    >
        Your Website is
    </motion.span>
    <motion.span
        variants={lineReveal}
        className="block text-accent text-[clamp(46px,7.5vw,108px)]"
    >
        Leaking Revenue.
    </motion.span>
</h1>
```

- [ ] **Step 2: Add a radial accent glow to the right side**

The ghost geometry already lives at `right-[-8vw]` at `opacity-[0.14]`. Behind it (lower z), add a radial glow as a purely decorative `<div>` at z-5:

Add this inside the outer `<div ref={heroRef} ...>`, between GrainOverlay and the Layer 1 motion div:

```tsx
{/* ── Layer 0.5: Right-side radial accent glow ─────────────── */}
<div
    aria-hidden="true"
    className="absolute z-[5] pointer-events-none
               right-[-5vw] top-1/2 -translate-y-1/2
               w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]"
    style={{
        background: "radial-gradient(ellipse at center, rgba(30,64,175,0.18) 0%, transparent 70%)",
    }}
/>
```

- [ ] **Step 3: Tighten sub-copy — add accent emphasis**

Current sub-copy: `"Custom-engineered React applications. Guaranteed 90+ PageSpeed."`

Make "Guaranteed 90+ PageSpeed" stand out with accent color. Replace the `<motion.p>` body:

```tsx
<motion.p
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    className="text-white/50 text-base md:text-lg
               max-w-sm leading-relaxed mt-8 mb-10"
>
    Custom-engineered React applications.{" "}
    <span className="text-accent font-semibold">Guaranteed 90+ PageSpeed.</span>
</motion.p>
```

- [ ] **Step 4: Verify on mobile — line 2 shouldn't overflow**

`clamp(46px,7.5vw,108px)` at 375px = 46px. "Leaking Revenue." at 46px bold will wrap to 2 lines on mobile. That's acceptable — it's a power statement. Confirm it doesn't break layout.

- [ ] **Step 5: Commit**
```bash
git add src/components/molecules/HeroContent.tsx
git commit -m "feat(hero): scale 'Leaking Revenue' 1.4x, add radial glow, accent sub-copy"
```

---

## Task 3: ProcessSection — Counter Size + Card Breathing Room

**Files:**
- Modify: `src/components/organisms/ProcessSection.tsx`

- [ ] **Step 1: Increase counter font size**

Current: `text-[10px]` counter. Increase to `text-xs` and make index number larger:

```tsx
{/* Counter — was text-[10px], now text-xs with large index */}
<p className="font-heading font-bold text-xs uppercase tracking-[0.25em] mb-6">
    <span className="text-accent text-2xl font-extrabold tracking-[-0.03em] mr-2 leading-none">
        {card.index}
    </span>
    <span className="text-ink/30">/ 03</span>
</p>
```

- [ ] **Step 2: Increase card padding**

Current: `p-10`. Change to `px-12 py-12`:

```tsx
<motion.div
    className="group relative px-12 py-12 rounded-[2rem]
               transition-colors duration-300
               hover:bg-black/[0.03]"
```

- [ ] **Step 3: Increase right panel gap**

Current: `gap-8 md:gap-16`. The mobile gap is tight. Increase to `gap-12 md:gap-20`:

```tsx
<div className="md:w-[62%] flex flex-col gap-12 md:gap-20 py-32">
```

- [ ] **Step 4: Add more space between "THE ARCHITECTURE" label and headline**

Current: `mb-6` after label. Increase to `mb-8`:

```tsx
<motion.p
    className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-8"
```

- [ ] **Step 5: Commit**
```bash
git add src/components/organisms/ProcessSection.tsx
git commit -m "feat(process): larger counters, more card padding and gap"
```

---

## Task 4: SpeedRevenueBanner — Accent Stat Numbers + Divider

**Files:**
- Modify: `src/components/organisms/SpeedRevenueBanner.tsx`

- [ ] **Step 1: Make stat values use accent color**

Current: `text-white`. Change the stat value span to `text-accent`:

```tsx
<span className="text-3xl font-heading font-extrabold text-accent shrink-0">
    {stat.value}
</span>
```

- [ ] **Step 2: Increase gap between stat cards**

Current `gap-sectional` on the stats grid. Change to a fixed larger gap:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
```

- [ ] **Step 3: Add a thin accent left-border to each stat card**

The stat cards currently have `border border-white/[0.07]`. Add a left-side accent marker:

```tsx
<motion.div
    key={stat.value}
    className="flex items-start gap-4 p-6 rounded-[1.5rem]
               border border-white/[0.07]
               border-l-2 border-l-accent/40"
```

Wait — Tailwind doesn't merge border shorthand this way cleanly. Use `style` instead for the left border:

```tsx
<motion.div
    key={stat.value}
    className="flex items-start gap-4 p-6 rounded-[1.5rem]
               border border-white/[0.07]"
    style={{ borderLeftColor: "rgba(30,64,175,0.5)", borderLeftWidth: "2px" }}
    variants={statReveal}
    ...
>
```

- [ ] **Step 4: Commit**
```bash
git add src/components/organisms/SpeedRevenueBanner.tsx
git commit -m "feat(speed-banner): accent stat numbers, left-border accent on stat cards"
```

---

## Task 5: ConfidentIntermission — Visual Anchoring

**Files:**
- Modify: `src/components/organisms/ConfidentIntermission.tsx`

- [ ] **Step 1: Add a centered accent rule above the label**

Before the `<motion.p>` label, add a thin horizontal accent line:

```tsx
{/* Accent rule — anchors the content block visually */}
<motion.div
    variants={labelIn}
    aria-hidden="true"
    className="w-12 h-[2px] bg-accent mx-auto mb-8"
/>

<motion.p
    variants={labelIn}
    className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-8 inline-block"
>
    {LABEL}
</motion.p>
```

- [ ] **Step 2: Add a subtle radial bg glow centered behind the text**

Inside the `<section>`, after `<GrainOverlay>`:

```tsx
{/* Radial center glow — makes the void feel intentional, not empty */}
<div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.07) 0%, transparent 70%)",
    }}
/>
```

- [ ] **Step 3: Remove the existing hairline `<div>` above label (replace with step 1)**

Remove:
```tsx
<div
    aria-hidden="true"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+5rem)]
               w-[1px] h-16 bg-white/[0.06]"
/>
```

It's replaced by the inline accent rule from Step 1 which animates with the content.

- [ ] **Step 4: Commit**
```bash
git add src/components/organisms/ConfidentIntermission.tsx
git commit -m "feat(intermission): accent rule + radial bg glow for visual anchoring"
```

---

## Task 6: PortfolioSection — Section Sub-description + CTA Prominence

**Files:**
- Modify: `src/components/organisms/PortfolioSection.tsx`

- [ ] **Step 1: Add a brief sub-description under "Selected Work"**

After the `<motion.h2>` heading, add:

```tsx
<motion.p
    className="text-slate-400 text-sm leading-relaxed max-w-xs mt-4"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ ...spring, delay: 0.1 }}
>
    Three builds. Three industries. One standard.
</motion.p>
```

- [ ] **Step 2: Upgrade "View Live Site" to a visible button on active desktop card**

Current: `text-white/70 text-xs uppercase tracking-widest` — too small, reads like a footnote.

In the desktop deck's `isActive` block, replace:
```tsx
<a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex items-center gap-1.5 text-white/70
               text-xs font-bold uppercase tracking-widest
               hover:text-white transition-colors duration-200 mt-2"
>
    View Live Site
    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
</a>
```

With:
```tsx
<a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex items-center gap-2 mt-3
               px-5 py-2.5 rounded-full border border-white/20
               bg-white/10 hover:bg-white/20
               text-white text-xs font-bold uppercase tracking-widest
               transition-all duration-200 cursor-pointer self-start"
>
    View Live Site
    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
</a>
```

Apply the same upgrade to the mobile carousel's "View Live Site" link.

- [ ] **Step 3: Commit**
```bash
git add src/components/organisms/PortfolioSection.tsx
git commit -m "feat(portfolio): sub-description, pill CTA on live site link"
```

---

## Task 7: TestimonialSection — Visual Context

**Files:**
- Modify: `src/components/organisms/TestimonialSection.tsx`

- [ ] **Step 1: Add a thin accent rule above the blockquote**

Before the `<blockquote>`, add:

```tsx
{/* Accent rule — visual anchor above the quote */}
<motion.div
    variants={fadeUp}
    aria-hidden="true"
    className="w-16 h-[2px] bg-accent/40 mb-10"
/>
```

- [ ] **Step 2: Add a very faint diagonal line pattern to the background**

After `<section className="relative bg-zinc-50 ...">`, add:

```tsx
{/* Subtle diagonal pattern — prevents the light section feeling like dead space */}
<div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
        backgroundImage: "repeating-linear-gradient(135deg, #1e40af 0px, #1e40af 1px, transparent 1px, transparent 40px)",
    }}
/>
```

- [ ] **Step 3: Commit**
```bash
git add src/components/organisms/TestimonialSection.tsx
git commit -m "feat(testimonial): accent rule, faint diagonal bg pattern"
```

---

## Task 8: PricingSection — Featured Button Glow + Card Gap

**Files:**
- Modify: `src/components/organisms/PricingSection.tsx`

- [ ] **Step 1: Make the featured card's CTA button larger with a glow**

The `Professional` tier has `ctaStyle: "mercury-btn text-white shadow-lg"`. 

In the CTA `<motion.a>`, add conditional sizing for the featured card:

```tsx
<motion.a
    href="#contact"
    className={`relative z-10 block mt-auto text-center
               rounded-full text-xs font-bold
               uppercase tracking-widest cursor-pointer
               transition-all duration-200 ${tier.ctaStyle}
               ${tier.recommended
                   ? "py-5 text-sm shadow-[0_0_32px_rgba(30,64,175,0.5)]"
                   : "py-4"
               }`}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    transition={spring}
>
    {tier.cta}
</motion.a>
```

- [ ] **Step 2: Increase card gap**

Current: `gap-sectional`. Replace with a larger explicit gap:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
```

- [ ] **Step 3: Increase featured card vertical padding**

The featured `Professional` card uses same `p-8` as others. Make it `p-10` to feel more substantial. Update its `style`:

```tsx
{
    name: "Professional",
    ...
    style: "bg-void shadow-2xl",
    cardPadding: "p-10",  // new field
```

Wait — the `style` field is used directly on the card div as `${tier.style}`. Instead, add padding override on the featured card:

```tsx
<motion.div
    key={tier.name}
    className={`group relative overflow-hidden rounded-[2rem] h-full
               flex flex-col ${tier.style}
               ${tier.recommended ? "p-10" : "p-8"}
               hover:-translate-y-2 hover:shadow-2xl
               transition-all duration-300 ease-out`}
```

Remove `p-8` from the base className (it was there before) — it's now conditional.

- [ ] **Step 4: Commit**
```bash
git add src/components/organisms/PricingSection.tsx
git commit -m "feat(pricing): featured CTA glow + larger, bigger card gap"
```

---

## Task 9: FaqAccordion — Color Standardization + Section Intro

**Files:**
- Modify: `src/components/molecules/FaqAccordion.tsx`

The issue: question text uses `group-hover:text-accent` which turns the question blue on hover — inconsistent, looks like an error rather than a feature.

- [ ] **Step 1: Remove accent hover from question text**

```tsx
// Change:
<span className="text-ink font-heading font-bold text-lg group-hover:text-accent transition-colors">
// To:
<span className="text-ink font-heading font-bold text-lg group-hover:opacity-70 transition-opacity duration-200">
```

- [ ] **Step 2: Add section intro text above the FAQ header**

```tsx
<div className="mt-structural">
    <p className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">
        FAQ
    </p>
    <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-2">
        Common Questions
    </h2>
    <p className="text-slate-400 text-sm mb-8">
        Still have questions? We&rsquo;ve got answers.
    </p>
    <div className="flex flex-col divide-y divide-black/5">
```

- [ ] **Step 3: Make expand/collapse icons larger**

Current: `w-5 h-5`. Change to `w-6 h-6`:

```tsx
{openIndex === i ? (
    <Minus className="w-6 h-6" strokeWidth={1.75} />
) : (
    <Plus className="w-6 h-6" strokeWidth={1.75} />
)}
```

- [ ] **Step 4: Remove the incorrect `animate={{ rotate: ... }}` on the icon wrapper**

The current code has `animate={{ rotate: openIndex === i ? 0 : 0 }}` — both values are 0, it does nothing. Remove that wrapper to clean up:

```tsx
<span className="shrink-0 text-ink/30">
    {openIndex === i ? (
        <Minus className="w-6 h-6" strokeWidth={1.75} />
    ) : (
        <Plus className="w-6 h-6" strokeWidth={1.75} />
    )}
</span>
```

- [ ] **Step 5: Commit**
```bash
git add src/components/molecules/FaqAccordion.tsx
git commit -m "feat(faq): remove accent hover, add section intro, larger icons"
```

---

## Task 10: ContactPageContent — Form Breathing Room + Visual Bridge

**Files:**
- Modify: `src/components/organisms/ContactPageContent.tsx`

- [ ] **Step 1: Increase form field gap**

Current `gap-8`. Increase to `gap-10`:

```tsx
<form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
```

- [ ] **Step 2: Increase form input padding**

Current `py-4`. Increase to `py-5`:

```tsx
<input
    type="text"
    className="w-full bg-transparent border-b border-black/10
               py-5 outline-none focus:border-ink/40
               transition-colors text-ink placeholder:text-slate-300"
    placeholder="John Doe"
/>
```

Apply `py-5` to all three inputs (text, email, url).

- [ ] **Step 3: Add a thin vertical divider between left and right columns**

In the `grid grid-cols-1 lg:grid-cols-2` div, add a visual connector that shows on lg+:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-structural relative">
    {/* Divider — visible on desktop only */}
    <div
        aria-hidden="true"
        className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-black/[0.06]"
    />
    
    {/* LEFT: Contact options */}
    ...
    
    {/* RIGHT: Form */}
    ...
</div>
```

- [ ] **Step 4: Commit**
```bash
git add src/components/organisms/ContactPageContent.tsx
git commit -m "feat(contact): larger form padding, vertical column divider"
```

---

## Task 11: CoreCapabilitiesSection — Active Card Elevation

**Files:**
- Modify: `src/components/organisms/CoreCapabilitiesSection.tsx`

- [ ] **Step 1: Add a box-shadow glow on the active column (desktop)**

In `CapabilityColumn`, add a conditional `boxShadow` style via Framer Motion:

```tsx
<motion.div
    layout={!reducedMotion}
    className={`
        relative flex flex-col justify-between overflow-hidden
        border-r last:border-r-0 ${cap.borderColor}
        cursor-pointer select-none
        min-h-[480px] md:min-h-[560px]
        w-full
    `}
    style={{
        backgroundColor: cap.bg,
    }}
    animate={
        isActive
            ? { boxShadow: "inset 0 0 60px rgba(30,64,175,0.08)" }
            : { boxShadow: "none" }
    }
    onClick={handleToggle}
    ...
>
```

- [ ] **Step 2: Increase title font size when active**

Add a size class that changes on `isActive`:

```tsx
<h3
    className={`
        font-heading font-black leading-tight
        ${isActive ? "text-2xl md:text-3xl mb-4" : "text-xl md:text-2xl mb-0"}
        ${cap.textPrimary}
        transition-all duration-300
    `}
>
```

- [ ] **Step 3: Commit**
```bash
git add src/components/organisms/CoreCapabilitiesSection.tsx
git commit -m "feat(capabilities): inset glow on active, larger title when expanded"
```

---

## Task 12: globals.css — Nav Transition Utilities

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add a `--spacing-grand` token for the hero section push**

The navbar is now `0px` top at rest, so the hero needs to know the nav height to avoid content overlap. Add:

```css
:root {
    /* existing tokens ... */
    --nav-height-expanded: 72px;   /* full-width nav height at top */
    --nav-height-bubble: 64px;     /* bubble nav height when scrolled */
}
```

- [ ] **Step 2: Update `.mesh-transition` comment to reflect new nav behavior**

```css
/* ─── Mesh Transition (Dark hero — starts from top-0 under transparent nav) ─── */
.mesh-transition {
    background: #050505;
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/globals.css
git commit -m "feat(css): nav height tokens"
```

---

## Self-Review

**Spec coverage check:**
- [x] Navbar full-width → bubble: Task 1
- [x] Hero "Leaking Revenue" 1.4× larger: Task 2 Step 1
- [x] Hero right side element: Task 2 Step 2
- [x] Hero accent sub-copy: Task 2 Step 3
- [x] Process counter prominence: Task 3 Step 1
- [x] Process card breathing: Task 3 Steps 2–3
- [x] Speed stats accent color: Task 4 Step 1
- [x] Stat boxes more spacing: Task 4 Step 2
- [x] ConfidentIntermission visual anchor: Task 5
- [x] Portfolio section intro: Task 6 Step 1
- [x] Portfolio CTA prominence: Task 6 Step 2
- [x] Testimonial visual context: Task 7
- [x] Pricing featured button bolder: Task 8 Step 1
- [x] Pricing card spacing: Task 8 Step 2
- [x] FAQ accent color standardization: Task 9 Step 1
- [x] FAQ section intro: Task 9 Step 2
- [x] FAQ icon size: Task 9 Step 3
- [x] Contact form breathing room: Task 10 Steps 1–2
- [x] Contact visual bridge: Task 10 Step 3
- [x] Capabilities active elevation: Task 11

**Not implemented (out of scope for this plan):**
- Pricing toggle (One-Off vs Monthly) — requires new state + data restructure, separate plan
- Portfolio category/year tags — requires data schema update, separate task

**Placeholder scan:** No TBDs or TODOs found.

**Type consistency:** No shared types introduced across tasks — each task is self-contained file edit.
