import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Note: /_next/ is intentionally crawlable — blocking it stops
            // Googlebot fetching the JS/CSS it needs to render the pages.
            disallow: ["/api/"],
        },
        sitemap: "https://lpwebstudio.co.za/sitemap.xml",
    };
}
