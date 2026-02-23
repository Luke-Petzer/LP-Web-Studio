const SITE_URL = "https://www.lpwebstudio.co.za";
const SITE_NAME = "LP Web Studio";

export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebDesignAndDevelopmentBusiness",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        priceRange: "$$",
        description:
            "Cape Town's high-performance web agency guaranteeing 90+ Google PageSpeed scores and instant lead generation through WhatsApp.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressRegion: "WC",
            addressCountry: "ZA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "-33.9249",
            longitude: "18.4241",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
        },
        sameAs: [
            "https://www.linkedin.com/company/lp-web-studio",
            "https://github.com/Luke-Petzer",
        ],
    };
}

export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/learn?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
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
