"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";


const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];


const luxurySpring = { stiffness: 150, damping: 25, mass: 1 };

export function Navigation() {
    const pathname = usePathname();
    const isHomepage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 100);
    });

    // Sub-pages: force solid glass nav immediately
    const forceLight = !isHomepage;
    const isLight = forceLight || scrolled;

    return (
        <motion.header
            className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[1200px]"
            style={{ x: "-50%" }}
            aria-label="Main navigation"
        >
            <motion.nav
                className="flex items-center justify-between px-6 py-3 rounded-full border"
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
                transition={{ type: "spring", ...luxurySpring }}
                style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 group">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${isLight ? "bg-ink text-white" : "bg-white text-void"
                            }`}
                    >
                        LP
                    </div>
                    <span
                        className={`font-heading font-bold text-sm tracking-tight transition-colors duration-300 ${isLight ? "text-ink" : "text-white"
                            }`}
                    >
                        LP Studio
                    </span>
                </a>

                {/* Desktop Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`text-xs font-medium uppercase tracking-widest transition-colors duration-300 hover:opacity-70 ${isLight ? "text-ink" : "text-white"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <a
                    href={isHomepage ? "#contact" : "/contact"}
                    className="mercury-btn px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                >
                    Audit
                </a>
            </motion.nav>
        </motion.header>
    );
}
