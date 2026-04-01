"use client";

import { useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Mail, Gauge } from "lucide-react";
import { FaqAccordion } from "@/components/molecules/FaqAccordion";

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

/* ─── Mercury Button Hook (unchanged) ─── */
function useMercuryButton() {
    const ref = useRef<HTMLButtonElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0, 0) scale(1)";
    }, []);

    return { ref, onMouseMove, onMouseLeave };
}

export function ContactPageContent() {
    const submitBtn = useMercuryButton();

    return (
        <section className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

            {/* Header */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* KEEP: section label = allowed accent role */}
                <p className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-5">
                    Contact
                </p>

                {/* FIXED: clamp() fluid scale, font-black, tight tracking */}
                <h1 className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                               text-[clamp(32px,4.5vw,60px)] text-ink mb-4">
                    Stop Losing Leads.{" "}
                    <span className="text-ink/60">Start Converting.</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-lg">
                    Your competitors are already on WhatsApp. Are you?
                </p>
            </motion.div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-structural relative">

                {/* Vertical divider — desktop only */}
                <div
                    aria-hidden="true"
                    className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-black/[0.06]"
                />

                {/* LEFT: Contact options */}
                <motion.div
                    className="flex flex-col gap-sectional"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ ...spring, delay: 0.1 }}
                >
                    {/* Instant Connection card */}
                    <div className="p-8 rounded-[2rem] bg-void text-white">
                        <h2 className="text-white font-heading font-bold text-lg mb-6">
                            Instant Connection
                        </h2>

                        <a
                            href="https://wa.me/27673852286"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl
                                       bg-white/[0.05] border border-white/[0.08]
                                       hover:bg-white/[0.09] transition-colors duration-200
                                       cursor-pointer mb-3"
                        >
                            {/* ACCENT AUDIT: icon → white/50 (decorative, not CTA) */}
                            <MessageCircle className="w-7 h-7 text-white/50 shrink-0" strokeWidth={1.5} />
                            <div>
                                <span className="text-white font-bold text-sm block">WhatsApp</span>
                                <span className="text-white/40 text-xs">
                                    Average response: 15 mins
                                </span>
                            </div>
                        </a>

                        <a
                            href="mailto:contact@lpwebstudio.co.za"
                            className="flex items-center gap-4 p-4 rounded-2xl
                                       bg-white/[0.05] border border-white/[0.08]
                                       hover:bg-white/[0.09] transition-colors duration-200
                                       cursor-pointer"
                        >
                            {/* ACCENT AUDIT: icon → white/50 */}
                            <Mail className="w-7 h-7 text-white/50 shrink-0" strokeWidth={1.5} />
                            <div>
                                <span className="text-white font-bold text-sm block">Email</span>
                                <span className="text-white/40 text-xs">
                                    contact@lpwebstudio.co.za
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Audit Offer card */}
                    {/*
                      ACCENT AUDIT:
                      Was: border-accent/20 bg-accent/5 — over-using accent as decoration
                      Now: neutral dark card matching the site's editorial tone
                    */}
                    <div className="p-8 rounded-[2rem] border border-black/[0.08] bg-zinc-50">
                        <div className="flex items-center gap-3 mb-4">
                            {/* ACCENT AUDIT: icon → ink/40 on light background */}
                            <Gauge className="w-5 h-5 text-ink/40" strokeWidth={1.5} />
                            <h2 className="text-ink font-heading font-bold text-base">
                                The Audit Offer
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Unsure why your leads are dropping off? Submit your URL. We will run
                            a raw data extraction and a Core Web Vitals test. You will receive
                            a technical breakdown of exactly how much money your current latency
                            is costing you, and the{" "}
                            <strong className="text-ink">
                                precise architecture required to fix it
                            </strong>.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT: Form */}
                <motion.div
                    className="p-8 md:p-12 rounded-[2rem] border border-black/[0.06] bg-zinc-50"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ ...spring, delay: 0.2 }}
                >
                    <h2 className="text-ink font-heading font-bold text-xl mb-8">
                        Request a Free Speed Audit
                    </h2>

                    <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-black/10
                                           py-5 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-b border-black/10
                                           py-5 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300"
                                placeholder="john@brand.com"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Your Website URL
                            </label>
                            <input
                                type="url"
                                className="w-full bg-transparent border-b border-black/10
                                           py-5 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300"
                                placeholder="https://yourbusiness.co.za"
                            />
                        </div>

                        <button
                            ref={submitBtn.ref}
                            onMouseMove={submitBtn.onMouseMove}
                            onMouseLeave={submitBtn.onMouseLeave}
                            type="submit"
                            className="mercury-btn px-12 py-5 rounded-full text-sm font-bold
                                       uppercase tracking-[0.2em] text-white shadow-xl
                                       w-full md:w-auto self-start cursor-pointer"
                        >
                            Initiate Audit
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* FAQ */}
            <div className="mt-20 md:mt-24">
                <FaqAccordion />
            </div>
        </section>
    );
}
