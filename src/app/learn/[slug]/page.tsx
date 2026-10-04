import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllArticles, getAllSlugs } from "@/lib/knowledge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
    faqPageSchema,
    breadcrumbSchema,
    blogPostingSchema,
} from "@/components/seo/SchemaTemplates";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { ArticleCTA } from "@/components/organisms/ArticleCTA";
import { SITE_URL } from "@/lib/site";

const AUTHOR_NAME = "Luke Petzer";

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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
        authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/about` }],
        alternates: {
            canonical: `${SITE_URL}/learn/${slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            url: `${SITE_URL}/learn/${slug}`,
            publishedTime: article.date,
            modifiedTime: article.updated ?? article.date,
            authors: [AUTHOR_NAME],
            images: ["/og-image.png"],
        },
    };
}

export default async function LearnArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();

    // Other published articles, newest first — a contextual link between
    // articles (the list is already filtered of drafts and sorted).
    const related = (await getAllArticles())
        .filter((a) => a.slug !== slug)
        .slice(0, 2);

    const breadcrumbs = [
        { name: "Home", url: SITE_URL },
        { name: "Learn", url: `${SITE_URL}/learn` },
        { name: article.title, url: `${SITE_URL}/learn/${slug}` },
    ];

    return (
        <>
            <JsonLd data={faqPageSchema(article.faq)} />
            <JsonLd data={breadcrumbSchema(breadcrumbs)} />
            <JsonLd data={blogPostingSchema({ ...article, slug })} />

            <Navigation />

            <main className="pb-structural bg-[#0A0A0A] min-h-screen">
                {/* No `heading`: the hero renders no <h1> here, so the article
                    title below is the page's only one. */}
                <SubpageHero
                    title="LEARN"
                    subtitle="FIELD NOTES FROM THE STUDIO"
                />

                {/* ── Article body — landing-page rhythm ── */}
                <section className="py-20 md:py-28 px-6 md:px-12 bg-slate-dark border-t border-white/5 mt-16 md:mt-24">
                    <article className="max-w-3xl mx-auto">
                        <nav
                            className="flex items-center gap-2 text-xs font-mono text-white/50 mb-12"
                            aria-label="Breadcrumb"
                        >
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <span>/</span>
                            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
                            <span>/</span>
                            <span className="text-white/60 truncate">{article.title}</span>
                        </nav>

                        <header className="mb-16 md:mb-20">
                            <span className="section-label mb-6">FIELD NOTE</span>
                            <h1
                                className="font-headline font-black uppercase text-white leading-[1.02] mt-6 mb-6"
                                style={{
                                    fontSize: "clamp(2rem, 4.5vw, 3rem)",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {article.title}
                            </h1>
                            <p
                                className="text-white/70 leading-relaxed mb-6"
                                style={{ fontSize: "17px" }}
                            >
                                {article.description}
                            </p>
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
                                BY{" "}
                                <a
                                    href="/about"
                                    rel="author"
                                    className="underline underline-offset-4 hover:text-white transition-colors"
                                >
                                    {AUTHOR_NAME}
                                </a>
                                <span aria-hidden="true"> · </span>
                                PUBLISHED{" "}
                                <time dateTime={article.date}>{formatDate(article.date)}</time>
                                {article.updated && article.updated !== article.date && (
                                    <>
                                        <span aria-hidden="true"> · </span>
                                        UPDATED{" "}
                                        <time dateTime={article.updated}>
                                            {formatDate(article.updated)}
                                        </time>
                                    </>
                                )}
                            </p>
                        </header>

                        <section
                            className="prose prose-invert prose-lg max-w-none
                prose-headings:font-headline prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-white/70 prose-li:marker:text-accent
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-blockquote:border-l-[3px] prose-blockquote:border-accent prose-blockquote:text-white prose-blockquote:not-italic"
                            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                        />

                        {article.faq.length > 0 && (
                            <section className="mt-20 md:mt-24 pt-16 border-t border-white/10">
                                <span className="section-label mb-6">FAQ</span>
                                <h2
                                    className="font-headline font-black uppercase text-white leading-[0.95] mt-6 mb-12"
                                    style={{
                                        fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    Frequently Asked<br />Questions.
                                </h2>
                                <div className="flex flex-col gap-6">
                                    {article.faq.map((item) => (
                                        <div
                                            key={item.question}
                                            className="dark-card p-8 md:p-10"
                                        >
                                            <h3 className="font-headline font-bold uppercase text-white mb-4 text-lg tracking-tight">
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

                        <ArticleCTA />

                        {related.length > 0 && (
                            <aside
                                aria-label="More from the studio"
                                className="mt-20 md:mt-24 pt-16 border-t border-white/10"
                            >
                                <span className="section-label mb-8">KEEP READING</span>
                                <ul className="flex flex-col border-t border-white/10 mt-8">
                                    {related.map((item) => (
                                        <li key={item.slug} className="border-b border-white/10">
                                            <a
                                                href={`/learn/${item.slug}`}
                                                className="group block py-6 transition-colors duration-200 hover:bg-white/[0.04]"
                                            >
                                                <span className="font-headline font-bold uppercase text-white group-hover:text-white/80 text-lg tracking-tight block mb-2">
                                                    {item.title}
                                                </span>
                                                <span className="text-white/50 leading-relaxed text-sm block mb-3">
                                                    {item.description}
                                                </span>
                                                <span className="read-link">
                                                    READ <span aria-hidden="true">→</span>
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="/learn"
                                    className="font-headline text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors inline-block mt-6"
                                >
                                    All articles →
                                </a>
                            </aside>
                        )}
                    </article>
                </section>
            </main>

            <Footer />
        </>
    );
}
