"use client";

import { useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Mercury Button Hook (Magnetic Follow — No Morph) ─── */
function useMercuryButton() {
    const ref = useRef<HTMLButtonElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0, 0) scale(1)";
    }, []);

    return { ref, onMouseMove, onMouseLeave };
}

export function ContactSection() {
    const submitBtn = useMercuryButton();

    return (
        <div className="relative bg-gradient-to-b from-white via-slate-50 to-[#050505] py-24">
            <section id="contact" className="max-w-7xl mx-auto px-6 pb-structural">
                <motion.div
                    className="text-center mb-component"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-ink text-4xl md:text-5xl font-heading font-extrabold mb-4">
                        Ready to perform?
                    </h2>
                    <p className="text-slate">
                        Let&apos;s analyze your current performance bottlenecks.
                    </p>
                </motion.div>

                <motion.form
                    className="space-y-12"
                    onSubmit={(e) => e.preventDefault()}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                    </div>
                    <div className="text-center pt-8">
                        <button
                            ref={submitBtn.ref}
                            onMouseMove={submitBtn.onMouseMove}
                            onMouseLeave={submitBtn.onMouseLeave}
                            type="submit"
                            className="mercury-btn px-16 py-6 rounded-full text-sm font-bold uppercase tracking-[0.2em] text-white shadow-2xl hover:scale-110 transition-transform"
                        >
                            Initiate Audit
                        </button>
                    </div>
                </motion.form>
            </section>
        </div>
    );
}
