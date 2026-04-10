import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/components/seo/SchemaTemplates";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { DrawerProvider } from "@/lib/contact-drawer-context";
import { ContactDrawer } from "@/components/organisms/ContactDrawer";

/* ─── Font Loading (display: swap prevents FOIT) ─── */
const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const inter = Inter({
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
    metadataBase: new URL("https://lpwebstudio.co.za"),
    title: {
        default: "LP Web Studio | Cape Town High-Performance Web Development",
        template: "%s | LP Web Studio",
    },
    description:
        "Fix your slow WordPress website. LP Web Studio builds high-performance Next.js sites in Cape Town with integrated WhatsApp booking systems. See our pricing and speed guarantees.",
    keywords: [
        "website cost South Africa",
        "slow WordPress website",
        "fix slow WordPress site",
        "WhatsApp booking systems",
        "WhatsApp ordering system setup",
        "website maintenance cost Cape Town",
        "Next.js web developer",
        "high performance website",
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
    alternates: {
        canonical: "https://lpwebstudio.co.za",
    },
    icons: {
        icon: "/icon.svg",
        apple: "/icon.svg",
    },
    openGraph: {
        type: "website",
        locale: "en_ZA",
        url: "https://lpwebstudio.co.za",
        siteName: "LP Web Studio",
        title: "LP Web Studio | Cape Town High-Performance Web Development",
        description: "Fix your slow WordPress website. Custom Next.js builds with integrated WhatsApp booking systems.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "LP Web Studio - High-Performance Web Architecture",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "LP Web Studio | Cape Town High-Performance Web Development",
        description: "Fix your slow WordPress website. Custom Next.js builds with integrated WhatsApp booking systems.",
        images: ["/og-image.png"],
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
            className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
        >
            <head>
                {/* SEO Layer 3: Global JSON-LD Schemas */}
                <JsonLd data={localBusinessSchema()} />
                <JsonLd data={websiteSchema()} />
            </head>
            <body className="font-body antialiased overflow-x-hidden">
                <DrawerProvider>
                    {children}
                    <ContactDrawer />
                    <Analytics />
                </DrawerProvider>
            </body>
        </html>
    );
}