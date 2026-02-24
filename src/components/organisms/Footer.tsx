import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-void py-structural px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <Image
                        src="/My-Logo.png"
                        alt="LP Web Studio"
                        width={140}
                        height={40}
                        className="h-10 w-auto mb-4 brightness-0 invert"
                    />
                    <p className="text-white/40 text-xs tracking-widest uppercase">
                        &copy; 2026 LP Web Studio. Cape Town, SA.
                    </p>
                </div>

                {/* Social */}
                <div className="flex gap-8">
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

                {/* Tagline */}
                <div className="text-white/40 text-[10px] tracking-widest uppercase text-center md:text-right">
                    Engineered for speed
                </div>
            </div>
        </footer>
    );
}
