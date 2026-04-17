// src/app/learn/page.tsx
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/knowledge";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

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
            <main
                style={{ background: "#0A0A0A", minHeight: "100vh" }}
                className="pt-[120px] pb-24 px-6 md:px-12"
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p
                            style={{
                                color: "#FF4500",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-space-grotesk)",
                                marginBottom: "12px",
                            }}
                        >
                            KNOWLEDGE BASE
                        </p>
                        <h1
                            className="font-headline font-black uppercase text-white leading-none"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
                        >
                            WEB DEVELOPMENT<br />INSIGHTS.
                        </h1>
                        <p
                            className="text-white/55 mt-4 max-w-xl leading-relaxed"
                            style={{ fontSize: "15px", fontFamily: "var(--font-space-grotesk)" }}
                        >
                            Practical guides on Next.js, website performance, and digital
                            infrastructure for Cape Town businesses.
                        </p>
                    </div>

                    {/* Article cards */}
                    <div className="flex flex-col gap-px border-t border-white/10">
                        {articles.map((article) => (
                            <a
                                key={article.slug}
                                href={`/learn/${article.slug}`}
                                style={{ textDecoration: "none" }}
                                className="group block border-b border-white/10 py-10 transition-colors duration-200 hover:bg-white/[0.02]"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
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
                                        <h2
                                            className="font-headline font-bold uppercase text-white group-hover:text-white/80 transition-colors duration-200"
                                            style={{
                                                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                                                letterSpacing: "-0.01em",
                                                lineHeight: 1.2,
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {article.title}
                                        </h2>
                                        <p
                                            className="text-white/50 leading-relaxed"
                                            style={{ fontSize: "14px", maxWidth: "560px" }}
                                        >
                                            {article.description}
                                        </p>
                                    </div>
                                    <div className="shrink-0 md:pt-1">
                                        <span
                                            style={{
                                                color: "#FF4500",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                fontFamily: "var(--font-space-grotesk)",
                                            }}
                                        >
                                            READ →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
