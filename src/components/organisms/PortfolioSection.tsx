"use client";

import { useState } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ─── Spring ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring,
    },
};

/* ─── Project Data ─── */
const projects = [
    {
        id: "cafe-crave",
        category: "Full-Stack",
        title: "Cafe Crave",
        description:
            "Full-stack website with live Google Reviews API and 93/100 PageSpeed score.",
        gradient: "from-accent/20 to-transparent",
        bg: "bg-void",
        screenshot: "/cc-home.png",
        liveUrl: "https://cafecrave.co.za",
    },
    {
        id: "pending-project",
        category: "[PENDING_DATA]",
        title: "[PENDING_DATA]",
        description: "[PENDING_DATA]",
        gradient: "from-purple-500/20 to-transparent",
        bg: "bg-zinc-900",
        screenshot: "/cc-home.png",
        liveUrl: "#",
    },
    {
        id: "green-scape",
        category: "Design",
        title: "Green Scape",
        description:
            "Nature-inspired website design for landscaping with before/after galleries.",
        gradient: "from-blue-400/20 to-transparent",
        bg: "bg-slate-900",
        screenshot: "/Home-Page.png",
        liveUrl: "https://green-scape-theta.vercel.app",
    },
];

export function PortfolioSection() {
    const [activeIndex, setActiveIndex] = useState(1);
    const shouldReduceMotion = useReducedMotion();

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section id="work" className="relative bg-white py-structural">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-component">
                <motion.p
                    className="text-accent font-bold text-xs uppercase tracking-widest mb-4"
                    variants={fadeUp}
                    initial={shouldReduceMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    Portfolio
                </motion.p>
                <motion.h2
                    className="text-ink text-4xl md:text-5xl font-heading font-extrabold tracking-tight"
                    variants={fadeUp}
                    initial={shouldReduceMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    Selected Work
                </motion.h2>
            </div>

            {/* ─── Mobile: Scroll-snap carousel ─── */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 max-w-7xl mx-auto md:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className={`relative shrink-0 w-[85vw] sm:w-[350px] snap-center ${project.bg} rounded-[2rem] shadow-2xl flex flex-col overflow-hidden`}
                        variants={fadeUp}
                        initial={shouldReduceMotion ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ ...spring, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                    >
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10 pointer-events-none`} />

                        {/* Screenshot — responsive aspect ratio */}
                        <div className="relative w-full aspect-video overflow-hidden">
                            <Image
                                src={project.screenshot}
                                alt={`${project.title} website screenshot`}
                                fill
                                sizes="(max-width: 768px) 85vw, 350px"
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Text content */}
                        <div className="relative z-20 p-6 flex flex-col gap-2 flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                                {project.category}
                            </span>
                            <h3 className="text-2xl font-heading font-bold text-white">
                                {project.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed flex-1">
                                {project.description}
                            </p>
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity mt-2"
                            >
                                View Live Site
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ─── Desktop: Overlapping card deck ─── */}
            <div className="hidden md:flex relative h-[600px] items-center justify-center px-6 overflow-hidden">
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                    {projects.map((project, i) => {
                        const offset = i - activeIndex;
                        const isActive = i === activeIndex;

                        return (
                            <motion.div
                                key={project.id}
                                className={`absolute w-[450px] h-[500px] ${project.bg} rounded-[2rem] shadow-2xl flex flex-col overflow-hidden cursor-pointer`}
                                animate={{
                                    x: offset * 120,
                                    scale: isActive ? 1 : 0.9,
                                    zIndex: isActive ? 10 : 0,
                                    opacity: Math.abs(offset) > 1 ? 0.3 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                onClick={() => handleCardClick(i)}
                            >
                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />

                                {/* Screenshot image — top 60% */}
                                <div className="relative w-full h-[60%] overflow-hidden">
                                    <Image
                                        src={project.screenshot}
                                        alt={`${project.title} website screenshot`}
                                        fill
                                        sizes="450px"
                                        className="object-cover object-top"
                                    />
                                </div>

                                {/* Text content — bottom 40% */}
                                <div className="relative z-20 p-6 flex flex-col gap-2 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
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
                                            className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity mt-2"
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
