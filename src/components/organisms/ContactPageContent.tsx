"use client";

import { useRef, useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
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
    const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("loading");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    message: data.get("message"),
                    website: data.get("website"), // honeypot
                }),
            });
            if (res.status === 422) {
                setFormState("error");
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            form.reset();
            setFormState("success");
        } catch {
            setFormState("error");
        }
    };

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

                <h1 className="font-heading font-extrabold tracking-[-0.03em] leading-[0.95]
                               text-[clamp(32px,4.5vw,60px)] text-ink mb-4">
                    Let&apos;s talk about your system.
                </h1>
                <p className="text-slate-500 text-lg max-w-lg">
                    Your competitors are already automating. First call is free — we scope your project, identify what&apos;s possible, and you leave with a clear plan.
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
                    {/* Reach us directly card */}
                    <div className="p-8 rounded-[2rem] bg-black/[0.04] border border-black/[0.07]">
                        <h2 className="text-ink font-heading font-bold text-base mb-6">
                            Reach us directly
                        </h2>

                        <a
                            href="https://wa.me/27673852286"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl
                                       bg-black/[0.03] border border-black/[0.06]
                                       hover:bg-black/[0.06] transition-colors duration-200 cursor-pointer mb-3"
                        >
                            <MessageCircle className="w-7 h-7 text-ink/30 shrink-0" strokeWidth={1.5} />
                            <div>
                                <span className="text-ink font-bold text-sm block">WhatsApp</span>
                                <span className="text-ink/40 text-xs">Average response: 15 mins</span>
                            </div>
                        </a>

                        <a
                            href="mailto:contact@lpwebstudio.co.za"
                            className="flex items-center gap-4 p-4 rounded-2xl
                                       bg-black/[0.03] border border-black/[0.06]
                                       hover:bg-black/[0.06] transition-colors duration-200 cursor-pointer"
                        >
                            <Mail className="w-7 h-7 text-ink/30 shrink-0" strokeWidth={1.5} />
                            <div>
                                <span className="text-ink font-bold text-sm block">Email</span>
                                <span className="text-ink/40 text-xs">contact@lpwebstudio.co.za</span>
                            </div>
                        </a>
                    </div>

                    {/* How it works card */}
                    <div className="p-8 rounded-[2rem] bg-black/[0.04] border border-black/[0.07]">
                        <h2 className="text-ink font-heading font-bold text-base mb-6">
                            How it works
                        </h2>
                        <ol className="space-y-4">
                            {[
                                "Fill in the form with your project brief.",
                                "We reply within 15 minutes on WhatsApp.",
                                "First call is free. We scope, you decide.",
                            ].map((step, i) => (
                                <li key={step} className="flex items-start gap-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30 mt-0.5 shrink-0 w-4">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-sm text-ink/60 leading-relaxed">{step}</span>
                                </li>
                            ))}
                        </ol>
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
                        Book a Discovery Call
                    </h2>

                    <form
                        className="flex flex-col gap-10"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="contact-name"
                                className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Full Name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                required
                                className="w-full bg-transparent border-b border-black/10
                                           py-5 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-email"
                                className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Email Address
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                required
                                className="w-full bg-transparent border-b border-black/10
                                           py-5 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300"
                                placeholder="john@brand.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-message"
                                className="text-[10px] uppercase tracking-widest
                                             text-slate-400 font-bold mb-2 block">
                                Tell us about your project
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={4}
                                required
                                className="w-full bg-transparent border-b border-black/10
                                           py-4 outline-none focus:border-ink/40
                                           transition-colors text-ink placeholder:text-slate-300
                                           resize-none"
                                placeholder="What are you building? What's broken? What do you want to automate?"
                            />
                        </div>

                        {/* Honeypot — visually hidden, bots fill this */}
                        <div style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
                            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                        </div>

                        <button
                            ref={submitBtn.ref}
                            onMouseMove={submitBtn.onMouseMove}
                            onMouseLeave={submitBtn.onMouseLeave}
                            type="submit"
                            disabled={formState === "loading" || formState === "success"}
                            className="mercury-btn px-12 py-5 rounded-full text-sm font-bold
                                       uppercase tracking-[0.2em] text-white
                                       w-full md:w-auto self-start cursor-pointer
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formState === "loading" ? "Sending..." : formState === "success" ? "Brief Sent" : "Send Brief"}
                        </button>

                        <div aria-live="polite" aria-atomic="true">
                            {formState === "success" && (
                                <p className="text-sm text-ink/60">
                                    Got your brief. You&apos;ll hear from me within 15 minutes on WhatsApp.
                                </p>
                            )}
                            {formState === "error" && (
                                <p className="text-sm" style={{ color: "rgba(239,68,68,0.70)" }} role="alert">
                                    Something went wrong. Try WhatsApp directly instead.
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* FAQ */}
            <div className="mt-24 pt-24 border-t border-black/[0.06]">
                <p className="font-mono text-xs uppercase tracking-widest text-ink/30 mb-12">
                    Common Questions
                </p>
                <FaqAccordion />
            </div>
        </section>
    );
}
