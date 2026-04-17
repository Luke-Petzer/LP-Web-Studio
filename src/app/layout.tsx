import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/components/seo/SchemaTemplates";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { DrawerProvider } from "@/lib/contact-drawer-context";
import { ContactDrawer } from "@/components/organisms/ContactDrawer";

/* ─── Font Loading (display: swap prevents FOIT) ─── */
const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
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
        default: "LP Web Studio | Web Development & Automation Cape Town",
        template: "%s | LP Web Studio",
    },
    description:
        "LP Web Studio builds custom Next.js websites and n8n automation systems for Cape Town businesses. Hand-coded, no WordPress, guaranteed 90+ PageSpeed scores.",
    keywords: [
        "web developer Cape Town",
        "custom website Cape Town",
        "Next.js developer South Africa",
        "n8n automation Cape Town",
        "fast website Cape Town",
        "website speed optimisation Cape Town",
        "business automation South Africa",
        "custom web application Cape Town",
        "WhatsApp lead capture website",
        "React developer Cape Town",
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
        title: "LP Web Studio | Web Development & Automation Cape Town",
        description: "Custom Next.js websites and n8n automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed.",
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
        title: "LP Web Studio | Web Development & Automation Cape Town",
        description: "Custom Next.js websites and n8n automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed.",
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
                    <SpeedInsights />
                </DrawerProvider>
            </body>
        </html>
    );
}