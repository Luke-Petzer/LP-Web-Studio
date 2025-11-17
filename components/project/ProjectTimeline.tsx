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
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:translate-x-0"></div>
      <div className="space-y-8 relative">
        {timelineItems.map((item, index) => <div key={index} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-on-scroll opacity-0`} style={{
        animationDelay: `${index * 150}ms`
      }}>
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 mt-1.5 w-6 h-6 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center transform md:-translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </div>
            {/* Content */}
            <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-12 md:pr-16 md:text-right' : 'md:ml-12 md:pl-16'} md:w-1/2`}>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col mb-2">
                  <h3 className="font-semibold text-slate-800">{item.phase}</h3>
                  {item.duration && (
                    <span className="text-sm text-orange-600 font-medium">
                      {item.duration}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                )}
                {item.date && (
                  <p className="text-sm text-slate-500 mt-1">{item.date}</p>
                )}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}