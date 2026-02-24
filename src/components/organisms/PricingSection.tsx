"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Check, Zap } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
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
        price: "R2,500",
        period: "Once-Off + R350/pm",
        features: [
            "1-Page Professional Website",
            '"Book Now" WhatsApp Button',
            "Google Maps Location",
            "Mobile Friendly Design",
            "Hosted on Vercel Edge Network",
        ],
        cta: "Get Started",
        style: "bg-white border border-slate-200 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaVariant: "outline" as const,
    },
    {
        name: "Professional",
        price: "R4,500",
        period: "Once-Off + R350/pm",
        features: [
            "Everything in Starter, plus:",
            "3-Page Custom Design",
            "Online Booking Integration",
            "Photo Gallery",
            "Google Business Profile Setup",
            "90+ Google PageSpeed Score",
        ],
        cta: "Partner with Us",
        recommended: true,
        style: "bg-void text-white shadow-2xl",
        priceColor: "text-white",
        textColor: "text-white/60",
        ctaVariant: "primary" as const,
    },
    {
        name: "High-Performance",
        price: "R7,500+",
        period: "Contact for Quote",
        features: [
            "Full Next.js Architecture",
            "Custom API Integrations",
            "n8n Business Automations (Missed Call Text-Back, Lead Routing)",
            "Advanced Technical SEO & Schema Injection",
            "Priority Support",
        ],
        cta: "Contact Studio",
        style: "bg-indigo-50/30 border border-indigo-100 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaVariant: "outline" as const,
    },
];

export function PricingSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="pricing" className="max-w-7xl mx-auto px-6 pt-24 pb-structural">
            {/* Header */}
            <motion.div
                className="text-center mb-structural"
                variants={fadeUp}
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
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
                        className={`group relative overflow-hidden p-[32px] rounded-[2rem] h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 ${tier.style}`}
                        variants={fadeUp}
                        initial={shouldReduceMotion ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ ...spring, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                    >
                        {/* Shine Sweep — diagonal translate sweep on hover */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%] z-0 pointer-events-none"
                        />

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
                        <p className={`text-xs mb-8 ${tier.textColor}`}>{tier.period}</p>

                        {/* Features */}
                        <ul className="space-y-4 text-sm mb-8 flex-1">
                            {tier.features.map((feature) => (
                                <li
                                    key={feature}
                                    className={`flex items-start gap-3 ${tier.textColor}`}
                                >
                                    <Check
                                        className="w-4 h-4 text-accent shrink-0 mt-0.5"
                                        strokeWidth={2}
                                    />
                                    <span className="leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA — Framer Motion spring, no CSS transition */}
                        <motion.a
                            href="#contact"
                            className={`block text-center py-[16px] rounded-full text-xs font-bold uppercase tracking-widest ${tier.recommended
                                ? "mercury-btn text-white shadow-lg shadow-accent/20"
                                : "border border-black/10 text-ink"
                                }`}
                            whileHover={shouldReduceMotion ? {} : {
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
