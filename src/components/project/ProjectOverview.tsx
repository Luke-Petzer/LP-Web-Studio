import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface ProjectOverviewProps {
  project: {
    title: string;
    overview?: string;
    description: string;
  };
}
export function ProjectOverview({
  project
}: ProjectOverviewProps) {
  const overviewRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={overviewRef} className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
        Project Overview
      </h2>
      <div className="prose prose-lg max-w-none text-slate-700 animate-on-scroll opacity-0">
        <p className="text-lg leading-relaxed">
          {project.overview || project.description}
        </p>
      </div>
    </section>;
}