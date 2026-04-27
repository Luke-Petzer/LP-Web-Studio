import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/knowledge";

const SITE_URL = "https://lpwebstudio.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const core: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/work`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/learn`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/audit`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    const articles: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
        url: `${SITE_URL}/learn/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...core, ...articles];
}
