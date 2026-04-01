"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";
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

function GhostGeometry() {
    return (
        <svg
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-full h-full"
        >
            {[280, 240, 200, 160, 120, 80, 44].map((r, i) => (
                <circle
                    key={r}
                    cx="300" cy="300" r={r}
                    stroke="white"
                    strokeWidth={i === 0 ? 0.5 : 0.75}
                    strokeDasharray={i % 2 === 0 ? "3 8" : "1 12"}
                    strokeOpacity={0.9 - i * 0.08}
                />
            ))}
            {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const x2 = 300 + Math.cos(angle) * 278;
                const y2 = 300 + Math.sin(angle) * 278;
                return (
                    <line
                        key={i}
                        x1="300" y1="300"
                        x2={x2} y2={y2}
                        stroke="white"
                        strokeWidth="0.5"
                        strokeOpacity={i % 3 === 0 ? 0.6 : 0.2}
                    />
                );
            })}
            <circle cx="300" cy="300" r="6" fill="white" fillOpacity="0.5" />
            <circle cx="300" cy="300" r="14" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
    );
}

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
    const objectY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? ["0%", "0%"] : ["0%", "42%"]
    );

    return (
        <div
            ref={heroRef}
            className="mesh-transition relative min-h-screen overflow-hidden flex items-center"
        >
            {/* ── Layer 0: Grain texture ─────────────────────────────── */}
            <GrainOverlay className="opacity-55" />

            {/* ── Layer 0.5: Right-side radial accent glow ──────────── */}
            <div
                aria-hidden="true"
                className="absolute z-[5] pointer-events-none
                           right-[-5vw] top-1/2 -translate-y-1/2
                           w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(30,64,175,0.18) 0%, transparent 70%)",
                }}
            />

            {/* ── Layer 1: Headline (z-10, slow parallax) ────────────── */}
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
                        className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-8"
                    >
                        Precision Engineering
                    </motion.p>

                    {/*
                      H1 — two lines with different scales.
                      Line 1: smaller — sets the stage
                      Line 2: 1.4× larger — the statement
                    */}
                    <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.93] text-left">
                        <motion.span
                            variants={lineReveal}
                            className="block text-white text-[clamp(28px,4vw,58px)]"
                        >
                            Your Website is
                        </motion.span>
                        <motion.span
                            variants={lineReveal}
                            className="block text-accent text-[clamp(46px,7.5vw,108px)]"
                        >
                            Leaking Revenue.
                        </motion.span>
                    </h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-white/50 text-base md:text-lg
                                   max-w-sm leading-relaxed mt-8 mb-10"
                    >
                        Custom-engineered React applications.{" "}
                        <span className="text-accent font-semibold">Guaranteed 90+ PageSpeed.</span>
                    </motion.p>

                    {/* CTA row */}
                    <motion.div
                        variants={ctaReveal}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col md:flex-row items-start md:items-center gap-4"
                    >
                        <MercuryButton />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── Layer 2: Ghost geometry (z-20, fast parallax) ────────── */}
            <motion.div
                style={{ y: objectY }}
                className="absolute z-20 pointer-events-none
                           right-[-8vw] md:right-[-4vw] lg:right-[0vw]
                           top-1/2 -translate-y-1/2
                           w-[55vw] md:w-[46vw] lg:w-[40vw]
                           max-w-[640px]
                           opacity-[0.14]"
            >
                <GhostGeometry />
            </motion.div>

            {/* ── Scroll indicator ─────────────────────────────────────── */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
                           flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <span className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold">
                    Scroll
                </span>
                <motion.div
                    className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
                    animate={shouldReduceMotion ? {} : {
                        scaleY: [1, 0.3, 1],
                        originY: 0,
                    }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}
