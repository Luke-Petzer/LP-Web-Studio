"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ─── Spring ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring,
    },
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
        gradient: "from-accent/20 to-transparent",
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

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section id="work" className="relative bg-white py-structural min-h-[600px] lg:min-h-[800px]">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-component">
                <motion.p
                    className="text-accent font-bold text-xs uppercase tracking-widest mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                >
                    Portfolio
                </motion.p>
                <motion.h2
                    className="text-ink text-4xl md:text-5xl font-heading font-extrabold tracking-tight"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
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
                        initial="hidden"
                        animate="visible"
                        transition={{ ...spring, delay: i * 0.1 }}
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
                                quality={90}
                                priority={i === 0}
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
                <div className="relative w-full max-max-6xl h-full flex items-center justify-center">
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

                                {/* Screenshot image — top half with aspect-video */}
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

                                {/* Text content — remaining space */}
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
