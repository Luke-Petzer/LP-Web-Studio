import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { SEO } from '../components/SEO';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';

export default function Contact() {
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

  return (
    <Layout>
      <SEO
        title="Contact - LP Web Studio | Get Your Free Quote"
        description="Contact LP Web Studio for professional web development services in Cape Town. Get a free quote for your website project today."
        keywords="contact web developer, web development quote Cape Town, hire web developer"
        structuredData={contactStructuredData}
      />
      <ContactHero />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      {/* WhatsApp Button - Fixed Bottom Right */}
      <WhatsAppButton />
    </Layout>
  );
}

