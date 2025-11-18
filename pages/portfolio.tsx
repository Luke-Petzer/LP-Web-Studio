import { useEffect, useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { ProjectFilter } from '../components/portfolio/ProjectFilter';
import { DetailedProjectCard } from '../components/portfolio/DetailedProjectCard';
import { SEO } from '../components/SEO';
import { allProjects, ProjectData } from '../data/projectsData';

// Project data structure for portfolio display
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

// Helper function to convert ProjectData to Portfolio Project format
function convertToPortfolioProject(projectData: ProjectData): Project {
  const getProjectType = (id: string): 'Client' | 'Showcase' | 'Design' => {
    if (id === 'cafe-client') return 'Client';
    if (id === 'loruki') return 'Showcase';
    return 'Design';
  };

  return {
    id: projectData.id,
    title: projectData.hero.title,
    description: projectData.hero.tagline,
    image: projectData.hero.image,
    category: 'website',
    projectType: getProjectType(projectData.id),
    link: projectData.link || '#',
    learnings: projectData.learnings.slice(0, 3).map(learning => ({ text: learning }))
  };
}

export default function Portfolio() {
  // Convert centralized project data to portfolio format
  const projects: Project[] = allProjects.map(convertToPortfolioProject);

  const [activeFilter, setActiveFilter] = useState<'all' | 'Client' | 'Showcase' | 'Design'>('all');
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(project => project.projectType === activeFilter);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      <section className="relative py-20 md:py-28 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-sm text-slate-300 mb-6">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Showcasing My Work</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-50">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                Portfolio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              A collection of my web development projects, design concepts, and technical experiments
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-16 md:py-20 backdrop-blur-sm">
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
              <p className="text-slate-400 text-lg">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

