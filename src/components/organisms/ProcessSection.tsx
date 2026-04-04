"use client";

import { motion, type Variants } from "framer-motion";

const processCards = [
    {
        index: "01",
        title: "Direct Lead Capture",
        body: "Traditional forms are dead. We integrate WhatsApp, Telegram, and n8n webhook pipelines to capture, enrich, and route leads directly to your phone in milliseconds.",
    },
    {
        index: "02",
        title: "Edge Performance",
        body: "Every millisecond costs money. Your Next.js application runs on Vercel's global CDN — bypassing shared hosting and delivering sub-second load times from Cape Town to London.",
    },
    {
        index: "03",
        title: "AI Search Visibility",
        body: "Standard SEO is no longer enough. We engineer your site architecture and llms.txt so AI models like Gemini and ChatGPT accurately recommend your business when customers ask.",
    },
];

const cardReveal: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 140, damping: 24 },
    },
};

const labelReveal: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const headlineReveal: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 28, delay: 0.08 },
    },
};

export function ProcessSection() {
    return (
        <section
            id="process"
            className="relative overflow-hidden"
            style={{ backgroundColor: "#0d0d0d" }}
        >
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                {/* ── LEFT PANEL — sticky anchor ──────────────────────────
                    h-screen + sticky top-0: stays pinned while right scrolls.
                    Mobile: normal block above the cards.
                ──────────────────────────────────────────────────────────── */}
                <div
                    className="
                        md:w-[42%] shrink-0
                        py-24 md:py-0
                        md:sticky md:top-0
                        md:h-screen
                        md:flex md:flex-col md:justify-center
                        md:pr-16
                    "
                >
                    <motion.p
                        className="font-mono text-[11px] uppercase tracking-[0.3em] mb-8"
                        style={{ color: "rgba(245,242,242,0.35)" }}
                        variants={labelReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        The Method
                    </motion.p>

                    <motion.h2
                        className="font-heading font-extrabold
                                   text-[clamp(32px,3.5vw,52px)]
                                   tracking-[-0.03em] leading-[1.0] mb-6"
                        style={{ color: "#F5F2F2" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Three Systems.{" "}
                        <br className="hidden lg:block" />
                        Every Site.
                    </motion.h2>

                    <motion.p
                        className="text-sm leading-relaxed max-w-xs mb-10"
                        style={{ color: "rgba(245,242,242,0.40)" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Every site we ship runs all three. No exceptions, no shortcuts.
                    </motion.p>

                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 font-mono text-xs
                                   uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
                        style={{ color: "#FEB05D" }}
                        variants={headlineReveal}
                        initial="hidden"
                        animate="visible"
                    >
                        Start a project →
                    </motion.a>
                </div>

                {/* ── RIGHT PANEL — scrolling cards ─────────────────────────
                    py-24: top/bottom padding gives breathing room.
                    Each card is min-h-[75vh], creating the "scroll through"
                    feel without any JavaScript scroll-locking.
                ──────────────────────────────────────────────────────────── */}
                <div className="md:w-[58%] flex flex-col gap-8 py-24">
                    {processCards.map((card) => (
                        <motion.div
                            key={card.index}
                            className="relative rounded-[2rem] flex flex-col justify-between overflow-hidden"
                            style={{
                                backgroundColor: "rgba(245,242,242,0.05)",
                                border: "1px solid rgba(245,242,242,0.07)",
                                minHeight: "75vh",
                                padding: "clamp(2rem, 4vw, 3rem)",
                            }}
                            variants={cardReveal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            {/* Title — top of card */}
                            <h3
                                className="font-heading font-black uppercase
                                           text-[clamp(22px,3vw,36px)]
                                           tracking-[-0.02em] leading-tight
                                           max-w-[80%]"
                                style={{ color: "#F5F2F2" }}
                            >
                                {card.title}
                            </h3>

                            {/* Number + rule + body — bottom */}
                            <div>
                                <p
                                    className="font-mono text-xs mb-3"
                                    style={{ color: "#FEB05D" }}
                                >
                                    {card.index}
                                </p>
                                <div
                                    className="w-full h-px mb-5"
                                    style={{ backgroundColor: "rgba(245,242,242,0.08)" }}
                                />
                                <p
                                    className="text-sm md:text-base leading-relaxed max-w-md"
                                    style={{ color: "rgba(245,242,242,0.50)" }}
                                >
                                    {card.body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
