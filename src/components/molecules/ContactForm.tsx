"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useCallback } from "react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

type FormState = "idle" | "loading" | "success" | "error";

/**
 * ContactForm — Client Molecule
 * Owns all form state: input values, submission, API call, success/error UI.
 * Passed as a child to the ContactSection Server Component.
 * Protocol §4: Molecules are 'use client' for interaction.
 */
export function ContactForm() {
    const shouldReduceMotion = useReducedMotion();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [formState, setFormState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    /* ─── Mercury Submit Button Hook ─── */
    const btnRef = useRef<HTMLButtonElement>(null);
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (shouldReduceMotion) return;
        const el = btnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
    }, [shouldReduceMotion]);
    const onMouseLeave = useCallback(() => {
        const el = btnRef.current;
        if (!el) return;
        el.style.transform = "translate(0, 0) scale(1)";
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setFormState("success");
                setName("");
                setEmail("");
            } else {
                setFormState("error");
                setErrorMsg(data.error ?? "Something went wrong. Please try again.");
            }
        } catch {
            setFormState("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    };

    if (formState === "success") {
        return (
            <motion.div
                className="text-center py-structural"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
            >
                <p className="text-2xl font-heading font-bold text-ink mb-4">
                    Message received. ✓
                </p>
                <p className="text-slate">
                    We&apos;ll be in touch within 24 hours.
                </p>
            </motion.div>
        );
    }

    return (
        <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate font-bold mb-2 block">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-black/10 py-[16px] outline-none focus:border-accent text-ink"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="text-xs uppercase tracking-widest text-slate font-bold mb-2 block">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-black/10 py-[16px] outline-none focus:border-accent text-ink"
                        placeholder="john@brand.com"
                    />
                </div>
            </div>

            {errorMsg && (
                <p className="text-center text-sm text-red-500 font-mono">{errorMsg}</p>
            )}

            <div className="text-center pt-[8px]">
                <motion.button
                    ref={btnRef}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    type="submit"
                    disabled={formState === "loading"}
                    className="mercury-btn px-16 py-[24px] rounded-full text-sm font-bold uppercase tracking-[0.2em] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={shouldReduceMotion || formState === "loading" ? {} : { scale: 1.03 }}
                    whileTap={shouldReduceMotion || formState === "loading" ? {} : { scale: 0.97 }}
                    transition={spring}
                >
                    {formState === "loading" ? "Sending…" : "Initiate Audit"}
                </motion.button>
            </div>
        </form>
    );
}
