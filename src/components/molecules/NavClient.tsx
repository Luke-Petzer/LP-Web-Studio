"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const CornerMark = ({ className }: { className?: string }) => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" className={className}>
        <path d="M0.5 0.5L0.5 7.5M0.5 0.5L7.5 0.5" stroke="currentColor" strokeWidth="1"/>
    </svg>
);

/**
 * NavClient — Client Molecule
 * At top (scroll=0): full-width, transparent, flush to viewport top
 * Scrolled (scroll>80): bubble morphs in — rounded-full, dark-glass, top-4
 * All morphing via Framer Motion animate on <motion.header> + <motion.nav>
 */
export function NavClient() {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();
    const isHomepage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 80);
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
    const isLight = forceLight || isHomepage || scrolled;

    /* ─── Hamburger span color ─── */
    const spanBg = isLight ? "bg-ink" : "bg-white";

    const morphTransition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0.62, 0.16, 0.13, 1.01] as [number, number, number, number] };

    return (
        <>
            {/* ─── Header shell: full-width at top, shrinks to bubble on scroll ─── */}
            <motion.header
                className="fixed left-1/2 z-50"
                style={{ x: "-50%" }}
                animate={{
                    top: scrolled ? "1rem" : "0px",
                    width: scrolled ? "calc(100% - 2rem)" : "100%",
                    maxWidth: scrolled ? "1200px" : "100%",
                }}
                transition={morphTransition}
                aria-label="Main navigation"
            >
                <motion.nav
                    className="flex items-center justify-between"
                    animate={{
                        borderRadius: scrolled ? "9999px" : "0px",
                        paddingLeft: scrolled ? "1.5rem" : "2.5rem",
                        paddingRight: scrolled ? "1.5rem" : "2.5rem",
                        paddingTop: scrolled ? "0.5rem" : "1.25rem",
                        paddingBottom: scrolled ? "0.5rem" : "1.25rem",
                        backgroundColor: isLight
                            ? scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.0)"
                            : scrolled ? "rgba(10,10,10,0.80)" : "rgba(0,0,0,0.0)",
                        borderColor: isLight
                            ? scrolled ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.0)"
                            : scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.0)",
                        boxShadow: scrolled && isLight
                            ? "0 10px 30px -10px rgba(0,0,0,0.12)"
                            : "none",
                    }}
                    transition={morphTransition}
                    style={{
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid",
                    }}
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
                                    className="group relative text-xs font-medium uppercase tracking-widest overflow-hidden h-[1.2em] flex items-center"
                                    animate={{ color: isActive ? "rgb(var(--accent))" : isLight ? "#1a1a1a" : "#ffffff" }}
                                    transition={shouldReduceMotion ? { duration: 0 } : morphTransition}
                                >
                                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.62,0.16,0.13,1.01)] group-hover:-translate-y-full">
                                        {link.label}
                                    </span>
                                    <span aria-hidden="true" className="absolute block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.62,0.16,0.13,1.01)] group-hover:translate-y-0">
                                        {link.label}
                                    </span>
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* CTA — hidden on mobile */}
                    <motion.a
                        href={isHomepage ? "#contact" : "/contact"}
                        className="group hidden md:inline-flex relative mercury-btn px-[16px] py-[8px] rounded-full text-xs font-bold uppercase tracking-wider text-white items-center"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        transition={morphTransition}
                    >
                        <CornerMark className="absolute top-0 left-0 text-white/25 group-hover:text-white/50 transition-colors duration-300" />
                        <CornerMark className="absolute top-0 right-0 rotate-90 text-white/25 group-hover:text-white/50 transition-colors duration-300" />
                        <CornerMark className="absolute bottom-0 right-0 rotate-180 text-white/25 group-hover:text-white/50 transition-colors duration-300" />
                        <CornerMark className="absolute bottom-0 left-0 -rotate-90 text-white/25 group-hover:text-white/50 transition-colors duration-300" />
                        Book a Call
                    </motion.a>

                    {/* ─── Morphing Hamburger (mobile only) ─── */}
                    <button
                        className="flex md:hidden flex-col items-center justify-center gap-[6px] w-10 h-10"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "rotate-45 translate-y-[0.4rem]" : ""}`} />
                        <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${spanBg} ${isOpen ? "-rotate-45 -translate-y-[0.4rem]" : ""}`} />
                    </button>
                </motion.nav>
            </motion.header>

            {/* ─── Glassmorphic Mobile Overlay ─── */}
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
                                        className={`text-2xl font-heading font-bold transition-colors ${isActive ? "text-accent" : "text-white hover:text-accent/70"}`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}

                            {/* Mobile CTA inside overlay */}
                            <a
                                href={isHomepage ? "#contact" : "/contact"}
                                onClick={() => setIsOpen(false)}
                                className="mercury-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white inline-flex items-center mt-4"
                            >
                                Book a Call
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
