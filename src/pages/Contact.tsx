import { useEffect } from 'react';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { SEO } from '../components/SEO';
export function Contact() {
  const siteUrl = 'https://lpwebstudio.com';

  // Contact page structured data
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact LP Web Studio",
    "description": "Get in touch with LP Web Studio for professional web development services in Cape Town",
    "url": `${siteUrl}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "LP Web Studio",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+27-67-385-2286",
        "contactType": "customer service",
        "email": "contact@lpwebstudio.co.za",
        "availableLanguage": "English",
        "areaServed": "Cape Town, South Africa"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cape Town",
        "addressRegion": "Western Cape",
        "addressCountry": "ZA"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": `${siteUrl}/contact`
        }
      ]
    }
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      <SEO
        title="Contact LP Web Studio - Get Professional Web Development Services"
        description="Ready to transform your business online? Contact LP Web Studio for expert web development services in Cape Town. Free consultations available for responsive websites and digital solutions."
        keywords="contact LP Web Studio, web development Cape Town, get quote, professional web design, Cape Town web developer contact, Luke Petzer contact, website consultation"
        ogImage="/CC-card.png"
        canonicalUrl={`${siteUrl}/contact`}
        structuredData={contactStructuredData}
      />
      <main className="flex-grow pt-0">
        <ContactHero />
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>
    </div>;
}