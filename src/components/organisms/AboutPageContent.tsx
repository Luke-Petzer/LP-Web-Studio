"use client";

/* ─── Shared style constants ─── */
const SECTION_PAD = "py-14 md:py-24";
const DIVIDER = <hr className="border-none border-t-0 h-px bg-[#1A1A1A] w-full" />;

const ORANGE_LABEL: React.CSSProperties = {
    color: "#FF4500",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontFamily: "var(--font-space-grotesk)",
};

const accentGrad: React.CSSProperties = {
    background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
};

/* ─── Data ─── */
const reasons = [
    {
        title: "Direct Access",
        description: "You speak to Luke Petzer — the developer actually building your system. Not a sales rep, not an account manager. Direct access means faster decisions and no miscommunication.",
    },
    {
        title: "Code Ownership",
        description: "Every line of code we write belongs to you. The repository is transferred to your account on delivery. No monthly retainer required to access your own system.",
    },
    {
        title: "Built to Last",
        description: "You're not locked into a template that breaks when your business changes. Every system is built for how you actually operate — and built to grow with you.",
    },
];

import React from "react";
import { useDrawer } from "@/lib/contact-drawer-context";

export function AboutPageContent() {
    const { openDrawer } = useDrawer();
    return (
        <div className="bg-[#0A0A0A] w-full">
            <div className="max-w-7xl mx-auto px-6">

                {/* ═══════════════════════════════════════
                    SECTION 2 — FOUNDER BLOCK
                ═══════════════════════════════════════ */}
                <section className={SECTION_PAD} aria-label="Founder">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

                        {/* LEFT 60% */}
                        <div className="w-full md:w-[60%] flex flex-col gap-6">
                            <p style={ORANGE_LABEL}>FOUNDER</p>

                            <div>
                                <h2
                                    className="font-headline font-black uppercase text-white leading-none"
                                    style={{ fontSize: "clamp(2.5rem, 5vw, 3rem)" }}
                                >
                                    THE BUILDER.
                                </h2>
                                <p
                                    className="font-headline font-black uppercase leading-none mt-1"
                                    style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", ...accentGrad }}
                                >
                                    Luke Petzer
                                </p>
                            </div>

                            <p className="text-white/65 leading-relaxed text-base max-w-xl">
                                I don&apos;t run a bloated agency. I build the systems that run your
                                business &mdash; ordering portals, client platforms, and the automations
                                that replace manual admin &mdash; end to end, solo. Honours computer
                                science background, AI-accelerated delivery, and production systems
                                shipped without a team behind me. When you work with LP Web Studio you
                                speak directly to the person building your system. No sales reps, no
                                account managers, no outsourcing.
                            </p>

                        </div>

                        {/* RIGHT 40% — terminal block */}
                        <div className="w-full md:w-[40%]">
                            <div className="rounded-[12px] bg-[#0D0D0D] overflow-hidden border border-[#222222]">
                                {/* Traffic light bar */}
                                <div className="flex items-center gap-2 px-5 py-3 border-b border-[#222222]">
                                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                                    <span className="ml-4 text-white/30 text-xs font-mono">
                                        founder.profile — zsh
                                    </span>
                                </div>
                                {/* Terminal content */}
                                <div className="p-6 md:p-8 font-mono text-xs md:text-sm space-y-3 break-words">
                                    <p style={{ color: "#FF4500" }}>$ whoami</p>
                                    <p className="text-white/80">Luke Petzer</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat role.txt</p>
                                    <p className="text-white/80">Systems Builder</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat location.txt</p>
                                    <p className="text-white/80">Cape Town, South Africa</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat stack.txt</p>
                                    <p className="text-white/80">Ordering portals · Client platforms · Automation</p>
                                    <p className="text-white/30 text-xs mt-2">$ uptime</p>
                                    <p style={{ color: "#FF4500" }}>SYSTEMS ONLINE ●</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {DIVIDER}

                {/* ═══════════════════════════════════════
                    SECTION 3 — PHILOSOPHY
                ═══════════════════════════════════════ */}
                <section className={SECTION_PAD} aria-label="Philosophy">
                    <h2
                        className="font-headline font-black uppercase text-white mb-8"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                    >
                        THE_PHILOSOPHY
                    </h2>

                    <blockquote className="pl-6 border-l-[3px] border-[#FF4500] mb-8">
                        <p className="text-white text-lg leading-relaxed">
                            &ldquo;Most agencies sell you a pre-packaged template and charge you a
                            monthly fee to press &lsquo;update&rsquo;. We build custom software.&rdquo;
                        </p>
                    </blockquote>

                    <p className="text-white/70 leading-relaxed max-w-3xl">
                        I believe in <strong className="text-white">building things properly</strong>.
                        No templates, no page builders bolted onto a generic theme &mdash; every
                        system is built for how your business actually operates, and built to last.
                    </p>
                </section>

                {DIVIDER}


                {/* ═══════════════════════════════════════
                    SECTION 5 — WHY LP WEB
                ═══════════════════════════════════════ */}
                <section className={SECTION_PAD} aria-label="Why LP Web">
                    <p style={ORANGE_LABEL} className="mb-3">THE CASE FOR WORKING TOGETHER</p>
                    <h2
                        className="font-headline font-black uppercase text-white mb-12"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                    >
                        WHY_LP_WEB
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                        {reasons.map((reason) => (
                            <div key={reason.title} className="flex flex-col gap-4">
                                {/* Orange accent line */}
                                <div
                                    style={{
                                        width: "24px",
                                        height: "2px",
                                        background: "#FF4500",
                                    }}
                                />
                                <h3
                                    className="font-headline font-black uppercase text-white"
                                    style={{ fontSize: "18px" }}
                                >
                                    {reason.title}
                                </h3>
                                <p className="text-white/65 leading-relaxed" style={{ fontSize: "15px" }}>
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {DIVIDER}

            </div>

            {/* ═══════════════════════════════════════
                SECTION 6 — CLOSING CTA (full width)
            ═══════════════════════════════════════ */}
            <section
                className="w-full flex flex-col items-center justify-center text-center px-6"
                style={{ paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
                aria-label="Closing CTA"
            >
                <h2
                    className="font-headline font-black uppercase text-white leading-none mb-4"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
                >
                    READY TO DEPLOY?
                </h2>
                <p className="text-white/60 text-base mb-8 max-w-md">
                    One engineer. Start to finish. No account managers.
                </p>
                <button
                    onClick={openDrawer}
                    className="btn-primary"
                    style={{ padding: "14px 32px", borderRadius: "4px" }}
                >
                    BOOK A DISCOVERY CALL
                </button>
            </section>
        </div>
    );
}
