import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface ProjectHeroProps {
  project: {
    title: string;
    description: string;
    image: string;
    category: 'website' | 'mobile' | 'side';
    client?: string;
    timeline?: string;
    role?: string;
  };
}
export function ProjectHero({
  project
}: ProjectHeroProps) {
  const heroRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={heroRef} className="relative min-h-[60vh] flex items-center text-white overflow-hidden" style={{
    height: '60vh'
  }}>
      {/* Background image with overlay - Fixed dimensions to prevent layout shifts */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url("${project.image}")`,
      height: '100%',
      width: '100%'
    }} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/70"></div>
      </div>
      {/* Animated geometric shapes (consistent with home page) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-40 h-40 bg-orange-500/10 rounded-full mix-blend-overlay animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[15%] w-64 h-64 bg-teal-500/10 rounded-full mix-blend-overlay animate-float"></div>
        <div className="absolute top-[40%] right-[25%] w-32 h-32 bg-indigo-500/10 rounded-full mix-blend-overlay animate-pulse-slow" style={{
        animationDelay: '2s'
      }}></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="mb-4 animate-on-scroll opacity-0">
            <span className="uppercase tracking-wider text-xs font-semibold bg-orange-500 px-3 py-1 rounded-sm">
              {project.category === 'website' ? 'Website' : project.category === 'mobile' ? 'Mobile App' : 'Side Project'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-on-scroll opacity-0">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed text-white/90 animate-on-scroll opacity-0">
            {project.description}
          </p>
          {/* Project metadata */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-white/80 animate-on-scroll opacity-0">
            {project.client && <div>
                <span className="font-medium mr-2">Client:</span>
                <span>{project.client}</span>
              </div>}
            {project.timeline && <div>
                <span className="font-medium mr-2">Timeline:</span>
                <span>{project.timeline}</span>
              </div>}
            {project.role && <div>
                <span className="font-medium mr-2">My Role:</span>
                <span>{project.role}</span>
              </div>}
          </div>
        </div>
      </div>
    </section>;
}