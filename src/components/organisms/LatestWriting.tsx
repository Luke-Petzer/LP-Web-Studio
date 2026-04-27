import { getAllArticles } from "@/lib/knowledge";

export async function LatestWriting() {
    const articles = (await getAllArticles()).slice(0, 3);

    if (articles.length === 0) return null;

    return (
        <section
            aria-label="Latest writing"
            className="bg-obsidian border-t border-white/5 py-24 md:py-32 px-8 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <p
                            style={{
                                color: "#FF4500",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-space-grotesk)",
                                marginBottom: "12px",
                            }}
                        >
                            Knowledge Base
                        </p>
                        <h2
                            className="font-headline font-black uppercase text-white leading-none tracking-tight"
                            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
                        >
                            LATEST<br />WRITING.
                        </h2>
                    </div>
                    <a
                        href="/learn"
                        className="font-headline text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors self-start md:self-end"
                    >
                        All articles →
                    </a>
                </div>

                <div className="flex flex-col border-t border-white/10">
                    {articles.map((article) => (
                        <a
                            key={article.slug}
                            href={`/learn/${article.slug}`}
                            className="group block border-b border-white/10 py-8 md:py-10 transition-colors duration-200 hover:bg-white/[0.04]"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p
                                        style={{
                                            color: "#FF4500",
                                            fontSize: "9px",
                                            fontWeight: 700,
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            fontFamily: "var(--font-space-grotesk)",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {new Date(article.date).toLocaleDateString("en-ZA", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <h3
                                        className="font-headline font-bold uppercase text-white group-hover:text-white/80 transition-colors duration-200 mb-2"
                                        style={{
                                            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                                            letterSpacing: "-0.01em",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {article.title}
                                    </h3>
                                    <p
                                        className="text-white/55 leading-relaxed max-w-xl"
                                        style={{ fontSize: "14px" }}
                                    >
                                        {article.description}
                                    </p>
                                </div>
                                <span className="read-link shrink-0 md:pt-1">
                                    Read <span aria-hidden="true">→</span>
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
