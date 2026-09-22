import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Note: /_next/ is intentionally crawlable — blocking it stops
            // Googlebot fetching the JS/CSS it needs to render the pages.
            disallow: ["/api/"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
