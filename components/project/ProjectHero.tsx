import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface ProjectHeroProps {
  project?: {
    title: string;
    description: string;
    image: string;
    category: 'website' | 'mobile' | 'side';
    client?: string;
    timeline?: string;
    role?: string;
  };
  // New props for detailed project data
  title?: string;
  tagline?: string;
  image?: string;
  category?: string;
  date?: string;
  client?: string;
  role?: string;
}

export function ProjectHero({
  project,
  title,
  tagline,
  image,
  category,
  date,
  client,
  role
}: ProjectHeroProps) {
  const heroRef = useAnimateOnScroll<HTMLElement>();

  // Support both old and new prop structures
  const heroTitle = title || project?.title || '';
  const heroDescription = tagline || project?.description || '';
  const heroImage = image || project?.image || '';
  const heroCategory = category || (project?.category === 'website' ? 'Website' : project?.category === 'mobile' ? 'Mobile App' : 'Side Project') || '';
  const heroClient = client || project?.client;
  const heroRole = role || project?.role;
  const heroTimeline = date || project?.timeline;

  return <section ref={heroRef} className="relative min-h-[60vh] flex items-center text-white overflow-hidden backdrop-blur-sm" style={{
    height: '60vh'
  }}>
      {/* Background image with overlay - Fixed dimensions to prevent layout shifts */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url("${heroImage}")`,
      height: '100%',
      width: '100%'
    }} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="mb-6 animate-on-scroll opacity-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/90 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider shadow-lg shadow-orange-500/30">
              {heroCategory}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-on-scroll opacity-0 text-white">
            {heroTitle}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl leading-relaxed text-slate-200 animate-on-scroll opacity-0">
            {heroDescription}
          </p>
          {/* Project metadata */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-slate-200 animate-on-scroll opacity-0">
            {heroClient && <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-400">Client:</span>
                <span>{heroClient}</span>
              </div>}
            {heroTimeline && <div className="flex items-center gap-2">
                <span className="font-semibold text-teal-400">Timeline:</span>
                <span>{heroTimeline}</span>
              </div>}
            {heroRole && <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-400">My Role:</span>
                <span>{heroRole}</span>
              </div>}
          </div>
        </div>
      </div>
    </section>;
}