const metrics = [
    { value: "99.9%", label: "Operational Uptime" },
    { value: "90+",   label: "PageSpeed Guarantee" },
    { value: "24ms",  label: "Average Latency" },
    { value: "100%",  label: "Custom Next.js" },
];

export function MetricsBanner() {
    return (
        <section aria-label="Key metrics" className="bg-obsidian py-24 px-8 md:px-12">
            <div
                className="grid grid-cols-2 lg:grid-cols-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
                {metrics.map(({ value, label }) => (
                    <div
                        key={label}
                        className="flex flex-col gap-3 p-10 md:p-12"
                        style={{ borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        <span className="font-headline font-bold tracking-tight text-white"
                              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}>
                            {value}
                        </span>
                        <span className="font-body text-[10px] font-bold tracking-[0.18em] uppercase text-white/40">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
