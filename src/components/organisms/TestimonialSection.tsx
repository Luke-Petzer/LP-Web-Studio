export function TestimonialSection() {
    return (
        <section
            aria-label="Client testimonial"
            className="py-24 md:py-32 px-8 md:px-12 bg-obsidian"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section label */}
                <div className="mb-14">
                    <span className="mono-label">04 — Validation</span>
                </div>

                {/* Centered quote */}
                <div className="flex justify-center">
                    <div className="max-w-4xl text-center flex flex-col items-center">
                        <blockquote className="mb-12">
                            <p
                                className="font-headline font-medium italic text-white leading-tight tracking-tight"
                                style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
                            >
                                Luke has been exceptional from start to finish on the project. His
                                professionalism and work ethic is above what I&apos;ve experienced in
                                the industry and his execution of planning is pinpoint. Please, save
                                yourself from having to run around after designers and use Luke —
                                phenomenal individual.
                            </p>
                        </blockquote>

                        {/* Attribution */}
                        <footer className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                                <span className="font-headline font-bold text-black text-sm">G</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <cite className="not-italic font-headline font-bold text-white uppercase tracking-widest text-base">
                                    Gio
                                </cite>
                                <span className="mono-label">Owner, Cafe Crave</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}
