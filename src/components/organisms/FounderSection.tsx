"use client";

import { motion, type Variants } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const clipReveal: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 0.7, ease: [0.62, 0.16, 0.13, 1.01] as [number, number, number, number] },
    },
};

/**
 * FounderSection — The human moment.
 * A single dark panel between social proof and pricing.
 * Photo placeholder on the left, conviction statement on the right.
 * Assets: drop luke-petzer.jpg into /public/ to activate the photo.
 */
export function FounderSection() {
    return (
        <section
            className="relative px-6 md:px-10 lg:px-16 py-32 md:py-40"
            style={{ backgroundColor: "#0d0d0d" }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

                {/* Left — Photo placeholder */}
                <motion.div
                    variants={clipReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative"
                >
                    {/* TODO: Replace with <Image src="/luke-petzer.jpg" ... /> once photo asset is provided */}
                    <div
                        className="w-full aspect-[4/5] rounded-[1.5rem] flex items-center justify-center"
                        style={{
                            background: "rgba(245,242,242,0.04)",
                            border: "1px dashed rgba(245,242,242,0.12)",
                            boxShadow: "0 0 60px rgba(254,176,93,0.06)",
                        }}
                    >
                        <p
                            className="font-mono text-[10px] uppercase tracking-widest text-center"
                            style={{ color: "rgba(245,242,242,0.25)" }}
                        >
                            Photo placeholder
                            <br />
                            <span style={{ color: "rgba(245,242,242,0.15)" }}>
                                Drop luke-petzer.jpg into /public/
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* Right — Conviction statement */}
                <div className="flex flex-col gap-8">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="font-mono text-[11px] uppercase tracking-[0.3em]"
                        style={{ color: "rgba(254,176,93,0.70)" }}
                    >
                        The Studio
                    </motion.p>

                    <motion.blockquote
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="font-heading font-black leading-[1.1] tracking-[-0.02em]
                                   text-[clamp(24px,3vw,40px)]"
                        style={{ color: "#F5F2F2" }}
                    >
                        "I build systems that remove the friction between your business and your customers."
                    </motion.blockquote>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-sm leading-relaxed max-w-md"
                        style={{ color: "rgba(245,242,242,0.55)" }}
                    >
                        Every site that leaves this studio is performance-tested,
                        schema-engineered, and built to run without manual intervention.
                        That is the standard. No exceptions.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p
                            className="font-mono text-[10px] uppercase tracking-widest"
                            style={{ color: "rgba(245,242,242,0.35)" }}
                        >
                            — Luke Petzer
                        </p>
                        <p
                            className="font-mono text-[10px] uppercase tracking-widest mt-1"
                            style={{ color: "rgba(245,242,242,0.20)" }}
                        >
                            Founder · LP Web Studio · Cape Town
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
