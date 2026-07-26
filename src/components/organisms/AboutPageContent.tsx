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
        title: "You Talk To The Builder",
        description: "You explain the problem once, to the person who is going to solve it. No account manager translating in both directions, no scope getting lost between the person who heard it and the person who builds it. Changes get discussed and priced in the same conversation.",
    },
    {
        title: "The Code Is Yours",
        description: "On delivery the repository transfers to your account — source code, database, deployment config, all of it. A care plan keeps me maintaining it, but it is optional. If you ever want to hand the system to another developer, you can, and you do not need my permission to do it.",
    },
    {
        title: "Built Around Your Workflow",
        description: "Nothing here is a template with your logo on it. If your pricing is per-client and your reps quote off a printed list, the system does that — not the generic version of that. Your team should not have to be retrained into somebody else's process.",
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
                                I build the systems businesses run on &mdash; ordering portals, client
                                platforms, and the automations that take manual admin off your team.
                                One person, start to finish. I take the scoping call, write the code,
                                run the deployment, and pick up the phone when something needs
                                changing. That is not a caveat I am apologising for: it means the
                                person who understands your workflow is the same person changing it,
                                usually in the same week you ask.
                            </p>

                            <p className="text-white/65 leading-relaxed text-base max-w-xl">
                                Formally trained in software development through to honours level,
                                then straight into building things people actually put work through.
                                The ordering platform on the
                                Products page is live and taking real orders &mdash; not a concept, not
                                a mock-up. I am based in Cape Town and work with businesses across
                                South Africa.
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
                                    <p className="text-white/80">Luke Petzer — founder, and the one writing the code</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat what-i-build.txt</p>
                                    <p className="text-white/80">Ordering portals · Client platforms · Automations</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat who-for.txt</p>
                                    <p className="text-white/80">Wholesalers, distributors, and service businesses buried in manual admin</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat where.txt</p>
                                    <p className="text-white/80">Cape Town — clients across South Africa</p>
                                    <p className="text-white/30 text-xs mt-2">$ cat you-own.txt</p>
                                    <p className="text-white/80">Source code, database, deployment — transferred to you on delivery</p>
                                    <p className="text-white/30 text-xs mt-2">$ availability</p>
                                    <p style={{ color: "#FF4500" }}>TAKING ON NEW PROJECTS ●</p>
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
                        HOW_I_WORK
                    </h2>

                    <blockquote className="pl-6 border-l-[3px] border-[#FF4500] mb-8">
                        <p className="text-white text-lg leading-relaxed">
                            &ldquo;A system is only worth building if it removes work. If your team
                            still has to re-type an order after it arrives, I built the wrong
                            thing.&rdquo;
                        </p>
                    </blockquote>

                    <p className="text-white/70 leading-relaxed max-w-3xl">
                        So the first conversation is not about features or which framework I use.
                        It is about <strong className="text-white">where the work actually piles
                        up</strong> &mdash; who re-types what, who chases which spreadsheet, what
                        breaks when three orders land at once and two people are on leave. I build
                        for that, and I leave out the rest. Anything that does not take work off
                        someone&apos;s desk does not need to exist.
                    </p>
                </section>

                {DIVIDER}


                {/* ═══════════════════════════════════════
                    SECTION 5 — WHY LP WEB
                ═══════════════════════════════════════ */}
                <section className={SECTION_PAD} aria-label="Why LP Web">
                    <p style={ORANGE_LABEL} className="mb-3">WHY WORK WITH ONE PERSON</p>
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
                    STILL READING?
                </h2>
                <p className="text-white/60 text-base mb-8 max-w-lg">
                    Then something in your process has probably outgrown WhatsApp and a
                    spreadsheet. Give me twenty minutes and I will tell you straight whether
                    a system is worth building for it.
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
