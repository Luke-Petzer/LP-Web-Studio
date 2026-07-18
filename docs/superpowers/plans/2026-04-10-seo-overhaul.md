# SEO & Copy Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete SEO, metadata, structured data, and copywriting overhaul of lpwebstudio.co.za — fixing broken technical signals, rewriting every page's metadata, updating JSON-LD schemas, refreshing page copy, and creating a `/learn` index page.

**Architecture:** Changes span static public files, Next.js page metadata exports, JSON-LD schema templates, React component copy, and markdown frontmatter. No layout or structural component changes. Every change is text/data only unless noted.

**Tech Stack:** Next.js 15 App Router, TypeScript, JSON-LD via custom JsonLd component, markdown frontmatter via gray-matter, `src/components/seo/SchemaTemplates.ts` for schema generation.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `public/robots.txt` | Correct Sitemap URL, add API disallow |
| Modify | `public/sitemap.xml` | Replace stale sitemap with current routes at correct domain |
| Modify | `src/app/layout.tsx` | Fix metadataBase, canonical, global title/desc/keywords |
| Modify | `src/components/organisms/WorkClosingCTA.tsx` | Remove broken /pricing link |
| Modify | `src/components/organisms/Footer.tsx` | Fix copyright year |
| Create | `src/app/learn/page.tsx` | /learn index page with article cards |
| Modify | `src/app/page.tsx` | Homepage metadata + homepageFaqs array |
| Modify | `src/app/work/page.tsx` | Work page metadata + CreativeWork JSON-LD |
| Modify | `src/app/about/page.tsx` | About page metadata |
| Modify | `content/knowledge-base/nextjs-vs-wordpress.md` | Frontmatter title + description |
| Modify | `content/knowledge-base/why-pagespeed-matters.md` | Frontmatter title + description |
| Modify | `src/components/seo/SchemaTemplates.ts` | Overhaul localBusinessSchema() |
| Modify | `src/components/organisms/FAQSection.tsx` | Replace 3 FAQs with 5 new FAQs |
| Modify | `src/components/organisms/CoreInfrastructure.tsx` | Section heading copy |
| Modify | `src/components/organisms/B2BPlatform.tsx` | Label copy |
| Modify | `src/components/organisms/FinalCTA.tsx` | Micro-timeline labels |
| Modify | `src/components/organisms/AboutPageContent.tsx` | Founder body, philosophy body, engine teaser, WHY_LP_WEB descriptions |
| Modify | `src/components/organisms/WorkPageContent.tsx` | Chapter hooks + project body copy |
| Modify | `src/components/organisms/WorkClosingCTA.tsx` | CTA heading + body |
| Modify | `public/llms.txt` | Replace with updated LLMs context file |
| Modify | `STATUS.md` | Add SEO Overhaul section |

---

## Task 1: Technical SEO — robots.txt + sitemap.xml + canonical fix

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `src/app/layout.tsx` (metadataBase + canonical only)

- [ ] **Step 1: Replace public/robots.txt**

Write the complete file:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://lpwebstudio.co.za/sitemap.xml
```

- [ ] **Step 2: Replace public/sitemap.xml**

Write the complete file (use `2026-04-10` for lastmod):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://lpwebstudio.co.za/</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://lpwebstudio.co.za/work</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://lpwebstudio.co.za/about</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://lpwebstudio.co.za/learn/nextjs-vs-wordpress</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://lpwebstudio.co.za/learn/why-pagespeed-matters</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

- [ ] **Step 3: Fix metadataBase and canonical in src/app/layout.tsx**

Read the file. Find:
```ts
metadataBase: new URL("https://www.lpwebstudio.co.za"),
```
Replace with:
```ts
metadataBase: new URL("https://lpwebstudio.co.za"),
```

Find:
```ts
alternates: {
    canonical: "https://lpwebstudio.co.za",
},
```
This is already correct — no change needed if it reads `https://lpwebstudio.co.za`. If it reads `https://www.lpwebstudio.co.za`, change it to `https://lpwebstudio.co.za`.

- [ ] **Step 4: Verify build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -15
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt public/sitemap.xml src/app/layout.tsx
git commit -m "fix(seo): correct robots.txt, sitemap.xml domain, metadataBase canonical"
```

---

## Task 2: Quick fixes — broken /pricing link + footer copyright

**Files:**
- Modify: `src/components/organisms/WorkClosingCTA.tsx`
- Modify: `src/components/organisms/Footer.tsx`

- [ ] **Step 1: Fix /pricing link in WorkClosingCTA.tsx**

Read the file. Find the "VIEW PRICING" `<a>` tag:
```tsx
<a
  href="/pricing"
  className="inline-flex items-center justify-center bg-transparent text-white border border-white font-headline font-bold uppercase text-sm"
  style={{
    padding: "14px 28px",
    borderRadius: "4px",
    letterSpacing: "0.08em",
  }}
>
  VIEW PRICING
</a>
```

Replace with a `<button>` that calls `openDrawer()` (the hook is already imported and called in this file):
```tsx
<button
  onClick={openDrawer}
  className="inline-flex items-center justify-center bg-transparent text-white border border-white font-headline font-bold uppercase text-sm border-none cursor-pointer"
  style={{
    padding: "14px 28px",
    borderRadius: "4px",
    letterSpacing: "0.08em",
    border: "1px solid white",
  }}
>
  VIEW PRICING
</button>
```

- [ ] **Step 2: Fix footer copyright in Footer.tsx**

Read the file. Find:
```tsx
© 2024 LP Web Studio. All rights reserved.
```
Replace with:
```tsx
© 2025 LP Web Studio. All rights reserved.
```

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/WorkClosingCTA.tsx src/components/organisms/Footer.tsx
git commit -m "fix(seo): remove broken /pricing link, update footer copyright to 2025"
```

---

## Task 3: Create /learn index page

**Files:**
- Create: `src/app/learn/page.tsx`

This page needs `getAllArticles()` from `src/lib/knowledge.ts` (which exists and exports that function). The page is a server component (no "use client"). It should match the brand: `#0A0A0A` background, Space Grotesk font, white text, orange accent `#FF4500`.

- [ ] **Step 1: Create src/app/learn/page.tsx**

```tsx
// src/app/learn/page.tsx
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/knowledge";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Web Development Insights | LP Web Studio",
    description:
        "Practical guides on Next.js, website performance, and digital infrastructure for Cape Town businesses.",
    openGraph: {
        title: "Web Development Insights | LP Web Studio",
        description:
            "Practical guides on Next.js, website performance, and digital infrastructure for Cape Town businesses.",
    },
};

export default async function LearnPage() {
    const articles = await getAllArticles();

    return (
        <>
            <Navigation />
            <main
                style={{ background: "#0A0A0A", minHeight: "100vh" }}
                className="pt-[120px] pb-24 px-6 md:px-12"
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p
                            style={{
                                color: "#FF4500",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-space-grotesk)",
                                marginBottom: "12px",
                            }}
                        >
                            KNOWLEDGE BASE
                        </p>
                        <h1
                            className="font-headline font-black uppercase text-white leading-none"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
                        >
                            WEB DEVELOPMENT<br />INSIGHTS.
                        </h1>
                        <p
                            className="text-white/55 mt-4 max-w-xl leading-relaxed"
                            style={{ fontSize: "15px", fontFamily: "var(--font-space-grotesk)" }}
                        >
                            Practical guides on Next.js, website performance, and digital
                            infrastructure for Cape Town businesses.
                        </p>
                    </div>

                    {/* Article cards */}
                    <div className="flex flex-col gap-px border-t border-white/10">
                        {articles.map((article) => (
                            <a
                                key={article.slug}
                                href={`/learn/${article.slug}`}
                                style={{ textDecoration: "none" }}
                                className="group block border-b border-white/10 py-10 transition-colors duration-200 hover:bg-white/[0.02]"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <p
                                            style={{
                                                color: "#FF4500",
                                                fontSize: "9px",
                                                fontWeight: 700,
                                                letterSpacing: "0.2em",
                                                textTransform: "uppercase",
                                                fontFamily: "var(--font-space-grotesk)",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {new Date(article.date).toLocaleDateString("en-ZA", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <h2
                                            className="font-headline font-bold uppercase text-white group-hover:text-white/80 transition-colors duration-200"
                                            style={{
                                                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                                                letterSpacing: "-0.01em",
                                                lineHeight: 1.2,
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {article.title}
                                        </h2>
                                        <p
                                            className="text-white/50 leading-relaxed"
                                            style={{ fontSize: "14px", maxWidth: "560px" }}
                                        >
                                            {article.description}
                                        </p>
                                    </div>
                                    <div className="shrink-0 md:pt-1">
                                        <span
                                            style={{
                                                color: "#FF4500",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                fontFamily: "var(--font-space-grotesk)",
                                            }}
                                        >
                                            READ →
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
```

- [ ] **Step 2: Run build to verify /learn renders**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -20
```

Expected: Build succeeds. `/learn` appears in the static route list.

- [ ] **Step 3: Commit**

```bash
git add src/app/learn/page.tsx
git commit -m "feat(seo): add /learn index page with article cards"
```

---

## Task 4: Page metadata rewrites

**Files:**
- Modify: `src/app/layout.tsx` (global metadata fields only)
- Modify: `src/app/page.tsx` (title + description)
- Modify: `src/app/work/page.tsx` (title + description)
- Modify: `src/app/about/page.tsx` (title + description)
- Modify: `content/knowledge-base/nextjs-vs-wordpress.md` (frontmatter title + description)
- Modify: `content/knowledge-base/why-pagespeed-matters.md` (frontmatter title + description)

- [ ] **Step 1: Update global metadata in src/app/layout.tsx**

Read the file. Find the entire `metadata` export and replace these fields:

Replace:
```ts
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
```

With:
```ts
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
```

Also update the OpenGraph title and description in the same metadata object:
```ts
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
```

- [ ] **Step 2: Update homepage metadata in src/app/page.tsx**

Find:
```ts
export const metadata: Metadata = {
    title: "LP Web Studio | Custom B2B Portals & Automations",
    description: "We engineer custom B2B ordering portals and automated SaaS systems for scaling businesses. High-performance infrastructure designed to eliminate manual admin.",
};
```

Replace with:
```ts
export const metadata: Metadata = {
    title: "LP Web Studio | Custom Websites & Automation Systems Cape Town",
    description: "We build high-performance Next.js websites and automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed, real results.",
    openGraph: {
        title: "LP Web Studio | Custom Websites & Automation Systems Cape Town",
        description: "We build high-performance Next.js websites and automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed, real results.",
    },
};
```

- [ ] **Step 3: Update work page metadata in src/app/work/page.tsx**

Find:
```ts
export const metadata: Metadata = {
    title: "Our Work — LP Web Studio",
    description:
        "Real businesses. Real code. 90+ Performance Scores. Explore our portfolio of high-performance websites built for Cape Town small businesses.",
    openGraph: {
        title: "Our Work — LP Web Studio",
        description:
            "We don't just build. We benchmark. Real businesses, real code, 90+ scores.",
    },
};
```

Replace with:
```ts
export const metadata: Metadata = {
    title: "Our Work | Cape Town Web Development Portfolio",
    description:
        "Case studies from LP Web Studio — custom React websites for Cape Town businesses including Cafe Crave and The Big Six. Real projects, real PageSpeed scores.",
    openGraph: {
        title: "Our Work | Cape Town Web Development Portfolio",
        description:
            "Case studies from LP Web Studio — custom React websites for Cape Town businesses including Cafe Crave and The Big Six. Real projects, real PageSpeed scores.",
    },
};
```

- [ ] **Step 4: Update about page metadata in src/app/about/page.tsx**

Find:
```ts
export const metadata: Metadata = {
    title: "About — LP Web Studio",
    description:
        "Cape Town's performance-first developer. Hand-coded Next.js websites — no WordPress, no drag-and-drop, no bloat. Just clean code and 90+ PageSpeed scores.",
    openGraph: {
        title: "About — LP Web Studio",
        description:
            "I build what page-builders can't. Hand-coded performance for Cape Town businesses.",
    },
};
```

Replace with:
```ts
export const metadata: Metadata = {
    title: "About | Cape Town Next.js Developer — Luke Petzer",
    description:
        "Luke Petzer is a Cape Town-based web developer and automation engineer. Custom Next.js builds, n8n pipelines, and 90+ PageSpeed scores guaranteed. No agencies, no bloat.",
    openGraph: {
        title: "About | Cape Town Next.js Developer — Luke Petzer",
        description:
            "Luke Petzer is a Cape Town-based web developer and automation engineer. Custom Next.js builds, n8n pipelines, and 90+ PageSpeed scores guaranteed.",
    },
};
```

- [ ] **Step 5: Update frontmatter in content/knowledge-base/nextjs-vs-wordpress.md**

Find:
```
title: "Next.js vs WordPress: The Performance Gap Explained"
description: "A detailed comparison of Next.js and WordPress for small business websites, covering speed, security, SEO, and total cost of ownership."
```

Replace with:
```
title: "Next.js vs WordPress for Cape Town Small Businesses"
description: "Why Cape Town businesses are switching from WordPress to Next.js. Speed comparison, security, SEO impact, and real cost breakdown."
```

- [ ] **Step 6: Update frontmatter in content/knowledge-base/why-pagespeed-matters.md**

Find:
```
title: "Why Your Website Needs a 90+ PageSpeed Score"
description: "Learn why Google PageSpeed matters for your business, how it affects SEO rankings, and what you can do to achieve a 90+ score."
```

Replace with:
```
title: "Why PageSpeed Matters for Cape Town Businesses in 2025"
description: "How website speed affects your Google ranking and leads in Cape Town. What a 90+ PageSpeed score means for your business and how to achieve it."
```

- [ ] **Step 7: Run build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -15
```

Expected: Build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/work/page.tsx src/app/about/page.tsx content/knowledge-base/nextjs-vs-wordpress.md content/knowledge-base/why-pagespeed-matters.md
git commit -m "feat(seo): rewrite all page metadata titles and descriptions"
```

---

## Task 5: LocalBusiness schema overhaul

**Files:**
- Modify: `src/components/seo/SchemaTemplates.ts`

The current `localBusinessSchema()` function returns a simple `WebDesignAndDevelopmentBusiness` object. Replace it entirely.

- [ ] **Step 1: Read src/components/seo/SchemaTemplates.ts**

Read the full file.

- [ ] **Step 2: Replace localBusinessSchema() function**

Find the entire `localBusinessSchema` function (lines 4-36) and replace with:

```ts
export function localBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        name: "LP Web Studio",
        description:
            "Cape Town web development studio specialising in custom Next.js websites, n8n automation systems, and high-performance web applications. Guaranteed 90+ PageSpeed scores.",
        url: "https://lpwebstudio.co.za",
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
                },
                {
                    "@type": "Offer",
                    name: "Professional Website",
                    price: "12500",
                    priceCurrency: "ZAR",
                    description:
                        "3-page custom Next.js website with automated booking integration and 90+ PageSpeed",
                },
                {
                    "@type": "Offer",
                    name: "Custom Web Application",
                    price: "21500",
                    priceCurrency: "ZAR",
                    description:
                        "Full Next.js application with database, n8n automation pipelines, and AI lead generation",
                },
            ],
        },
    };
}
```

Also update the `SITE_URL` constant at the top of the file:

Find:
```ts
const SITE_URL = "https://www.lpwebstudio.co.za";
```
Replace with:
```ts
const SITE_URL = "https://lpwebstudio.co.za";
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/seo/SchemaTemplates.ts
git commit -m "feat(seo): overhaul LocalBusiness schema — pricing, knowsAbout, offerCatalog, correct domain"
```

---

## Task 6: Add CreativeWork schemas to work page + update FAQ schema

**Files:**
- Modify: `src/app/work/page.tsx`
- Modify: `src/app/page.tsx` (homepageFaqs array only)

The work page needs CreativeWork JSON-LD for each project. The `JsonLd` component is already used in `app/page.tsx` — import it the same way in `app/work/page.tsx`. The `src/components/seo/JsonLd.tsx` component accepts a `data` prop.

- [ ] **Step 1: Update src/app/work/page.tsx — add CreativeWork JSON-LD**

Read the file. Currently it imports only `Metadata` and renders `WorkPageContent`. Update to add imports and schema:

Replace:
```ts
import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
```

With:
```ts
import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
```

Then update the `WorkPage` default export to include JSON-LD:

Replace:
```tsx
export default function WorkPage() {
    return (
        <>
            <Navigation />
            <main className="pb-structural">
                <WorkPageContent />
            </main>
            <Footer />
        </>
    );
}
```

With:
```tsx
const cafeCraveSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Cafe Crave Website",
    description:
        "Custom React and Next.js website built for Cafe Crave, a Cape Town specialty coffee shop. Features live Google Reviews integration, mobile-first design, and a 93/100 PageSpeed score.",
    url: "https://cafecravecpt.co.za",
    creator: { "@type": "Organization", name: "LP Web Studio" },
    keywords:
        "restaurant website Cape Town, cafe website, Next.js, React, Google Reviews integration",
};

const bigSixSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "The Big Six Landing Page",
    description:
        "Premium editorial landing page for The Big Six vintage car restoration project. Custom CSS masking, immersive typography, and 91/100 PageSpeed score.",
    url: "https://thebigsix.lpwebstudio.co.za",
    creator: { "@type": "Organization", name: "LP Web Studio" },
    keywords:
        "editorial website Cape Town, landing page design, Next.js, Framer Motion, premium web design",
};

export default function WorkPage() {
    return (
        <>
            <JsonLd data={cafeCraveSchema} />
            <JsonLd data={bigSixSchema} />
            <Navigation />
            <main className="pb-structural">
                <WorkPageContent />
            </main>
            <Footer />
        </>
    );
}
```

- [ ] **Step 2: Update homepageFaqs in src/app/page.tsx**

Find the `homepageFaqs` array (lines 25-38):
```ts
const homepageFaqs = [
    {
        question: "How long does a custom system take to deploy?",
        answer: "A standard web application takes 1–2 weeks. Complex B2B portals and automation systems take 2–4 weeks depending on integrations and scope.",
    },
    {
        question: "Do I need to maintain the infrastructure?",
        answer: "No. Hosting, deployments, and ongoing performance monitoring are handled by us. You focus on the business — we keep the engine running.",
    },
    {
        question: "What happens after I request an audit?",
        answer: "We schedule a 30-minute discovery call, map your current workflow, identify the biggest bottlenecks, and deliver a written architecture blueprint within 48 hours.",
    },
];
```

Replace with:
```ts
const homepageFaqs = [
    {
        question: "What does a custom website cost in Cape Town?",
        answer: "LP Web Studio offers three packages. A starter 1-page website costs R5,500 once-off plus R350/month hosting. A professional 3-page website with booking automation costs R12,500. Custom web applications start from R21,500.",
    },
    {
        question: "How long does a website take to build?",
        answer: "Standard websites take 1-2 weeks once content and requirements are confirmed. Custom web applications and automation systems take 2-6 weeks depending on complexity.",
    },
    {
        question: "Do you work with businesses outside Cape Town?",
        answer: "Yes. We work with businesses across South Africa and internationally. Discovery calls are online and projects are delivered remotely.",
    },
    {
        question: "What industries do you work with?",
        answer: "We work with any business that needs a serious online presence or wants to automate their operations — particularly manufacturing, trade services, hospitality, and B2B companies.",
    },
    {
        question: "What makes LP Web Studio different from other web agencies?",
        answer: "You speak directly to the engineer building your system — not a sales rep or account manager. Every build is hand-coded in Next.js, comes with a 90+ PageSpeed guarantee, and you own the code outright with no lock-in.",
    },
];
```

- [ ] **Step 3: Run build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && npm run build 2>&1 | tail -15
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/work/page.tsx src/app/page.tsx
git commit -m "feat(seo): add CreativeWork JSON-LD to work page, update homepage FAQ schema data"
```

---

## Task 7: FAQ component copy replacement

**Files:**
- Modify: `src/components/organisms/FAQSection.tsx`

The component has a hardcoded `faqs` array with `q` and `a` keys. Replace with 5 new questions matching the schema data from Task 6.

- [ ] **Step 1: Update faqs array in FAQSection.tsx**

Read the file. Find:
```ts
const faqs = [
    {
        q: "How long does a custom system take to deploy?",
        a: "A standard web application takes 1–2 weeks. Complex B2B portals and automation systems take 2–4 weeks depending on integrations and scope.",
    },
    {
        q: "Do I need to maintain the infrastructure?",
        a: "No. Hosting, deployments, and ongoing performance monitoring are handled by us. You focus on the business — we keep the engine running.",
    },
    {
        q: "What happens after I request an audit?",
        a: "We schedule a 30-minute discovery call, map your current workflow, identify the biggest bottlenecks, and deliver a written architecture blueprint within 48 hours.",
    },
];
```

Replace with:
```ts
const faqs = [
    {
        q: "What does a custom website cost in Cape Town?",
        a: "LP Web Studio offers three packages. A starter 1-page website costs R5,500 once-off plus R350/month hosting. A professional 3-page website with booking automation costs R12,500. Custom web applications start from R21,500.",
    },
    {
        q: "How long does a website take to build?",
        a: "Standard websites take 1-2 weeks once content and requirements are confirmed. Custom web applications and automation systems take 2-6 weeks depending on complexity.",
    },
    {
        q: "Do you work with businesses outside Cape Town?",
        a: "Yes. We work with businesses across South Africa and internationally. Discovery calls are online and projects are delivered remotely.",
    },
    {
        q: "What industries do you work with?",
        a: "We work with any business that needs a serious online presence or wants to automate their operations — particularly manufacturing, trade services, hospitality, and B2B companies.",
    },
    {
        q: "What makes LP Web Studio different from other web agencies?",
        a: "You speak directly to the engineer building your system — not a sales rep or account manager. Every build is hand-coded in Next.js, comes with a 90+ PageSpeed guarantee, and you own the code outright with no lock-in.",
    },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/components/organisms/FAQSection.tsx
git commit -m "feat(copy): replace FAQ section with 5 new pricing and value-focused questions"
```

---

## Task 8: Homepage component copy

**Files:**
- Modify: `src/components/organisms/CoreInfrastructure.tsx`
- Modify: `src/components/organisms/B2BPlatform.tsx`
- Modify: `src/components/organisms/FinalCTA.tsx`

- [ ] **Step 1: Update CoreInfrastructure.tsx section heading**

Read the file. Find:
```tsx
<h2
    className="font-headline font-bold uppercase tracking-[-0.04em] text-white mb-3"
    style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
>
    Core Infrastructure
</h2>
```

Replace with:
```tsx
<h2
    className="font-headline font-bold uppercase tracking-[-0.04em] text-white mb-3"
    style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
>
    Web Development &amp; Automation Services
</h2>
```

Note: Use `&amp;` for the ampersand in JSX, or `{"&"}` — actually in JSX the literal `&` character works fine in text content. Write it as:
```tsx
Web Development & Automation Services
```
(JSX allows literal `&` in text content without encoding.)

- [ ] **Step 2: Update B2BPlatform.tsx label**

Read the file. Find:
```tsx
<span className="mono-label">Proof of System</span>
```

Replace with:
```tsx
<span className="mono-label">RECENT WORK</span>
```

- [ ] **Step 3: Update FinalCTA.tsx micro-timeline**

Read the file. Find:
```tsx
<span>01 / Discovery Call</span>
<span className="text-white/20">→</span>
<span>02 / Architecture Blueprint</span>
<span className="text-white/20">→</span>
<span>03 / System Build</span>
```

Replace with:
```tsx
<span>01 / Free Discovery Call</span>
<span className="text-white/20">→</span>
<span>02 / Architecture Blueprint</span>
<span className="text-white/20">→</span>
<span>03 / Your System Is Built</span>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/organisms/CoreInfrastructure.tsx src/components/organisms/B2BPlatform.tsx src/components/organisms/FinalCTA.tsx
git commit -m "feat(copy): update homepage section headings and FinalCTA micro-timeline"
```

---

## Task 9: About page copy

**Files:**
- Modify: `src/components/organisms/AboutPageContent.tsx`

- [ ] **Step 1: Read AboutPageContent.tsx**

Read the full file.

- [ ] **Step 2: Rewrite founder body text**

Find:
```tsx
<p className="text-white/65 leading-relaxed text-base max-w-xl">
    I don&apos;t run a bloated agency. I am a senior technical architect
    operating out of Cape Town. I manage the entire infrastructure
    stack&mdash;from the Next.js React codebase to the n8n autonomous
    pipelines. You speak directly to the engineer building your business
    engine.
</p>
```

Replace with:
```tsx
<p className="text-white/65 leading-relaxed text-base max-w-xl">
    I don&apos;t run a bloated agency. I&apos;m a Cape Town-based web
    developer and automation engineer managing the entire stack &mdash;
    from hand-coded Next.js applications to n8n automation pipelines.
    When you work with LP Web Studio you speak directly to the person
    writing your code. No sales reps, no account managers, no outsourcing.
</p>
```

- [ ] **Step 3: Rewrite philosophy body text**

Find:
```tsx
<p className="text-white/70 leading-relaxed max-w-3xl">
    I believe in <strong className="text-white">hand-coded performance</strong>.
    No drag-and-drop bloat. No plugin security vulnerabilities. Just clean,
    semantic Next.js code that scores 90+ on Google PageSpeed
    Insights&mdash;guaranteed.
</p>
```

Replace with:
```tsx
<p className="text-white/70 leading-relaxed max-w-3xl">
    I believe in <strong className="text-white">hand-coded performance</strong>.
    No drag-and-drop page builders. No WordPress plugin vulnerabilities.
    Every site I build is custom Next.js code that scores 90+ on Google
    PageSpeed Insights &mdash; or I fix it until it does.
</p>
```

- [ ] **Step 4: Add engine teaser sentence before THE_ENGINE cards**

In the Tech Stack section, find:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

Add a paragraph immediately before this div:
```tsx
<p className="text-white/50 text-sm leading-relaxed mb-8 max-w-2xl">
    The same stack powering enterprise applications, running your Cape Town business.
</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

- [ ] **Step 5: Rewrite WHY_LP_WEB descriptions**

The three reasons are in the `reasons` array near the top of the file. Find:
```ts
const reasons = [
    {
        title: "Direct Access",
        description: "You speak to Luke Petzer (the developer), not a sales rep.",
    },
    {
        title: "Code Ownership",
        description: "You own the repository. No lock-in.",
    },
    {
        title: "Speed Guarantee",
        description: "If I build it, it scores 90+.",
    },
];
```

Replace with:
```ts
const reasons = [
    {
        title: "Direct Access",
        description: "You speak to Luke Petzer — the developer actually building your system. Not a sales rep, not an account manager. Direct access means faster decisions and no miscommunication.",
    },
    {
        title: "Code Ownership",
        description: "Every line of code we write belongs to you. The GitHub repository is transferred to your account on delivery. No monthly retainer required to access your own site.",
    },
    {
        title: "Speed Guarantee",
        description: "Every website we build scores 90+ on Google PageSpeed Insights. If it doesn't, we optimise it until it does — at no extra cost. This is not a target. It is a guarantee.",
    },
];
```

- [ ] **Step 6: Commit**

```bash
git add src/components/organisms/AboutPageContent.tsx
git commit -m "feat(copy): rewrite about page — founder bio, philosophy, engine teaser, WHY_LP_WEB descriptions"
```

---

## Task 10: Work page copy

**Files:**
- Modify: `src/components/organisms/WorkPageContent.tsx`
- Modify: `src/components/organisms/WorkClosingCTA.tsx`

- [ ] **Step 1: Read WorkPageContent.tsx**

Read the full file.

- [ ] **Step 2: Update chapter hooks**

Find:
```ts
<ChapterHook text="A cafe losing customers before they even walked in." />
```
Replace with:
```ts
<ChapterHook text="A Cape Town cafe was losing customers before they even walked in." />
```

Find:
```ts
<ChapterHook text="Wanting to tell a story that actually stops people scrolling?" />
```
Replace with:
```ts
<ChapterHook text="A restoration worth remembering. A website that couldn't tell the story." />
```

- [ ] **Step 3: Update Cafe Crave descriptionBody**

Find:
```ts
descriptionBody:
    "Cafe Crave needed more than a menu online. They needed every visitor to feel the space before they arrived. We rebuilt their digital presence from the ground up — a React stack with live Google review integration and a reservation flow that converts.",
```

Replace with:
```ts
descriptionBody:
    "Cafe Crave needed more than a menu online. Every visitor needed to feel the space before they arrived. We rebuilt their digital presence on a React and Next.js stack with live Google Reviews integration, a mobile-first layout, and a reservation flow engineered for conversion. The result: a 93/100 PageSpeed score and a site that works as hard as the team behind the counter.",
```

- [ ] **Step 4: Update The Big Six descriptionBody**

Find:
```ts
descriptionBody:
    "A restoration worth remembering deserves a site that can tell the story. Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
```

Replace with:
```ts
descriptionBody:
    "The Big Six is six vintage cars and decades of history. It deserved a landing page that carried that weight. We used immersive typography, custom CSS visual masking, and automated 4K image optimisation to build something that loads in under one second and feels as rare as the collection it represents. 91/100 PageSpeed score. Zero compromise on craft.",
```

- [ ] **Step 5: Update WorkClosingCTA.tsx heading and body**

Read the file. Find:
```tsx
<h2
    className="font-headline font-black uppercase text-white leading-tight"
    style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
>
    WHAT DOES YOUR BUSINESS LOOK LIKE ONLINE?
</h2>

<p className="text-white/60 text-base max-w-md leading-relaxed">
    Every slow website is a lead that didn&apos;t convert.{" "}
    Let&apos;s fix that.
</p>
```

Replace with:
```tsx
<h2
    className="font-headline font-black uppercase text-white leading-tight"
    style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
>
    IS YOUR WEBSITE COSTING YOU CUSTOMERS?
</h2>

<p className="text-white/60 text-base max-w-md leading-relaxed">
    Every slow website is a lead that didn&apos;t convert.
    Every generic template is a client that chose someone else.
    Let&apos;s build something that works.
</p>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/organisms/WorkPageContent.tsx src/components/organisms/WorkClosingCTA.tsx
git commit -m "feat(copy): rewrite work page chapter hooks, project descriptions, closing CTA"
```

---

## Task 11: llms.txt + STATUS.md + final build

**Files:**
- Modify: `public/llms.txt`
- Modify: `STATUS.md`

- [ ] **Step 1: Replace public/llms.txt**

Write the complete file:

```
# LP Web Studio

> Cape Town web development studio specialising in custom
Next.js websites, n8n business automation, and high-performance
web applications. Founded by Luke Petzer.

## Services
- Custom Next.js websites: R5,500 – R21,500 once-off
- n8n business automation and WhatsApp integration
- B2B ordering portals and custom web applications
- Performance audits and WordPress-to-Next.js migrations
- Guaranteed 90+ Google PageSpeed scores

## Location
Cape Town, South Africa. Serves clients nationally and
internationally.

## Contact
WhatsApp: +27673852286
Email: contact@lpwebstudio.co.za
Website: https://lpwebstudio.co.za

## Portfolio
- Cafe Crave (cafecravecpt.co.za) — hospitality, 93/100 PageSpeed
- The Big Six (thebigsix.lpwebstudio.co.za) — editorial, 91/100

## Technology Stack
Next.js 15, React, TypeScript, Tailwind CSS, Supabase,
Vercel Edge Network, n8n automation, Framer Motion

## Optional
Full sitemap: https://lpwebstudio.co.za/sitemap.xml
```

- [ ] **Step 2: Add SEO Overhaul section to STATUS.md**

Read STATUS.md. Add the following block after the "Contact Drawer" section and before the "Infrastructure Page" section:

```markdown
## SEO Overhaul

**Date:** 2026-04-10

### Files Modified
- `public/robots.txt` — corrected domain to lpwebstudio.co.za, added /api/ and /_next/ disallows
- `public/sitemap.xml` — replaced stale sitemap, correct domain, current routes only
- `public/llms.txt` — full rewrite with accurate pricing, portfolio, and contact
- `src/app/layout.tsx` — metadataBase set to lpwebstudio.co.za, global title/desc/keywords rewritten
- `src/app/page.tsx` — homepage metadata + homepageFaqs updated to 5 pricing/value questions
- `src/app/work/page.tsx` — work page metadata + CreativeWork JSON-LD for Cafe Crave and The Big Six
- `src/app/about/page.tsx` — about page metadata updated
- `content/knowledge-base/nextjs-vs-wordpress.md` — frontmatter title + description updated
- `content/knowledge-base/why-pagespeed-matters.md` — frontmatter title + description updated
- `src/components/seo/SchemaTemplates.ts` — LocalBusiness schema overhauled (pricing, offerCatalog, knowsAbout, correct domain)
- `src/components/organisms/FAQSection.tsx` — replaced 3 FAQs with 5 new pricing/value questions
- `src/components/organisms/CoreInfrastructure.tsx` — heading changed to "Web Development & Automation Services"
- `src/components/organisms/B2BPlatform.tsx` — label changed to "RECENT WORK"
- `src/components/organisms/FinalCTA.tsx` — micro-timeline labels updated
- `src/components/organisms/AboutPageContent.tsx` — founder bio, philosophy body, engine teaser, WHY_LP_WEB descriptions rewritten
- `src/components/organisms/WorkPageContent.tsx` — chapter hooks and project descriptions rewritten
- `src/components/organisms/WorkClosingCTA.tsx` — CTA heading and body rewritten, /pricing link removed
- `src/components/organisms/Footer.tsx` — copyright year updated to 2025

### Files Created
- `src/app/learn/page.tsx` — /learn index page with article cards

### SEO Changes Summary
- Domain unified to lpwebstudio.co.za (no www) throughout
- All page titles target Cape Town / South Africa search intent
- LocalBusiness schema includes pricing tiers, offerCatalog, knowsAbout
- CreativeWork schemas added for both portfolio projects
- FAQ updated with pricing questions that match search intent
- llms.txt updated for AI citation (ChatGPT, Claude, Perplexity)
- /learn index page gives the knowledge base a valid route
- Broken /pricing link removed from WorkClosingCTA
```

- [ ] **Step 3: Run final build**

```bash
cd /Users/lukepetzer/LP-Web-Studio/Admin/Website/LP-Web-Studio && rm -rf .next && npm run build 2>&1 | tail -30
```

Expected: Build succeeds. Routes visible: `/`, `/work`, `/about`, `/learn`, `/learn/nextjs-vs-wordpress`, `/learn/why-pagespeed-matters`. No `/contact` route (redirect only).

- [ ] **Step 4: Commit**

```bash
git add public/llms.txt STATUS.md
git commit -m "docs: update llms.txt with accurate pricing and portfolio; add SEO Overhaul to STATUS.md"
```

---

## Self-Review

**Spec coverage check:**

- ✅ Fix 1: metadataBase + canonical → Task 1
- ✅ Fix 2: robots.txt → Task 1
- ✅ Fix 3: sitemap.xml → Task 1
- ✅ Fix 4: broken /pricing link → Task 2
- ✅ Fix 5: footer copyright 2025 → Task 2
- ✅ Fix 6: /learn index page → Task 3
- ✅ Part 2 global metadata → Task 4
- ✅ Part 2 page metadata → Task 4
- ✅ Part 2 learn article metadata → Task 4
- ✅ Part 3 LocalBusiness schema → Task 5
- ✅ Part 3 CreativeWork schemas → Task 6
- ✅ Part 3 FAQ schema update → Task 6
- ✅ Part 4 CoreInfrastructure heading → Task 8
- ✅ Part 4 B2BPlatform label → Task 8
- ✅ Part 4 FinalCTA timeline → Task 8
- ✅ Part 4 About founder body → Task 9
- ✅ Part 4 About philosophy body → Task 9
- ✅ Part 4 About engine teaser → Task 9
- ✅ Part 4 About WHY_LP_WEB → Task 9
- ✅ Part 4 Work chapter hooks → Task 10
- ✅ Part 4 Work project bodies → Task 10
- ✅ Part 4 Work closing CTA → Task 10
- ✅ Part 5 llms.txt → Task 11
- ✅ STATUS.md SEO Overhaul section → Task 11
- ✅ Final build check → Task 11
- ⚠️ Hero H1 — spec says keep exactly as-is. No change needed. ✓
- ⚠️ BRAND_BLUEPRINT.md — does not exist in repo. Proceeding without it.

**Placeholder scan:** No TBDs. All code/copy complete.

**Type consistency:** `homepageFaqs` uses `question`/`answer` keys (for `faqPageSchema()`). `FAQSection.tsx` `faqs` array uses `q`/`a` keys. Both updated independently — no type mismatch.
