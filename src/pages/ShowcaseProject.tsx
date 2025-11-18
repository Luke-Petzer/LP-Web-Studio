import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SEO } from '../../components/SEO';
import { Button } from '../../components/ui/Button';
import { ExternalLinkIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

// Showcase project data structure
interface ShowcaseProject {
  id: string;
  title: string;
  projectType: string;
  overview: string;
  highlights: string[];
  toolsUsed: string[];
  outcome: string;
  image: string;
  showcaseImages?: {
    src: string;
    title: string;
    description: string;
  }[];
  liveDemo?: string;
}

// Showcase projects data
const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'loruki',
    title: 'Loruki Website',
    projectType: 'Showcase Project',
    overview: 'Loruki is a demo cloud-hosting website created to experiment with responsive design and modern layout structure. The goal was to practice clean UI design, component organization, and accessibility while keeping performance in mind.',
    highlights: [
      'Fully responsive layout built with HTML and CSS',
      'Animated hero sections and smooth navigation',
      'Focused on performance, simplicity, and scalability'
    ],
    toolsUsed: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    outcome: 'The project improved my understanding of modern CSS structure, animation timing, and page optimization.',
    image: '/L-card.png',
    showcaseImages: [
      {
        src: '/L-Features.png',
        title: 'Features Section',
        description: 'Clean feature presentation with modern card layouts and clear value propositions'
      },
      {
        src: '/L-Docs.png',
        title: 'Documentation Page',
        description: 'Well-organized documentation layout with code examples and clear navigation'
      }
    ],
    liveDemo: 'https://example.com/loruki'
  }
];

export function ShowcaseProject() {
  const router = useRouter();
  const { id } = router.query;
  const sectionRef = useAnimateOnScroll<HTMLElement>();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = showcaseProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">Project Not Found</h1>
          <Link href="/portfolio">
            <Button variant="outline">Return to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-300">
      <SEO
        title={`${project.title} - Showcase Project`}
        description={project.overview}
        keywords="showcase project, web development, portfolio"
      />

      <main>
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 md:px-6 py-4 border-b border-slate-800">
          <nav className="text-sm">
            <Link href="/portfolio" className="text-orange-500 hover:text-orange-400 transition-colors">
              Portfolio
            </Link>
            <span className="mx-2 text-slate-600">/</span>
            <span className="text-slate-400">{project.title}</span>
          </nav>
        </div>

        {/* Project Hero */}
        <section ref={sectionRef} className="py-8 md:py-12 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Project Type Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-500/30">
                  {project.projectType}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in text-slate-50">
                {project.title}
              </h1>

              {/* Project Image */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="py-12 md:py-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Overview */}
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50 flex items-center gap-2">
                      <span className="text-orange-500">📋</span> Overview
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50 flex items-center gap-2">
                      <span className="text-teal-400">✨</span> Highlights
                    </h2>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                          <span className="text-slate-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-slate-50 flex items-center gap-2">
                      <span className="text-orange-500">🎯</span> Outcome
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Showcase Images */}
                  {project.showcaseImages && project.showcaseImages.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-slate-50 flex items-center gap-2">
                        <span className="text-teal-400">🖼️</span> Showcase Images
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {project.showcaseImages.map((image, index) => (
                          <div key={index} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300">
                            <img
                              src={image.src}
                              alt={image.title}
                              className="w-full h-auto object-cover"
                            />
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2 text-slate-100">{image.title}</h3>
                              <p className="text-slate-400 text-sm leading-relaxed">
                                {image.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24 hover:border-orange-500/50 transition-all duration-300">

                    {/* Tools Used */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-slate-50">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.toolsUsed.map((tool, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-sm rounded-full hover:border-orange-500/50 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Link href="/portfolio" className="block">
                        <Button variant="outline" className="w-full border-2 border-slate-700 text-slate-100 hover:border-orange-500 hover:text-orange-500">
                          Return to Portfolio
                        </Button>
                      </Link>

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="primary" className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                            <ExternalLinkIcon size={18} className="mr-2" />
                            View Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
