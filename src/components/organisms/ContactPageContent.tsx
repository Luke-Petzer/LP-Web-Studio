"use client";

import { useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Mail, Clock, Gauge } from "lucide-react";
import { FaqAccordion } from "@/components/molecules/FaqAccordion";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Mercury Button Hook ─── */
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
        <section className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
                className="max-w-7xl mb-structural"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                    Contact
                </p>
                <h1 className="text-ink text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-4">
                    Stop Losing Leads.{" "}
                    <span className="text-accent">Start Converting.</span>
                </h1>
                <p className="text-slate text-lg">
                    Your competitors are already on WhatsApp. Are you?
                </p>
            </motion.div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-structural">
                {/* LEFT: WhatsApp + Info */}
                <motion.div
                    className="flex flex-col gap-sectional"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Instant Connection */}
                    <div className="p-8 rounded-[2rem] bg-void text-white">
                        <h2 className="text-lg font-heading font-bold mb-6">
                            Instant Connection
                        </h2>

                        <a
                            href="https://wa.me/27673852286"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all mb-4"
                        >
                            <MessageCircle className="w-8 h-8 text-accent" strokeWidth={1.5} />
                            <div>
                                <span className="text-white font-bold block">WhatsApp</span>
                                <span className="text-white/60 text-xs">
                                    Average response: 15 mins
                                </span>
                            </div>
                        </a>

                        <a
                            href="mailto:contact@lpwebstudio.co.za"
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                            <Mail className="w-8 h-8 text-accent" strokeWidth={1.5} />
                            <div>
                                <span className="text-white font-bold block">Email</span>
                                <span className="text-white/60 text-xs">
                                    contact@lpwebstudio.co.za
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* The Audit Offer */}
                    <div className="p-8 rounded-[2rem] border border-accent/20 bg-indigo-50/30">
                        <div className="flex items-center gap-3 mb-4">
                            <Gauge className="w-6 h-6 text-accent" strokeWidth={1.5} />
                            <h2 className="text-ink text-lg font-heading font-bold">
                                The Audit Offer
                            </h2>
                        </div>
                        <p className="text-slate leading-relaxed text-sm">
                            Unsure why your leads are dropping off? Submit your URL. We will run a raw data extraction and a Core Web Vitals test.
                            You will receive a technical breakdown of exactly how much money your current latency is costing you, and the{" "}
                            <strong className="text-ink">precise architecture required to fix it</strong>.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT: Audit Form */}
                <motion.div
                    className="p-8 md:p-12 rounded-[2rem] border border-black/5 bg-zinc-50"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-ink text-xl font-heading font-bold mb-8">
                        Request a Free Speed Audit
                    </h2>

                    <form
                        className="flex flex-col gap-8"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-slate font-bold mb-2 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-accent transition-colors text-ink"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-slate font-bold mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-accent transition-colors text-ink"
                                placeholder="john@brand.com"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-slate font-bold mb-2 block">
                                Your Website URL
                            </label>
                            <input
                                type="url"
                                className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-accent transition-colors text-ink"
                                placeholder="https://yourbusiness.co.za"
                            />
                        </div>

                        <button
                            ref={submitBtn.ref}
                            onMouseMove={submitBtn.onMouseMove}
                            onMouseLeave={submitBtn.onMouseLeave}
                            type="submit"
                            className="mercury-btn px-12 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] text-white shadow-2xl w-full md:w-auto self-start"
                        >
                            Initiate Audit
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Objection-Handling FAQ */}
            <FaqAccordion />
        </section>
    );
}
