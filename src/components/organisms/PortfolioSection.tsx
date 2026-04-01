"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Animation — FIXED
   Was: y: 0 in hidden (no movement), animate="visible" (fires on mount)
   Now: y: 18 rise, whileInView fires on scroll entry
───────────────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

/* ─── Project Data ─── */
const projects = [
    {
        id: "nova-studio",
        category: "Creative Agency",
        title: "Nova Studio",
        description:
            "A high-performance digital architecture demo featuring glassmorphism and sub-second load times.",
        gradient: "from-blue-500/20 to-transparent",
        bg: "bg-[#0A0C10]",
        screenshot: "/nova-studio.webp",
        liveUrl: "https://design-architecture-1.lpwebstudio.co.za",
    },
    {
        id: "cafe-crave",
        category: "Full-Stack",
        title: "Cafe Crave",
        description:
            "Custom React build for a local eatery, featuring a live Google Reviews API and optimized mobile conversion.",
        gradient: "from-white/10 to-transparent",
        bg: "bg-void",
        screenshot: "/cafe-crave.webp",
        liveUrl: "https://cafecravecpt.co.za",
    },
    {
        id: "big-six",
        category: "Editorial Design",
        title: "The Big Six",
        description:
            "A premium restoration story landing page focused on immersive typography and smooth visual masking.",
        gradient: "from-amber-600/20 to-transparent",
        bg: "bg-[#F5F5F0]",
        screenshot: "/big-six.webp",
        liveUrl: "https://thebigsix.lpwebstudio.co.za",
    },
];

export function PortfolioSection() {
    const [activeIndex, setActiveIndex] = useState(1);

    return (
        <section id="work" className="relative bg-white py-24 md:py-32 min-h-[600px] lg:min-h-[900px]">

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-16">
                <motion.p
                    className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Portfolio
                </motion.p>

                {/* FIXED: clamp() fluid scale, font-black, tight tracking */}
                <motion.h2
                    className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                               text-[clamp(32px,4vw,56px)] text-ink"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Selected Work
                </motion.h2>

                <motion.p
                    className="text-slate-400 text-sm leading-relaxed max-w-xs mt-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...spring, delay: 0.1 }}
                >
                    Three builds. Three industries. One standard.
                </motion.p>
            </div>

            {/* ─── Mobile: Scroll-snap carousel ─── */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8
                            max-w-7xl mx-auto md:hidden
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className={`relative shrink-0 w-[85vw] sm:w-[350px] snap-center
                                   ${project.bg} rounded-[2rem] shadow-2xl flex flex-col overflow-hidden`}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...spring, delay: i * 0.08 }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 pointer-events-none`} />

                        <div className="relative w-full aspect-video overflow-hidden">
                            <Image
                                src={project.screenshot}
                                alt={`${project.title} website screenshot`}
                                fill
                                sizes="(max-width: 768px) 85vw, 350px"
                                className="object-cover object-top"
                                quality={90}
                                priority={i === 0}
                            />
                        </div>

                        <div className="relative z-20 p-6 flex flex-col gap-2 flex-1">
                            {/* ACCENT AUDIT: category label → white/50 (decorative, not CTA) */}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                                {project.category}
                            </span>
                            <h3 className="text-2xl font-heading font-bold text-white">
                                {project.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed flex-1">
                                {project.description}
                            </p>
                            {/* ACCENT AUDIT: link → white/70 (not a CTA button) */}
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3
                                           px-5 py-2.5 rounded-full border border-white/20
                                           bg-white/10 hover:bg-white/20
                                           text-white text-xs font-bold uppercase tracking-widest
                                           transition-all duration-200 cursor-pointer self-start"
                            >
                                View Live Site
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ─── Desktop: Overlapping card deck ─── */}
            <div className="hidden md:flex relative h-[680px] items-center justify-center px-6 overflow-hidden">
                <div className="relative w-full max-max-6xl h-full flex items-center justify-center">
                    {projects.map((project, i) => {
                        const offset = i - activeIndex;
                        const isActive = i === activeIndex;

                        return (
                            <motion.div
                                key={project.id}
                                className={`absolute w-[450px] h-[500px] ${project.bg}
                                           rounded-[2rem] shadow-2xl flex flex-col overflow-hidden cursor-pointer`}
                                animate={{
                                    x: offset * 180,
                                    rotateY: offset * 5,
                                    scale: isActive ? 1 : 0.87,
                                    zIndex: isActive ? 10 : 0,
                                    opacity: Math.abs(offset) > 1 ? 0.5 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => setActiveIndex(i)}
                                style={{ perspective: 800 }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />

                                <div className="relative w-full aspect-video overflow-hidden">
                                    <Image
                                        src={project.screenshot}
                                        alt={`${project.title} website screenshot`}
                                        fill
                                        sizes="450px"
                                        className="object-cover object-top"
                                        quality={90}
                                        priority={i === 0}
                                    />
                                </div>

                                <div className="relative z-20 p-6 flex flex-col gap-2 flex-1">
                                    {/* ACCENT AUDIT: category label → white/50 */}
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-heading font-bold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed flex-1">
                                        {project.description}
                                    </p>
                                    {isActive && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-white/70
                                                       text-xs font-bold uppercase tracking-widest
                                                       hover:text-white transition-colors duration-200 mt-2"
                                        >
                                            View Live Site
                                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
