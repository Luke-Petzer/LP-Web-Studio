import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs } from "@/lib/knowledge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
    qaPageSchema,
    breadcrumbSchema,
    blogPostingSchema,
} from "@/components/seo/SchemaTemplates";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return {};

    return {
        title: article.title,
        description: article.description,
        alternates: {
            canonical: `https://lpwebstudio.co.za/learn/${slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            url: `https://lpwebstudio.co.za/learn/${slug}`,
            publishedTime: article.date,
        },
    };
}

export default async function LearnArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();

    const breadcrumbs = [
        { name: "Home", url: "https://www.lpwebstudio.co.za" },
        { name: "Learn", url: "https://www.lpwebstudio.co.za/learn" },
        { name: article.title, url: `https://www.lpwebstudio.co.za/learn/${slug}` },
    ];

    return (
        <>
            <JsonLd data={qaPageSchema(article.faq)} />
            <JsonLd data={breadcrumbSchema(breadcrumbs)} />
            <JsonLd data={blogPostingSchema({ ...article, slug })} />

            <Navigation />

            <main className="pt-[120px] pb-structural bg-[#0A0A0A] min-h-screen">
                <article
                    className="max-w-3xl mx-auto px-6 md:px-12"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                >
                    <nav
                        className="flex items-center gap-base text-xs font-mono text-white/40 mb-sectional"
                        aria-label="Breadcrumb"
                    >
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <span>/</span>
                        <a href="/learn" className="hover:text-white transition-colors">Learn</a>
                        <span>/</span>
                        <span className="text-white/60 truncate">{article.title}</span>
                    </nav>

                    <header className="mb-structural">
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
                            Knowledge Base
                        </p>
                        <h1
                            className="font-headline font-black uppercase text-white leading-[1.05] mb-component"
                            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
                            itemProp="headline"
                        >
                            {article.title}
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed mb-component" itemProp="description">
                            {article.description}
                        </p>
                        <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
                            Published{" "}
                            <time itemProp="datePublished" dateTime={article.date}>
                                {new Date(article.date).toLocaleDateString("en-ZA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </p>
                    </header>

                    <section
                        itemProp="articleBody"
                        className="prose prose-invert prose-lg max-w-none
              prose-headings:font-headline prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-structural prose-h2:mb-component
              prose-h3:text-xl prose-h3:mt-sectional prose-h3:mb-base
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-white/70 prose-li:marker:text-accent
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-[3px] prose-blockquote:border-accent prose-blockquote:text-white prose-blockquote:not-italic"
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />

                    {article.faq.length > 0 && (
                        <section className="mt-structural pt-structural border-t border-white/10">
                            <h2 className="font-headline font-black uppercase text-white text-2xl mb-sectional tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <div className="flex flex-col gap-sectional">
                                {article.faq.map((item) => (
                                    <div
                                        key={item.question}
                                        className="p-sectional border border-white/10 bg-white/[0.02] rounded-tight"
                                    >
                                        <h3 className="font-headline font-bold text-white mb-base text-lg">
                                            {item.question}
                                        </h3>
                                        <p className="text-white/70 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>

            <Footer />
        </>
    );
}
