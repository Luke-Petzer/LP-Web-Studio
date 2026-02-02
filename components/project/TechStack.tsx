import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { CodeIcon, LayoutIcon, DatabaseIcon, ServerIcon, GlobeIcon, PenToolIcon, SettingsIcon, BarChartIcon, ExternalLinkIcon } from 'lucide-react';

interface TechStackProps {
  project?: {
    technologies?: Array<{
      name: string;
      category: string;
    }>;
    link?: string;
  };
  // New detailed props
  frontend?: string[];
  backend?: string[];
  libraries?: string[];
  tools?: string[];
  apis?: string[];
  link?: string;
}

export function TechStack({
  project,
  frontend,
  backend,
  libraries,
  tools,
  apis,
  link
}: TechStackProps) {
  const techStackRef = useAnimateOnScroll<HTMLDivElement>();

  // Support both old and new prop structures
  let technologies = project?.technologies || [];
  const hasDetailedData = frontend || backend || libraries || tools || apis;

  // Convert new structure to old structure if detailed data provided
  if (hasDetailedData) {
    technologies = [
      ...(frontend || []).map(name => ({ name, category: 'frontend' })),
      ...(backend || []).map(name => ({ name, category: 'backend' })),
      ...(libraries || []).map(name => ({ name, category: 'libraries' })),
      ...(tools || []).map(name => ({ name, category: 'tools' })),
      ...(apis || []).map(name => ({ name, category: 'api' }))
    ];
  }

  const projectLink = link || project?.link;
  // Group technologies by category
  const groupedTech = technologies.reduce((acc: any, tech: any) => {
    const category = tech.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {});
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <LayoutIcon size={18} className="text-orange-500" />;
      case 'backend':
        return <ServerIcon size={18} className="text-indigo-500" />;
      case 'database':
        return <DatabaseIcon size={18} className="text-blue-500" />;
      case 'design':
        return <PenToolIcon size={18} className="text-pink-500" />;
      case 'tools':
        return <SettingsIcon size={18} className="text-gray-500" />;
      case 'marketing':
        return <BarChartIcon size={18} className="text-green-500" />;
      case 'api':
        return <GlobeIcon size={18} className="text-teal-500" />;
      default:
        return <CodeIcon size={18} className="text-teal-500" />;
    }
  };
  return <div ref={techStackRef} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xl mb-8 sticky top-24 animate-on-scroll opacity-0 hover:border-orange-500/50 transition-all duration-300">
      <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-orange-500/50 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        Technical Details
      </h3>
      {Object.keys(groupedTech).length > 0 ? <div className="space-y-6">
          {Object.entries(groupedTech).map(([category, techs]: [string, any]) => <div key={category} className="mb-4">
                <h4 className="text-lg font-semibold mb-3 flex items-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
                  <span className="capitalize">{category}</span>
                </h4>
                <ul className="space-y-3">
                  {techs.map((tech: any, index: number) => <li key={index} className="flex items-center bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-lg p-2 hover:border-orange-500/50 transition-all duration-300">
                      {getCategoryIcon(category)}
                      <span className="ml-2 text-slate-700 dark:text-slate-300 transition-colors duration-300">{tech.name}</span>
                    </li>)}
                </ul>
              </div>)}
        </div> : <p className="text-slate-600 dark:text-slate-400 italic transition-colors duration-300">No technical details available</p>}
      {projectLink && <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-700 transition-colors duration-300">
          <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 transition-colors duration-300">Project Link</h4>
          <a href={projectLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700 hover:border-orange-500/50 rounded-lg px-4 py-3">
            <GlobeIcon size={18} />
            Visit Live Project
            <ExternalLinkIcon size={14} />
          </a>
        </div>}
    </div>;
}