import { useEffect, useState, useRef } from 'react';
import { ProjectFilter } from '../../components/portfolio/ProjectFilter';
import { DetailedProjectCard } from '../../components/portfolio/DetailedProjectCard';
import { ContactCTA } from '../../components/ContactCTA';
import { SEO } from '../../components/SEO';
// Project data structure
interface ProjectLearning {
  text: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'website' | 'mobile' | 'side';
  projectType: 'Client' | 'Showcase' | 'Design';
  link: string;
  learnings: ProjectLearning[];
}
export function Portfolio() {
  // Sample project data
  const projects: Project[] = [{
    id: 'loruki',
    title: 'Loruki Website',
    description: 'A demo cloud-hosting website created to experiment with responsive design and modern layout structure.',
    image: "/L-card.png",
    category: 'website',
    projectType: 'Showcase',
    link: '#',
    learnings: [{
      text: 'Improved my understanding of layouts and responsive design'
    }, {
      text: 'How to create a contact form linked to a google sheet'
    }, {
      text: 'Using external fonts and icons'
    }]
  }, {
    id: 'cafe-client',
    title: 'Cafe Crave Website',
    description: 'A full-stack, retro-inspired website for a local café, featuring a secure API for live Google Reviews.',
    image: "/CC-card.png",
    category: 'website',
    projectType: 'Client',
    link: '/project/cafe-client',
    learnings: [{
      text: 'Implementing secure API architecture for Google Reviews'
    }, {
      text: 'Creating dynamic menu with scroll-spy navigation'
    }, {
      text: 'Deploying split-hosting solution (Railway + Hostinger)'
    }]
  }, {
    id: 'granite-marble',
    title: 'Granite and Marble',
    description: 'A comprehensive website design concept showcasing modern UI/UX principles for a stone and marble business.',
    image: "/CM-card.png",
    category: 'website',
    projectType: 'Design',
    link: '#',
    learnings: [{
      text: 'Creating cohesive design systems across multiple pages'
    }, {
      text: 'Developing visual hierarchy for business websites'
    }, {
      text: 'Designing user-friendly navigation and layouts'
    }]
  }, {
    id: 'green-scape-gardeners',
    title: 'Green Scape Gardeners',
    description: 'A nature-inspired website design concept for a landscaping and gardening business, featuring organic layouts and earthy aesthetics.',
    image: "/GSG-card.png",
    category: 'website',
    projectType: 'Design',
    link: '#',
    learnings: [{
      text: 'Incorporating natural themes into web design'
    }, {
      text: 'Creating visually appealing gallery layouts'
    }, {
      text: 'Balancing imagery with content hierarchy'
    }]
  }];
  const [activeFilter, setActiveFilter] = useState<'all' | 'Client' | 'Showcase' | 'Design'>('all');
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(project => project.projectType === activeFilter);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeFilter]);
  // Setup refs for projects
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, filteredProjects.length);
  }, [filteredProjects]);
  // Preload all project images
  useEffect(() => {
    projects.forEach(project => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);
  // Create intersection observer for project animations
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    projectRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [filteredProjects]);
  return <div className="font-sans text-gray-800 bg-white">
      <SEO
        title="Creative Portfolio - Web Development & Design Projects"
        description="Explore LP Web Studio's portfolio featuring responsive websites, client projects, and innovative design concepts. See our web development work for Cape Town businesses and creative showcases."
        keywords="web development portfolio, responsive website design, Cape Town web designer, client projects, showcase websites, React projects, UI UX portfolio, creative agency work"
        ogImage="/L-card.png"
        canonicalUrl="https://lpwebstudio.com/portfolio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "LP Web Studio Portfolio",
          "description": "Portfolio showcasing web development projects, client work, and design concepts by LP Web Studio",
          "url": "https://lpwebstudio.com/portfolio",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredProjects.length,
            "itemListElement": filteredProjects.map((project, index) => ({
              "@type": "CreativeWork",
              "position": index + 1,
              "name": project.title,
              "description": project.description,
              "image": `https://lpwebstudio.com${project.image}`,
              "creator": {
                "@type": "Person",
                "name": "Luke Petzer"
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lpwebstudio.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://lpwebstudio.com/portfolio"
              }
            ]
          }
        }}
      />
      <main className="pt-0 pb-0">
        <section className="container mx-auto px-4 md:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in">
              Creative Portfolio & Web Development Projects
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 animate-fade-in">
              Discover our comprehensive collection of web development work, client projects, and innovative design concepts showcasing modern responsive design and user-focused solutions.
            </p>
          </div>
          <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <div className="mt-8 sm:mt-12 space-y-12 sm:space-y-16">
            {filteredProjects.map((project, index) => <DetailedProjectCard key={project.id} project={project} ref={el => { if (el) projectRefs.current[index] = el; }} index={index} />)}
          </div>
          {filteredProjects.length === 0 && <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-600">
                No projects found in this category yet.
              </h3>
              <p className="mt-2 text-gray-500">
                Check back soon or explore other categories.
              </p>
            </div>}
        </section>
        <ContactCTA />
      </main>
    </div>;
}