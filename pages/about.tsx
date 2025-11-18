import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { AboutHero } from '../components/about/AboutHero';
import { AboutApproach } from '../components/about/AboutApproach';
import { AboutExpertise } from '../components/about/AboutExpertise';
import { SkillsSection } from '../components/SkillsSection';
import { SEO } from '../components/SEO';

export default function About() {
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

  return (
    <Layout>
      <SEO
        title="About - Luke Petzer | Web Developer in Cape Town"
        description="Meet Luke Petzer, founder of LP Web Studio. Professional web developer in Cape Town specializing in responsive design and custom web solutions for small businesses."
        keywords="Luke Petzer, web developer Cape Town, about LP Web Studio, professional web developer"
        structuredData={personStructuredData}
      />
      <AboutHero />
      <AboutApproach />
      <SkillsSection />
      <AboutExpertise />
    </Layout>
  );
}

