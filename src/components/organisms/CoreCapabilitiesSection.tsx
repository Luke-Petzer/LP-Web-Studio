"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Code2, Wrench, Search, Workflow } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: spring },
};

/* ─── Capability Cards ─── */
const capabilities = [
    {
        icon: Code2,
        title: "Custom Next.js Applications",
        body: "Brand new, hand-coded web applications built on React and Next.js. Engineered from the ground up for sub-second load times and maximum conversion.",
    },
    {
        icon: Wrench,
        title: "Legacy Rebuilds & Speed Optimization",
        body: "Love your current design but losing leads to a slow WordPress backend? We will rip out the old engine and rebuild your existing UI on our high-speed React stack.",
    },
    {
        icon: Search,
        title: "Technical SEO & Infrastructure",
        body: "We don\u2019t guess with keywords. We implement strict JSON-LD schema, Semantic HTML, and Core Web Vitals optimisations so search engines prioritise your site natively.",
    },
    {
        icon: Workflow,
        title: "n8n Business Automations",
        body: "Stop doing manual admin. We build custom API pipelines using n8n that automatically capture, enrich, and route your website leads directly to your CRM or WhatsApp.",
    },
];

/**
 * CoreCapabilitiesSection — Client Component (Organism)
 * Tech-Noir void background with 4-column / 2×2 responsive grid.
 * Protocol §4: Client Organism for Framer Motion animation.
 */
export function CoreCapabilitiesSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="capabilities" className="bg-void py-structural px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-structural"
                    variants={fadeUp}
                    initial={shouldReduceMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                        Core Capabilities
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-sectional items-end">
                        <h2 className="text-white text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                            High-Performance Engineering.{" "}
                            <span className="text-accent">Zero Bloat.</span>
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed md:max-w-md md:ml-auto">
                            We don&apos;t use templates. We build, optimise, and automate digital
                            infrastructure for businesses that scale.
                        </p>
                    </div>
                </motion.div>

                {/* 2×2 → 4-col Capability Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sectional">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.title}
                            className="group relative p-8 rounded-[2rem] border border-white/8 bg-white/4 hover:border-accent/50 hover:bg-white/8 transition-colors"
                            variants={fadeUp}
                            initial={shouldReduceMotion ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ ...spring, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                        >
                            {/* Icon */}
                            <cap.icon
                                className="w-8 h-8 text-accent mb-6 transition-transform group-hover:scale-110"
                                strokeWidth={1.5}
                            />

                            {/* Title */}
                            <h3 className="text-white text-lg font-heading font-bold mb-3 leading-snug">
                                {cap.title}
                            </h3>

                            {/* Body */}
                            <p className="text-white/50 text-sm leading-relaxed">
                                {cap.body}
                            </p>

                            {/* Subtle accent underline on hover */}
                            <div className="mt-6 h-px w-0 bg-accent group-hover:w-full transition-all duration-500 ease-out" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
