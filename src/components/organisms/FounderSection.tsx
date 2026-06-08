import Image from "next/image";

export function FounderSection() {
    return (
        <section
            aria-label="Founder"
            className="py-24 md:py-32 px-8 md:px-12 bg-obsidian border-t border-white/5"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

                {/* ── Left: portrait ── */}
                <div className="md:col-span-4 flex justify-center">
                    <div className="relative w-full aspect-[4/5] max-w-sm overflow-hidden bg-zinc-900 group">
                        <Image
                            src="/luke-petzer.jpg"
                            alt="Luke Petzer — LP Web Studio"
                            fill
                            className="object-cover grayscale brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Bottom fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
                    </div>
                </div>

                {/* ── Right: conviction quote ── */}
                <div className="md:col-span-8">
                    <blockquote className="flex flex-col gap-8">
                        <p
                            className="font-headline font-medium text-white leading-tight tracking-tight"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
                        >
                            You don&apos;t need another generic website. You need an engine.
                            My focus is entirely on engineering the backend systems, client
                            portals, and automations that let you step out of the daily admin
                            and actually scale your operations.
                        </p>
                        <footer className="flex flex-col gap-1">
                            <cite className="not-italic font-headline font-bold text-white uppercase tracking-widest text-lg">
                                Luke Petzer
                            </cite>
                            <span className="mono-label">Lead Architect</span>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
