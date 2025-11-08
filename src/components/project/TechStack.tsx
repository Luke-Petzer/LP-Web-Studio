import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { CodeIcon, LayoutIcon, DatabaseIcon, ServerIcon, GlobeIcon, PenToolIcon, SettingsIcon, BarChartIcon, ExternalLinkIcon } from 'lucide-react';
interface TechStackProps {
  project: {
    technologies?: Array<{
      name: string;
      category: string;
    }>;
    link?: string;
  };
}
export function TechStack({
  project
}: TechStackProps) {
  const techStackRef = useAnimateOnScroll<HTMLDivElement>();
  // Default technologies if not provided
  const technologies = project.technologies || [];
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
  return <div ref={techStackRef} className="bg-slate-50 p-6 rounded-xl shadow-sm mb-8 sticky top-24 animate-on-scroll opacity-0">
      <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-orange-500/30">
        Technical Details
      </h3>
      {Object.keys(groupedTech).length > 0 ? <div className="space-y-6">
          {Object.entries(groupedTech).map(([category, techs]: [string, any]) => <div key={category} className="mb-4">
                <h4 className="text-lg font-semibold mb-3 flex items-center text-slate-700">
                  <span className="capitalize">{category}</span>
                </h4>
                <ul className="space-y-2">
                  {techs.map((tech: any, index: number) => <li key={index} className="flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2 text-slate-600">{tech.name}</span>
                    </li>)}
                </ul>
              </div>)}
        </div> : <p className="text-slate-500 italic">No technical details available</p>}
      {project.link && <div className="mt-8 pt-6 border-t border-slate-200">
          <h4 className="text-lg font-semibold mb-3">Project Link</h4>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 flex items-center">
            <GlobeIcon size={18} className="mr-2" />
            Visit Live Project
            <ExternalLinkIcon size={14} className="ml-1" />
          </a>
        </div>}
    </div>;
}