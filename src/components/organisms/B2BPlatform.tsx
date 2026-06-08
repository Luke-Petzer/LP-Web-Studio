const cards = [
    {
        label: "01 / The Bottleneck",
        title: "Growth is bottlenecked by manual admin and scattered communication.",
        body: "Scattered WhatsApp messages, manual spreadsheet entry, and outdated PDF price lists cause costly human errors and limit your ability to scale.",
    },
    {
        label: "02 / The Solution",
        title: "A centralized, role-based ordering portal built for your exact operational workflow.",
        body: "Clients get secure logins with custom pricing. They browse a live, synced catalog and place orders through an automated 24/7 self-serve engine.",
    },
    {
        label: "03 / The Impact",
        title: "End-to-end automation. Orders sync instantly with zero human touchpoints.",
        body: "The moment a client clicks \"Submit,\" the order routes instantly to the warehouse and accounting software without a single staff member touching a keyboard. Process 10x the volume with 100% accuracy.",
    },
];

const tags = ["PostgreSQL", "Next.js", "n8n", "WhatsApp API"];

export function B2BPlatform() {
    return (
        <section
            aria-label="B2B Ordering Platform"
            className="relative isolate py-24 md:py-32 px-8 md:px-12 bg-slate-dark border-t border-white/5"
        >
            {/* Continuously animated geometric lines — full section background */}
            <div className="section-geo-lines" aria-hidden="true" />

            {/* Geometric line accents — top strip */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "160px" }}>
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line x1="0" y1="100%" x2="12%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="12%" y1="0" x2="12%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="12%" y1="40%" x2="40%" y2="40%" stroke="white" strokeWidth="1"/>
                    <line x1="65%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="80%" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1"/>
                </svg>
            </div>
            {/* Geometric line accents — bottom strip */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "160px" }}>
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="25%" y2="0" stroke="white" strokeWidth="1"/>
                    <line x1="0" y1="0" x2="0" y2="50%" stroke="white" strokeWidth="1"/>
                    <line x1="88%" y1="50%" x2="88%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="65%" y1="100%" x2="88%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="88%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1"/>
                </svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* ── Left: scrolling problem/solution/impact cards ── */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    {cards.map((card) => (
                        <div key={card.label} className="dark-card p-10 md:p-12 min-h-[320px] flex flex-col justify-between">
                            <div>
                                <span className="mono-label">{card.label}</span>
                                <div className="w-10 h-px bg-white/20 mt-3" />
                            </div>
                            <div className="mt-8">
                                <h3
                                    className="font-headline font-bold uppercase tracking-tight text-white mb-5"
                                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                                >
                                    {card.title}
                                </h3>
                                <p className="text-white/60 text-base leading-relaxed">
                                    {card.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Right: sticky headline ── */}
                <div className="lg:col-span-6 lg:sticky lg:top-32 h-fit flex flex-col gap-6">
                    <span className="mono-label">RECENT WORK</span>

                    <h2
                        className="font-headline font-bold uppercase tracking-[-0.04em] text-white"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    >
                        B2B Ordering<br />Platform
                    </h2>

                    <p
                        className="font-headline font-bold uppercase tracking-tight leading-none"
                        style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", color: "#FF4D00" }}
                    >
                        Zero Manual Entry
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {tags.map((tag) => (
                            <span key={tag} className="pill">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
