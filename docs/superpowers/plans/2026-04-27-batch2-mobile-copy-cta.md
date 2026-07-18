# Batch 2 — Mobile, Copy, CTA Wiring (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate mobile horizontal scroll, refine module-card content fit, sharpen two pieces of work-page copy, and wire the home + work audit CTAs to a real `/audit` page with a working form (server validation + honeypot, placeholder webhook target).

**Architecture:** Same Next.js 15 app-router site, no new deps. New `/audit` page reuses `SubpageHero`. New `AuditForm` client component mirrors `ContactDrawer`'s submission shape. New `/api/audit` edge route mirrors `/api/contact` (Zod, edge runtime, server-side honeypot defence, webhook with fallback). Mobile fixes are root-cause (no `overflow-x: hidden` band-aid — that's already on `body`).

**Tech Stack:** Next 15, React 19, Tailwind 3.4, TypeScript, Zod (already a dep). No new packages.

**Spec:** `docs/superpowers/specs/2026-04-27-batch2-mobile-copy-cta-design.md`

**Branch:** `pre-launch/cleanup-2026-04-17` (continuation; no child branch).

**Out of scope:** Pre-existing a11y findings, missing `/founder-portrait.jpg`, `M src/app/learn/[slug]/page.tsx` working-tree changes, n8n workflow itself, Lighthouse re-runs.

---

## File structure

| File | Change |
|---|---|
| `STATUS.md` | APPEND mobile audit + Batch 2 changelog (Tasks 1, 8) |
| `src/components/organisms/CoreInfrastructure.tsx` | MODIFY — content-fit tweaks (Task 3) |
| `src/components/organisms/WorkPageContent.tsx` | MODIFY — Cafe Crave hook copy (Task 4) |
| `src/components/organisms/WorkClosingCTA.tsx` | MODIFY — body copy + buttons (Task 6) |
| `src/components/organisms/FinalCTA.tsx` | MODIFY — swap CTAs (Task 7) |
| `src/app/audit/page.tsx` | CREATE — server page + metadata + hero + explanation + form mount (Task 5) |
| `src/components/organisms/AuditForm.tsx` | CREATE — client form component (Task 5) |
| `src/app/api/audit/route.ts` | CREATE — edge API route (Task 5) |
| `src/app/sitemap.ts` | MODIFY — add `/audit` (Task 5) |
| Possibly other files | MODIFY — root-cause horizontal-scroll fixes (Task 2) |

`globals.css` body already has `overflow-x: hidden` (line 36) — no change needed.

---

## Task 1: Mobile audit — dispatch reviewer + report findings to STATUS

**Files:**
- Modify: `STATUS.md` (append findings)
- Possibly modify: any file with a one-line obvious fix surfaced (e.g. bare `<img>` missing `max-width: 100%`)

The audit drives Task 2's specific fixes. We dispatch a code-reviewer subagent rather than crawl manually because it can read all 14 routes' organisms in parallel.

- [ ] **Step 1: Dispatch the mobile-audit subagent**

Use the Agent tool, `superpowers:code-reviewer` subagent type, with this prompt (verbatim):

```
Mobile-layout review of the LP Web Studio site at /Users/lukepetzer/LP-Web-Studio/Admin/lp-ecosystem/LP-Web-Studio.

The site is Next 15 + Tailwind 3 + React 19. Pages: /, /work, /about, /learn, /learn/[slug], /privacy. Read every page in src/app/ and every organism/molecule it renders from src/components/.

Two outputs:

1. HORIZONTAL OVERFLOW (priority — must be exhaustive). For each finding, give exact file:line, the rule that causes the overflow at viewport widths 320/375/390/414, and the recommended root-cause fix (no `overflow-x: hidden` shortcuts — that's already on body in globals.css:36). Patterns to grep for:
   - Fixed pixel widths in className or style (e.g. `w-[600px]`, `min-w-[400px]`, `style={{ width: "500px" }}`)
   - clamp() upper bounds that exceed 320px without responsive guards
   - whitespace-nowrap on long strings that aren't intentional one-liners
   - Negative margins (-mx-*, -ml-*, -mr-*) in non-decorative contexts
   - Transforms that translate content offscreen
   - grid-cols-N or md:grid-cols-N without single-column mobile fallback
   - flex children without min-w-0 that have long content
   - <img> without max-w-full / sizes
   - <pre>/<code> blocks without overflow-x-auto
   - Long URLs/words without word-break / overflow-wrap

2. MOBILE SCALING REPORT (advisory). Per page, list:
   - Tap targets <44x44px (buttons, links)
   - Body text <14px, secondary text <12px
   - Cramped spacing (<16px gutters around content) or excessive (>96px between hero and first content block on mobile)
   - Hover-only interactions with no mobile equivalent
   - Anything that overflows or clips below 768px (vertical or otherwise)

Output format: a single Markdown report. Section 1 = horizontal overflow (must-fix). Section 2 = scaling report (advisory). Per finding: file:line, problem, severity (high/medium/low), recommended fix or "report only".

Out of scope: anything in `_Reference/`, `docs/`, `.claude/`, `node_modules/`, `.next/`. Do not flag the existing `text-white/40` contrast issues on /work — separate prompt. Do not flag the missing /founder-portrait.jpg — blocked on user.

Reply with the report only. Under 1500 words.
```

- [ ] **Step 2: Apply trivial one-line fixes from the report**

For each finding tagged `severity: high` AND `fix: <single line edit>`, apply via Edit tool. Skip anything requiring layout judgement — those go in Task 2.

Trivial fixes are limited to:
- Adding `min-w-0` to a flex child
- Adding `max-w-full` or `w-full` to an `<img>`
- Adding `overflow-wrap: anywhere` to a long-string container
- Removing a stray `whitespace-nowrap`
- Adding `flex-wrap` to a row that has it missing

Anything bigger: defer to Task 2.

- [ ] **Step 3: Append findings to STATUS.md**

Add at the top under `## Active Branch`:

```markdown
## Mobile audit — 2026-04-27

### Horizontal overflow findings
<paste subagent's section 1 here>

### Mobile scaling report (advisory)
<paste subagent's section 2 here>

### Applied during audit
<list of files touched in Step 2>

---
```

- [ ] **Step 4: Commit**

```bash
git add STATUS.md <any files touched in step 2>
git commit -m "audit(mobile): horizontal overflow + scaling findings; trivial fixes applied"
```

---

## Task 2: Apply Task-1 high-severity overflow fixes (root-cause)

**Files:** depend on Task 1 findings. Likely candidates based on a quick scan:
- `src/components/organisms/HeroSection.tsx` / `HeroContent.tsx` — large `clamp()` font-sizes
- `src/components/organisms/SubpageHero.tsx` — ghost watermark uses `right: clamp(-10px, -1vw, -20px)` and `font-size: clamp(80px, 22vw, 280px)` which can overflow on narrow widths
- `src/components/organisms/ProjectSection.tsx` — sticky right column metadata
- `src/components/organisms/Footer.tsx`
- Anything else flagged

- [ ] **Step 1: For each high-severity finding from Task 1 not fixed in Task 1 Step 2, apply the recommended root-cause fix**

For each finding, use Edit tool with the line range and replacement from the report. Document non-trivial decisions inline as you go (no premature comments — only if a future reader would be surprised).

If a finding's recommended fix conflicts with the visual design (e.g. would remove a decorative bleed), choose the smaller change that preserves the look while clipping cleanly. Examples:
- Ghost watermark in `SubpageHero`: instead of removing the negative right offset, wrap the watermark in a parent with `overflow: hidden` if not already. The parent (`.relative.min-h-[38vh]...rounded-[3rem]`) already has `overflow-hidden` (line 21) — verify it's clipping; if Lighthouse-style overflow appears at 320px, the fix is on the OUTER wrapper, not the watermark itself.
- Long PROJECT_IDENT split words on `ProjectSection` at 320px — `clamp(2.5rem, 5vw, 4.5rem)` resolves to `2.5rem = 40px` at 320px which can still overflow `<h2>` in a 40%-width sticky column. Lower the floor to `2rem` mobile-only.

- [ ] **Step 2: Manually verify at 320/375/390/414 widths in DevTools**

Open `npm run dev` (port 3000). Use Chrome DevTools device toolbar.

For each page:
- Resize horizontally; confirm no horizontal scrollbar appears at any of the four widths.
- Open the contact drawer; confirm no overflow.
- Open an FAQ item (home page); confirm no overflow.
- On `/work`: scroll all the way down; confirm no overflow during ProjectSection sticky behaviour.

If new overflow appears, Edit + retest. Don't move on with regressions.

- [ ] **Step 3: Commit**

```bash
git add <changed files>
git commit -m "fix(mobile): root-cause horizontal-overflow fixes per audit"
```

---

## Task 3: Module-card content-fit (CoreInfrastructure)

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx`

Two zones to touch: the desktop grid (`md:grid` block, lines ~77-114 post-Batch-1) and the mobile stack (`flex.flex-col.gap-4.md:hidden` block, lines ~117-149 post-Batch-1).

- [ ] **Step 1: Lower the desktop heading floor**

In the desktop grid's `<h3>` (currently `style={{ fontSize: "clamp(1.5rem, 1.8vw, 1.875rem)" }}`):

Change to `clamp(1.25rem, 1.6vw, 1.875rem)`. The lower floor lets two-word titles like "Autonomous\nBackends" fit at 768px without breaking out of the card.

- [ ] **Step 2: Replace `min-h-[420px]` with a more permissive height**

Change the card div's className from:
```
className="infra-card p-10 flex flex-col justify-between min-h-[420px] transition-transform duration-300 ease-out hover:scale-[1.02]"
```
to:
```
className="infra-card p-8 lg:p-10 flex flex-col justify-between min-h-[360px] gap-8 transition-transform duration-300 ease-out hover:scale-[1.02]"
```

`p-8` at md, `p-10` at lg gives breathing room without crushing content at 768px. `gap-8` ensures spacing between the icon/label row and the title/body block when content is short. `min-h-[360px]` keeps a consistent rhythm without forcing bottom whitespace on cards that fit naturally.

- [ ] **Step 3: Tighten mobile card padding**

In the mobile stack block, the card uses `dark-card p-8 flex flex-col gap-6`. At 320px viewport that leaves ~256px of usable width per card. Change to:
```
className="dark-card p-6 flex flex-col gap-5"
```
(`p-6` = 24px each side → 272px content width; `gap-5` = 20px between rows.)

Also change the mobile `<h3>` from `text-2xl` (24px) to `text-xl md:text-2xl` so the title doesn't crowd the card at 320px.

- [ ] **Step 4: Verify at 320/375/768/1024/1440 widths**

`npm run dev`. For each width:
- All 4 cards visible on appropriate breakpoint (mobile=stack, md=2-up, lg=4-up)
- No content clips or overflows
- Module label, title, body, tags (if any) all visible
- Hover scale at desktop still smooth, no clipping into neighbour

- [ ] **Step 5: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx
git commit -m "fix(services): content-fit refinement on module cards across viewports"
```

---

## Task 4: Cafe Crave chapter hook copy

**Files:**
- Modify: `src/components/organisms/WorkPageContent.tsx`

- [ ] **Step 1: Replace the chapter hook string**

In `WorkPageContent.tsx`, find:
```tsx
<ChapterHook text="A Cape Town cafe was losing customers before they even walked in." />
```

Replace with:
```tsx
<ChapterHook text="Real foot traffic. Zero digital footprint." />
```

- [ ] **Step 2: Verify in browser**

`http://localhost:3000/work` — scroll to first project (Cafe Crave). Confirm new hook appears above the project section.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkPageContent.tsx
git commit -m "copy(work): tighter Cafe Crave chapter hook"
```

---

## Task 5: New `/audit` page — page + form + API route + sitemap

This is the largest task. Five files in five steps, each independently committable but the final commit ties them together.

**Files:**
- Create: `src/app/audit/page.tsx`
- Create: `src/components/organisms/AuditForm.tsx`
- Create: `src/app/api/audit/route.ts`
- Modify: `src/app/sitemap.ts`

### Step 5.1: API route (`src/app/api/audit/route.ts`)

- [ ] **Create the file**

```ts
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const auditSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters")
        .trim(),
    email: z
        .string()
        .email("Please provide a valid email address")
        .max(254, "Email address is too long")
        .toLowerCase(),
    url: z
        .string()
        .min(1, "Website URL is required")
        .max(2048, "URL is too long")
        .trim(),
});

const FALLBACK_EMAIL = "contact@lpwebstudio.co.za";

function normaliseUrl(input: string): string {
    const trimmed = input.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body." },
            { status: 400 }
        );
    }

    // Honeypot defence (server-side). The client component does not send
    // company_field, but a bot scraping the form might.
    if (
        body &&
        typeof body === "object" &&
        "company_field" in body &&
        typeof (body as Record<string, unknown>).company_field === "string" &&
        ((body as Record<string, string>).company_field).trim().length > 0
    ) {
        return NextResponse.json({ success: true });
    }

    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            {
                success: false,
                error: parsed.error.errors[0]?.message ?? "Invalid submission.",
            },
            { status: 422 }
        );
    }

    const { name, email, url } = parsed.data;
    const normalisedUrl = normaliseUrl(url);

    try {
        new URL(normalisedUrl);
    } catch {
        return NextResponse.json(
            { success: false, error: "That doesn't look like a valid website address." },
            { status: 422 }
        );
    }

    // TODO: Replace with actual n8n webhook URL once n8n workflow is built
    const webhookUrl = "https://placeholder.lpwebstudio.co.za/api/audit-webhook";

    try {
        const webhookResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                url: normalisedUrl,
                timestamp: new Date().toISOString(),
            }),
        });
        if (!webhookResponse.ok) {
            throw new Error(`Webhook returned ${webhookResponse.status}`);
        }
    } catch (webhookError) {
        console.error("[Audit API] Webhook delivery failed:", webhookError);
        return NextResponse.json(
            {
                success: false,
                error: `We couldn't submit your audit request right now. Please email ${FALLBACK_EMAIL} with your URL and we'll send the report manually.`,
            },
            { status: 502 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message:
                "Audit requested. Your report will arrive within 1-2 business days.",
        },
        { status: 200 }
    );
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
```

### Step 5.2: Form component (`src/components/organisms/AuditForm.tsx`)

- [ ] **Create the file**

```tsx
"use client";

import React, { useState } from "react";

const FIELD_STYLE: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#fff",
    width: "100%",
    padding: "12px 0",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-space-grotesk)",
};

const HONEYPOT_STYLE: React.CSSProperties = {
    position: "absolute",
    left: "-9999px",
    width: "1px",
    height: "1px",
    overflow: "hidden",
};

const LABEL_STYLE: React.CSSProperties = {
    color: "rgba(255,255,255,0.35)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontFamily: "var(--font-space-grotesk)",
    display: "block",
    marginBottom: "4px",
};

function focusOrange(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderBottomColor = "#FF4500";
}
function blurDefault(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderBottomColor = "rgba(255,255,255,0.12)";
}

export function AuditForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [companyField, setCompanyField] = useState(""); // honeypot
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);

        // Client-side honeypot — silently "succeed" without POSTing
        if (companyField.trim().length > 0) {
            setSuccess(true);
            return;
        }

        setSending(true);
        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, url }),
            });
            const data = (await res.json()) as { success: boolean; error?: string };
            if (!res.ok || !data.success) {
                setErrorMsg(
                    data.error ??
                        "Something went wrong. Please try again or email contact@lpwebstudio.co.za directly."
                );
                return;
            }
            setSuccess(true);
        } catch {
            setErrorMsg(
                "Network error. Please try again or email contact@lpwebstudio.co.za directly."
            );
        } finally {
            setSending(false);
        }
    }

    if (success) {
        return (
            <div
                role="status"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "240px",
                    gap: "16px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(255,69,0,0.12)",
                        border: "1px solid #FF4500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#FF4500", fontSize: "20px" }}>✓</span>
                </div>
                <p
                    style={{
                        color: "#fff",
                        fontFamily: "var(--font-space-grotesk)",
                        fontWeight: 700,
                        fontSize: "18px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                    }}
                >
                    AUDIT REQUESTED.
                </p>
                <p
                    style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "13px",
                        maxWidth: "300px",
                        lineHeight: 1.6,
                    }}
                >
                    Your report will arrive by email within 1-2 business days.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            noValidate
        >
            {/* Honeypot field — visually hidden, screen-reader hidden, not in tab order */}
            <div style={HONEYPOT_STYLE} aria-hidden="true">
                <label htmlFor="company_field">Company (leave blank)</label>
                <input
                    id="company_field"
                    name="company_field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={companyField}
                    onChange={(e) => setCompanyField(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="audit-name" style={LABEL_STYLE}>NAME</label>
                <input
                    id="audit-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={FIELD_STYLE}
                    onFocus={focusOrange}
                    onBlur={blurDefault}
                    autoComplete="name"
                />
            </div>

            <div>
                <label htmlFor="audit-email" style={LABEL_STYLE}>EMAIL</label>
                <input
                    id="audit-email"
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={FIELD_STYLE}
                    onFocus={focusOrange}
                    onBlur={blurDefault}
                    autoComplete="email"
                />
            </div>

            <div>
                <label htmlFor="audit-url" style={LABEL_STYLE}>WEBSITE URL</label>
                <input
                    id="audit-url"
                    type="text"
                    inputMode="url"
                    required
                    maxLength={2048}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    style={FIELD_STYLE}
                    onFocus={focusOrange}
                    onBlur={blurDefault}
                    autoComplete="url"
                />
            </div>

            {errorMsg && (
                <p
                    role="alert"
                    style={{
                        color: "#FF4500",
                        fontSize: "13px",
                        lineHeight: 1.5,
                    }}
                >
                    {errorMsg}
                </p>
            )}

            <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="btn-cta-orange"
                style={{
                    padding: "16px 32px",
                    borderRadius: "4px",
                    cursor: sending ? "not-allowed" : "pointer",
                    opacity: sending ? 0.6 : 1,
                }}
            >
                {sending ? "SUBMITTING…" : "REQUEST AUDIT"}
            </button>
        </form>
    );
}
```

### Step 5.3: Page (`src/app/audit/page.tsx`)

- [ ] **Create the file**

```tsx
import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { AuditForm } from "@/components/organisms/AuditForm";

export const metadata: Metadata = {
    title: "Free Website Audit | LP Web Studio",
    description:
        "Free 5-point website audit — page speed, mobile, SEO, accessibility. Cape Town web development. Report emailed within 1-2 business days.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/audit",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/audit",
        title: "Free Website Audit | LP Web Studio",
        description:
            "Free 5-point website audit — page speed, mobile, SEO, accessibility.",
    },
};

const AUDIT_AREAS: Array<{ label: string; body: string }> = [
    {
        label: "PAGE_SPEED",
        body: "Core Web Vitals (LCP, INP, CLS), mobile load times, render-blocking resources",
    },
    {
        label: "MOBILE",
        body: "responsive breakpoints, touch targets, layout stability",
    },
    {
        label: "SEO",
        body: "meta tags, schema markup, indexing status, canonical URLs",
    },
    {
        label: "ACCESSIBILITY",
        body: "colour contrast, keyboard navigation, ARIA basics",
    },
    {
        label: "DELIVERY",
        body: "emailed within 1-2 business days. No spam.",
    },
];

export default function AuditPage() {
    return (
        <>
            <Navigation />
            <main className="pb-structural bg-[#0A0A0A] min-h-screen">
                <SubpageHero
                    title="AUDIT"
                    subtitle="FREE PERFORMANCE & VISIBILITY REPORT"
                />

                <section
                    aria-label="What the audit covers"
                    className="px-6 md:px-12 py-20 md:py-28"
                >
                    <div className="max-w-3xl mx-auto">
                        <p className="text-white/70 leading-relaxed mb-12 text-base md:text-lg">
                            Submit your URL. Within 1-2 business days, you&apos;ll receive a
                            written report covering five areas:
                        </p>

                        <div className="flex flex-col border-t border-white/10">
                            {AUDIT_AREAS.map((area) => (
                                <div
                                    key={area.label}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-white/10"
                                >
                                    <p
                                        className="md:col-span-3 mono-label"
                                        style={{ color: "rgba(255,255,255,0.35)" }}
                                    >
                                        {area.label}
                                    </p>
                                    <p className="md:col-span-9 text-white/70 text-sm md:text-base leading-relaxed">
                                        {area.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-label="Audit request form"
                    className="px-6 md:px-12 pb-24 md:pb-32"
                >
                    <div className="max-w-xl mx-auto">
                        <h2
                            className="font-headline font-black uppercase text-white leading-none mb-8"
                            style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            REQUEST<br />YOUR AUDIT.
                        </h2>
                        <AuditForm />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
```

### Step 5.4: Sitemap

- [ ] **Read current sitemap.ts to understand the pattern**

```bash
cat src/app/sitemap.ts
```

Expected: a `MetadataRoute.Sitemap` array with entries for `/`, `/work`, `/about`, `/learn`, `/privacy`, dynamic learn slugs.

- [ ] **Add `/audit` entry**

In `src/app/sitemap.ts`, add a new entry with `url: "https://lpwebstudio.co.za/audit"`, matching the format of the other static entries (likely `lastModified`, `changeFrequency`, `priority`).

If unsure of exact field names from the file, copy the existing `/about` entry's structure and change the URL to `/audit`.

### Step 5.5: Build + smoke

- [ ] **Run production build to verify no TypeScript errors**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. The output should now show `/audit` and `/api/audit` in the route table.

- [ ] **Manual form test in dev**

```bash
npm run dev
```

Visit `http://localhost:3000/audit`:
1. Submit with empty fields → browser native validation shows.
2. Submit with valid name, valid email, `example.com` (no protocol) → URL gets `https://` prepended server-side, then webhook fetch fails (placeholder doesn't resolve), error message appears with retry option. Form fields preserved.
3. Submit with valid name, valid email, `https://example.com` → same outcome (no double-prepend).
4. Open DevTools → fill the honeypot via JS (`document.getElementById('company_field').value = 'foo'; document.querySelector('button[type=submit]').click()`) → success state shows without a network request to `/api/audit` (client-side honeypot path).
5. Tab through form: honeypot is skipped (tabindex=-1).

### Step 5.6: Commit

- [ ] **Commit all five changes together**

```bash
git add src/app/audit/page.tsx src/components/organisms/AuditForm.tsx src/app/api/audit/route.ts src/app/sitemap.ts
git commit -m "feat(audit): /audit page with form, edge API route, honeypot, placeholder webhook"
```

---

## Task 6: Work CTA section — body + buttons

**Files:**
- Modify: `src/components/organisms/WorkClosingCTA.tsx`

- [ ] **Step 1: Replace body copy + buttons**

Replace the current `<p>` block (currently three sentences ending with "Let's build something that works.") with:

```tsx
<p className="text-white/60 text-base max-w-md leading-relaxed">
    Every slow website is a lead that didn&apos;t convert.
    Every generic template is a client that chose someone else.
</p>
```

Replace the buttons block (Batch-1 form, two `.btn-primary`/`.btn-ghost` buttons both calling `openDrawer`) with:

```tsx
<div className="flex flex-wrap items-center justify-center gap-4 mt-2">
    <a
        href="/audit"
        className="btn-primary"
        style={{ padding: "14px 28px", borderRadius: "4px", textDecoration: "none" }}
    >
        RUN FREE AUDIT
    </a>
    <button
        onClick={openDrawer}
        className="btn-ghost"
        style={{ padding: "14px 28px", borderRadius: "4px" }}
    >
        INITIATE PROJECT
    </button>
</div>
```

`RUN FREE AUDIT` becomes an `<a>` (navigation, not action). `INITIATE PROJECT` stays a `<button>` (opens drawer). The `useDrawer` hook is still needed for the second button — leave the existing import + `const { openDrawer } = useDrawer();` line intact.

- [ ] **Step 2: Verify in browser**

Visit `/work`, scroll to bottom:
- Body shows two sentences.
- "RUN FREE AUDIT" navigates to `/audit`.
- "INITIATE PROJECT" opens the contact drawer.
- Both buttons hover correctly (inherited from Batch 1 work).

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkClosingCTA.tsx
git commit -m "copy(work): tighten closing-CTA body; replace VIEW PRICING with INITIATE PROJECT and link RUN FREE AUDIT to /audit"
```

---

## Task 7: FinalCTA wiring swap

**Files:**
- Modify: `src/components/organisms/FinalCTA.tsx`

Currently (post-Batch-1):
- `Initiate Protocol` is `<a href="mailto:luke@lpwebstudio.co.za">` with `.btn-cta-orange`
- `Request Audit` is `<button onClick={openDrawer}>` with `.btn-ghost`

Desired:
- `Initiate Protocol` opens the drawer (still orange)
- `Request Audit` navigates to `/audit` (still ghost)

- [ ] **Step 1: Swap the two button targets**

Replace the two CTAs block in `FinalCTA.tsx`:

```tsx
<div className="flex flex-col md:flex-row justify-center items-center gap-6">
    <button
        onClick={openDrawer}
        className="btn-cta-orange px-12 py-5 w-full md:w-auto text-center"
    >
        Initiate Protocol
    </button>
    <span className="font-mono text-xs text-white/40 uppercase tracking-widest hidden md:block">or</span>
    <a
        href="/audit"
        className="btn-ghost px-12 py-5 w-full md:w-auto text-center"
        style={{ textDecoration: "none" }}
    >
        Request Audit
    </a>
</div>
```

The `useDrawer()` hook is already imported and used by the existing `Request Audit` button — keep the import and the `const { openDrawer } = useDrawer();` line; the orange button now consumes it.

- [ ] **Step 2: Verify in browser**

Home page → scroll to bottom CTA section:
- "Initiate Protocol" opens contact drawer.
- "Request Audit" navigates to `/audit`.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/FinalCTA.tsx
git commit -m "feat(home): wire Initiate Protocol to drawer; Request Audit to /audit"
```

---

## Task 8: Verification + STATUS update

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Route table should now include `/audit` (static), `/api/audit` (edge dynamic), and existing routes unchanged.

- [ ] **Step 2: Mobile regression smoke (manual)**

`npm run dev`. DevTools, 320/375/390/414 widths, on each of: `/`, `/work`, `/about`, `/learn`, `/privacy`, `/audit`. No horizontal scroll. Drawer opens cleanly. Audit form fits viewport. Module cards on home page sit clean.

- [ ] **Step 3: Append Batch 2 changelog to STATUS.md**

Add immediately after the existing `## UI/UX Refinement — 2026-04-27` section (before the `---` separator that closes it):

```markdown
## Batch 2 — Mobile, Copy, CTA Wiring — 2026-04-27

Plan: `docs/superpowers/plans/2026-04-27-batch2-mobile-copy-cta.md`
Spec: `docs/superpowers/specs/2026-04-27-batch2-mobile-copy-cta-design.md`

### Changes
1. **Mobile audit + horizontal-overflow fixes** — see `## Mobile audit — 2026-04-27` section above for findings and applied fixes
2. **Module card content-fit** — desktop heading floor + padding tweaks; mobile card padding tightened
3. **Cafe Crave chapter hook** rewritten: "Real foot traffic. Zero digital footprint."
4. **Work closing CTA** — body tightened (3rd sentence dropped); `VIEW PRICING` → `INITIATE PROJECT` (drawer); `RUN FREE AUDIT` now links to `/audit`
5. **`/audit` page** — new route, hero (`SubpageHero`), 5-area explanation grid, working form (name/email/url + honeypot), edge API route at `/api/audit`, sitemap entry. Webhook URL is a placeholder pending n8n workflow (`// TODO` comment in `route.ts`)
6. **Home FinalCTA wiring** — `Initiate Protocol` opens drawer; `Request Audit` links to `/audit`

### Known limitations
- `/api/audit` webhook URL is `https://placeholder.lpwebstudio.co.za/api/audit-webhook` — every submission will currently 502 with a fallback-email message. One-line swap when n8n workflow is built: change `webhookUrl` constant in `src/app/api/audit/route.ts`.
- Pre-existing a11y findings on `/work` (`text-white/40` contrast, heading-order, label/aria mismatch) deferred to a separate pass per user instruction.
- Lighthouse intentionally not re-run this round; previous baseline (88-89/94-96/96/100) holds barring CWV-affecting changes (none introduced).

---
```

- [ ] **Step 4: Commit**

```bash
git add STATUS.md
git commit -m "docs(status): record Batch 2 (mobile, copy, CTA wiring)"
```

---

## Self-review checklist

- [ ] **Spec coverage:**
  - A1 horizontal scroll → Tasks 1, 2 ✅
  - A2 mobile scaling report → Task 1 step 3 ✅
  - B module cards mobile → Task 3 ✅
  - C1 Cafe Crave hook → Task 4 ✅
  - C2 Work CTA section (body + buttons) → Task 6 ✅
  - D1 FinalCTA wiring → Task 7 ✅
  - D2 /audit page (page + form + API + sitemap) → Task 5 (5.1-5.6) ✅
  - STATUS update → Task 8 ✅
- [ ] **No placeholders:** All steps show actual code or actual commands. The one `// TODO` is in production code per user request, with explanation. ✅
- [ ] **Type consistency:** API schema `{ name, email, url }` matches form payload (Task 5.1 + 5.2). Honeypot field name `company_field` consistent across client + server. `normaliseUrl` defined once on server (Task 5.1) — client never normalises (server is the boundary). ✅
- [ ] **Order:** /audit exists (Task 5) before its consumers (Tasks 6, 7) — no broken intermediate state. ✅
- [ ] **Mobile audit drives Task 2 fixes:** Yes, Task 1 produces the report; Task 2 implements high-severity items. ✅
- [ ] **No `overflow-x: hidden` shortcuts:** Spec confirms `body` already has it. Task 2 is root-cause only. ✅
