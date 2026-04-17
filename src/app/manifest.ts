import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "LP Web Studio",
        short_name: "LP Web",
        description:
            "Custom Next.js websites and n8n automation systems for Cape Town businesses.",
        start_url: "/",
        display: "standalone",
        background_color: "#0B0B0B",
        theme_color: "#0B0B0B",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
