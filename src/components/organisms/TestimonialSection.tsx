"use client";

import { motion, type Variants } from "framer-motion";

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

const quoteReveal: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 160, damping: 26, delay: 0.15 },
    },
};

const attributionReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
    },
};

/**
 * TestimonialSection — REDESIGNED as a pull-quote.
 *
 * Previous issues:
 *   - Quote split into two sizes (text-base + text-xl) — felt like body copy
 *   - Lucide <Quote> icon felt like a UI widget, not typography
 *   - "Verified Client" badge was text-accent (over-using accent)
 *
 * Now:
 *   - Single unified quote size: text-xl md:text-2xl — all one voice
 *   - Typographic " character at ~160px, opacity-[0.04] — atmospheric, not decorative
 *   - Attribution block clean and restrained
 *   - All accent stripped — this section earns trust through weight, not color
 */
export function TestimonialSection() {
    return (
        <section
            className="relative py-32 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
            style={{ backgroundColor: "#F5F2F2" }}
        >

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/*
                      Typographic quote mark — a massive " in the heading font,
                      acting as a background watermark. Not a Lucide icon.
                      The font renders it as a proper typographic form.
                    */}
                    <motion.div
                        variants={fadeUp}
                        aria-hidden="true"
                        className="font-heading font-black text-ink select-none pointer-events-none
                                   text-[160px] md:text-[200px] leading-none
                                   opacity-[0.04] mb-[-60px] md:mb-[-80px]"
                    >
                        &ldquo;
                    </motion.div>

                    {/* Accent rule — visual anchor above the quote */}
                    <motion.div
                        variants={fadeUp}
                        aria-hidden="true"
                        className="w-16 h-[2px] bg-accent/40 mb-10"
                    />

                    <blockquote>
                        {/*
                          TYPOGRAPHY FIX: unified pull-quote size.
                          Previous: split into two different sizes mid-quote.
                          Now: single text-xl md:text-2xl throughout — reads as
                          one powerful statement, not two separate paragraphs.
                        */}
                        <motion.p
                            variants={quoteReveal}
                            className="font-heading font-medium text-ink/90
                                       text-xl md:text-2xl leading-[1.4]
                                       tracking-[-0.01em] mb-10"
                        >
                            Luke has been exceptional from start to finish on the project.
                            I was skeptical at first, but all I can say is that I do not
                            regret opening dialogue with him. His professionalism and work
                            ethic is above what I&rsquo;ve experienced in the industry and
                            his execution of planning is pinpoint.{" "}
                            <span className="text-ink/50">
                                Please, save yourself from having to run around after designers
                                and use Luke — phenomenal individual.
                            </span>
                        </motion.p>

                        <motion.footer
                            variants={attributionReveal}
                            className="flex items-center gap-4"
                        >
                            {/* Avatar */}
                            <div className="w-11 h-11 rounded-full bg-black/[0.06]
                                            border border-black/[0.08]
                                            flex items-center justify-center shrink-0">
                                <span className="text-ink/60 font-heading font-bold text-base">
                                    G
                                </span>
                            </div>

                            {/* Name + role */}
                            <div>
                                <cite className="text-ink font-heading font-bold
                                                not-italic text-sm block">
                                    Gio
                                </cite>
                                <span className="text-ink/40 text-xs">
                                    Owner, Cafe Crave
                                </span>
                            </div>

                            {/* Verified pill — ACCENT AUDIT: stripped to white/20 border, no accent text */}
                            <div className="ml-auto hidden sm:flex items-center gap-2
                                            bg-black/[0.04] border border-black/[0.08]
                                            px-4 py-2 rounded-full">
                                <span className="text-ink/40 text-[10px] font-bold
                                                uppercase tracking-widest">
                                    Verified Client
                                </span>
                            </div>
                        </motion.footer>
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
}
