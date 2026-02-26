"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

/* ─── Spring Physics ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const faqs = [
    {
        q: "Do I own the code?",
        a: "Yes. We transfer the GitHub repository to you. You are never locked into our services.",
    },
    {
        q: "What are the monthly costs?",
        a: "R350/pm covers your Vercel Edge hosting, global CDN, and basic maintenance. No hidden retainer fees.",
    },
    {
        q: "How long does a build take?",
        a: "Standard React deployments take 7–14 days depending on the complexity of your lead-capture automations.",
    },
    {
        q: "How does your SEO work?",
        a: "We do not write keyword-stuffed blog posts. We write explicit JSON-LD data structures (Schema) that act as a direct translator for search engines and AI models. This ensures tools like ChatGPT and Google natively understand and recommend your business to users.",
    },
];

/**
 * FaqAccordion — Client Molecule
 * Spring-animated accordion, one item open at a time.
 * Protocol §4: 'use client' for interaction.
 */
export function FaqAccordion() {
    const shouldReduceMotion = useReducedMotion();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div className="mt-structural">
            <h2 className="text-ink text-2xl md:text-3xl font-heading font-extrabold tracking-tight mb-8">
                Common Questions
            </h2>
            <div className="flex flex-col divide-y divide-black/5">
                {faqs.map((faq, i) => (
                    <div key={faq.q}>
                        {/* Trigger */}
                        <button
                            onClick={() => toggle(i)}
                            aria-expanded={openIndex === i}
                            className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                        >
                            <span className="text-ink font-heading font-bold text-lg group-hover:text-accent transition-colors">
                                {faq.q}
                            </span>
                            <motion.span
                                className="shrink-0 text-accent"
                                animate={{ rotate: openIndex === i ? 0 : 0 }}
                                transition={spring}
                            >
                                {openIndex === i ? (
                                    <Minus className="w-5 h-5" strokeWidth={2} />
                                ) : (
                                    <Plus className="w-5 h-5" strokeWidth={2} />
                                )}
                            </motion.span>
                        </button>

                        {/* Answer panel */}
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                                <motion.div
                                    key="content"
                                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                                    transition={spring}
                                    className="overflow-hidden"
                                >
                                    <p className="text-slate leading-relaxed pb-6 max-w-2xl">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
