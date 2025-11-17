import { useEffect, useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { ProjectFilter } from '../components/portfolio/ProjectFilter';
import { DetailedProjectCard } from '../components/portfolio/DetailedProjectCard';
import { SEO } from '../components/SEO';

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

export default function Portfolio() {
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
    image: "/cc-home.png",
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <Layout>
      <SEO
        title="Portfolio - LP Web Studio | Web Development Projects"
        description="Browse our portfolio of web development projects including client websites, design concepts, and showcase projects. See our work in responsive design and modern web solutions."
        keywords="web development portfolio, website design examples, Cape Town web developer, React projects"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              My Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              A collection of my web development projects, design concepts, and technical experiments
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <div className="space-y-8 md:space-y-12">
            {filteredProjects.map((project, index) => (
              <DetailedProjectCard
                key={project.id}
                project={project}
                ref={el => {
                  if (el) projectRefs.current[index] = el;
                }}
                index={index}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

