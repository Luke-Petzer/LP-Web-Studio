import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface TimelineItem {
  phase: string;
  duration?: string;
  date?: string;
  description?: string;
}

interface ProjectTimelineProps {
  timeline?: TimelineItem[];
  duration?: string;
  phases?: Array<{
    phase: string;
    description: string;
  }>;
}

export function ProjectTimeline({
  timeline,
  phases
}: ProjectTimelineProps) {
  const timelineRef = useAnimateOnScroll<HTMLDivElement>();

  // Support both old and new prop structures
  const timelineItems = timeline || (phases || []).map(p => ({
    phase: p.phase,
    description: p.description,
    duration: '',
    date: ''
  }));

  if (timelineItems.length === 0) {
    return null;
  }

  return <div ref={timelineRef} className="relative animate-on-scroll opacity-0">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700 transform md:translate-x-0 transition-colors duration-300"></div>
      <div className="space-y-8 relative">
        {timelineItems.map((item, index) => <div key={index} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-on-scroll opacity-0`} style={{
        animationDelay: `${index * 150}ms`
      }}>
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 mt-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-orange-500 flex items-center justify-center transform md:-translate-x-1/2 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </div>
            {/* Content */}
            <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-12 md:pr-16 md:text-right' : 'md:ml-12 md:pl-16'} md:w-1/2`}>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300">{item.phase}</h3>
                  {item.duration && (
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-medium transition-colors duration-300">
                      {item.duration}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 transition-colors duration-300">{item.description}</p>
                )}
                {item.date && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 transition-colors duration-300">{item.date}</p>
                )}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}