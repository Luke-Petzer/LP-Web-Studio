// src/app/learn/page.tsx
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/knowledge";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SubpageHero } from "@/components/organisms/SubpageHero";

export const metadata: Metadata = {
    title: "Web Development Insights | LP Web Studio",
    description:
        "Practical guides on Next.js, website performance, and digital infrastructure for Cape Town businesses.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/learn",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/learn",
        title: "Web Development Insights | LP Web Studio",
        description:
            "Practical guides on Next.js, website performance, and digital infrastructure for Cape Town businesses.",
    },
};

export default async function LearnPage() {
    const articles = await getAllArticles();

    return (
        <>
            <Navigation />
            <main className="pb-structural bg-[#0A0A0A] min-h-screen">
                <SubpageHero
                    breadcrumb="LP WEB / LEARN"
                    title="LEARN"
                    subtitle="FIELD NOTES ON BUILDING FAST WEBSITES"
                />

                {/* ── Field Notes — article index ── */}
                <section className="py-24 md:py-32 px-6 md:px-12 bg-slate-dark border-t border-white/5 mt-16 md:mt-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20">
                            <div className="lg:col-span-5">
                                <span className="section-label">01 — FIELD NOTES</span>
                                <h2
                                    className="font-headline font-black uppercase text-white leading-[0.9] mt-8"
                                    style={{
                                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                        letterSpacing: "-0.03em",
                                    }}
                                >
                                    RECENT<br />WRITING.
                                </h2>
                            </div>
                            <div className="lg:col-span-7 lg:pt-6">
                                <p
                                    className="text-white/55 leading-relaxed"
                                    style={{ fontSize: "15px" }}
                                >
                                    Practical guides on Next.js, website performance, and digital
                                    infrastructure — written from the studio, for operators who
                                    care about shipping fast. No tutorials-for-tutorials-sake;
                                    every piece ties back to work we&rsquo;ve shipped for clients.
                                </p>
                            </div>
                        </div>

                        {/* Article list — editorial rows */}
                        <div className="flex flex-col border-t border-white/10">
                            {articles.map((article) => (
                                <a
                                    key={article.slug}
                                    href={`/learn/${article.slug}`}
                                    style={{ textDecoration: "none" }}
                                    className="group block border-b border-white/10 py-10 md:py-12 transition-colors duration-200 hover:bg-white/[0.04]"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                                        <div className="lg:col-span-2">
                                            <p
                                                style={{
                                                    color: "#FF4D00",
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    letterSpacing: "0.2em",
                                                    textTransform: "uppercase",
                                                    fontFamily: "var(--font-space-grotesk)",
                                                }}
                                            >
                                                {new Date(article.date).toLocaleDateString("en-ZA", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="lg:col-span-8">
                                            <h3
                                                className="font-headline font-bold uppercase text-white group-hover:text-white/80 transition-colors duration-200 mb-3"
                                                style={{
                                                    fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                                                    letterSpacing: "-0.02em",
                                                    lineHeight: 1.15,
                                                }}
                                            >
                                                {article.title}
                                            </h3>
                                            <p
                                                className="text-white/50 leading-relaxed"
                                                style={{ fontSize: "14px", maxWidth: "560px" }}
                                            >
                                                {article.description}
                                            </p>
                                        </div>
                                        <div className="lg:col-span-2 lg:text-right lg:pt-2">
                                            <span className="read-link">
                                                READ <span aria-hidden="true">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
