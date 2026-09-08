"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDrawer } from "@/lib/contact-drawer-context";

const navLinks = [
    { label: "Solutions", href: "/work" },
    { label: "Products",  href: "/products" },
    { label: "About",     href: "/about" },
    { label: "Learn",     href: "/learn" },
    { label: "Contact",   href: "#" },
];

export function NavClient() {
    const pathname   = usePathname();
    const { openDrawer } = useDrawer();

    const [scrolled,  setScrolled]  = useState(false); // pill mode
    const [visible,   setVisible]   = useState(true);  // hide/show on scroll direction
    const [isOpen,    setIsOpen]    = useState(false);

    const lastY = useRef(0);
    const frame = useRef<number | null>(null);

    /* Reduced motion: read once, follow changes (same pattern as ContactDrawer) */
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        /* One pending frame at a time — scroll events are far denser than paints */
        const handler = () => {
            if (frame.current !== null) return;
            frame.current = requestAnimationFrame(() => {
                frame.current = null;

                const y = window.scrollY;
                const delta = y - lastY.current;

                // Switch to pill after 60px
                setScrolled(y > 60);

                // Hide when scrolling down (delta > 4), show when scrolling up
                if (delta > 4 && y > 120) {
                    setVisible(false);
                } else if (delta < -4) {
                    setVisible(true);
                }

                lastY.current = y;
            });
        };

        window.addEventListener("scroll", handler, { passive: true });
        return () => {
            window.removeEventListener("scroll", handler);
            if (frame.current !== null) {
                cancelAnimationFrame(frame.current);
                frame.current = null;
            }
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            <header
                className={[
                    "fixed left-1/2 z-50",
                    "transition-[transform,width,max-width] duration-panel ease-out",
                    /* Position: flush top when expanded, top-4 when pill */
                    scrolled ? "top-4" : "top-0",
                    /* Width: full when expanded, pill when scrolled */
                    scrolled ? "w-[calc(100%-2rem)] max-w-3xl" : "w-full max-w-full",
                ].join(" ")}
                /* Hide/show via translateY — pinned under reduced motion */
                style={{ transform: `translateX(-50%) translateY(${visible || reducedMotion ? "0" : "-120%"})` }}
                aria-label="Main navigation"
            >
                <nav
                    className={[
                        "flex items-center justify-between transition-[background-color,border-color,border-radius,padding] duration-panel ease-out",
                        scrolled
                            ? "bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-3"
                            : "bg-transparent px-8 md:px-12 py-6 md:py-8",
                    ].join(" ")}
                >
                    {/* Logo */}
                    <a href="/" aria-label="LP Web Studio home" className="flex items-center">
                        <Image
                            src="/my-logo.svg"
                            alt="LP Web Studio"
                            width={100}
                            height={28}
                            priority
                            className={[
                                "w-auto h-7 invert origin-left transition-transform duration-panel ease-out",
                                scrolled ? "scale-[0.857]" : "scale-100",
                            ].join(" ")}
                        />
                    </a>

                    {/* Desktop links */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            if (link.label === "Contact") {
                                return (
                                    <button
                                        key={link.label}
                                        onClick={openDrawer}
                                        className="font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-hover bg-transparent border-none cursor-pointer text-white/50 hover:text-white"
                                    >
                                        {link.label}
                                    </button>
                                );
                            }
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={[
                                        "font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-hover",
                                        isActive
                                            ? "text-white border-b border-white pb-0.5"
                                            : "text-white/50 hover:text-white",
                                    ].join(" ")}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </nav>

                    {/* CTA */}
                    <button
                        onClick={openDrawer}
                        className={[
                            "hidden md:inline-flex font-headline text-[11px] font-bold uppercase tracking-widest border-none cursor-pointer",
                            scrolled
                                /* transition-colors lives in the pill branch only: on the
                                   expanded branch .btn-primary owns the transition list
                                   (background + the press transform), and a utility here
                                   would out-layer it and kill the press. */
                                ? "bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors duration-hover"
                                : "btn-primary px-6 py-2.5",
                        ].join(" ")}
                    >
                        Book a Discovery Call
                    </button>

                    {/* Hamburger */}
                    <button
                        className="flex md:hidden flex-col items-center justify-center gap-[5px] w-11 h-11"
                        onClick={() => setIsOpen((p) => !p)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-panel ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-opacity duration-panel ${isOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-panel ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </nav>
            </header>

            {/* Mobile overlay — mounted always, so it can leave the way it arrived */}
            <div
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={[
                    "fixed inset-0 z-40 flex flex-col bg-obsidian pt-24 px-8 overflow-y-auto pb-8",
                    isOpen ? "" : "pointer-events-none",
                    reducedMotion
                        ? "motion-keep-fade transition-opacity duration-drawer ease-out"
                        : "transition-transform duration-drawer ease-drawer",
                    reducedMotion
                        ? (isOpen ? "opacity-100" : "opacity-0")
                        : (isOpen ? "translate-y-0" : "translate-y-full"),
                ].join(" ")}
            >
                <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
                <nav className="relative flex flex-col gap-8">
                    {navLinks.map((link) => {
                        if (link.label === "Contact") {
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => { setIsOpen(false); openDrawer(); }}
                                    className="font-headline font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 bg-transparent border-none cursor-pointer text-left w-full break-words pressable"
                                    style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)" }}
                                >
                                    {link.label}
                                </button>
                            );
                        }
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-headline font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 break-words"
                                style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)" }}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    <button
                        onClick={() => { setIsOpen(false); openDrawer(); }}
                        className="btn-primary mt-4 w-full justify-center text-center border-none cursor-pointer"
                    >
                        Book a Discovery Call
                    </button>
                </nav>
            </div>
        </>
    );
}
