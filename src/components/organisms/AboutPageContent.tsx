"use client";

import {
    Zap,
    Palette,
    Globe,
    Database,
    Code2,
    Gauge,
} from "lucide-react";

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
const techStack = [
    {
        icon: Zap,
        name: "Next.js 15",
        description: "The Ferrari of web frameworks. Renders before the user clicks.",
    },
    {
        icon: Palette,
        name: "Tailwind CSS",
        description: 'Pixel-perfect design without the "heavy" code.',
    },
    {
        icon: Globe,
        name: "Vercel Edge Network",
        description: "Global CDN hosting. Your site lives in Cape Town, not a server in Texas.",
    },
    {
        icon: Database,
        name: "Supabase",
        description: "Enterprise-grade databases for real customer data.",
    },
    {
        icon: Code2,
        name: "n8n & Gemini 2.0",
        description:
            "Autonomous pipelines that audit leads, enrich data, and route high-value targets to your sales channels.",
    },
    {
        icon: Gauge,
        name: "Generative Engine Optimization",
        description:
            "Structuring data so LLMs natively understand and recommend your services.",
    },
];

const reasons = [
    {
        title: "Direct Access",
        description: "You speak to Luke Petzer — the developer actually building your system. Not a sales rep, not an account manager. Direct access means faster decisions and no miscommunication.",
    },
    {
        title: "Code Ownership",
        description: "Every line of code we write belongs to you. The GitHub repository is transferred to your account on delivery. No monthly retainer required to access your own site.",
    },
    {
        title: "Speed Guarantee",
        description: "Every website we build scores 90+ on Google PageSpeed Insights. If it doesn't, we optimise it until it does — at no extra cost. This is not a target. It is a guarantee.",
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
                            <p style={ORANGE_LABEL}>SYSTEM_OPERATOR</p>

                            <div>
                                <h2
                                    className="font-headline font-black uppercase text-white leading-none"
                                    style={{ fontSize: "clamp(2.5rem, 5vw, 3rem)" }}
                                >
                                    THE ARCHITECT.
                                </h2>
                                <p
                                    className="font-headline font-black uppercase leading-none mt-1"
                                    style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", ...accentGrad }}
                                >
                                    Luke Petzer
                                </p>
                            </div>

                            <p className="text-white/65 leading-relaxed text-base max-w-xl">
                                I don&apos;t run a bloated agency. I&apos;m a Cape Town-based web
                                developer and automation engineer managing the entire stack &mdash;
                                from hand-coded Next.js applications to n8n automation pipelines.
                                When you work with LP Web Studio you speak directly to the person
                                writing your code. No sales reps, no account managers, no outsourcing.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {["Next.js 15", "React", "n8n", "Vercel Edge", "Supabase", "Framer Motion"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[10px] uppercase tracking-widest text-white/60 border border-white/10 bg-white/5 px-3 py-1"
                                        style={{ borderRadius: "4px" }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
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
                                        architect.profile — zsh
                                    </span>
                                </div>
                                {/* Terminal content */}
                                <div className="p-6 md:p-8 font-mono text-sm space-y-3">
                                    <p style={{ color: "#FF4500" }}>$ whoami</p>
                                    <p className="text-white/80">Luke Petzer</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat role.txt</p>
                                    <p className="text-white/80">Web Developer & Automation Engineer</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat location.txt</p>
                                    <p className="text-white/80">Cape Town, South Africa</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat stack.txt</p>
                                    <p className="text-white/80">Next.js · React · n8n · Vercel</p>
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
                        I believe in <strong className="text-white">hand-coded performance</strong>.
                        No drag-and-drop page builders. No WordPress plugin vulnerabilities.
                        Every site I build is custom Next.js code that scores 90+ on Google
                        PageSpeed Insights &mdash; or I fix it until it does.
                    </p>
                </section>

                {DIVIDER}

                {/* ═══════════════════════════════════════
                    SECTION 4 — TECH STACK
                ═══════════════════════════════════════ */}
                <section className={SECTION_PAD} aria-label="Tech Stack">
                    <p style={ORANGE_LABEL} className="mb-3">CORE STACK</p>
                    <h2
                        className="font-headline font-black uppercase text-white mb-10"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                    >
                        THE_ENGINE
                    </h2>

                    <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-2xl">
                        The same stack powering enterprise applications, running your Cape Town business.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="group flex flex-col gap-4 p-6 border transition-colors duration-200"
                                style={{
                                    background: "#111111",
                                    border: "1px solid #222222",
                                    borderRadius: "8px",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "#FF4500";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "#222222";
                                }}
                            >
                                <tech.icon
                                    style={{ color: "#FF4500" }}
                                    className="w-6 h-6 shrink-0"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                />
                                <div>
                                    <h3 className="font-headline font-bold uppercase text-white text-sm tracking-wide mb-2">
                                        {tech.name}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {tech.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                    One engineer. Full stack. No account managers.
                </p>
                <button
                    onClick={openDrawer}
                    className="btn-primary"
                    style={{ padding: "14px 32px", borderRadius: "4px" }}
                >
                    INITIATE PROJECT
                </button>
            </section>
        </div>
    );
}
