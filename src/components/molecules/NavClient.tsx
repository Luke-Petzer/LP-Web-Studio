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

const MOBILE_MENU_ID = "mobile-menu";

export function NavClient() {
    const pathname   = usePathname();
    const { openDrawer } = useDrawer();

    const [scrolled,  setScrolled]  = useState(false); // pill mode
    const [visible,   setVisible]   = useState(true);  // hide/show on scroll direction
    const [isOpen,    setIsOpen]    = useState(false);

    const lastY = useRef(0);
    const frame = useRef<number | null>(null);

    /* Mirrors `isOpen` for the scroll handler below, which is set up once
       (empty dep array) and can't close over the state value directly. */
    const isOpenRef = useRef(false);
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const logoRef       = useRef<HTMLAnchorElement>(null);
    const burgerRef     = useRef<HTMLButtonElement>(null);
    const overlayRef    = useRef<HTMLDivElement>(null);
    const firstLinkRef  = useRef<HTMLAnchorElement>(null);
    const scrollYRef    = useRef(0);

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
            // While the menu is open the body is locked with position:fixed,
            // which clamps window.scrollY to ~0 and can fire a spurious
            // 'scroll' event — ignore it so the pill/hide state doesn't
            // misfire off a scroll position that never actually changed.
            if (isOpenRef.current) return;

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

    /* iOS-safe scroll lock: position:fixed + top offset instead of
       overflow:hidden, which Safari ignores on the body. Restores the exact
       scroll position on close. */
    useEffect(() => {
        if (!isOpen) return;

        const y = window.scrollY;
        scrollYRef.current = y;
        lastY.current = y; // keep the scroll-hide tracker's baseline in sync

        document.body.style.position = "fixed";
        document.body.style.top = `-${y}px`;
        document.body.style.left = "0";
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollYRef.current);
        };
    }, [isOpen]);

    /* Inert the page content behind the overlay (main + footer are siblings
       of this component's own header/overlay, rendered by the page — reach
       them directly rather than restructuring every page's layout). The
       header itself, including the burger, stays interactive. */
    useEffect(() => {
        if (!isOpen) return;

        const targets = document.querySelectorAll<HTMLElement>("body > main, body > footer");
        targets.forEach((el) => el.setAttribute("inert", ""));

        return () => {
            targets.forEach((el) => el.removeAttribute("inert"));
        };
    }, [isOpen]);

    /* Escape to close, initial focus, Tab/Shift+Tab trap across the overlay
       + the burger button, and focus restore on close (mirrors the same
       pattern already used by ContactDrawer). If a link click closes the
       menu, the browser is navigating to a new page (plain <a> tags, no
       client-side router) — the restore-focus call below is then a no-op. */
    useEffect(() => {
        if (!isOpen) return;

        firstLinkRef.current?.focus({ preventScroll: true });

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
                return;
            }
            if (e.key !== "Tab") return;

            const panel = overlayRef.current;
            const burger = burgerRef.current;
            if (!panel || !burger) return;

            const panelFocusables = Array.from(
                panel.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            );
            const focusables = [burger, ...panelFocusables];
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            burgerRef.current?.focus({ preventScroll: true });
        };
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
                    <a
                        ref={logoRef}
                        href="/"
                        aria-label="LP Web Studio home"
                        className="flex items-center"
                        tabIndex={isOpen ? -1 : undefined}
                    >
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
                        ref={burgerRef}
                        className="flex md:hidden flex-col items-center justify-center gap-[5px] w-11 h-11"
                        onClick={() => setIsOpen((p) => !p)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls={MOBILE_MENU_ID}
                    >
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-panel ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-opacity duration-panel ${isOpen ? "opacity-0" : "opacity-100"}`} />
                        <span className={`block h-[2px] w-5 bg-white transition-transform duration-panel ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </nav>
            </header>

            {/* Mobile overlay — mounted always, so it can leave the way it arrived */}
            <div
                ref={overlayRef}
                id={MOBILE_MENU_ID}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={[
                    "fixed inset-0 z-40 flex flex-col bg-obsidian pt-24 px-8 overflow-y-auto overscroll-contain pb-8",
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
                    {navLinks.map((link, index) => {
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
                        const isActive = pathname === link.href;
                        return (
                            <a
                                key={link.label}
                                ref={index === 0 ? firstLinkRef : undefined}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={[
                                    "font-headline font-bold uppercase tracking-tight text-white pb-6 break-words",
                                    isActive ? "border-b border-white" : "border-b border-white/10",
                                ].join(" ")}
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
