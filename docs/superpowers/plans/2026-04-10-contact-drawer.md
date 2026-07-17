# Contact Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/contact` page with a slide-in drawer (desktop) / bottom sheet (mobile) accessible from every CTA on the site, with a POST API route that logs submissions and shows a success state.

**Architecture:** A React context (`DrawerProvider`) wraps the root layout, exposing `openDrawer` / `closeDrawer` to all client components. The `ContactDrawer` is rendered once at the root level and reads the context to animate in/out. Every CTA button that previously linked to `/contact` or `#contact` is converted to call `openDrawer()` instead.

**Tech Stack:** Next.js 15 App Router, React Context API, CSS transitions (no Framer Motion), Tailwind CSS, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/lib/contact-drawer-context.tsx` | Context, DrawerProvider, useDrawer hook |
| Create | `src/components/organisms/ContactDrawer.tsx` | Drawer UI — slide-in (desktop) / bottom sheet (mobile) |
| Create | `src/app/api/contact/route.ts` | POST handler — console.log + return `{ success: true }` |
| Modify | `src/app/layout.tsx` | Wrap body children with DrawerProvider |
| Modify | `src/components/molecules/NavClient.tsx` | Wire "Contact" nav link + "Get Started" CTA |
| Modify | `src/components/molecules/HeroContent.tsx` | Wire "Deploy System" CTA |
| Modify | `src/components/organisms/WorkClosingCTA.tsx` | Add "use client", wire "RUN FREE AUDIT" |
| Modify | `src/components/organisms/AboutPageContent.tsx` | Wire "INITIATE PROJECT" (already "use client") |
| Modify | `src/components/organisms/FinalCTA.tsx` | Add "use client", wire "Request Audit" |
| Modify | `src/components/organisms/Footer.tsx` | Add "use client", wire "Contact" footer link |
| Modify | `next.config.ts` | Add redirect `/contact` → `/` |
| Delete | `src/app/contact/page.tsx` | Replaced by drawer |
| Modify | `STATUS.md` | Add Contact Drawer section |

---

## Task 1: Create the drawer context

**Files:**
- Create: `src/lib/contact-drawer-context.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/lib/contact-drawer-context.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DrawerContextValue {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Body scroll lock + scrollbar-width compensation
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
  return ctx;
}
```

- [ ] **Step 2: Verify the file compiles (no build step yet — TypeScript check)**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors related to `contact-drawer-context.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact-drawer-context.tsx
git commit -m "feat(drawer): add DrawerProvider context with scroll lock + Escape handler"
```

---

## Task 2: Create the ContactDrawer UI component

**Files:**
- Create: `src/components/organisms/ContactDrawer.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/organisms/ContactDrawer.tsx
"use client";

import React, { useState } from "react";
import { useDrawer } from "@/lib/contact-drawer-context";
import { MessageCircle, Mail, X } from "lucide-react";

const ARCH_OPTIONS = [
  { id: "web_app",    label: "WEB_APP",     sub: "Custom build" },
  { id: "ecommerce",  label: "E_COMMERCE",  sub: "Shop" },
  { id: "automation", label: "AUTOMATION",  sub: "n8n pipelines" },
  { id: "branding",   label: "BRANDING",    sub: "Identity" },
] as const;

type ArchId = typeof ARCH_OPTIONS[number]["id"];

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

export function ContactDrawer() {
  const { isOpen, closeDrawer } = useDrawer();

  const [arch, setArch]       = useState<ArchId | null>(null);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [budget, setBudget]   = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arch, name, email, budget, message }),
    });
    setSending(false);
    setSuccess(true);
  }

  function handleClose() {
    closeDrawer();
    // Reset after animation completes
    setTimeout(() => {
      setSuccess(false);
      setName(""); setEmail(""); setBudget(""); setMessage(""); setArch(null);
    }, 400);
  }

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const transition = reducedMotion ? "none" : "transform 0.35s cubic-bezier(0.16,1,0.3,1)";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 59,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: reducedMotion ? "none" : "opacity 0.3s ease",
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact LP Web Studio"
        style={{
          position: "fixed",
          zIndex: 60,
          background: "#0E0E0E",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          overflowY: "auto",

          /* Desktop: right-side panel */
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(460px, 100vw)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition,
        }}
        // Mobile override via inline media query is handled by Tailwind below
      >
        {/* Mobile bottom-sheet override */}
        <style>{`
          @media (max-width: 639px) {
            [data-contact-drawer] {
              top: 8vh !important;
              bottom: 0 !important;
              right: 0 !important;
              left: 0 !important;
              width: 100% !important;
              border-left: none !important;
              border-top: 1px solid rgba(255,255,255,0.08) !important;
              border-radius: 20px 20px 0 0 !important;
              transform: ${isOpen ? "translateY(0)" : "translateY(100%)"} !important;
            }
          }
        `}</style>
        <div data-contact-drawer style={{ height: "100%", display: "flex", flexDirection: "column" }}>

          {/* Header */}
          <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#FF4500", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", marginBottom: "8px" }}>
                  PROJECT INITIATION
                </p>
                <h2 style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                  LET&apos;S BUILD.
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close contact drawer"
                style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 32px" }}>

            {success ? (
              /* ── Success state ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "240px", gap: "16px", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,69,0,0.12)", border: "1px solid #FF4500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#FF4500", fontSize: "20px" }}>✓</span>
                </div>
                <p style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  MESSAGE RECEIVED.
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", maxWidth: "260px", lineHeight: 1.6 }}>
                  Luke will review and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

                {/* Architecture selector */}
                <div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", marginBottom: "12px" }}>
                    ARCHITECTURE TYPE
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {ARCH_OPTIONS.map((opt) => {
                      const active = arch === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setArch(opt.id)}
                          style={{
                            background: active ? "#fff" : "transparent",
                            border: active ? "1px solid #fff" : "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "6px",
                            padding: "12px 14px",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <p style={{ color: active ? "#000" : "rgba(255,255,255,0.8)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", fontFamily: "var(--font-space-grotesk)" }}>
                            {opt.label}
                          </p>
                          <p style={{ color: active ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.35)", fontSize: "10px", marginTop: "2px", fontFamily: "var(--font-space-grotesk)" }}>
                            {opt.sub}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", display: "block", marginBottom: "4px" }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ ...FIELD_STYLE }}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#FF4500"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", display: "block", marginBottom: "4px" }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={{ ...FIELD_STYLE }}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#FF4500"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", display: "block", marginBottom: "4px" }}>
                    BUDGET
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. R15,000 – R50,000"
                    style={{ ...FIELD_STYLE }}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "#FF4500"; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", display: "block", marginBottom: "4px" }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project"
                    style={{ ...FIELD_STYLE, resize: "none" }}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderBottomColor = "#FF4500"; }}
                    onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderBottomColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>

                {/* Submit — corner bracket style */}
                <div style={{ position: "relative", display: "inline-block", alignSelf: "stretch" }}>
                  {/* TL bracket */}
                  <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "14px", height: "14px", borderTop: "2px solid rgba(255,69,0,0.4)", borderLeft: "2px solid rgba(255,69,0,0.4)" }} />
                  {/* BR bracket */}
                  <div style={{ position: "absolute", bottom: "-6px", right: "-6px", width: "14px", height: "14px", borderBottom: "2px solid rgba(255,69,0,0.4)", borderRight: "2px solid rgba(255,69,0,0.4)" }} />
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      width: "100%",
                      background: "#fff",
                      color: "#000",
                      border: "none",
                      padding: "16px 32px",
                      fontFamily: "var(--font-space-grotesk)",
                      fontWeight: 700,
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.6 : 1,
                      borderRadius: "4px",
                    }}
                  >
                    {sending ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Footer — direct contact */}
          <div style={{ padding: "20px 32px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", marginBottom: "12px" }}>
              OR REACH US DIRECTLY
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="https://wa.me/27673852286"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "13px" }}
              >
                <span style={{ width: "32px", height: "32px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageCircle style={{ width: "14px", height: "14px" }} />
                </span>
                WhatsApp
              </a>
              <a
                href="mailto:contact@lpwebstudio.co.za"
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "13px" }}
              >
                <span style={{ width: "32px", height: "32px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail style={{ width: "14px", height: "14px" }} />
                </span>
                contact@lpwebstudio.co.za
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/ContactDrawer.tsx
git commit -m "feat(drawer): add ContactDrawer UI with arch selector, form, success state, direct links"
```

---

## Task 3: Create the contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Write the file**

```ts
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[contact] submission:", body);
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat(api): add contact POST route with console.log"
```

---

## Task 4: Wire DrawerProvider into root layout

**Files:**
- Modify: `src/app/layout.tsx`

The layout currently renders:
```tsx
<body className="font-body antialiased overflow-x-hidden">
  {children}
  <Analytics />
</body>
```

Change to:
```tsx
<body className="font-body antialiased overflow-x-hidden">
  <DrawerProvider>
    {children}
    <ContactDrawer />
    <Analytics />
  </DrawerProvider>
</body>
```

- [ ] **Step 1: Add the two imports at the top of layout.tsx, after the existing imports**

Add after line `import "./globals.css";`:
```tsx
import { DrawerProvider } from "@/lib/contact-drawer-context";
import { ContactDrawer } from "@/components/organisms/ContactDrawer";
```

- [ ] **Step 2: Wrap the body contents**

Replace:
```tsx
<body className="font-body antialiased overflow-x-hidden">
    {children}
    <Analytics />
</body>
```

With:
```tsx
<body className="font-body antialiased overflow-x-hidden">
    <DrawerProvider>
        {children}
        <ContactDrawer />
        <Analytics />
    </DrawerProvider>
</body>
```

- [ ] **Step 3: Run build to verify**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && rm -rf .next && npm run build 2>&1 | tail -30
```

Expected: Build succeeds, no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(drawer): mount DrawerProvider + ContactDrawer in root layout"
```

---

## Task 5: Wire CTA buttons to openDrawer

**Files:**
- Modify: `src/components/molecules/NavClient.tsx`
- Modify: `src/components/molecules/HeroContent.tsx`
- Modify: `src/components/organisms/WorkClosingCTA.tsx`
- Modify: `src/components/organisms/AboutPageContent.tsx`
- Modify: `src/components/organisms/FinalCTA.tsx`
- Modify: `src/components/organisms/Footer.tsx`

### NavClient.tsx

This file is already `"use client"`. There are three contact entry points:
1. The `navLinks` array has `{ label: "Contact", href: "/contact" }` — rendered as `<a href={link.href}>` in both desktop and mobile nav.
2. The desktop CTA: `<a href={isHomepage ? "#contact" : "/contact"}>Get Started</a>`
3. The mobile CTA: `<a href={isHomepage ? "#contact" : "/contact"}>Get Started</a>`

**Replace the Contact nav link:** The navLinks array should not change (it's used in `pathname === link.href` comparison for active state styling). Instead, add a special case for the Contact link so it calls `openDrawer()` instead of navigating.

- [ ] **Step 1: Add useDrawer import to NavClient.tsx**

Add after existing imports:
```tsx
import { useDrawer } from "@/lib/contact-drawer-context";
```

- [ ] **Step 2: Add the hook call inside NavClient function body, after existing hooks**

```tsx
const { openDrawer } = useDrawer();
```

- [ ] **Step 3: Replace the desktop navLinks map to handle Contact specially**

Find:
```tsx
{navLinks.map((link) => {
    const isActive = pathname === link.href;
    return (
        <a
            key={link.label}
            href={link.href}
            className={[
                "font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-200",
                isActive
                    ? "text-white border-b border-white pb-0.5"
                    : "text-white/50 hover:text-white",
            ].join(" ")}
        >
            {link.label}
        </a>
    );
})}
```

Replace with:
```tsx
{navLinks.map((link) => {
    const isActive = pathname === link.href;
    if (link.label === "Contact") {
        return (
            <button
                key={link.label}
                onClick={openDrawer}
                className={[
                    "font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 bg-transparent border-none cursor-pointer",
                    "text-white/50 hover:text-white",
                ].join(" ")}
            >
                {link.label}
            </button>
        );
    }
    return (
        <a
            key={link.label}
            href={link.href}
            className={[
                "font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-200",
                isActive
                    ? "text-white border-b border-white pb-0.5"
                    : "text-white/50 hover:text-white",
            ].join(" ")}
        >
            {link.label}
        </a>
    );
})}
```

- [ ] **Step 4: Replace desktop "Get Started" `<a>` with `<button>`**

Find:
```tsx
<a
    href={isHomepage ? "#contact" : "/contact"}
    className={[
        "hidden md:inline-flex font-headline font-bold uppercase tracking-widest transition-all duration-200",
        scrolled
            ? "text-[10px] bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90"
            : "btn-primary text-[11px] px-6 py-2.5",
    ].join(" ")}
>
    Get Started
</a>
```

Replace with:
```tsx
<button
    onClick={openDrawer}
    className={[
        "hidden md:inline-flex font-headline font-bold uppercase tracking-widest transition-all duration-200 border-none cursor-pointer",
        scrolled
            ? "text-[10px] bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90"
            : "btn-primary text-[11px] px-6 py-2.5",
    ].join(" ")}
>
    Get Started
</button>
```

- [ ] **Step 5: Replace mobile Contact nav link and mobile "Get Started" `<a>`**

Find (inside mobile overlay):
```tsx
{navLinks.map((link) => (
    <a
        key={link.label}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="font-headline text-3xl font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6"
    >
        {link.label}
    </a>
))}
<a
    href={isHomepage ? "#contact" : "/contact"}
    onClick={() => setIsOpen(false)}
    className="btn-primary mt-4 w-full justify-center text-center"
>
    Get Started
</a>
```

Replace with:
```tsx
{navLinks.map((link) => {
    if (link.label === "Contact") {
        return (
            <button
                key={link.label}
                onClick={() => { setIsOpen(false); openDrawer(); }}
                className="font-headline text-3xl font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 bg-transparent border-none cursor-pointer text-left"
            >
                {link.label}
            </button>
        );
    }
    return (
        <a
            key={link.label}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-headline text-3xl font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6"
        >
            {link.label}
        </a>
    );
})}
<button
    onClick={() => { setIsOpen(false); openDrawer(); }}
    className="btn-primary mt-4 w-full justify-center text-center bg-transparent border-none cursor-pointer"
>
    Get Started
</button>
```

### HeroContent.tsx

File is already `"use client"`.

- [ ] **Step 6: Add useDrawer import to HeroContent.tsx**

Add after existing import:
```tsx
import { useDrawer } from "@/lib/contact-drawer-context";
```

- [ ] **Step 7: Add hook call inside HeroContent function body**

```tsx
const { openDrawer } = useDrawer();
```

- [ ] **Step 8: Replace "Deploy System" anchor with button**

Find:
```tsx
<a
    href="#contact"
    className="btn-primary px-10 py-5 text-sm"
>
    Deploy System
</a>
```

Replace with:
```tsx
<button
    onClick={openDrawer}
    className="btn-primary px-10 py-5 text-sm border-none cursor-pointer"
>
    Deploy System
</button>
```

### WorkClosingCTA.tsx

This is currently a server component. Add `"use client"` and wire the button.

- [ ] **Step 9: Add "use client" directive and imports to WorkClosingCTA.tsx**

Replace the opening of the file from:
```tsx
// src/components/organisms/WorkClosingCTA.tsx
import React from "react";
```

With:
```tsx
// src/components/organisms/WorkClosingCTA.tsx
"use client";

import React from "react";
import { useDrawer } from "@/lib/contact-drawer-context";
```

- [ ] **Step 10: Add hook call inside WorkClosingCTA function and replace CTA**

Replace the function body opening:
```tsx
export function WorkClosingCTA() {
  return (
```

With:
```tsx
export function WorkClosingCTA() {
  const { openDrawer } = useDrawer();
  return (
```

Replace:
```tsx
<a
  href="/contact"
  className="inline-flex items-center justify-center bg-white text-black font-headline font-bold uppercase text-sm"
  style={{
    padding: "14px 28px",
    borderRadius: "4px",
    letterSpacing: "0.08em",
  }}
>
  RUN FREE AUDIT
</a>
```

With:
```tsx
<button
  onClick={openDrawer}
  className="inline-flex items-center justify-center bg-white text-black font-headline font-bold uppercase text-sm border-none cursor-pointer"
  style={{
    padding: "14px 28px",
    borderRadius: "4px",
    letterSpacing: "0.08em",
  }}
>
  RUN FREE AUDIT
</button>
```

### AboutPageContent.tsx

Already `"use client"`.

- [ ] **Step 11: Add useDrawer import to AboutPageContent.tsx**

Add after existing imports (near the top `import React from "react"`):
```tsx
import { useDrawer } from "@/lib/contact-drawer-context";
```

- [ ] **Step 12: Add hook call inside AboutPageContent function**

After `export function AboutPageContent() {` add:
```tsx
const { openDrawer } = useDrawer();
```

- [ ] **Step 13: Replace "INITIATE PROJECT" anchor with button**

Find:
```tsx
<a
    href="/contact"
    className="inline-flex items-center justify-center bg-white text-black font-headline font-bold uppercase text-sm"
    style={{
        padding: "14px 32px",
        borderRadius: "4px",
        letterSpacing: "0.08em",
    }}
>
    INITIATE PROJECT
</a>
```

Replace with:
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

### FinalCTA.tsx

Currently a server component. Add `"use client"` and wire "Request Audit". Leave "Initiate Protocol" as mailto.

- [ ] **Step 14: Add "use client" and imports to FinalCTA.tsx**

Replace the opening of the file:
```tsx
export function FinalCTA() {
```

With:
```tsx
"use client";

import { useDrawer } from "@/lib/contact-drawer-context";

export function FinalCTA() {
  const { openDrawer } = useDrawer();
```

- [ ] **Step 15: Replace "Request Audit" anchor with button in FinalCTA.tsx**

Find:
```tsx
<a href="#contact" className="btn-ghost px-12 py-5 w-full md:w-auto text-center">
    Request Audit
</a>
```

Replace with:
```tsx
<button onClick={openDrawer} className="btn-ghost px-12 py-5 w-full md:w-auto text-center border-none cursor-pointer">
    Request Audit
</button>
```

### Footer.tsx

Add `"use client"` and wire "Contact" footer link.

- [ ] **Step 16: Add "use client" and imports to Footer.tsx**

Replace the opening of the file:
```tsx
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
```

With:
```tsx
"use client";

import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { useDrawer } from "@/lib/contact-drawer-context";
```

- [ ] **Step 17: Add hook call inside Footer function and replace Contact link**

After `export function Footer() {` add:
```tsx
const { openDrawer } = useDrawer();
```

Find the footer nav links array:
```tsx
{[
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
].map(({ label, href }) => (
    <a
        key={label}
        href={href}
        className="mono-label hover:text-white transition-colors duration-200"
    >
        {label}
    </a>
))}
```

Replace with:
```tsx
{[
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Privacy", href: "/privacy" },
].map(({ label, href }) => (
    <a
        key={label}
        href={href}
        className="mono-label hover:text-white transition-colors duration-200"
    >
        {label}
    </a>
))}
<button
    onClick={openDrawer}
    className="mono-label hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
>
    Contact
</button>
```

- [ ] **Step 18: Run build to verify all wiring**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -40
```

Expected: Build succeeds.

- [ ] **Step 19: Commit all CTA wiring**

```bash
git add src/components/molecules/NavClient.tsx src/components/molecules/HeroContent.tsx src/components/organisms/WorkClosingCTA.tsx src/components/organisms/AboutPageContent.tsx src/components/organisms/FinalCTA.tsx src/components/organisms/Footer.tsx
git commit -m "feat(drawer): wire all CTA buttons to openDrawer — nav, hero, work, about, finalcta, footer"
```

---

## Task 6: Delete /contact page and add redirect

**Files:**
- Delete: `src/app/contact/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Delete the contact page**

```bash
rm src/app/contact/page.tsx
```

- [ ] **Step 2: Add redirect in next.config.ts**

The current `next.config.ts` exports:
```ts
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: { ... },
    compiler: { ... },
};
```

Add an `async redirects()` method:
```ts
const nextConfig: NextConfig = {
    reactStrictMode: true,

    async redirects() {
        return [
            {
                source: "/contact",
                destination: "/",
                permanent: true,
            },
        ];
    },

    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};
```

- [ ] **Step 3: Run build to verify redirect + no contact page errors**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && rm -rf .next && npm run build 2>&1 | tail -30
```

Expected: Build succeeds. Route `/contact` no longer appears in output.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat(drawer): delete /contact page, add 301 redirect /contact → /"
```

(Note: `src/app/contact/page.tsx` deletion will show as a deleted file in git status. Stage it with `git add -u src/app/contact/page.tsx` before committing if needed.)

```bash
git add -u src/app/contact/page.tsx
git add next.config.ts
git commit -m "feat(drawer): delete /contact page, add 301 redirect /contact → /"
```

---

## Task 7: Update STATUS.md

**Files:**
- Modify: `STATUS.md`

- [ ] **Step 1: Add Contact Drawer section**

Add the following block at the top of the "Completed Changes" section (after the "Active Branch" and "Shared Components" sections, before the "2026-04-10 — Work Page Redesign v2" block):

```markdown
## Contact Drawer

**Date:** 2026-04-10

### Files Created
- `src/lib/contact-drawer-context.tsx` — React context (isOpen, openDrawer, closeDrawer), body scroll lock, Escape handler
- `src/components/organisms/ContactDrawer.tsx` — Slide-in (desktop 460px) / bottom sheet (mobile 92vh), architecture selector 2×2, 4 form fields, success state
- `src/app/api/contact/route.ts` — POST handler, console.log, returns `{ success: true }`

### Files Modified
- `src/app/layout.tsx` — DrawerProvider wraps body, ContactDrawer mounted at root
- `src/components/molecules/NavClient.tsx` — "Contact" nav + "Get Started" → openDrawer()
- `src/components/molecules/HeroContent.tsx` — "Deploy System" → openDrawer()
- `src/components/organisms/WorkClosingCTA.tsx` — "RUN FREE AUDIT" → openDrawer()
- `src/components/organisms/AboutPageContent.tsx` — "INITIATE PROJECT" → openDrawer()
- `src/components/organisms/FinalCTA.tsx` — "Request Audit" → openDrawer()
- `src/components/organisms/Footer.tsx` — "Contact" footer link → openDrawer()
- `next.config.ts` — 301 redirect `/contact` → `/`

### Files Deleted
- `src/app/contact/page.tsx` — replaced by drawer

### Needs Testing
- [ ] Drawer opens from every CTA entry point
- [ ] Escape key closes drawer
- [ ] Clicking backdrop closes drawer
- [ ] Body scroll locks when open (no scrollbar jump)
- [ ] Desktop: slides in from right
- [ ] Mobile: slides up from bottom, rounded top corners
- [ ] Architecture selector toggles active state correctly
- [ ] Form submits to /api/contact (check Network tab + server console.log)
- [ ] Success state shows after submit
- [ ] WhatsApp link opens wa.me/27673852286
- [ ] Email link opens mailto:contact@lpwebstudio.co.za
- [ ] /contact URL redirects to /
- [ ] prefers-reduced-motion: no CSS transition
```

- [ ] **Step 2: Commit**

```bash
git add STATUS.md
git commit -m "docs(status): add Contact Drawer section"
```

---

## Self-Review

**Spec coverage:**
- ✅ ContactDrawer.tsx — slide-in desktop, bottom sheet mobile, arch selector, 4 fields, success state
- ✅ contact-drawer-context.tsx — isOpen, openDrawer, closeDrawer
- ✅ All CTAs wired: Nav (Contact + Get Started × 2), HeroContent (Deploy System), WorkClosingCTA (RUN FREE AUDIT), AboutPageContent (INITIATE PROJECT), FinalCTA (Request Audit), Footer (Contact)
- ✅ Delete app/contact/page.tsx
- ✅ next.config.ts redirect /contact → /
- ✅ app/api/contact/route.ts POST handler
- ✅ STATUS.md updated

**Placeholder scan:** No TBDs. All code is complete.

**Type consistency:**
- `useDrawer()` returns `{ isOpen, openDrawer, closeDrawer }` — used consistently across all files.
- `ArchId` type derived from const array — consistent.
- `DrawerProvider` wraps children in layout.tsx correctly.
