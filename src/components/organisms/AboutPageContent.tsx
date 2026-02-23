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
    hidden: { opacity: 0, y: 24 },
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
        <section className="max-w-7xl mx-auto px-6">
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

            {/* Philosophy — Anti-WordPress */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                    The Philosophy
                </h2>
                <blockquote className="relative pl-8 border-l-4 border-accent mb-8">
                    <p className="text-ink text-lg leading-relaxed italic">
                        &ldquo;Most agencies sell you a template and charge for maintenance.
                        I don&apos;t work like that.&rdquo;
                    </p>
                </blockquote>
                <p className="text-slate leading-relaxed">
                    I believe in <strong className="text-ink">Hand-Coded Performance</strong>.
                    No Drag-and-Drop bloat. No plugin security holes. Just clean, semantic
                    Next.js code that scores 90+ on Google PageSpeed Insights — every time.
                </p>
            </motion.div>

            {/* Tech Stack Grid */}
            <motion.div
                className="mb-structural"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                    The Engine
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-sectional">
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="p-8 rounded-[2rem] border border-black/5 bg-zinc-50 hover:border-accent hover:shadow-lg transition-all"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
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
                whileInView="visible"
                viewport={{ once: true }}
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
                            whileInView="visible"
                            viewport={{ once: true }}
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
