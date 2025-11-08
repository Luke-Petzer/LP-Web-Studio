import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

// Design concept project data structure
interface DesignProject {
  id: string;
  title: string;
  projectType: string;
  overview: string;
  designImages: {
    src: string;
    title: string;
    description: string;
  }[];
  cardImage: string;
}

// Design concept projects data
const designProjects: DesignProject[] = [
  {
    id: 'granite-marble',
    title: 'Granite and Marble',
    projectType: 'Design Concept',
    overview: 'A comprehensive website design concept for a stone and marble business, showcasing modern UI/UX principles with clean layouts, professional imagery, and intuitive navigation. This design demonstrates my ability to create cohesive visual systems across multiple pages while maintaining brand consistency and user-friendly interfaces.',
    cardImage: '/CM-card.png',
    designImages: [
      {
        src: '/Home-Page.png',
        title: 'Home Page',
        description: 'Clean, modern homepage design with hero section and clear navigation'
      },
      {
        src: '/About-Us-Page.png',
        title: 'About Us Page',
        description: 'Professional about page showcasing company story and values'
      },
      {
        src: '/Services-Page.png',
        title: 'Services Page',
        description: 'Well-organized services layout with clear service offerings'
      },
      {
        src: '/Portfolio-Page.png',
        title: 'Portfolio Page',
        description: 'Gallery-style portfolio showcasing previous work and projects'
      },
      {
        src: '/Contact-Us-Page.png',
        title: 'Contact Us Page',
        description: 'User-friendly contact form with clear call-to-action elements'
      }
    ]
  },
  {
    id: 'green-scape-gardeners',
    title: 'Green Scape Gardeners',
    projectType: 'Design Concept',
    overview: 'A nature-inspired website design concept for a landscaping and gardening business, featuring organic layouts, earthy color palettes, and imagery that celebrates the beauty of outdoor spaces. This design showcases my ability to create brand-appropriate aesthetics while maintaining modern usability standards and visual appeal.',
    cardImage: '/GSG-card.png',
    designImages: [
      {
        src: '/GSG-Home-Page.png',
        title: 'Home Page',
        description: 'Nature-inspired homepage with organic layouts and compelling hero imagery'
      },
      {
        src: '/GSG-About-Us-Page.png',
        title: 'About Us Page',
        description: 'Professional storytelling layout highlighting the company\'s passion for landscaping'
      },
      {
        src: '/GSG-Services-Page.png',
        title: 'Services Page',
        description: 'Clear service presentation with nature-themed visual hierarchy'
      },
      {
        src: '/GSG-Gallery-Page.png',
        title: 'Gallery Page',
        description: 'Stunning project showcase with grid-based photo gallery layout'
      },
      {
        src: '/GSG-Contact-Page.png',
        title: 'Contact Page',
        description: 'Inviting contact layout with earthy tones and clear communication pathways'
      }
    ]
  }
];

export function DesignConcept() {
  const { id } = useParams<{ id: string }>();
  const sectionRef = useAnimateOnScroll<HTMLElement>();

  const project = designProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Design Concept Not Found</h1>
          <Link to="/portfolio">
            <Button variant="outline">Return to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      <SEO
        title={`${project.title} - Design Concept`}
        description={project.overview}
        keywords="design concept, UI/UX design, web design, portfolio"
      />

      <main className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 md:px-6 py-3 border-b border-gray-100">
          <nav className="text-sm">
            <Link to="/portfolio" className="text-orange-500 hover:text-orange-600 transition-colors">
              Portfolio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{project.title}</span>
          </nav>
        </div>

        {/* Project Hero */}
        <section ref={sectionRef} className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Project Type Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {project.projectType}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
                {project.title}
              </h1>

              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  {project.overview}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Gallery */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Design Pages</h2>

              <div className="space-y-12">
                {project.designImages.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Image Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-gray-600">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Interested in working together?</h2>
              <p className="text-lg text-gray-600 mb-8">
                This design concept showcases my ability to create cohesive, professional website designs.
                Let's discuss how I can help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/portfolio">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Return to Portfolio
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
