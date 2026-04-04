import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-void py-24 md:py-32 px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
                    {/* Brand Block (Left) */}
                    <div className="flex flex-col items-center md:items-start">
                        <Image
                            src="/My-Logo.png"
                            alt="LP Web Studio"
                            width={140}
                            height={40}
                            className="h-10 mb-4 brightness-0 invert"
                        />
                        <p className="text-white/40 text-[10px] tracking-widest uppercase">
                            Cape Town, SA.
                        </p>
                    </div>

                    {/* Nav Links & Email (Center) */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-6 md:gap-8">
                            <a
                                href="#capabilities"
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors"
                            >
                                Work
                            </a>
                            <a
                                href="#founder"
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="#contact"
                                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                        <a
                            href="mailto:contact@lpwebstudio.co.za"
                            className="font-mono text-[10px] text-white/50 hover:text-white/80 transition-colors tracking-wide"
                        >
                            contact@lpwebstudio.co.za
                        </a>
                    </div>

                    {/* Social Icons (Right) */}
                    <div className="flex flex-col items-center">
                        <div className="flex gap-8 mb-4">
                            <a
                                href="https://www.instagram.com/lp.web.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" strokeWidth={1.5} />
                            </a>
                            <a
                                href="https://wa.me/27673852286"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
                            </a>
                        </div>
                        <p className="text-white/40 text-[10px] tracking-widest uppercase text-center">
                            High-performance systems. Built in Cape Town.
                        </p>
                    </div>
                </div>

                {/* Legal Section */}
                <div className="border-t border-white/[0.06] pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="font-mono text-[10px] text-white/30">
                            © 2026 LP Web Studio. All rights reserved.
                        </p>
                        <a
                            href="/privacy"
                            className="font-mono text-[10px] text-white/30 hover:text-white/60 transition-colors"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
