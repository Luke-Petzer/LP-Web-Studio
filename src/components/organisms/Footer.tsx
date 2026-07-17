"use client";

import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { useDrawer } from "@/lib/contact-drawer-context";

export function Footer() {
    const { openDrawer } = useDrawer();
    return (
        <footer className="bg-obsidian border-t border-white/5 w-full px-8 md:px-12 py-14">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Legal */}
                <p className="mono-label">
                    © 2026 LP Web Studio. All rights reserved.
                </p>

                {/* Nav links */}
                <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {[
                        { label: "Work",     href: "/work" },
                        { label: "Products", href: "/products" },
                        { label: "About",    href: "/about" },
                        { label: "Privacy",  href: "/privacy" },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="mono-label hover:text-white transition-colors duration-200 py-3"
                        >
                            {label}
                        </a>
                    ))}
                    <button
                        onClick={openDrawer}
                        className="mono-label hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer py-3"
                    >
                        Contact
                    </button>
                </nav>

                {/* Status + socials */}
                <div className="flex items-center gap-6">
                    {/* Systems online indicator */}
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="mono-label">Systems Online</span>
                    </div>

                    {/* Social icons */}
                    <a
                        href="https://www.instagram.com/lp.web.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center justify-center w-11 h-11 -m-2"
                    >
                        <Instagram className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                    <a
                        href="https://wa.me/27673852286"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center justify-center w-11 h-11 -m-2"
                    >
                        <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
