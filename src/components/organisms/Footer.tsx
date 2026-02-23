import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-void py-structural px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-12 h-12 rounded-full bg-white text-void flex items-center justify-center font-heading font-bold text-lg mb-4">
                        LP
                    </div>
                    <p className="text-white/40 text-xs tracking-widest uppercase">
                        &copy; 2026 LP Web Studio. Cape Town, SA.
                    </p>
                </div>

                {/* Social */}
                <div className="flex gap-8">
                    <a
                        href="https://www.instagram.com/lp_web_studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                    <a
                        href="https://wa.me/27681071838"
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
