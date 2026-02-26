import { useEffect, forwardRef } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { EnhancedImage } from '../ui/EnhancedImage';
import Link from 'next/link';
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
interface DetailedProjectCardProps {
  project: Project;
  index?: number;
}
export const DetailedProjectCard = forwardRef<HTMLDivElement, DetailedProjectCardProps>(({
  project,
  index = 0
}, ref) => {
  // Preload image functionality kept for performance
  useEffect(() => {
    const img = new Image();
    img.src = project.image;
  }, [project.image]);
  return <div ref={ref} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-orange-500/50 transition-all duration-300 opacity-0" style={{
    transform: 'translateY(30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    transitionDelay: `${index * 0.1}s`
  }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 lg:h-full">
            <EnhancedImage src={project.image} alt={`Screenshot of ${project.title} project`} className="w-full h-full object-cover object-center opacity-100" loading="lazy" // Use lazy loading instead of eager
          />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 lg:opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white hidden lg:block">
            <span className="uppercase tracking-wider text-xs font-semibold bg-orange-500 px-2 py-1 rounded-sm">
              {project.category === 'website' ? 'Website' : project.category === 'mobile' ? 'Mobile App' : 'Side Project'}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="lg:hidden mb-3">
            <span className="uppercase tracking-wider text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded-sm">
              {project.category === 'website' ? 'Website' : project.category === 'mobile' ? 'Mobile App' : 'Side Project'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-slate-900 dark:text-slate-50 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-6 transition-colors duration-300">{project.description}</p>
          <div className="mt-auto">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 transition-colors duration-300">
              Key Business Features:
            </h4>
            <ul className="space-y-2 mb-6">
              {project.learnings.map((learning, index) => <li key={index} className="flex items-start text-slate-600 dark:text-slate-400 transition-colors duration-300">
                  <span className="text-orange-500 mr-2" aria-hidden="true">
                    •
                  </span>
                  <span>{learning.text}</span>
                </li>)}
            </ul>
            <div>
              {project.link === 'disabled' ? (
                <div className="inline-flex items-center px-6 py-3 bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 shadow-md font-medium rounded-lg cursor-not-allowed opacity-75 transition-colors duration-300">
                  Coming Soon
                  <span className="ml-2 text-sm">(In Development)</span>
                </div>
              ) : (
                <Link
                  href={
                    project.projectType === 'Showcase' ? `/showcase/${project.id}` :
                    project.projectType === 'Design' ? `/design/${project.id}` :
                    `/project/${project.id}`
                  }
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white shadow-lg shadow-orange-500/30 font-medium rounded-lg hover:bg-orange-600 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Project{' '}
                  <ExternalLinkIcon size={16} className="ml-2" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>;
});