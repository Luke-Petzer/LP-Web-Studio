import { Button } from './ui/Button';
import { ProjectCard } from './ui/ProjectCard';
import { Briefcase } from 'lucide-react';
import { allProjects } from '../data/projectsData';

export function ProjectsSection() {
  // Get first 3 projects for homepage display
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <section className="relative py-20 md:py-28 lg:py-32 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 text-sm text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">
            <Briefcase className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            <span>Our Portfolio</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
            Recent{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Work
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto transition-colors duration-300">
            See how we've helped businesses like yours grow their online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 overflow-x-hidden">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.hero.image}
              title={project.hero.title}
              description={project.hero.tagline}
              link={project.link || '#'}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            href="/portfolio"
            variant="outline"
            className="border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 hover:border-orange-500 hover:text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            See More Projects
          </Button>
        </div>
      </div>
    </section>
  );
}