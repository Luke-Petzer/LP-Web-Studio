"use client";

import { motion, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

/* ─────────────────────────────────────────────────────────────
   Framer Motion Variants
   Total reveal duration: ~650ms (label → line 1 → line 2 → sub-copy)
───────────────────────────────────────────────────────────── */

/** Stagger container — orchestrates all children */
const container: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
};

/** Label: pure opacity, no Y travel — arrives like a whisper */
const labelIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

/** Headline lines: 16px upward rise + opacity */
const lineReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 30 },
    },
};

/** Sub-copy: delayed fade-rise, arrives after headline settles */
const subIn: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.35 },
    },
};

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */

/**
 * ConfidentIntermission — Atmospheric Pause Section
 *
 * A high-contrast editorial interlude between CoreCapabilities and Portfolio.
 * 15% content / 85% negative space. The restraint is the message.
 *
 * Page placement (page.tsx):
 *   <CoreCapabilitiesSection />
 *   <ConfidentIntermission />      ← insert here
 *   <PortfolioSection />
 *
 * To update copy: edit the three text constants below.
 */

const LABEL = "The Standard";

const HEADLINE_LINE_1 = "Hand-Coded Performance.";
const HEADLINE_LINE_2 = "Zero Compromise.";

const SUB_COPY =
    "We don't use templates. We don't use WordPress. Every site we ship is custom-engineered, benchmarked, and guaranteed to score 90+ on Google PageSpeed before it goes live.";

export function ConfidentIntermission() {
    return (
        <section
            id="intermission"
            /* min-h-[85vh]: deep breath — not a full wall, not a thin band */
            className="relative bg-void min-h-[85vh] flex items-center justify-center px-6 overflow-hidden"
        >
            {/* Grain texture — slightly heavier than hero to feel more tactile */}
            <GrainOverlay className="opacity-60" />

            {/* Radial center glow — makes the void feel intentional, not empty */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Content block — centered, max-w-4xl contains the type mass */}
            <motion.div
                className="relative z-10 max-w-4xl w-full mx-auto text-center"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {/* Accent rule — anchors the content block visually */}
                <motion.div
                    variants={labelIn}
                    aria-hidden="true"
                    className="w-12 h-[2px] bg-accent mx-auto mb-8"
                />

                {/* Label */}
                <motion.p
                    variants={labelIn}
                    className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-8 inline-block"
                >
                    {LABEL}
                </motion.p>

                {/* Display headline — two lines, per-line stagger */}
                {/*
                  clamp(40px, 6.5vw, 88px):
                    mobile (375px) → ~40px
                    tablet (768px) → ~50px
                    desktop (1280px) → ~83px
                    large (1440px) → 88px cap
                */}
                <h2
                    className="font-heading font-extrabold tracking-[-0.04em] leading-[0.92]
                               text-[clamp(40px,6.5vw,88px)] mb-14"
                >
                    <motion.span
                        variants={lineReveal}
                        className="block text-white"
                    >
                        {HEADLINE_LINE_1}
                    </motion.span>
                    <motion.span
                        variants={lineReveal}
                        className="block text-white/60"
                    >
                        {HEADLINE_LINE_2}
                    </motion.span>
                </h2>

                {/* Sub-copy — constrained width so it reads as a discrete thought */}
                <motion.p
                    variants={subIn}
                    className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
                >
                    {SUB_COPY}
                </motion.p>
            </motion.div>
        </section>
    );
}
