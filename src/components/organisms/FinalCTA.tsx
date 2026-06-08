"use client";

import { useDrawer } from "@/lib/contact-drawer-context";

export function FinalCTA() {
    const { openDrawer } = useDrawer();
    return (
        <section
            id="contact"
            aria-label="Final call to action"
            className="relative py-40 md:py-48 px-8 md:px-12 bg-slate-dark overflow-hidden"
        >
            {/* L-bracket corners */}
            <div className="corner-tl" />
            <div className="corner-br" />

            <div className="max-w-4xl mx-auto text-center">
                {/* Headline — no hard <br />; words wrap naturally on narrow viewports */}
                <h2
                    className="font-headline font-bold uppercase tracking-[-0.05em] leading-[0.95] text-white mb-10 break-words"
                    style={{ fontSize: "clamp(1.875rem, 8vw, 6.5rem)" }}
                >
                    Stop Managing. Start Building.
                </h2>

                {/* Micro-timeline */}
                <div className="mb-12 flex justify-center items-center flex-wrap gap-3 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase font-mono">
                    <span>01 / Free Discovery Call</span>
                    <span className="text-white/20">→</span>
                    <span>02 / Scope & Proposal</span>
                    <span className="text-white/20">→</span>
                    <span>03 / Your System Is Built</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <button
                        onClick={openDrawer}
                        className="btn-cta-orange px-12 py-5 w-full md:w-auto text-center"
                    >
                        Start a Project
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
            </div>
        </section>
    );
}
