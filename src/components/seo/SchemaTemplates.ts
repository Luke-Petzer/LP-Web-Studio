const SITE_URL = "https://lpwebstudio.co.za";
const SITE_NAME = "LP Web Studio";

export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        name: SITE_NAME,
        description:
            "Cape Town systems studio building custom ordering portals, client platforms, and business automation that replace manual admin for South African businesses.",
        url: SITE_URL,
        telephone: "+27673852286",
        email: "contact@lpwebstudio.co.za",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressRegion: "Western Cape",
            addressCountry: "ZA",
        },
        areaServed: [
            { "@type": "City", name: "Cape Town" },
            { "@type": "Country", name: "South Africa" },
        ],
        priceRange: "R35000+",
        knowsAbout: [
            "Custom ordering systems",
            "B2B client portals",
            "Business automation",
            "WhatsApp business integration",
            "Custom web applications",
            "Custom software development",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Custom Systems & Automation",
            itemListElement: [
                {
                    "@type": "Offer",
                    name: "Ordering Portal",
                    priceCurrency: "ZAR",
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        minPrice: "35000",
                        priceCurrency: "ZAR",
                    },
                    description:
                        "Custom B2B ordering portal with role-based logins, live catalogue, and automated order routing",
                    url: SITE_URL,
                },
                {
                    "@type": "Offer",
                    name: "Client Platform",
                    priceCurrency: "ZAR",
                    priceSpecification: {
                        "@type": "PriceSpecification",
                        minPrice: "35000",
                        priceCurrency: "ZAR",
                    },
                    description:
                        "Custom client platform that replaces email chains and spreadsheets with a single source of truth",
                    url: SITE_URL,
                },
                {
                    "@type": "Offer",
                    name: "Business Automation",
                    priceCurrency: "ZAR",
                    description:
                        "Automations that replace manual admin — order routing, invoicing, and stock updates without a keyboard",
                    url: SITE_URL,
                },
            ],
        },
    };
}

export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
    };
}

interface FaqItem {
    question: string;
    answer: string;
}

export function faqPageSchema(faqs: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function qaPageSchema(faqs: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

interface ArticleSchemaInput {
    title: string;
    description: string;
    date: string;
    slug: string;
}

export function personSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Luke Petzer",
        jobTitle: "Systems Builder",
        worksFor: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        url: `${SITE_URL}/about`,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressRegion: "Western Cape",
            addressCountry: "ZA",
        },
        knowsAbout: [
            "Custom ordering systems",
            "B2B client portals",
            "Business automation",
            "Custom web applications",
            "Custom software development",
        ],
        sameAs: ["https://www.instagram.com/lp.web.studio"],
    };
}

export function blogPostingSchema(article: ArticleSchemaInput) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        author: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                // /logo.png does not exist — public/ ships logo.svg.
                url: `${SITE_URL}/logo.svg`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/learn/${article.slug}`,
        },
    };
}
