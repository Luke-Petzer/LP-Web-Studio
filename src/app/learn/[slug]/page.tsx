import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs } from "@/lib/knowledge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
    qaPageSchema,
    breadcrumbSchema,
    blogPostingSchema,
} from "@/components/seo/SchemaTemplates";

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
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
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
            {/* SEO Layer 3: JSON-LD Schemas */}
            <JsonLd data={qaPageSchema(article.faq)} />
            <JsonLd data={breadcrumbSchema(breadcrumbs)} />
            <JsonLd data={blogPostingSchema({ ...article, slug })} />

            <main className="pt-grandeur pb-structural">
                <article
                    className="section-container max-w-3xl mx-auto"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                >
                    {/* Breadcrumb */}
                    <nav
                        className="flex items-center gap-base text-xs font-mono text-secondary mb-sectional"
                        aria-label="Breadcrumb"
                    >
                        <a href="/" className="hover:text-accent transition-colors">Home</a>
                        <span>/</span>
                        <a href="/learn" className="hover:text-accent transition-colors">Learn</a>
                        <span>/</span>
                        <span className="text-secondary-light">{article.title}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-structural">
                        <h1
                            className="text-3xl md:text-4xl font-heading font-bold text-white mb-component"
                            itemProp="headline"
                        >
                            {article.title}
                        </h1>
                        <p className="text-base text-secondary mb-component" itemProp="description">
                            {article.description}
                        </p>
                        <p className="text-sm text-secondary font-mono">
                            Published:{" "}
                            <time itemProp="datePublished" dateTime={article.date}>
                                {new Date(article.date).toLocaleDateString("en-ZA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </p>
                    </header>

                    {/* Content */}
                    <section
                        itemProp="articleBody"
                        className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-structural prose-h2:mb-component
              prose-h3:text-xl prose-h3:mt-sectional prose-h3:mb-base
              prose-p:text-secondary-light prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-secondary-light prose-li:marker:text-accent
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />

                    {/* FAQ Section (if present) */}
                    {article.faq.length > 0 && (
                        <section className="mt-structural pt-structural border-t border-glass-border-dim">
                            <h2 className="text-2xl font-heading font-bold text-white mb-sectional">
                                Frequently Asked Questions
                            </h2>
                            <div className="flex flex-col gap-sectional">
                                {article.faq.map((item) => (
                                    <div key={item.question} className="glass-card p-sectional">
                                        <h3 className="text-lg font-heading font-semibold text-white mb-base">
                                            {item.question}
                                        </h3>
                                        <p className="text-base text-secondary-light leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>
        </>
    );
}
