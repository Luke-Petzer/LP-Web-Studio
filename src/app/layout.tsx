import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/components/seo/SchemaTemplates";
import "./globals.css";

/* ─── Font Loading (display: swap prevents FOIT) ─── */
const jakarta = Plus_Jakarta_Sans({
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-jakarta",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    weight: ["400", "500"],
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    weight: ["300", "400", "500"],
    variable: "--font-jetbrains",
    subsets: ["latin"],
    display: "swap",
});

/* ─── Global Metadata (SEO Layer 4: AI Meta Tags) ─── */
export const metadata: Metadata = {
    metadataBase: new URL("https://www.lpwebstudio.co.za"),
    title: {
        default: "LP Web Studio | Cape Town High-Performance Web Development",
        template: "%s | LP Web Studio",
    },
    description:
        "Tired of slow websites that don't convert? LP Web Studio is Cape Town's only high-performance agency guaranteeing 90+ Google PageSpeed scores and instant lead generation through WhatsApp.",
    keywords: [
        "web development cape town",
        "next.js developer",
        "high performance website",
        "pagespeed optimization",
        "small business website",
        "whatsapp integration",
        "cape town web agency",
    ],
    authors: [{ name: "LP Web Studio" }],
    creator: "LP Web Studio",
    publisher: "LP Web Studio",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_ZA",
        url: "https://www.lpwebstudio.co.za",
        siteName: "LP Web Studio",
        title: "LP Web Studio | Cape Town High-Performance Web Development",
        description:
            "Cape Town's only agency guaranteeing 90+ PageSpeed scores and instant WhatsApp lead generation.",
    },
    twitter: {
        card: "summary_large_image",
        title: "LP Web Studio | Cape Town High-Performance Web Development",
        description:
            "Cape Town's only agency guaranteeing 90+ PageSpeed scores and instant WhatsApp lead generation.",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
        >
            <head>
                <link rel="canonical" href="https://www.lpwebstudio.co.za" />
                {/* SEO Layer 3: Global JSON-LD Schemas */}
                <JsonLd data={localBusinessSchema()} />
                <JsonLd data={websiteSchema()} />
            </head>
            <body className="bg-white text-ink font-body antialiased">
                {children}
            </body>
        </html>
    );
}
