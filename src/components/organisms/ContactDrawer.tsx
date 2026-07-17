// src/components/organisms/ContactDrawer.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDrawer } from "@/lib/contact-drawer-context";
import { MessageCircle, Mail, X } from "lucide-react";

const ARCH_OPTIONS = [
  { id: "ordering_portal", label: "Ordering portal", sub: "Take orders online" },
  { id: "client_platform", label: "Client platform", sub: "Logins & self-serve" },
  { id: "automation",      label: "Automation",      sub: "Replace manual admin" },
  { id: "mobile_app",      label: "Mobile app",      sub: "iOS / Android" },
  { id: "other",           label: "Something else",  sub: "Tell us more" },
] as const;

type ArchId = typeof ARCH_OPTIONS[number]["id"];

const FIELD_STYLE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  width: "100%",
  padding: "14px 0",
  fontSize: "14px",
  outline: "none",
  fontFamily: "var(--font-space-grotesk)",
  minHeight: "44px",
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
  const [error, setError]     = useState(false);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Auto-focus first field on open, restore focus on close, Esc to close, trap Tab.
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 200);

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKey);
      triggerRef.current?.focus?.();
    };
  }, [isOpen, closeDrawer]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arch, name, email, budget, message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function handleClose() {
    closeDrawer();
    // Reset after animation completes
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setName(""); setEmail(""); setBudget(""); setMessage(""); setArch(null);
    }, 400);
  }

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
        ref={panelRef}
        role="dialog"
        data-contact-drawer
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
      >
        {/* Mobile bottom-sheet override */}
        <style>{`
          @media (max-width: 639px) {
            [data-contact-drawer] {
              top: 8dvh !important;
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
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

          {/* Header */}
          <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#FF4500", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-space-grotesk)", marginBottom: "8px" }}>
                  GET IN TOUCH
                </p>
                <h2 style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontWeight: 900, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                  LET&apos;S BUILD.
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close contact drawer"
                style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: "12px", margin: "-8px" }}
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 32px" }}>

            {success ? (
              /* Success state */
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
                    WHAT DO YOU NEED?
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
                    ref={firstFieldRef}
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
                    placeholder="e.g. R35,000+"
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

                {error && (
                  <p style={{ color: "#FF4500", fontSize: "12px", textAlign: "center" }}>
                    Something went wrong. Please try again or contact us directly below.
                  </p>
                )}

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
