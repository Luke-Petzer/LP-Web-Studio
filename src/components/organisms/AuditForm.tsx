"use client";

import React, { useState } from "react";

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
    const [companyField, setCompanyField] = useState("");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);

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
