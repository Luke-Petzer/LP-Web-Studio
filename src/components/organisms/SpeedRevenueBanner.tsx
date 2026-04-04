"use client";

import { motion, type Variants } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

/* ─────────────────────────────────────────────────────────────
   Animation — FIXED
   Was: y: 0 in hidden, animate="visible" (fires before visible)
   Now: y: 18 rise, whileInView fires on scroll entry
───────────────────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const statReveal: Variants = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: spring },
};

const stats = [
    { value: "8.3%", label: "Drop in bounce rate per 0.1s improvement" },
    { value: "~10%", label: "Increase in consumer spending" },
    { value: "26%", label: "More recommendations: 10s → 3s load time" },
];

/**
 * SpeedRevenueBanner — REDESIGNED as a dark atmospheric section.
 *
 * Previously bg-white — identical to sections above and below.
 * Now bg-void with grain: an editorial "data interruption" that
 * creates the section rhythm contrast the page was missing.
 *
 * Accent audit:
 *   - "Google Research" label: KEEP accent (section label role)
 *   - TrendingUp icon: STRIPPED → text-white/40 (decorative)
 *   - Stat values: STRIPPED → text-white (on void bg, white is correct)
 *   - Stat body text: text-white/50 (unchanged — was already neutral)
 */
export function SpeedRevenueBanner() {
    return (
        <section className="relative bg-void py-28 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden">
            <GrainOverlay className="opacity-45" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* LEFT — Headline + body */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            {/* ACCENT AUDIT: icon stripped → white/40 (decorative) */}
                            <TrendingUp className="w-5 h-5 text-white/40" strokeWidth={2} />
                            {/* KEEP: section label = allowed accent role */}
                            <p className="text-accent font-bold text-xs uppercase tracking-[0.3em]">
                                Google Research
                            </p>
                        </div>

                        {/* FIXED: clamp() fluid scale, font-black, tight tracking */}
                        <h2 className="font-heading font-black tracking-[-0.04em] leading-[0.93]
                                       text-[clamp(32px,4vw,56px)] text-white mb-6">
                            Speed is{" "}
                            {/* KEEP: one headline emphasis word = allowed accent role */}
                            <span className="text-accent">Revenue.</span>
                        </h2>

                        <p className="text-white/50 leading-relaxed max-w-lg">
                            A Google report proves that just a 0.1-second improvement in mobile
                            site speed decreases lead bounce rates by 8.3% and increases consumer
                            spending by nearly 10%. Furthermore, reducing load times from 10 seconds
                            to 3 seconds increases customer recommendations by 26%.{" "}
                            <strong className="text-white/80">
                                How much revenue is your slow website leaking?
                            </strong>
                        </p>
                    </div>

                    {/* RIGHT — Stat callouts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.value}
                                className="flex items-start gap-4 p-6 rounded-[1.5rem]
                                           border border-white/[0.07]"
                                style={{ borderLeftColor: "rgba(30,64,175,0.5)", borderLeftWidth: "2px" }}
                                variants={statReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ ...spring, delay: i * 0.1 }}
                            >
                                <span className="text-3xl font-heading font-extrabold text-accent shrink-0">
                                    {stat.value}
                                </span>
                                <p className="text-white/50 text-sm leading-relaxed pt-1">
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
