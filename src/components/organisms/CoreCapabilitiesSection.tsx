"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

/* ─────────────────────────────────────────────────────────────
   UX: prefers-reduced-motion respected globally in this component
   via useReducedMotion() — all spring/layout animations are
   disabled or instant when the user has this preference set.
───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   Capability data
   Each column has: index, title, body, a unique color palette,
   and a geometric SVG gesture (dot-matrix / abstract form).
───────────────────────────────────────────────────────────── */
type Capability = {
    index: string;
    title: string;
    body: string;
    bg: string;           // column background
    textPrimary: string;  // title + counter color
    textBody: string;     // body copy color
    borderColor: string;  // separator between columns
    gesture: React.ReactNode;
};

/* Geometric SVG gestures — distinct per column, ~opacity-[0.12] */
const ConcentricRings = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {[20, 45, 70, 95, 120].map((r) => (
            <circle
                key={r}
                cx="100" cy="100" r={r}
                stroke="white" strokeWidth="1"
                strokeDasharray="2 6"
            />
        ))}
        <circle cx="100" cy="100" r="6" fill="white" fillOpacity="0.4" />
    </svg>
);

const DiagonalGrid = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {Array.from({ length: 9 }).map((_, i) => (
            <line
                key={i}
                x1={-20 + i * 30} y1="0"
                x2={180 + i * 30 - 200} y2="200"
                stroke="white" strokeWidth="1" strokeOpacity="0.6"
            />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
            <line
                key={`r${i}`}
                x1={220 - i * 30} y1="0"
                x2={20 - i * 30 + 200} y2="200"
                stroke="white" strokeWidth="1" strokeOpacity="0.3"
            />
        ))}
    </svg>
);

const RadiatingSpokes = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x2 = 100 + Math.cos(angle) * 90;
            const y2 = 100 + Math.sin(angle) * 90;
            return (
                <line key={i} x1="100" y1="100" x2={x2} y2={y2}
                    stroke="white" strokeWidth="1" strokeOpacity={i % 2 === 0 ? 0.7 : 0.3} />
            );
        })}
        <circle cx="100" cy="100" r="8" fill="white" fillOpacity="0.5" />
        <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
);

const DotMatrix = () => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
                <rect
                    key={`${row}-${col}`}
                    x={12 + col * 25} y={12 + row * 25}
                    width="4" height="4"
                    rx="1"
                    fill="#1a1a1a"
                    fillOpacity={((row + col) % 3 === 0) ? 0.5 : 0.2}
                />
            ))
        )}
    </svg>
);

const capabilities: Capability[] = [
    {
        index: "01",
        title: "Custom Next.js Applications",
        body: "Brand new, hand-coded web applications built on React and Next.js. Engineered from the ground up for sub-second load times and maximum conversion. No templates. No bloat.",
        bg: "#0A0A0A",
        textPrimary: "text-white",
        textBody: "text-white/50",
        borderColor: "border-white/[0.06]",
        gesture: <ConcentricRings />,
    },
    {
        index: "02",
        title: "B2B Wholesale Portals",
        body: "End-to-end ordering systems for manufacturers and distributors. Give your clients a secure portal for live pricing, automated ordering, and real-time WhatsApp notifications via n8n. Zero manual data entry.",
        bg: "#131313",
        textPrimary: "text-white",
        textBody: "text-white/50",
        borderColor: "border-white/[0.06]",
        gesture: <DiagonalGrid />,
    },
    {
        index: "03",
        title: "Technical SEO & Architecture",
        body: "We implement strict JSON-LD schema, semantic HTML, and Core Web Vitals optimisations — then engineer your site architecture and llms.txt so AI models like Gemini and ChatGPT accurately recommend your business.",
        bg: "#2B2A2A",
        textPrimary: "text-white",
        textBody: "text-white/70",
        borderColor: "border-white/[0.1]",
        gesture: <RadiatingSpokes />,
    },
    {
        index: "04",
        title: "n8n Business Automations",
        body: "Stop doing manual admin. We build custom API pipelines using n8n that automatically capture, enrich, and route your website leads directly to your CRM or WhatsApp.",
        bg: "#F4F4F2",
        textPrimary: "text-[#0A0A0A]",
        textBody: "text-[#0A0A0A]/50",
        borderColor: "border-black/[0.06]",
        gesture: <DotMatrix />,
    },
];

/* ─────────────────────────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────────────────────────── */
const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 180, damping: 28 },
    },
};

const bodyReveal: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.22, ease: "easeOut" },
    },
    exit: {
        opacity: 0, y: 4,
        transition: { duration: 0.12, ease: "easeIn" },
    },
};

/* ─────────────────────────────────────────────────────────────
   CapabilityColumn — single accordion panel
───────────────────────────────────────────────────────────── */
function CapabilityColumn({
    cap,
    index,
    isActive,
    onActivate,
    reducedMotion,
}: {
    cap: Capability;
    index: number;
    isActive: boolean;
    onActivate: (i: number | null) => void;
    reducedMotion: boolean;
}) {
    const handleToggle = useCallback(() => {
        onActivate(isActive ? null : index);
    }, [isActive, index, onActivate]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
            }
        },
        [handleToggle]
    );

    return (
        <motion.div
            layout={!reducedMotion}
            className={`
                relative flex flex-col justify-between overflow-hidden
                border-r last:border-r-0 ${cap.borderColor}
                cursor-pointer select-none
                min-h-[520px] md:min-h-[620px]
                w-full
            `}
            style={{
                backgroundColor: cap.bg,
            }}
            animate={
                isActive
                    ? { boxShadow: "inset 0 0 60px rgba(254,176,93,0.08)" }
                    : { boxShadow: "none" }
            }
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            role="button"
            aria-expanded={isActive}
            aria-label={`${cap.title} — capability ${cap.index}`}
            tabIndex={0}
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 300, damping: 35 }
            }
            whileHover={reducedMotion ? {} : { filter: "brightness(1.06)" }}
        >
            {/* Grain on dark columns only */}
            {index !== 3 && <GrainOverlay className="opacity-40" />}

            {/* Geometric gesture — center of column, acts as ambient illustration */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: isActive ? 0.18 : 0.1 }}
            >
                <div className="w-56 h-56 md:w-72 md:h-72 transition-opacity duration-500">
                    {cap.gesture}
                </div>
            </div>

            {/* Content — flex-col, space-between fills column height */}
            <div className="relative z-10 flex flex-col justify-between h-full p-10 md:p-12 gap-8">

                {/* TOP: counter */}
                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${cap.textPrimary} opacity-40`}>
                    {cap.index} / 04
                </p>

                {/* BOTTOM: title + body */}
                <div>
                    <h3
                        className={`
                            font-heading font-black leading-tight
                            ${isActive ? "text-2xl md:text-3xl mb-4" : "text-xl md:text-2xl mb-0"}
                            ${cap.textPrimary}
                            transition-all duration-300
                        `}
                    >
                        {cap.title}
                    </h3>

                    {/* Body — only visible when active. AnimatePresence handles mount/unmount. */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.p
                                className={`text-sm leading-relaxed ${cap.textBody}`}
                                variants={bodyReveal}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {cap.body}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Expand hint — visible only when collapsed */}
                    <AnimatePresence>
                        {!isActive && (
                            <motion.p
                                className={`text-[10px] uppercase tracking-widest font-bold mt-3 ${cap.textPrimary} opacity-30`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                            >
                                Tap to expand
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   CoreCapabilitiesSection — Horizontal Accordion (desktop)
                             Vertical Accordion (mobile)
───────────────────────────────────────────────────────────── */
export function CoreCapabilitiesSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const reducedMotion = useReducedMotion() ?? false;

    const handleActivate = useCallback((i: number | null) => {
        setActiveIndex(i);
    }, []);

    return (
        <section id="capabilities" className="bg-void overflow-hidden">

            {/* Section header — sits above the accordion columns */}
            <div className="relative px-6 md:px-10 lg:px-16 pt-32 pb-20 max-w-7xl mx-auto">
                <GrainOverlay className="opacity-40" />

                <div className="relative z-10">
                    <motion.p
                        className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-5"
                        variants={sectionReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        Capabilities
                    </motion.p>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <motion.h2
                            className="font-heading font-extrabold text-white
                                       text-[clamp(32px,4vw,56px)]
                                       tracking-[-0.03em] leading-[0.95] max-w-2xl"
                            variants={sectionReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            High-Performance Engineering.{" "}
                            <span className="text-accent">Zero Bloat.</span>
                        </motion.h2>

                        <motion.p
                            className="text-white/40 text-sm leading-relaxed max-w-xs md:text-right"
                            variants={sectionReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            Select a capability to learn more.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP: Horizontal accordion ───────────────────────── */}
            <div className="hidden md:flex w-full" aria-label="Core capabilities">
                {capabilities.map((cap, i) => (
                    <motion.div
                        key={cap.index}
                        layout={!reducedMotion}
                        style={{
                            flexGrow: activeIndex === i ? 2.5 : 1,
                            flexShrink: 1,
                            flexBasis: "0%",
                        }}
                        transition={
                            reducedMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 300, damping: 35 }
                        }
                        className="relative"
                    >
                        <CapabilityColumn
                            cap={cap}
                            index={i}
                            isActive={activeIndex === i}
                            onActivate={handleActivate}
                            reducedMotion={reducedMotion}
                        />
                    </motion.div>
                ))}
            </div>

            {/* ── MOBILE: Vertical accordion ─────────────────────────── */}
            <div className="flex md:hidden flex-col" aria-label="Core capabilities">
                {capabilities.map((cap, i) => (
                    <CapabilityColumn
                        key={cap.index}
                        cap={cap}
                        index={i}
                        isActive={activeIndex === i}
                        onActivate={handleActivate}
                        reducedMotion={reducedMotion}
                    />
                ))}
            </div>

            {/* Bottom padding spacer */}
            <div className="h-32 bg-void" />
        </section>
    );
}
