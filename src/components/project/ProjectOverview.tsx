import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface ProjectOverviewProps {
  project?: {
    title: string;
    overview?: string;
    description: string;
  };
  // New detailed props
  description?: string;
  purpose?: string;
  targetAudience?: string;
  keyFeatures?: string[];
  scope?: string;
}

export function ProjectOverview({
  project,
  description,
  purpose,
  targetAudience,
  keyFeatures,
  scope
}: ProjectOverviewProps) {
  const overviewRef = useAnimateOnScroll<HTMLElement>();

  // Support both old and new prop structures
  const mainDescription = description || project?.overview || project?.description || '';

  return <section ref={overviewRef} className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
        Project Overview
      </h2>
      <div className="prose prose-lg max-w-none text-slate-700 animate-on-scroll opacity-0 space-y-6">
        <p className="text-lg leading-relaxed">
          {mainDescription}
        </p>

        {purpose && (
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Purpose & Goals</h3>
            <p className="text-base leading-relaxed">{purpose}</p>
          </div>
        )}

        {targetAudience && (
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Target Audience</h3>
            <p className="text-base leading-relaxed">{targetAudience}</p>
          </div>
        )}

        {keyFeatures && keyFeatures.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Key Features</h3>
            <ul className="space-y-2 list-none pl-0">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span className="text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {scope && (
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Project Scope</h3>
            <p className="text-base leading-relaxed">{scope}</p>
          </div>
        )}
      </div>
    </section>;
}