"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { TrendingUp } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const stats = [
    { value: "8.3%", label: "Drop in bounce rate per 0.1s improvement" },
    { value: "~10%", label: "Increase in consumer spending" },
    { value: "26%", label: "More recommendations: 10s → 3s load time" },
];

/**
 * SpeedRevenueBanner — Client Organism
 * High-contrast white section. Mounts between PortfolioSection and PricingSection.
 * Protocol §4: Client Organism for Framer Motion.
 */
export function SpeedRevenueBanner() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="bg-white py-structural px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-structural items-center"
                    variants={fadeUp}
                    initial={shouldReduceMotion ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* LEFT — Headline + body */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-accent" strokeWidth={2} />
                            <p className="text-accent font-bold text-xs uppercase tracking-widest">
                                Google Research
                            </p>
                        </div>
                        <h2 className="text-ink text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight mb-6">
                            Speed is{" "}
                            <span className="text-accent">Revenue.</span>
                        </h2>
                        <p className="text-slate leading-relaxed max-w-lg">
                            A Google report proves that just a 0.1-second improvement in mobile
                            site speed decreases lead bounce rates by 8.3% and increases consumer
                            spending by nearly 10%. Furthermore, reducing load times from 10 seconds
                            to 3 seconds increases customer recommendations by 26%.{" "}
                            <strong className="text-ink">
                                How much revenue is your slow website leaking?
                            </strong>
                        </p>
                    </div>

                    {/* RIGHT — Stat callouts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-sectional">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.value}
                                className="flex items-start gap-4 p-6 rounded-[1.5rem] bg-void text-white"
                                variants={fadeUp}
                                initial={shouldReduceMotion ? "visible" : "hidden"}
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ ...spring, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                            >
                                <span className="text-3xl font-heading font-extrabold text-accent shrink-0">
                                    {stat.value}
                                </span>
                                <p className="text-white/60 text-sm leading-relaxed pt-1">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
