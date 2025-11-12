import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { ExternalLinkIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <Link href="/portfolio">
            <Button variant="outline">Return to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      <SEO
        title={`${project.title} - Showcase Project`}
        description={project.overview}
        keywords="showcase project, web development, portfolio"
      />

      <main className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 md:px-6 py-3 border-b border-gray-100">
          <nav className="text-sm">
            <Link href="/portfolio" className="text-orange-500 hover:text-orange-600 transition-colors">
              Portfolio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{project.title}</span>
          </nav>
        </div>

        {/* Project Hero */}
        <section ref={sectionRef} className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Project Type Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                  {project.projectType}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
                {project.title}
              </h1>

              {/* Project Image */}
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
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
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Overview */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Outcome</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Showcase Images */}
                  {project.showcaseImages && project.showcaseImages.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Showcase Images</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.showcaseImages.map((image, index) => (
                          <div key={index} className="rounded-lg overflow-hidden shadow-md">
                            <img
                              src={image.src}
                              alt={image.title}
                              className="w-full h-auto object-cover"
                            />
                            <div className="p-4 bg-white">
                              <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                              <p className="text-gray-700 text-sm">
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
                  <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">

                    {/* Tools Used */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.toolsUsed.map((tool, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Link href="/portfolio" className="block">
                        <Button variant="outline" className="w-full">
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
                          <Button variant="primary" className="w-full flex items-center justify-center">
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
