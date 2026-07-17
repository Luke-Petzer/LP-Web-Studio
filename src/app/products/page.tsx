import type { Metadata } from "next";
import { ProductsPageContent } from "@/components/organisms/ProductsPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Products | B2B Ordering Platform & lp-os",
    description:
        "The B2B ordering platform that replaces WhatsApp order chaos with a self-serve portal, and lp-os — the business command centre LP Web Studio runs on. See a live demo and current pricing.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/products",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/products",
        title: "Products | B2B Ordering Platform & lp-os",
        description:
            "The B2B ordering platform that replaces WhatsApp order chaos with a self-serve portal, and lp-os — the business command centre LP Web Studio runs on.",
    },
};

const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
        {
            "@type": "Product",
            position: 1,
            name: "B2B Ordering Platform",
            description:
                "Branded ordering portal for wholesalers and distributors — custom pricing, live catalogue, credit/EFT checkout, and an admin dashboard. Installable as an app on customers' phones.",
            brand: { "@type": "Organization", name: "LP Web Studio" },
            offers: [
                {
                    "@type": "Offer",
                    name: "Branded Ordering Platform (Tier 1)",
                    priceCurrency: "ZAR",
                    price: "12500",
                    description: "Setup fee. Plus R1,950/month for hosting, care, updates, and monitoring.",
                },
                {
                    "@type": "Offer",
                    name: "Payments Add-on (Tier 2)",
                    priceCurrency: "ZAR",
                    price: "6500",
                    description: "Setup fee. Plus R450/month for provider webhooks, reconciliation, and support.",
                },
            ],
        },
        {
            "@type": "Product",
            position: 2,
            name: "lp-os",
            description:
                "Internal business command centre for managing clients, projects, and admin. Currently in a limited pilot programme.",
            brand: { "@type": "Organization", name: "LP Web Studio" },
        },
    ],
};

export default function ProductsPage() {
    return (
        <>
            <JsonLd data={productsSchema} />
            <Navigation />
            <main className="pb-structural">
                <ProductsPageContent />
            </main>
            <Footer />
        </>
    );
}
