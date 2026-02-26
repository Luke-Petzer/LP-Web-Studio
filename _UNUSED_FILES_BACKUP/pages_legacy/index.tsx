import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactCTA } from '../components/ContactCTA';

export default function Home() {
  const siteUrl = 'https://lpwebstudio.com';

  // LocalBusiness structured data for local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LP Web Studio",
    "description": "Professional web development services for small businesses in Cape Town. Specializing in responsive websites, online booking systems, and digital solutions.",
    "url": siteUrl,
    "telephone": "+27-67-385-2286",
    "email": "contact@lpwebstudio.co.za",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cape Town",
      "addressRegion": "Western Cape",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-33.9249",
      "longitude": "18.4241"
    },
    "priceRange": "R2500-R10000",
    "openingHours": "Mo-Fr 09:00-17:00",
    "image": `${siteUrl}/Logo.svg`,
    "logo": `${siteUrl}/Logo.svg`,
    "founder": {
      "@type": "Person",
      "name": "Luke Petzer"
    },
    "sameAs": [
      "https://www.facebook.com/share/1B6hCGLJbh/",
      "https://www.instagram.com/lp.web.studio/"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Cape Town"
    }
  };

  return (
    <Layout>
      <SEO
        title="LP Web Studio - Professional Web Development in Cape Town"
        description="Transform your digital presence with custom web solutions. Professional web development services for small businesses in Cape Town, South Africa."
        keywords="web development Cape Town, web design, responsive websites, small business websites, South Africa"
        structuredData={localBusinessSchema}
      />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <ProjectsSection />
      <ContactCTA />
    </Layout>
  );
}
