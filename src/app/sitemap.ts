import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/knowledge";

const SITE_URL = "https://www.lpwebstudio.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
    const knowledgeSlugs = getAllSlugs();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/learn`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const knowledgePages: MetadataRoute.Sitemap = knowledgeSlugs.map((slug) => ({
        url: `${SITE_URL}/learn/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...knowledgePages];
}
