"use client";

import { motion, type Variants } from "framer-motion";
import {
    Zap,
    Palette,
    Globe,
    Database,
    User,
    Code2,
    Gauge,
} from "lucide-react";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Tech Stack ─── */
const techStack = [
    {
        icon: Zap,
        name: "Next.js 15",
        description:
            "The Ferrari of web frameworks. Renders before the user clicks.",
    },
    {
        icon: Palette,
        name: "Tailwind CSS",
        description:
            'Pixel-perfect design without the "heavy" code.',
    },
    {
        icon: Globe,
        name: "Vercel Edge Network",
        description:
            "Global CDN hosting. Your site lives in Cape Town, not a server in Texas.",
    },
    {
        icon: Database,
        name: "Supabase",
        description:
            "Enterprise-grade databases for real customer data.",
    },
    {
        icon: Code2,
        name: "n8n & Gemini 2.0",
        description:
            "Autonomous pipelines that audit leads, enrich data, and route high-value targets to your sales channels.",
    },
    {
        icon: Gauge,
        name: "Generative Engine Optimization",
        description:
            "Structuring data so LLMs natively understand and recommend your services.",
    },
];

/* ─── Why Work With Me ─── */
const reasons = [
    {
        icon: User,
        title: "Direct Access",
        description: "You speak to Luke Petzer (the developer), not a sales rep.",
    },
    {
        icon: Code2,
        title: "Code Ownership",
        description: "You own the repository. No lock-in.",
    },
    {
        icon: Gauge,
        title: "Speed Guarantee",
        description: "If I build it, it scores 90+.",
    },
];

export function AboutPageContent() {
    return (
        <section className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                    About
                </p>
                <h1 className="text-ink text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-4">
                    Cape Town&apos;s{" "}
                    <span className="text-accent">Performance-First</span> Developer.
                </h1>
                <p className="text-slate text-lg">
                    I build what page-builders can&apos;t.
                </p>
            </motion.div>

            {/* Architect Profile — Terminal Bio Card */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <div className="rounded-[2rem] bg-void overflow-hidden border border-white/5">
                    {/* Terminal chrome bar */}
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/3">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                        <span className="ml-4 text-white/30 text-xs font-mono">
                            architect.profile — zsh
                        </span>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <p className="text-accent font-mono text-xs mb-4">
                            $ whoami
                        </p>
                        <h2 className="text-white text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-6">
                            The Architect:{" "}
                            <span className="text-accent">Luke Petzer</span>
                        </h2>
                        <p className="text-white/60 leading-relaxed max-w-3xl">
                            I don&apos;t run a bloated agency. I am a senior technical architect
                            operating out of Cape Town. I manage the entire infrastructure
                            stack&mdash;from the Next.js React codebase to the n8n autonomous
                            pipelines. You speak directly to the engineer building your business
                            engine.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {["Next.js 15", "React", "n8n", "Vercel Edge", "Supabase", "Framer Motion"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Philosophy — Anti-WordPress */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                    The Philosophy
                </h2>
                <blockquote className="relative pl-8 border-l-4 border-accent mb-8">
                    <p className="text-ink text-lg leading-relaxed italic">
                        &ldquo;Most agencies sell you a pre-packaged template and charge you a monthly fee to press &lsquo;update&rsquo;. We build custom software.&rdquo;
                    </p>
                </blockquote>
                <p className="text-slate leading-relaxed">
                    I believe in <strong className="text-ink">hand-coded performance</strong>.
                    No drag-and-drop bloat. No plugin security vulnerabilities. Just clean, semantic
                    Next.js code that scores 90+ on Google PageSpeed Insights&mdash;guaranteed.
                </p>
            </motion.div>

            {/* Tech Stack Grid */}
            <motion.div
                className="mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                    The Engine
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sectional">
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="p-8 rounded-[2rem] border border-black/5 bg-zinc-50 hover:border-accent hover:shadow-lg transition-all"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: i * 0.08 }}
                        >
                            <tech.icon
                                className="w-8 h-8 text-accent mb-4"
                                strokeWidth={1.5}
                            />
                            <h3 className="text-ink text-lg font-heading font-bold mb-2">
                                {tech.name}
                            </h3>
                            <p className="text-slate text-sm leading-relaxed">
                                {tech.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Why Work With Me */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                    Why Work With Me?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-sectional">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={reason.title}
                            className="p-8 rounded-[2rem] bg-void text-white"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: i * 0.1 }}
                        >
                            <reason.icon
                                className="w-8 h-8 text-accent mb-4"
                                strokeWidth={1.5}
                            />
                            <h3 className="text-lg font-heading font-bold mb-2">
                                {reason.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
