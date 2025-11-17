import { useEffect } from 'react';
import { AboutHero } from '../../components/about/AboutHero';
import { AboutApproach } from '../../components/about/AboutApproach';
import { AboutExpertise } from '../../components/about/AboutExpertise';
import { ContactCTA } from '../../components/ContactCTA';
import { SEO } from '../../components/SEO';
export function About() {
  const siteUrl = 'https://lpwebstudio.com';

  // Person structured data for Luke Petzer
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luke Petzer",
    "jobTitle": "Web Developer & Founder",
    "description": "Professional web developer and founder of LP Web Studio, specializing in responsive web design and development for small businesses in Cape Town, South Africa.",
    "url": `${siteUrl}/about`,
    "image": `${siteUrl}/Me1.JPG`,
    "email": "contact@lpwebstudio.co.za",
    "telephone": "+27-67-385-2286",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cape Town",
      "addressRegion": "Western Cape",
      "addressCountry": "ZA"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "LP Web Studio",
      "url": siteUrl
    },
    "knowsAbout": [
      "Web Development",
      "React Development",
      "Responsive Design",
      "UI/UX Design",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Mobile-First Design"
    ],
    "alumniOf": "Web Development",
    "sameAs": [
      "https://linkedin.com/in/lukepetzer",
      "https://github.com/lukepetzer"
    ]
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="font-sans text-gray-800 bg-white">
      <SEO
        title="About Luke Petzer - Web Developer & Founder of LP Web Studio"
        description="Meet Luke Petzer, the passionate web developer behind LP Web Studio. Learn about his expertise in responsive design, React development, and creating effective digital solutions for Cape Town businesses."
        keywords="Luke Petzer, web developer Cape Town, LP Web Studio founder, React developer, responsive design expert, UI UX designer, Cape Town web development"
        ogImage="/Me1.JPG"
        canonicalUrl={`${siteUrl}/about`}
        structuredData={personStructuredData}
      />
      <main className="pt-0">
        <AboutHero />
        <AboutApproach />
        <AboutExpertise />
        <ContactCTA />
      </main>
    </div>;
}