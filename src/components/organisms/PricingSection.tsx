"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Animation — FIXED
   Was: y: 0 in hidden, animate="visible"
   Now: y: 18 rise, whileInView on scroll entry
───────────────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

/* ─── Pricing Tiers ─── */
const tiers = [
    {
        name: "Starter",
        price: "R5,500",
        subtext: (
            <>
                Once-Off <span className="opacity-50 text-[10px]">+ R350/pm</span>
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
        style: "bg-white border border-slate-200/80 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate-600",
        /* ACCENT AUDIT: check icons on light card → slate-400 (not accent) */
        checkColor: "text-slate-400",
        ctaStyle: "border border-black/10 text-ink hover:bg-ink hover:text-white",
        recommended: false,
    },
    {
        name: "Professional",
        price: "R12,500",
        subtext: (
            <>
                Once-Off <span className="opacity-50 text-[10px]">+ R350/pm</span>
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
        style: "bg-void shadow-2xl",
        priceColor: "text-white",
        textColor: "text-white/50",
        /* ACCENT AUDIT: check icons on dark card → white/40 (not accent) */
        checkColor: "text-white/40",
        ctaStyle: "mercury-btn text-white shadow-lg",
        recommended: true,
    },
    {
        name: "Custom Web Applications & AI",
        price: "From R21,500",
        subtext: "Custom monthly retainers based on API usage",
        description: "Autonomous B2B pipelines built to scale your operations.",
        features: [
            "Full Next.js & DB Architecture",
            "AI Lead Generation Engines",
            "n8n Business Automations",
            "Advanced Technical SEO",
            "Priority Engineering Support",
        ],
        cta: "Contact Studio",
        style: "bg-white border border-slate-200/80 shadow-sm",
        priceColor: "text-ink",
        textColor: "text-slate-600",
        /* ACCENT AUDIT: check icons on light card → slate-400 */
        checkColor: "text-slate-400",
        ctaStyle: "border border-black/10 text-ink hover:bg-ink hover:text-white",
        recommended: false,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="bg-white max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-28 md:py-32">

            {/* Header */}
            <motion.div
                className="text-center mb-structural"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* KEEP: section label = allowed accent role */}
                <p className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-5">
                    Pricing
                </p>

                {/* FIXED: clamp() fluid scale, font-black, tight tracking */}
                <h2 className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                               text-[clamp(32px,4vw,56px)] text-ink mb-4">
                    The Performance Packages
                </h2>
                <p className="text-slate-500 max-w-sm mx-auto">
                    Simplified structures for high-velocity teams.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        className={`group relative overflow-hidden rounded-[2rem] h-full
                                   flex flex-col ${tier.style}
                                   ${tier.recommended ? "p-10" : "p-8"}
                                   hover:-translate-y-2 hover:shadow-2xl
                                   transition-all duration-300 ease-out`}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...spring, delay: i * 0.1 }}
                    >
                        {/* Shine sweep on hover */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-[150%] skew-x-12
                                       bg-gradient-to-r from-transparent via-white/10 to-transparent
                                       transition-transform duration-700 ease-out
                                       group-hover:translate-x-[150%] z-0 pointer-events-none"
                        />

                        <div className="relative z-10 flex-1 flex flex-col">

                            {/* Tier name + recommended badge */}
                            <div className="flex items-start justify-between mb-6">
                                <h3 className={`text-[10px] font-bold uppercase tracking-[0.25em]
                                               ${tier.recommended ? "text-white/40" : "text-slate-400"}`}>
                                    {tier.name}
                                </h3>
                                {/* KEEP: Recommended badge = CTA/conversion role */}
                                {tier.recommended && (
                                    <span className="bg-accent text-white text-[10px] px-2 py-1
                                                     rounded-full uppercase flex items-center gap-1">
                                        <Zap className="w-2.5 h-2.5" strokeWidth={2.5} />
                                        Recommended
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className={`font-heading font-black tracking-[-0.03em]
                                            text-[clamp(28px,3vw,44px)] mb-1 ${tier.priceColor}`}>
                                {tier.price}
                            </div>
                            <p className={`text-xs mb-6 ${tier.textColor}`}>{tier.subtext}</p>

                            {/* Description */}
                            <p className={`text-sm mb-6 leading-relaxed ${tier.textColor}`}>
                                {tier.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature) => {
                                    const hasColon = feature.includes(":");
                                    const parts = feature.split(":");
                                    const title = parts[0];
                                    const description = parts.slice(1).join(":").trim();

                                    return (
                                        <li key={feature} className="flex items-start gap-3">
                                            {/* ACCENT AUDIT: check icons → neutral per tier */}
                                            <Check
                                                className={`w-4 h-4 shrink-0 mt-0.5 ${tier.checkColor}`}
                                                strokeWidth={2.5}
                                            />
                                            <span className="leading-snug">
                                                {hasColon ? (
                                                    <>
                                                        <span className={`font-semibold text-sm
                                                            ${tier.recommended ? "text-white" : "text-slate-800"}`}>
                                                            {title}:
                                                        </span>{" "}
                                                        <span className={`text-xs ${tier.textColor}`}>
                                                            {description}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className={`text-sm
                                                        ${tier.recommended ? "text-white/80" : "text-slate-700"}`}>
                                                        {feature}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* CTA */}
                        <motion.a
                            href="#contact"
                            className={`relative z-10 block mt-auto text-center
                                       rounded-full font-bold
                                       uppercase tracking-widest cursor-pointer
                                       transition-all duration-200 ${tier.ctaStyle}
                                       ${tier.recommended
                                           ? "py-5 text-sm shadow-[0_0_32px_rgba(30,64,175,0.45)]"
                                           : "py-4 text-xs"
                                       }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
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
