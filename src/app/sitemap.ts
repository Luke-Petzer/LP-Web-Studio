import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/knowledge";
import { SITE_URL } from "@/lib/site";

// Generated once per build, never at request time. The article list comes
// from content/knowledge-base/*.md, which is read with `fs`. At build time the
// repo is on disk, so that works (it is how the /learn article pages
// themselves are generated). At request time, inside the serverless function
// Vercel creates for a dynamic route, the content folder is most likely not
// bundled — under `force-dynamic` the live sitemap lost both articles while
// the build-time pages kept working (seo-audit-2026-10, #2; cause inferred,
// not reproduced on Vercel). `force-static` pins the sitemap to build time so
// it can't disagree with the pages. <lastmod> stays stable: static routes use
// the dates below and articles use their frontmatter dates — never
// `new Date()`.
export const dynamic = "force-static";

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
    "/privacy": "2026-09-28",
    "/accessibility": "2026-09-27",
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
        {
            url: `${SITE_URL}/accessibility`,
            lastModified: STATIC_LAST_MODIFIED["/accessibility"],
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Each published article's own date (its `updated` date when it has one)
    // — real per-article freshness instead of a blanket timestamp
    // (seo-audit-2026-09, H4).
    // Drafts never reach this list: getAllArticles() filters them out.
    const articles = await getAllArticles();
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${SITE_URL}/learn/${article.slug}`,
        lastModified: article.updated ?? article.date,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...core, ...articleEntries];
}
