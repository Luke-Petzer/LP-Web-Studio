import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "LP Web Studio",
        short_name: "LP Web",
        description:
            "Ordering systems, client platforms, and business automation for South African businesses.",
        start_url: "/",
        display: "standalone",
        background_color: "#0B0B0B",
        theme_color: "#0B0B0B",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
