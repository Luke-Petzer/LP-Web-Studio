import { Suspense, lazy } from 'react';
import { ContactCTA } from './components/ContactCTA';
import { SEO } from './components/SEO';
import { HeroSection } from './components/HeroSection';
// Lazy load components for better performance
const ServicesSection = lazy(() => import('./components/ServicesSection').then(module => ({
  default: module.ServicesSection
})));
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({
  default: module.AboutSection
})));
const SkillsSection = lazy(() => import('./components/SkillsSection').then(module => ({
  default: module.SkillsSection
})));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then(module => ({
  default: module.ProjectsSection
})));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(module => ({
  default: module.TestimonialsSection
})));
// Loading fallback component
const SectionLoadingFallback = () => <div className="py-20 bg-gray-50 text-center">
    <div className="animate-pulse inline-block h-8 w-32 bg-gray-200 rounded"></div>
  </div>;
export function App() {
  const siteUrl = 'https://lpwebstudio.com';

  // Enhanced structured data for homepage
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LP Web Studio",
    "alternateName": "Luke Petzer Web Studio",
    "url": siteUrl,
    "logo": `${siteUrl}/my-logo.svg`,
    "image": `${siteUrl}/Hero.jpg`,
    "description": "Professional web development and design services for small businesses in Cape Town, South Africa. Specializing in responsive websites, mobile-friendly designs, and digital solutions.",
    "founder": {
      "@type": "Person",
      "name": "Luke Petzer",
      "jobTitle": "Web Developer & Founder",
      "url": `${siteUrl}/about`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cape Town",
      "addressRegion": "Western Cape",
      "addressCountry": "ZA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27-67-385-2286",
      "contactType": "customer service",
      "email": "contact@lpwebstudio.co.za",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/lpwebstudio",
      "https://instagram.com/lpwebstudio",
      "https://facebook.com/lpwebstudio"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "Cape Town, South Africa"
    },
    "priceRange": "$$",
    "knowsAbout": [
      "Web Development",
      "Responsive Design",
      "React Development",
      "UI/UX Design",
      "Mobile-First Design",
      "SEO Optimization"
    ]
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LP Web Studio",
    "url": siteUrl,
    "description": "Professional web development services for small businesses in Cape Town",
    "publisher": {
      "@type": "Organization",
      "name": "LP Web Studio"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/portfolio?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return <div className="font-sans text-gray-800 bg-white">
      <SEO
        title="Professional Web Development & Design Services in Cape Town"
        description="Transform your business with professional web development services from LP Web Studio. Responsive websites, mobile-friendly designs, and digital solutions for Cape Town businesses."
        keywords="web development Cape Town, responsive web design, mobile-friendly websites, small business web design, React development, UI UX design, affordable web development South Africa"
        ogImage="/Hero.jpg"
        canonicalUrl={siteUrl}
        structuredData={[organizationStructuredData, websiteStructuredData]}
      />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoadingFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoadingFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoadingFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionLoadingFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionLoadingFallback />}>
          <TestimonialsSection />
        </Suspense>
        <ContactCTA />
      </main>
    </div>;
}