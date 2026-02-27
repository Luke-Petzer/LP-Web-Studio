"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import Image from "next/image";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

/**
 * NavClient — Client Molecule
 * Owns all interactive state: scroll detection, color transitions, mobile overlay.
 * Passed as a child to the Navigation Server Component.
 * Protocol §4: Molecules are 'use client' for interaction.
 */
export function NavClient() {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();
    const isHomepage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 100);
    });

    /* ─── Lock body scroll when overlay is open ─── */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const forceLight = !isHomepage;
    const isLight = forceLight || scrolled;

    /* ─── Hamburger span color ─── */
    const spanBg = isLight ? "bg-ink" : "bg-white";

    return (
        <>
            <motion.header
                className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[1200px]"
                style={{ x: "-50%" }}
                aria-label="Main navigation"
            >
                <motion.nav
                    className="flex items-center justify-between px-6 py-[8px] rounded-full border"
                    animate={{
                        backgroundColor: isLight
                            ? "rgba(255, 255, 255, 0.85)"
                            : "rgba(255, 255, 255, 0.05)",
                        borderColor: isLight
                            ? "rgba(0, 0, 0, 0.05)"
                            : "rgba(255, 255, 255, 0.1)",
                        boxShadow: isLight
                            ? "0 10px 30px -10px rgba(0,0,0,0.1)"
                            : "none",
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                    style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
                >
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 group" aria-label="LP Web Studio home">
                        <Image
                            src="/my-logo.svg"
                            alt="LP Web Studio"
                            width={120}
                            height={32}
                            priority
                            className={`h-8 transition-[filter] duration-300 ${!isLight ? "invert brightness-0" : ""}`}
                        />
                    </a>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="text-xs font-medium uppercase tracking-widest"
                                    animate={{
                                        color: isActive
                                            ? "rgb(var(--accent))"
                                            : isLight ? "#1a1a1a" : "#ffffff",
                                    }}
                                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                                    whileHover={shouldReduceMotion ? {} : { opacity: 0.7 }}
                                >
                                    {link.label}
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* CTA — hidden on mobile */}
                    <motion.a
                        href={isHomepage ? "#contact" : "/contact"}
                        className="hidden md:inline-flex mercury-btn px-[16px] py-[8px] rounded-full text-xs font-bold uppercase tracking-wider text-white items-center"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        transition={spring}
                    >
                        <Zap className="inline w-3 h-3 mr-1" strokeWidth={2.5} />
                        Audit
                    </motion.a>

                    {/* ─── Morphing Hamburger (mobile only) ─── */}
                    <button
                        className="flex md:hidden flex-col items-center justify-center gap-[6px] w-10 h-10"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <span
                            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "rotate-45 translate-y-[0.4rem]" : ""
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "-rotate-45 -translate-y-[0.4rem]" : ""
                                }`}
                        />
                    </button>
                </motion.nav>
            </motion.header>

            {/* ─── Glassmorphic Mobile Overlay (outside header to avoid transform context) ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 backdrop-blur-md bg-void/60"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Glass Card */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center justify-center gap-8 p-8 rounded-2xl bg-white/5 border border-white/10 shadow-accent-glow w-[calc(100%-3rem)] max-w-sm"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-2xl font-heading font-bold transition-colors ${isActive ? "text-accent" : "text-white hover:text-accent/70"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}

                            {/* Mobile CTA inside overlay */}
                            <a
                                href={isHomepage ? "#contact" : "/contact"}
                                onClick={() => setIsOpen(false)}
                                className="mercury-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-1 mt-4"
                            >
                                <Zap className="w-3 h-3" strokeWidth={2.5} />
                                Free Audit
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
