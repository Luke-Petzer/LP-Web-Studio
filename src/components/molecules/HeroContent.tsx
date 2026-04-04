"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";
import { ParticleField } from "@/components/atoms/ParticleField";
import { MercuryButton } from "@/components/molecules/MercuryButton";

const lineContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
};

const lineReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 30 },
    },
};

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut", delay: 0.55 },
    },
};

const ctaReveal: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.75 },
    },
};

export function HeroContent() {
    const heroRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const textY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"]
    );

    return (
        <div
            ref={heroRef}
            className="mesh-transition relative min-h-screen overflow-hidden flex items-center"
        >
            {/* ── Layer 0: Grain texture — lighter opacity on light bg ── */}
            <GrainOverlay className="opacity-30" />

            {/* ── Layer 1: Dark ambient particles on light bg ─────────── */}
            <ParticleField color="dark" />

            {/* ── Layer 2: Warm amber radial glow — bottom-right ──────── */}
            <div
                aria-hidden="true"
                className="absolute z-[2] pointer-events-none inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 50% at 80% 70%, rgba(254,176,93,0.12) 0%, transparent 70%)",
                }}
            />

            {/* ── Layer 3: Headline (slow parallax) ─────────────────── */}
            <motion.div
                style={{ y: textY }}
                className="absolute inset-0 z-10 flex flex-col justify-center
                           px-6 md:px-12 lg:px-20"
            >
                <motion.div
                    variants={lineContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl"
                >
                    {/* Label */}
                    <motion.p
                        variants={lineReveal}
                        className="font-mono text-[11px] uppercase tracking-[0.35em] mb-6"
                        style={{ color: "rgba(43,42,42,0.35)" }}
                    >
                        LP Web Studio — Cape Town
                    </motion.p>

                    {/* H1 */}
                    <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.93] text-left">
                        <motion.span
                            variants={lineReveal}
                            className="block text-[clamp(28px,4vw,58px)]"
                            style={{ color: "rgba(43,42,42,0.40)" }}
                        >
                            Stop Running Your Business
                        </motion.span>
                        <motion.span
                            variants={lineReveal}
                            className="block text-accent text-[clamp(46px,7.5vw,108px)]"
                        >
                            on Spreadsheets.
                        </motion.span>
                    </h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-base md:text-lg max-w-lg leading-relaxed mt-12 mb-12"
                        style={{ color: "rgba(43,42,42,0.55)" }}
                    >
                        We engineer custom B2B ordering portals and automated SaaS systems for scaling businesses.{" "}
                        <span style={{ color: "#2B2A2A" }} className="font-medium">
                            High-performance infrastructure designed to eliminate manual admin.
                        </span>
                    </motion.p>

                    {/* CTA row */}
                    <motion.div
                        variants={ctaReveal}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col md:flex-row items-start md:items-center gap-4"
                    >
                        <MercuryButton
                            primaryText="Book a Systems Architecture Call"
                            primaryHref="#contact"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── Scroll indicator ─────────────────────────────────────── */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
                           flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: "rgba(43,42,42,0.25)" }}
                >
                    Scroll
                </span>
                <motion.div
                    className="w-[1px] h-8"
                    style={{ background: "linear-gradient(to bottom, rgba(43,42,42,0.20), transparent)" }}
                    animate={shouldReduceMotion ? {} : { scaleY: [1, 0.3, 1], originY: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}
