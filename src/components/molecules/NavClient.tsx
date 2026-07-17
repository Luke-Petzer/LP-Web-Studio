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
    const isHomepage = pathname === "/";
    const { openDrawer } = useDrawer();

    const [scrolled,  setScrolled]  = useState(false); // pill mode
    const [visible,   setVisible]   = useState(true);  // hide/show on scroll direction
    const [isOpen,    setIsOpen]    = useState(false);

    const lastY = useRef(0);

    useEffect(() => {
        const handler = () => {
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
        };

        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            <header
                className={[
                    "fixed left-1/2 z-50 -translate-x-1/2",
                    "transition-all duration-300 ease-[cubic-bezier(0.2,0,0.2,1)]",
                    /* Position: flush top when expanded, top-4 when pill */
                    scrolled ? "top-4" : "top-0",
                    /* Width: full when expanded, pill when scrolled */
                    scrolled ? "w-[calc(100%-2rem)] max-w-3xl" : "w-full max-w-full",
                    /* Hide/show via translateY */
                    visible ? "translate-y-0" : "-translate-y-[120%]",
                ].join(" ")}
                style={{ transform: `translateX(-50%) translateY(${visible ? "0" : "-120%"})` }}
                aria-label="Main navigation"
            >
                <nav
                    className={[
                        "flex items-center justify-between transition-all duration-300",
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
                                "w-auto invert transition-all duration-300",
                                scrolled ? "h-6" : "h-7",
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
                                        className="font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 bg-transparent border-none cursor-pointer text-white/50 hover:text-white"
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
                                        "font-headline text-[11px] font-bold uppercase tracking-widest transition-colors duration-200",
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
                            "hidden md:inline-flex font-headline font-bold uppercase tracking-widest transition-all duration-200 border-none cursor-pointer",
                            scrolled
                                ? "text-[10px] bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90"
                                : "btn-primary text-[11px] px-6 py-2.5",
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
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </nav>
            </header>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 flex flex-col bg-obsidian pt-24 px-8 overflow-y-auto pb-8">
                    <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
                    <nav className="relative flex flex-col gap-8">
                        {navLinks.map((link) => {
                            if (link.label === "Contact") {
                                return (
                                    <button
                                        key={link.label}
                                        onClick={() => { setIsOpen(false); openDrawer(); }}
                                        className="font-headline font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 bg-transparent border-none cursor-pointer text-left w-full break-words"
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
            )}
        </>
    );
}
