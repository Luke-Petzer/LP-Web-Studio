import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/knowledge";
import { SITE_URL } from "@/lib/site";

// Metadata routes are static by default, so this file's output would
// otherwise be baked in at build time and never refreshed — which is how
// every <lastmod> ended up frozen at the same two-month-old timestamp
// (seo-audit-2026-09, H4). Forcing it dynamic makes every deploy regenerate
// the sitemap from current source data instead of serving a stale build.
export const dynamic = "force-dynamic";

/**
 * Stable "last meaningfully changed" date for each static route, taken from
 * that route's own `git log -1 -- <path>` at the time this file was last
 * touched (18 Sep 2026). Update the relevant entry here when a route's
 * actual content changes — do not replace this with `new Date()`, which is
 * exactly the frozen/misleading blanket timestamp this replaced.
 */
const STATIC_LAST_MODIFIED: Record<string, string> = {
    "/": "2026-07-25",
    "/work": "2026-07-17",
    "/products": "2026-07-17",
    "/about": "2026-07-17",
    "/learn": "2026-07-25",
    "/privacy": "2026-09-05",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const core: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}`,
            lastModified: STATIC_LAST_MODIFIED["/"],
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/work`,
            lastModified: STATIC_LAST_MODIFIED["/work"],
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/products`,
            lastModified: STATIC_LAST_MODIFIED["/products"],
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: STATIC_LAST_MODIFIED["/about"],
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/learn`,
            lastModified: STATIC_LAST_MODIFIED["/learn"],
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: STATIC_LAST_MODIFIED["/privacy"],
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Each article's own frontmatter date — real per-article freshness
    // instead of a blanket timestamp (seo-audit-2026-09, H4).
    const articles = await getAllArticles();
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${SITE_URL}/learn/${article.slug}`,
        lastModified: article.date,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...core, ...articleEntries];
}
