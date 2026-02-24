"use client";

import { motion, type Variants } from "framer-motion";
import { Gauge, Zap, ArrowUpRight } from "lucide-react";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Project Data (from SITE_CONTENT.md) ─── */
const projects = [
    {
        id: "cafe-crave",
        title: "Cafe Crave",
        category: "Full-Stack",
        score: "93/100",
        challenge:
            "Cafe Crave needed to bypass delivery apps and own their customer data.",
        solution:
            "A custom Next.js build with direct Google Reviews API integration.",
        result: "93/100 Mobile Performance Score. Engineered to bypass the 3-second abandonment threshold that kills 53% of mobile traffic. Ensures zero lead drop-off on mobile networks.",
        stack: ["Next.js", "Tailwind", "Railway"],
        gradient: "from-accent/20 to-transparent",
    },
    {
        id: "pending-project",
        title: "[PENDING_DATA]",
        category: "[PENDING_DATA]",
        score: "[PENDING_DATA]",
        challenge: "[PENDING_DATA]",
        solution: "[PENDING_DATA]",
        result: "[PENDING_DATA]",
        stack: ["[PENDING_DATA]"],
        gradient: "from-purple-500/20 to-transparent",
    },
    {
        id: "lp-web-studio",
        title: "LP Web Studio",
        category: "Internal",
        score: "100/100",
        challenge:
            "Proving that custom code beats WordPress every time.",
        solution: null,
        result:
            "You are looking at it. 100/100 Performance Score. 0.8s Load Time.",
        stack: ["Next.js 15", "Tailwind CSS", "Framer Motion", "Vercel"],
        gradient: "from-blue-400/20 to-transparent",
    },
];

export function WorkPageContent() {
    return (
        <section className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
                className="text-center mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                    Portfolio
                </p>
                <h1 className="text-ink text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-4">
                    We Don&apos;t Just Build.{" "}
                    <span className="text-accent">We Benchmark.</span>
                </h1>
                <p className="text-slate text-lg max-w-xl mx-auto">
                    Real businesses. Custom React code. Vercel deployments. Sub-second load times.
                </p>
            </motion.div>

            {/* Project Grid */}
            <div className="grid gap-structural">
                {projects.map((project, i) => (
                    <motion.article
                        key={project.id}
                        className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all group"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {/* Gradient accent strip */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
                        />

                        <div className="relative z-10 p-12 md:p-16">
                            {/* Top Row: Category + Score */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-accent text-[10px] font-bold uppercase tracking-widest">
                                    {project.category}
                                </span>
                                <div className="flex items-center gap-2 bg-void text-white px-4 py-2 rounded-full">
                                    <Gauge className="w-4 h-4 text-accent" strokeWidth={2} />
                                    <span className="text-sm font-heading font-bold">
                                        {project.score}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-ink text-3xl md:text-4xl font-heading font-extrabold tracking-tight mb-8">
                                {project.title}
                            </h2>

                            {/* Challenge / Solution / Result */}
                            <div className="grid md:grid-cols-3 gap-8 mb-8">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
                                        The Challenge
                                    </h3>
                                    <p className="text-slate leading-relaxed text-sm">
                                        {project.challenge}
                                    </p>
                                </div>
                                {project.solution && (
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
                                            The Solution
                                        </h3>
                                        <p className="text-slate leading-relaxed text-sm">
                                            {project.solution}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                                        The Result
                                    </h3>
                                    <p className="text-ink leading-relaxed text-sm font-medium">
                                        {project.result}
                                    </p>
                                </div>
                            </div>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] font-bold uppercase tracking-widest text-slate bg-zinc-100 px-3 py-1.5 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
