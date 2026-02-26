"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring,
    },
};

/* ─── Pricing Tiers (Blueprint Prices) ─── */
const tiers = [
    {
        name: "Starter",
        price: "R5,500",
        subtext: (
            <>
                (Once-Off <span className="opacity-70 text-[10px]">+ R350/pm</span>)
            </>
        ),
        description: "Fast, professional digital footprint.",
        features: [
            "1-Page High-Performance Build",
            "WhatsApp Lead Capture",
            "Mobile-First Layout",
            "Local SEO & Google Maps",
            "Lightning-Fast Edge Hosting",
        ],
        cta: "Get Started",
        style: "bg-white border border-slate-200 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaVariant: "outline" as const,
    },
    {
        name: "Professional",
        price: "R12,500",
        subtext: (
            <>
                (Once-Off <span className="opacity-70 text-[10px]">+ R350/pm</span>)
            </>
        ),
        description: "Built for lead generation and search visibility.",
        features: [
            "3-Page Custom Architecture",
            "Automated Booking Integration",
            "Dynamic Photo Gallery",
            "Google Business Profile Setup",
            "Guaranteed 90+ PageSpeed",
        ],
        cta: "Partner with Us",
        recommended: true,
        style: "bg-void text-white shadow-2xl",
        priceColor: "text-white",
        textColor: "text-white/60",
        ctaVariant: "primary" as const,
    },
    {
        name: "Custom Web Applications & AI",
        price: "Starting from R21,500",
        subtext: "(Custom monthly retainers based on API usage)",
        description: "Autonomous B2B pipelines built to scale your operations.",
        features: [
            "Full Next.js & DB Architecture",
            "AI Lead Generation Engines",
            "n8n Business Automations",
            "Advanced Technical SEO",
            "Priority Engineering Support",
        ],
        cta: "Contact Studio",
        style: "bg-accent/5 border border-accent/10 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaVariant: "outline" as const,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="min-h-[600px] lg:min-h-[800px] max-w-7xl mx-auto px-6 pt-24 pb-structural">
            {/* Header */}
            <motion.div
                className="text-center mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-ink text-4xl font-heading font-extrabold mb-4">
                    The Performance Packages
                </h2>
                <p className="text-slate">
                    Simplified structures for high-velocity teams.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-sectional">
                {tiers.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        className={`group relative overflow-hidden p-[32px] rounded-[2rem] h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30 ${tier.style}`}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ ...spring, delay: i * 0.1 }}
                    >
                        {/* Shine Sweep — diagonal translate sweep on hover */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%] z-0 pointer-events-none"
                        />

                        <div className="flex-1 flex flex-col">
                            {/* Badge */}
                            {tier.recommended && (
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                                        {tier.name}
                                    </h3>
                                    <span className="bg-accent text-white text-xs px-[8px] py-[4px] rounded-full uppercase flex items-center gap-1">
                                        <Zap className="w-[10px] h-[10px]" strokeWidth={2.5} />
                                        Recommended
                                    </span>
                                </div>
                            )}

                            {/* Name (non-recommended) */}
                            {!tier.recommended && (
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate mb-6">
                                    {tier.name}
                                </h3>
                            )}

                            {/* Price */}
                            <div className={`text-5xl font-heading font-bold tracking-tight mb-2 ${tier.priceColor}`}>
                                {tier.price}
                            </div>
                            <p className={`text-xs mb-6 ${tier.textColor}`}>{tier.subtext}</p>

                            {/* Description */}
                            <p className={`text-sm mb-6 leading-relaxed ${tier.textColor}`}>
                                {tier.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-8">
                                {tier.features.map((feature) => {
                                    const hasColon = feature.includes(":");
                                    const parts = feature.split(":");
                                    const title = parts[0];
                                    const description = parts.slice(1).join(":").trim();

                                    return (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <Check
                                                className="w-4 h-4 text-accent shrink-0 mt-0.5"
                                                strokeWidth={2}
                                            />
                                            <span className="leading-snug">
                                                {hasColon ? (
                                                    <>
                                                        <span className={`font-semibold text-sm ${tier.recommended ? 'text-white' : 'text-slate-800'}`}>
                                                            {title}:
                                                        </span>{" "}
                                                        <span className={`text-xs ${tier.recommended ? 'text-white/70' : 'text-slate-600'}`}>
                                                            {description}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className={`text-sm ${tier.recommended ? 'text-white/80' : 'text-slate-700'}`}>
                                                        {feature}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* CTA — Framer Motion spring, no CSS transition */}
                        <motion.a
                            href="#contact"
                            className={`block mt-auto text-center py-[16px] rounded-full text-xs font-bold uppercase tracking-widest ${tier.recommended
                                ? "mercury-btn text-white shadow-lg shadow-accent/20"
                                : "border border-black/10 text-ink"
                                }`}
                            whileHover={{
                                backgroundColor: tier.recommended ? undefined : "#1a1a1a",
                                color: tier.recommended ? undefined : "#ffffff",
                                scale: 1.02,
                            }}
                            transition={spring}
                        >
                            {tier.cta}
                        </motion.a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
