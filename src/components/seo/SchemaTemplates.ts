const SITE_URL = "https://lpwebstudio.co.za";
const SITE_NAME = "LP Web Studio";

export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        name: SITE_NAME,
        description:
            "Cape Town web development studio specialising in custom Next.js websites, n8n automation systems, and high-performance web applications. Guaranteed 90+ PageSpeed scores.",
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
        priceRange: "R5500 - R21500",
        knowsAbout: [
            "Next.js development",
            "React web applications",
            "n8n automation",
            "WhatsApp business integration",
            "Web performance optimisation",
            "Supabase",
            "Vercel Edge Network",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web Development Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    name: "Starter Website",
                    price: "5500",
                    priceCurrency: "ZAR",
                    description:
                        "1-page high-performance Next.js website with WhatsApp lead capture",
                    url: SITE_URL,
                },
                {
                    "@type": "Offer",
                    name: "Professional Website",
                    price: "12500",
                    priceCurrency: "ZAR",
                    description:
                        "3-page custom Next.js website with automated booking integration and 90+ PageSpeed",
                    url: SITE_URL,
                },
                {
                    "@type": "Offer",
                    name: "Custom Web Application",
                    price: "21500",
                    priceCurrency: "ZAR",
                    description:
                        "Full Next.js application with database, n8n automation pipelines, and AI lead generation",
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
        jobTitle: "Web Developer & Automation Engineer",
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
            "Next.js",
            "React",
            "TypeScript",
            "n8n automation",
            "Supabase",
            "Vercel Edge Network",
            "Web performance optimisation",
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
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/learn/${article.slug}`,
        },
    };
}
