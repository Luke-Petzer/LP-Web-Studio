import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    async redirects() {
        return [
            {
                source: "/contact",
                destination: "/",
                permanent: true,
            },
        ];
    },

    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },

    // React Compiler: uncomment when babel-plugin-react-compiler is installed
    // experimental: {
    //     reactCompiler: true,
    // },
};

export default nextConfig;
