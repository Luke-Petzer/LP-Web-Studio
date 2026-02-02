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
      <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-300 dark:border-slate-700 animate-on-scroll opacity-0 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        Project Overview
      </h2>
      <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 animate-on-scroll opacity-0 space-y-6 transition-colors duration-300">
        <p className="text-lg leading-relaxed">
          {mainDescription}
        </p>

        {purpose && (
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="text-orange-500">💡</span> Purpose & Goals
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">{purpose}</p>
          </div>
        )}

        {targetAudience && (
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="text-teal-400">👥</span> Target Audience
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">{targetAudience}</p>
          </div>
        )}

        {keyFeatures && keyFeatures.length > 0 && (
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 transition-colors duration-300">
              <span className="text-orange-500">⭐</span> Key Features
            </h3>
            <ul className="space-y-3 list-none pl-0">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {scope && (
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2 transition-colors duration-300">
              <span className="text-teal-400">📋</span> Project Scope
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 transition-colors duration-300">{scope}</p>
          </div>
        )}
      </div>
    </section>;
}