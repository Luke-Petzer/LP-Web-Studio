"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const clipReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    visible: {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.62, 0.16, 0.13, 1.01],
        },
    },
};

const tiers = [
    {
        name: "Starter",
        price: "R5,500",
        subtext: "Once-Off + R350/pm hosting",
        description: "Fast, professional digital footprint for businesses going online.",
        features: [
            "1-Page Custom Next.js Build",
            "WhatsApp Enquiry Integration",
            "90+ PageSpeed Score — Guaranteed",
            "Cape Town Local SEO Setup",
            "Vercel Edge Hosting Included",
        ],
        cta: "Start a Project",
        recommended: false,
        card: {
            backgroundColor: "rgba(245,242,242,0.08)",
            border: "1px solid rgba(245,242,242,0.13)",
        },
        priceColor: "#F5F2F2",
        bodyColor: "rgba(245,242,242,0.50)",
        checkColor: "rgba(245,242,242,0.25)",
        featureColor: "rgba(245,242,242,0.80)",
        cta_style: {
            border: "1px solid rgba(245,242,242,0.20)",
            color: "#F5F2F2",
            background: "transparent",
        },
    },
    {
        name: "Professional",
        price: "R12,500",
        subtext: "Once-Off + R350/pm hosting",
        description: "Built for lead generation, search visibility, and conversion.",
        features: [
            "3-Page Custom Architecture",
            "Booking / Calendar Integration",
            "Dynamic Photo Gallery",
            "Google Business Profile Setup",
            "AI Search Visibility (Schema + llms.txt)",
        ],
        cta: "Partner with Us",
        recommended: true,
        card: { backgroundColor: "#FEB05D" },
        priceColor: "#2B2A2A",
        bodyColor: "rgba(43,42,42,0.60)",
        checkColor: "rgba(43,42,42,0.35)",
        featureColor: "#2B2A2A",
        cta_style: { backgroundColor: "#2B2A2A", color: "#F5F2F2" },
    },
    {
        name: "Custom Systems & AI",
        price: "From R21,500",
        subtext: "Custom scope — monthly retainer based on usage",
        description: "Autonomous B2B pipelines and AI-powered systems built to scale.",
        features: [
            "Full Next.js + Database Architecture",
            "n8n Automation Pipeline",
            "B2B Ordering Portal Development",
            "Multi-system API Integration",
            "Dedicated Engineering Partnership",
        ],
        cta: "Contact Studio",
        recommended: false,
        card: {
            backgroundColor: "rgba(245,242,242,0.08)",
            border: "1px solid rgba(245,242,242,0.13)",
        },
        priceColor: "#F5F2F2",
        bodyColor: "rgba(245,242,242,0.50)",
        checkColor: "rgba(245,242,242,0.25)",
        featureColor: "rgba(245,242,242,0.80)",
        cta_style: {
            border: "1px solid rgba(245,242,242,0.20)",
            color: "#F5F2F2",
            background: "transparent",
        },
    },
];

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="px-6 md:px-10 lg:px-16 py-32 md:py-40"
            style={{ backgroundColor: "#2B2A2A" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.p
                    className="font-mono text-[11px] uppercase tracking-[0.3em] mb-5"
                    style={{ color: "rgba(254,176,93,0.70)" }}
                    variants={clipReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Pricing
                </motion.p>
                <motion.h2
                    className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                               text-[clamp(32px,4vw,56px)] mb-4"
                    style={{ color: "#F5F2F2" }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.08 }}
                >
                    The Performance Packages
                </motion.h2>

                <motion.p
                    className="text-sm max-w-lg mt-2 mb-16 md:mb-20"
                    style={{ color: "rgba(245,242,242,0.40)" }}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Three scopes. Every project is hand-coded, performance-tested, and delivered on time.
                    No templates, no page builders, no surprises.
                </motion.p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            className="group relative overflow-hidden rounded-[2rem] flex flex-col
                                       hover:-translate-y-2 transition-transform duration-300 ease-out"
                            style={{
                                ...tier.card,
                                padding: tier.recommended ? "2.5rem" : "2rem",
                            }}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ ...spring, delay: i * 0.1 }}
                        >
                            <div className="flex-1 flex flex-col">

                                {/* Name + badge */}
                                <div className="flex items-start justify-between mb-8">
                                    <h3
                                        className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                        style={{ color: tier.bodyColor }}
                                    >
                                        {tier.name}
                                    </h3>
                                    {tier.recommended && (
                                        <span
                                            className="flex items-center gap-1 px-2 py-1 rounded-full
                                                       font-mono text-[10px] uppercase tracking-wider"
                                            style={{ backgroundColor: "#2B2A2A", color: "#F5F2F2" }}
                                        >
                                            Recommended
                                        </span>
                                    )}
                                </div>

                                {/* Price */}
                                <div
                                    className="font-heading font-black tracking-[-0.03em]
                                               text-[clamp(28px,3vw,44px)] mb-1"
                                    style={{ color: tier.priceColor }}
                                >
                                    {tier.price}
                                </div>
                                <p
                                    className="font-mono text-xs mb-8"
                                    style={{ color: tier.bodyColor }}
                                >
                                    {tier.subtext}
                                </p>

                                {/* Description */}
                                <p
                                    className="text-sm mb-8 leading-relaxed"
                                    style={{ color: tier.bodyColor }}
                                >
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-4 mb-10 flex-1">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check
                                                className="w-4 h-4 shrink-0 mt-0.5"
                                                style={{ color: tier.checkColor }}
                                                strokeWidth={2.5}
                                            />
                                            <span
                                                className="text-sm leading-snug"
                                                style={{ color: tier.featureColor }}
                                            >
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <motion.a
                                href="#contact"
                                className="block text-center rounded-full font-mono font-bold
                                           uppercase tracking-widest cursor-pointer
                                           transition-opacity duration-200 hover:opacity-80"
                                style={{
                                    ...tier.cta_style,
                                    padding: tier.recommended ? "1.25rem 1.5rem" : "1rem 1.5rem",
                                    fontSize: "0.7rem",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={spring}
                            >
                                {tier.cta}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
