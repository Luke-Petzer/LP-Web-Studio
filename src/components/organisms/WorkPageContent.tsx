"use client";

import { motion, type Variants } from "framer-motion";
import { Gauge, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Project Data (from SITE_CONTENT.md) ─── */
const projects = [
    {
        id: "nova-studio",
        title: "Nova Studio",
        category: "Agency Demo",
        score: "91/100",
        challenge: "Creating a premium visual experience that doesn't compromise on technical SEO performance.",
        solution: "Implementing Tailwind v4 with optimized Next.js image components and CSS-native masking.",
        result: "91/100 Mobile Performance. Demonstrates that high-end editorial design can load in under 1 second.",
        stack: ["Next.js 15", "Tailwind v4", "Vercel"],
        gradient: "from-blue-500/20 to-transparent",
        screenshot: "/nova-studio.webp",
    },
    {
        id: "cafe-crave",
        title: "Cafe Crave",
        category: "Hospitality",
        score: "93/100",
        challenge: "Cafe Crave needed to bypass delivery apps and own their customer data directly.",
        solution: "A custom Next.js build with direct Google Reviews API integration and optimized menu rendering.",
        result: "93/100 Mobile Score. Engineered to bypass the 3-second abandonment threshold that kills 53% of mobile traffic.",
        stack: ["Next.js", "Tailwind", "Railway"],
        gradient: "from-accent/20 to-transparent",
        screenshot: "/cafe-crave.webp",
    },
    {
        id: "big-six",
        title: "The Big Six",
        category: "Branding",
        score: "95/100",
        challenge: "Preserving a classic aesthetic while ensuring modern web accessibility and responsive flow.",
        solution: "Custom CSS masking to solve typography clashes and automated image optimization for 4K assets.",
        result: "95/100 Performance. Proves that immersive storytelling doesn't have to be 'heavy' or slow.",
        stack: ["React", "Tailwind CSS", "Vercel"],
        gradient: "from-amber-600/20 to-transparent",
        screenshot: "/big-six.webp",
    },
];

export function WorkPageContent() {
    return (
        <section className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-6">
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
                <h1 className="text-ink text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-4">
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
                        animate="visible"
                        transition={{ delay: i * 0.1 }}
                    >
                        {/* Gradient accent strip */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
                        />

                        <div className="relative z-10 p-8 md:p-16 flex flex-col lg:flex-row gap-12">
                            {/* Left: Metadata */}
                            <div className="flex-1">
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
                                <div className="space-y-6 mb-8">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
                                            The Challenge
                                        </h3>
                                        <p className="text-slate leading-relaxed text-sm">
                                            {project.challenge}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
                                            The Solution
                                        </h3>
                                        <p className="text-slate leading-relaxed text-sm">
                                            {project.solution}
                                        </p>
                                    </div>
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

                            {/* Right: Screenshot Preview */}
                            <div className="flex-1">
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-zinc-100">
                                    <Image
                                        src={project.screenshot}
                                        alt={`${project.title} desktop preview`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 600px"
                                        className="object-cover object-top"
                                        quality={90}
                                        priority={i === 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
