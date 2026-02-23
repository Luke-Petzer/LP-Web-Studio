"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap } from "lucide-react";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
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
        style: "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaStyle:
            "block text-center py-4 border border-black/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-white transition-all",
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
        ctaStyle:
            "mercury-btn block text-center py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-accent/20",
    },
    {
        name: "High-Performance",
        price: "R7,500+",
        period: "Contact for Quote",
        features: [
            "5+ Pages, Fully Custom",
            "Advanced SEO & Analytics",
            "Custom Features (Blogs, APIs)",
            "Priority Support",
            "Built on Next.js & Tailwind CSS",
        ],
        cta: "Contact Studio",
        style:
            "bg-indigo-50/30 border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-500 hover:shadow-indigo-100",
        priceColor: "text-ink",
        textColor: "text-slate",
        ctaStyle:
            "block text-center py-4 border border-black/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-white transition-all",
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="max-w-7xl mx-auto px-6 pb-structural">
            {/* Header */}
            <motion.div
                className="text-center mb-structural"
                variants={fadeUp}
                initial="hidden"
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
                        className={`relative p-8 rounded-[2rem] transition-all h-full flex flex-col ${tier.style}`}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {/* Badge */}
                        {tier.recommended && (
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                                    {tier.name}
                                </h3>
                                <span className="bg-accent text-white text-[8px] px-3 py-1 rounded-full uppercase flex items-center gap-1">
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

                        {/* CTA */}
                        <a href="#contact" className={tier.ctaStyle}>
                            {tier.cta}
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
