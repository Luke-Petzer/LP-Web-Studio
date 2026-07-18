# Batch 2 — Mobile, Copy, and CTA Wiring (Design Spec)

**Date:** 2026-04-27
**Branch:** `pre-launch/cleanup-2026-04-17` (continuation, no child branch)
**Status:** Approved by user, ready to plan

---

## Goal

Three concerns in one batch:
1. **Mobile parity.** Eliminate horizontal scroll site-wide; identify (don't fix) other mobile issues for a later focused pass; redesign the home-page service cards so content fits cleanly at every viewport.
2. **Copy.** Sharpen one chapter hook on /work and tighten the closing CTA section on /work, fixing a broken "VIEW PRICING" reference along the way.
3. **CTA wiring.** Make the home-page bottom CTAs land somewhere real: "Initiate Protocol" → contact drawer; "Request Audit" → a new `/audit` page with a working form that mirrors the existing contact-form architecture.

Out of scope: pre-existing a11y findings (`text-white/40` contrast, heading-order, label/aria mismatch on /work), the missing `/founder-portrait.jpg`, Lighthouse re-runs, the user's pre-existing `M src/app/learn/[slug]/page.tsx` working-tree changes.

---

## Part A — Mobile

### A1: Horizontal scroll elimination

**Methodology** (not just a list of fixes — the audit drives the fix list):
1. Dispatch a code-reviewer subagent with one job: scan all page-level routes (`/`, `/work`, `/about`, `/learn`, `/learn/[slug]`, `/privacy`, the new `/audit`) and every organism/molecule rendered inside them, looking for layout features that could overflow a viewport ≥320px. Pattern checklist: fixed widths in `px`, `min-width`/`width` ≥ viewport, `clamp()` upper bounds, negative margins, transforms, ungated `whitespace-nowrap`, `overflow-visible` containers around bleeding decorative text, `grid-cols-N` without responsive variants, images without `max-width: 100%`, `pre`/`code` blocks, long URLs/words.
2. Apply targeted root-cause fixes for each finding.
3. **Then** add `overflow-x: hidden` on `body` (in `globals.css`) as a defence-in-depth net — not as the primary fix. The `body` already has `overflow-x: hidden` per `globals.css:36`. Verify still in place; don't add a duplicate.

**Manual viewport check after fixes:** 320px, 375px, 390px, 414px in Chrome DevTools. No horizontal scrollbar at rest, no overflow during interactive states (drawer open, FAQ open, etc.).

### A2: Mobile-scaling report

**Output, not action.** A structured findings list, written into `STATUS.md` under a `## Mobile audit — 2026-04-27` heading. Categories per page:
- Overflow / clipping below 768px
- Text under 14px body / 12px secondary
- Tap targets < 44×44px
- Cramped or excessive spacing
- Hover-only states with no mobile equivalent

**One-line fixes I'll apply directly during the audit:** `max-width: 100%` on bare `<img>`, missing `flex-wrap` on overflowing flex rows, missing `min-w-0` on flex children that cause sibling overflow. Anything bigger waits.

---

## Part B — Home-page service cards (`CoreInfrastructure.tsx`)

Batch 1 already moved the desktop layout to a 4-column grid. The bug is **content overflowing vertically and horizontally inside each card** at certain widths, especially mobile. Fix without redesigning the visual character (mono labels, icon-top, title/body/tags-bottom, dark surface).

**Fixes:**
- `min-h-[420px]` is too rigid on small viewports. Drop the floor; let cards size to content. Add `min-h-[360px]` on `md:` to keep desktop rhythm.
- Title `whitespace-pre-line` + the explicit `\n` in the data drives some lines past container width at narrow widths (e.g. "Autonomous\nBackends" wraps fine, but the line break can push when paired with `clamp(1.5rem, 1.8vw, 1.875rem)` font-size at the lower bound). Lower the floor to `1.25rem` on mobile-only; keep desktop ceiling.
- Body text — current `text-sm` (14px) is fine; no change. Trim the `mb-6` on tags row when tags are empty (already conditional, fine).
- Mobile (currently the second `<div>` block at `CoreInfrastructure.tsx:122-152`): the rendered card uses `dark-card p-8`. The `p-8` (32px) plus `gap-6` (24px) inside a 320px-wide card squeezes the title. Reduce to `p-6` mobile-only, keep body intact.
- Tag pills: confirm `flex-wrap` is on the container (it is — line 105/138). No change.

**Breakpoint behaviour** (no redesign):
- `<768px`: 1 column, vertical stack (existing mobile block, refined per above)
- `768-1023px`: 2 columns (existing `md:grid-cols-2`)
- `≥1024px`: 4 columns (existing `lg:grid-cols-4`)

This matches what's already there post-Batch 1 — the work is *content-fit* refinement, not layout change.

---

## Part C — Work page copy

### C1: Cafe Crave chapter hook

Current (`WorkPageContent.tsx:56`):
> A Cape Town cafe was losing customers before they even walked in.

New:
> Real foot traffic. Zero digital footprint.

6 words. Two-clause structure mirrors the second project's hook ("A restoration worth remembering. A website that couldn't tell the story.").

### C2: Work closing CTA

File: `WorkClosingCTA.tsx`

**Body copy** — drop the third sentence:
> Every slow website is a lead that didn't convert. Every generic template is a client that chose someone else.

(Keeps the parallel structure. Drops "Let's build something that works." which was filler.)

**Buttons** — remove `VIEW PRICING`, replace with `INITIATE PROJECT` (matches the existing /about closing CTA wording):

```tsx
<button onClick={openDrawer} className="btn-primary" style={{ padding: "14px 28px", borderRadius: "4px" }}>
    RUN FREE AUDIT
</button>
<button onClick={openDrawer} className="btn-ghost" style={{ padding: "14px 28px", borderRadius: "4px" }}>
    INITIATE PROJECT
</button>
```

But wait — `RUN FREE AUDIT` no longer opens the drawer. See Part D2.

---

## Part D — CTA wiring

### D1: `FinalCTA.tsx` button swap

Current (post-Batch-1):
- `Initiate Protocol` → `<a href="mailto:luke@lpwebstudio.co.za">` (orange CTA)
- `Request Audit` → `onClick={openDrawer}` (ghost)

After:
- `Initiate Protocol` → opens contact drawer (still orange `.btn-cta-orange`)
- `Request Audit` → links to `/audit` (still ghost)

The existing `useDrawer()` hook from `@/lib/contact-drawer-context` is the established pattern (consumed by `HeroContent`, `NavClient`, `WorkClosingCTA`, `AboutPageContent`, `Footer`). Reuse it; no new mechanism.

### D2: `/audit` page

#### Route + metadata
- Path: `src/app/audit/page.tsx`
- Server component for the page shell + metadata; the form itself is a client component (`AuditForm.tsx`).
- Metadata: title `Free Website Audit | LP Web Studio`, description ~155 chars, canonical `https://lpwebstudio.co.za/audit`.
- Add to `sitemap.ts` (uses dynamic generation — verify the new route lands).

#### Layout (top → bottom)

**1. Hero — `SubpageHero` reuse:**
```tsx
<SubpageHero title="AUDIT" subtitle="FREE PERFORMANCE & VISIBILITY REPORT" />
```
No `breadcrumb` prop (matches the post-Batch-1 work-page treatment).

**2. Explanation block (server-rendered):** one tight paragraph + 5-row labelled grid in MODULE/PROJECT_IDENT mono aesthetic.

```
Submit your URL. Within 1-2 business days, you'll receive a written report
covering five areas:

PAGE_SPEED      Core Web Vitals (LCP, INP, CLS), mobile load times,
                render-blocking resources
MOBILE          responsive breakpoints, touch targets, layout stability
SEO             meta tags, schema markup, indexing status, canonical URLs
ACCESSIBILITY   colour contrast, keyboard navigation, ARIA basics
DELIVERY        emailed within 1-2 business days. No spam.
```

Markup: row = mono label (left, 11px, white/35) + body (right, white/70, 15px). Border-top per row, mirrors the FAQ accordion style.

**3. Form (`AuditForm.tsx`, client):**

Fields:
- `name` — text, required, 2-100 chars, trimmed
- `email` — email, required, RFC-validated via Zod `.email()`, max 254
- `url` — text input (we transform it before validating, so we don't use `type="url"` which would auto-reject "example.com" without a protocol). Required. After normalisation (see below), validated as a parseable URL via `new URL()` and Zod `.url()`.
- `company_field` — honeypot, plain text, NOT in the submitted payload, hidden via `position: absolute; left: -9999px; width: 1px; height: 1px;` plus `tabindex={-1}` and `aria-hidden="true"`. Field name `company_field` is plausible (looks like a real "Company" field) and avoids the obvious trap names bots skip.

URL normalisation (client-side, before submit, also enforced server-side):
```ts
function normaliseUrl(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed; // already has protocol
  return `https://${trimmed}`;
}
```
Then `new URL(normalised)` — if that throws, show a validation error. **Never** double-prepend.

Submit button: `.btn-cta-orange` (matches the home-page primary CTA style), label `REQUEST AUDIT`. Disabled while in flight; label switches to `SUBMITTING…`.

Submission states (mirroring `ContactDrawer`'s shape):
- idle → submitting (disabled button, "SUBMITTING…")
- success → replace form with success card: orange checkmark, `AUDIT REQUESTED.`, "Your report will arrive by email within 1-2 business days."
- error → red message above submit, "Something went wrong. Please try again or email contact@lpwebstudio.co.za directly." Form fields preserved so user can retry without re-typing.

#### API route — `src/app/api/audit/route.ts`

- Edge runtime (matches `/api/contact`).
- Zod schema: `{ name, email, url }` (honeypot stripped client-side; server still defends against the honeypot field arriving — see below).
- Server-side honeypot defence: parse the raw body first; if `company_field` is present and non-empty, return `{ success: true }` without forwarding (silent reject — bot thinks it worked).
- After validation: re-run `normaliseUrl` server-side, then `new URL()` — defence-in-depth.
- Webhook URL: hardcoded **placeholder** `https://placeholder.lpwebstudio.co.za/api/audit-webhook` with the TODO comment the user requested:
  ```ts
  // TODO: Replace with actual n8n webhook URL once n8n workflow is built
  const webhookUrl = "https://placeholder.lpwebstudio.co.za/api/audit-webhook";
  ```
  We do NOT wire this through `process.env.AUDIT_WEBHOOK_URL` — that's deferred until the n8n workflow exists. The user wants "a one-line URL swap when the workflow is built."
- Payload to webhook: `{ name, email, url, timestamp }` (ISO string), JSON.
- On webhook 5xx/network error: return 502 with a fallback-email message (mirrors `/api/contact`).
- The placeholder URL won't resolve in production. That's intentional — until the workflow exists, every submission will fail at the webhook step and surface the fallback message. Acceptable per the user's instruction "Just wire the frontend so the URL swap is the only change needed later."

Wait — re-reading the user's prompt: *"Form submission: POST to a placeholder webhook URL: https://placeholder.lpwebstudio.co.za/api/audit-webhook"* — this is the form's destination. But our form actually POSTs to `/api/audit`, which is OUR Next.js route, which then forwards to the webhook. Two ways to interpret:

**Option α** — form POSTs directly to the placeholder URL (no Next.js API route).
**Option β** — form POSTs to `/api/audit`, which forwards to the placeholder URL.

Option β matches the existing `/api/contact` pattern, gives us server-side validation, lets us strip honeypot server-side, and means the URL swap really *is* one line in one file (`route.ts`) when the workflow is built. Option α saves one file but loses validation, can't enforce CORS on the placeholder host (which doesn't exist), and forces honeypot logic onto the client where bots can read it.

**Decision: Option β.** The placeholder URL is the webhook destination, not the form's POST target. This matches the user's intent ("the URL swap is the only change needed later") since the swap happens in `route.ts:webhookUrl`. Documented here so it's not surprising.

#### Page CTAs that should hit `/audit`

- `FinalCTA.tsx` "Request Audit" → `<a href="/audit">`
- `WorkClosingCTA.tsx` "RUN FREE AUDIT" → `<a href="/audit">` (changing from `onClick={openDrawer}`)

Both use `<a>` not `<button>` since they're navigation, not actions.

---

## Cross-cutting / a11y

- All new buttons inherit `:focus-visible` from the global ring in `globals.css:46`.
- Form labels are visible (not screen-reader only) — matches `ContactDrawer.tsx` pattern.
- Honeypot field has `aria-hidden="true"` and `tabindex={-1}` so screen readers and keyboard users skip it entirely.
- Submit button has `aria-busy={sending}` while in flight.

## Out of scope (explicit)

- New images, new videos, new fonts, anything that could shift CWV.
- The pre-existing `M src/app/learn/[slug]/page.tsx` working-tree changes — leave alone.
- Pre-existing a11y findings on `/work` (separate prompt per the user).
- Founder portrait asset — blocked on user.
- Building the n8n workflow.

## Approval

User confirmed picks 2026-04-27:
- Branch: continue on `pre-launch/cleanup-2026-04-17`
- Audit URL: `/audit`
- C1: "Real foot traffic. Zero digital footprint."
- C2a: drop third sentence (Option B)
- C2b: "INITIATE PROJECT" (Option 3)
- D2 hero: title `AUDIT`, subtitle keeps `FREE` (since it's used on `FinalCTA` micro-timeline + `WorkClosingCTA` button label)
- D2 timeframe: "within 1-2 business days" everywhere
- D2 DELIVERY bullet: `emailed within 1-2 business days. No spam.` (drop "no obligation, no follow-up sales")
