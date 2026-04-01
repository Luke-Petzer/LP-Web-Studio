"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

/* ─────────────────────────────────────────────────────────────
   Card entrance variant — slides in from the right
   Direction is semantically correct: left panel is the anchor,
   right cards arrive *toward* it.
───────────────────────────────────────────────────────────── */
const cardReveal: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 160, damping: 28 },
    },
};

const labelReveal: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const headlineReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 28, delay: 0.1 },
    },
};

/* ─────────────────────────────────────────────────────────────
   Process card data
───────────────────────────────────────────────────────────── */
const processCards = [
    {
        index: "01",
        title: "Direct Lead Capture",
        body: "Traditional forms are dead. We integrate WhatsApp, Telegram, and n8n webhook pipelines to capture, enrich, and route leads directly to your phone in milliseconds.",
    },
    {
        index: "02",
        title: "Vercel Edge Rendering",
        body: "Every millisecond costs money. We bypass shared hosting. Your Next.js application runs on Vercel's global CDN, delivering sub-second load times.",
    },
    {
        index: "03",
        title: "Generative Engine Optimization",
        body: "Standard SEO is no longer enough. We engineer your site architecture and llms.txt files so AI models like Gemini and ChatGPT accurately recommend your business to users.",
    },
];

/* ─────────────────────────────────────────────────────────────
   ProcessCard — individual right-column card
───────────────────────────────────────────────────────────── */
/* ─── Corner accent SVG — same L-shape rotated to all 4 corners ─── */
function CornerMark({ className }: { className: string }) {
    return (
        <svg
            className={`absolute size-[9px] pointer-events-none ${className}`}
            width="10" height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
        >
            <path d="M0.5 0.2L0.5 9.2M0.2 0.5L9.2 0.5" stroke="currentColor" strokeWidth="1" />
        </svg>
    );
}

function ProcessCard({
    card,
}: {
    card: (typeof processCards)[number];
}) {
    return (
        <motion.div
            className="group relative px-12 py-12 rounded-[2rem]
                       transition-colors duration-300
                       hover:bg-black/[0.03]"
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Corner accents — opacity-0 at rest, opacity-30 on hover */}
            <CornerMark className="top-4 left-4 rotate-0    text-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CornerMark className="top-4 right-4 rotate-90  text-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CornerMark className="bottom-4 left-4 -rotate-90 text-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CornerMark className="bottom-4 right-4 rotate-180 text-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Counter */}
            <p className="font-heading font-bold text-xs uppercase tracking-[0.25em] mb-6">
                <span className="text-accent text-2xl font-extrabold tracking-[-0.03em] mr-2 leading-none">
                    {card.index}
                </span>
                <span className="text-ink/30">/ 03</span>
            </p>

            {/* Title */}
            <h3 className="text-ink font-heading font-bold text-2xl leading-snug mb-4">
                {card.title}
            </h3>

            {/* Body */}
            <p className="text-slate-500 text-base leading-relaxed">
                {card.body}
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   ProcessSection — Sticky Left / Scrolling Right

   Architecture:
     Left panel  → CSS position: sticky (zero JS cost, browser compositor)
     Card reveal → Framer whileInView (fires on scroll entry per card)
     Progress bar → Framer useScroll scoped to sectionRef

   Mobile: sticky is md:-prefixed — on mobile the left panel
   renders as a normal block header above stacked cards.
   No mobile-specific animation logic required.
───────────────────────────────────────────────────────────── */
export function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);

    /*
      Scroll progress scoped to this section only.
      offset: ["start center", "end center"]
        → 0% when section top hits viewport center
        → 100% when section bottom hits viewport center
      This maps exactly to "user is actively reading this section."
    */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    /* Progress line height: 0% → 100% as user scrolls through section */
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="relative bg-zinc-50 overflow-hidden"
        >

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-0 md:gap-16">

                {/* ── LEFT PANEL — sticky anchor ───────────────────────────
                    top-[72px]: clears the fixed nav (top-6 + height ≈ 72px)
                    h-[calc(100vh-72px)]: fills remaining viewport height
                    flex flex-col justify-center: vertically centers content
                ────────────────────────────────────────────────────────── */}
                <div
                    className="md:w-[38%] shrink-0
                               py-24 md:py-0
                               md:sticky md:top-[72px]
                               md:h-[calc(100vh-72px)]
                               md:flex md:flex-col md:justify-center"
                >
                    {/* Scroll progress indicator — thin accent line on the left edge */}
                    <div className="hidden md:block absolute left-6 top-0 bottom-0 w-[2px] bg-black/[0.08]">
                        <motion.div
                            className="w-full bg-accent origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Left panel content */}
                    <div className="md:pl-6">
                        {/*
                          Left panel uses animate (not whileInView) because
                          the panel is sticky — it stays in the viewport the
                          entire time the user scrolls through the section.
                          whileInView would either fire immediately or not at
                          all depending on scroll position. animate fires once
                          on mount with staggered delays for a clean entrance.
                        */}
                        <motion.p
                            className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-8"
                            variants={labelReveal}
                            initial="hidden"
                            animate="visible"
                        >
                            The Architecture
                        </motion.p>

                        <motion.h2
                            className="font-heading font-extrabold text-ink
                                       text-[clamp(32px,3.5vw,52px)]
                                       tracking-[-0.03em] leading-[1.0] mb-6"
                            variants={headlineReveal}
                            initial="hidden"
                            animate="visible"
                        >
                            Engineered for Speed{" "}
                            <br className="hidden lg:block" />
                            and Automation.
                        </motion.h2>

                        <motion.p
                            className="text-ink/40 text-sm leading-relaxed max-w-xs mb-8"
                            variants={headlineReveal}
                            initial="hidden"
                            animate="visible"
                        >
                            Three systems. Every site we ship runs all of them.
                        </motion.p>

                        {/* Optional CTA */}
                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-accent text-xs
                                       font-bold uppercase tracking-widest
                                       hover:opacity-70 transition-opacity duration-200"
                            variants={headlineReveal}
                            initial="hidden"
                            animate="visible"
                        >
                            Start a project
                            <span aria-hidden="true">→</span>
                        </motion.a>
                    </div>
                </div>

                {/* ── RIGHT PANEL — scrolling cards ────────────────────────
                    Cards enter from the right (x: 40 → 0) as user scrolls.
                    Gap between cards: gap-8 on mobile, gap-12 on desktop.
                ────────────────────────────────────────────────────────── */}
                <div className="md:w-[62%] flex flex-col gap-12 md:gap-20 py-32">
                    {processCards.map((card) => (
                        <ProcessCard key={card.title} card={card} />
                    ))}
                </div>

            </div>
        </section>
    );
}
