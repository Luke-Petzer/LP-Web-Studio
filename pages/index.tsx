import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactCTA } from '../components/ContactCTA';

export default function Home() {
  return (
    <Layout>
      <SEO
        title="LP Web Studio - Professional Web Development in Cape Town"
        description="Transform your digital presence with custom web solutions. Professional web development services for small businesses in Cape Town, South Africa."
        keywords="web development Cape Town, web design, responsive websites, small business websites, South Africa"
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
