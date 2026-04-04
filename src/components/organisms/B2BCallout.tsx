"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 160, damping: 26 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: spring },
};

const stack = ["Next.js", "PostgreSQL", "n8n", "WhatsApp API", "Vercel Edge"];

/**
 * B2BCallout — Server-safe Organism
 * Full-bleed amber section. The amber is the loudest color on the page —
 * this section earns that. One proof point, maximum weight.
 */
export function B2BCallout() {
    return (
        <section
            id="platform"
            className="relative px-6 md:px-10 lg:px-16 py-32 md:py-40 overflow-hidden"
            style={{ backgroundColor: "#FEB05D" }}
        >
            {/* Subtle grain on amber — same GrainOverlay pattern, low opacity */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(43,42,42,0.06) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Left — headline + description */}
                    <div className="max-w-2xl">
                        <p
                            className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6"
                            style={{ color: "rgba(43,42,42,0.50)" }}
                        >
                            What We Build
                        </p>

                        <h2
                            className="font-heading font-black uppercase
                                       text-[clamp(36px,5vw,72px)]
                                       tracking-[-0.03em] leading-[0.92] mb-8"
                            style={{ color: "#2B2A2A" }}
                        >
                            End-to-end ordering. Zero manual admin.
                        </h2>

                        <p
                            className="text-base md:text-lg leading-relaxed max-w-lg mb-10"
                            style={{ color: "rgba(43,42,42,0.65)" }}
                        >
                            End-to-end trade ordering system built for repeat B2B operations.
                            Product catalogue, cart flow, order management, and real-time
                            WhatsApp notifications via n8n — all custom-engineered from scratch.
                            This is the class of system we build.
                        </p>

                        {/* Stack tags */}
                        <div className="flex flex-wrap gap-2">
                            {stack.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider"
                                    style={{
                                        backgroundColor: "rgba(43,42,42,0.10)",
                                        color: "#2B2A2A",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — capability list + work link */}
                    <div className="flex flex-col items-start md:items-end gap-8 shrink-0">
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-widest mb-4"
                                style={{ color: "rgba(43,42,42,0.40)" }}
                            >
                                Included in every build
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Live product catalogue",
                                    "Cart + checkout flow",
                                    "WhatsApp order notifications",
                                    "Admin order management",
                                    "Role-based client access",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="font-mono text-xs"
                                        style={{ color: "rgba(43,42,42,0.70)" }}
                                    >
                                        — {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <a
                            href="/work"
                            className="inline-flex items-center gap-2 font-mono text-xs
                                       uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                            style={{ color: "rgba(43,42,42,0.60)" }}
                        >
                            View all work
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </a>
                    </div>
                </motion.div>

                {/* Platform screenshot — replace with actual screenshot when available */}
                <div
                    className="relative mt-16 w-full overflow-hidden"
                    style={{ borderRadius: "1.5rem" }}
                >
                    {/* Placeholder — swap for <Image> once screenshot asset is provided */}
                    <div
                        className="w-full flex items-center justify-center"
                        style={{
                            background: "rgba(43,42,42,0.12)",
                            minHeight: "320px",
                            borderRadius: "1.5rem",
                            border: "1px dashed rgba(43,42,42,0.25)",
                        }}
                    >
                        <p
                            className="font-mono text-xs uppercase tracking-widest text-center"
                            style={{ color: "rgba(43,42,42,0.40)" }}
                        >
                            Platform screenshot — asset pending
                            <br />
                            <span style={{ color: "rgba(43,42,42,0.25)" }}>
                                Drop platform-screenshot.png into /public/ to activate
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
