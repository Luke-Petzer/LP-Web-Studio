import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ContactCTA } from '../components/ContactCTA';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { ProjectHero } from '../components/project/ProjectHero';
import { ProjectOverview } from '../components/project/ProjectOverview';
import { TechStack } from '../components/project/TechStack';
import { ChallengeAndSolution } from '../components/project/ChallengeAndSolution';
import { ProjectGallery } from '../components/project/ProjectGallery';
import { ColorPalette } from '../components/project/ColorPalette';
import { ProjectTimeline } from '../components/project/ProjectTimeline';
import { LearningsAccordion } from '../components/project/LearningsAccordion';
import { RelatedProjects } from '../components/project/RelatedProjects';
import { projectsDataMap } from '../data/projectsData';

// Project data structure
interface ProjectLearning {
  text: string;
}
interface ProjectTechnology {
  name: string;
  category: string;
}
interface ProjectTimelineItem {
  phase: string;
  duration: string;
  date: string;
}
interface ProjectColor {
  name: string;
  color: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  image: string;
  category: 'website' | 'mobile' | 'side';
  link: string;
  client?: string;
  timeline?: string;
  role?: string;
  learnings: ProjectLearning[];
  technologies?: ProjectTechnology[];
  timelineItems?: ProjectTimelineItem[];
  colorPalette?: ProjectColor[];
  galleryImages?: string[];
  galleryDescriptions?: string[];
}
// Move the mock data outside the component to prevent recreating it on each render
const mockProjects: Project[] = [{
  id: 'cafe-client',
  title: 'Cafe Crave Website',
  description: 'A full-stack, retro-inspired website for a local café, featuring a secure API for live Google Reviews.',
  overview: 'Cafe Crave is a modern, responsive website for a retro-inspired, halal-friendly café in Claremont, Cape Town.',
  challenge: 'The client wanted to display live Google Reviews without exposing their private Google API key.',
  solution: 'I architected a Backend-for-Frontend solution with a Node.js server deployed to Railway.',
  image: "/CC-card.png",
  category: 'website',
  link: 'https://cafecrave.co.za',
  client: 'Cafe Crave',
  timeline: 'November 2025',
  role: 'Full-Stack Developer',
  learnings: [{
    text: 'Value of Split-Hosting architecture'
  }, {
    text: 'Performance optimization with Core Web Vitals'
  }, {
    text: 'IntersectionObserver for scroll-spy navigation'
  }],
  technologies: [{
    name: 'React',
    category: 'frontend'
  }, {
    name: 'TypeScript',
    category: 'frontend'
  }, {
    name: 'Node.js',
    category: 'backend'
  }, {
    name: 'Express',
    category: 'backend'
  }],
  timelineItems: [],
  colorPalette: [],
  galleryImages: ["/CC-card.png"],
  galleryDescriptions: ['Cafe Crave Website']
}, {
  id: 'loruki',
  title: 'Loruki Website',
  description: 'A cloud hosting platform with modern design and intuitive user experience.',
  overview: 'Loruki is a fictional cloud hosting platform designed to showcase modern web development techniques and responsive design principles. The project features a clean, intuitive interface with animations and interactive elements.',
  challenge: 'The client needed a modern, responsive website that would showcase their cloud hosting services effectively while providing an intuitive user experience for potential customers to understand complex technical offerings.',
  solution: 'I designed and developed a custom website with a focus on simplicity and user experience. The solution includes interactive elements to explain technical concepts, responsive design for all devices, and optimized performance metrics.',
  image: "/image.png",
  category: 'website',
  link: 'https://example.com/loruki',
  client: 'Loruki Cloud Services',
  timeline: '6 weeks',
  role: 'Lead Developer',
  learnings: [{
    text: 'Improved my understanding of layouts and responsive design'
  }, {
    text: 'How to create a contact form linked to a google sheet'
  }, {
    text: 'Using external fonts and icons'
  }, {
    text: 'Optimizing site performance and loading times'
  }],
  technologies: [{
    name: 'HTML5',
    category: 'frontend'
  }, {
    name: 'CSS3',
    category: 'frontend'
  }, {
    name: 'JavaScript',
    category: 'frontend'
  }, {
    name: 'React',
    category: 'frontend'
  }, {
    name: 'Tailwind CSS',
    category: 'frontend'
  }, {
    name: 'Node.js',
    category: 'backend'
  }],
  timelineItems: [{
    phase: 'Discovery',
    duration: '1 week',
    date: 'Jan 1 - Jan 7, 2023'
  }, {
    phase: 'Design',
    duration: '2 weeks',
    date: 'Jan 8 - Jan 21, 2023'
  }, {
    phase: 'Development',
    duration: '2 weeks',
    date: 'Jan 22 - Feb 4, 2023'
  }, {
    phase: 'Testing',
    duration: '1 week',
    date: 'Feb 5 - Feb 11, 2023'
  }],
  colorPalette: [{
    name: 'Primary',
    color: '#F97316'
  }, {
    name: 'Secondary',
    color: '#14B8A6'
  }, {
    name: 'Accent',
    color: '#6366F1'
  }, {
    name: 'Background',
    color: '#F8FAFC'
  }, {
    name: 'Text',
    color: '#1E293B'
  }],
  galleryImages: ["/image.png", "/image.png", "/image.png"],
  galleryDescriptions: ['Homepage with hero section and key features', 'Services page showcasing cloud hosting options', 'Documentation section with code examples']
}, {
  id: 'savings',
  title: "Saving's Is Key",
  description: 'A budgeting application with intuitive interface to help users manage their finances effectively.',
  overview: "Saving's Is Key is a comprehensive budgeting application designed to help users track expenses, set savings goals, and improve their financial health through intuitive visualizations and actionable insights.",
  challenge: 'The challenge was to create a financial application that simplifies complex budgeting concepts for everyday users while ensuring data security and providing meaningful insights into spending patterns.',
  solution: 'I developed a React-based application with secure authentication, real-time data visualization, and an intuitive interface that makes financial tracking accessible to users with varying levels of financial literacy.',
  image: "/image.png",
  category: 'mobile',
  link: 'https://example.com/savings',
  client: 'FinTech Startup',
  timeline: '3 months',
  role: 'Full-stack Developer',
  learnings: [{
    text: 'State management in complex applications'
  }, {
    text: 'Creating intuitive user interfaces for financial data'
  }, {
    text: 'Implementing secure user authentication'
  }],
  technologies: [{
    name: 'React Native',
    category: 'frontend'
  }, {
    name: 'TypeScript',
    category: 'frontend'
  }, {
    name: 'Redux',
    category: 'frontend'
  }, {
    name: 'Firebase',
    category: 'backend'
  }],
  timelineItems: [{
    phase: 'Research',
    duration: '3 weeks',
    date: 'Mar 1 - Mar 21, 2023'
  }, {
    phase: 'Design',
    duration: '4 weeks',
    date: 'Mar 22 - Apr 18, 2023'
  }, {
    phase: 'Development',
    duration: '6 weeks',
    date: 'Apr 19 - May 30, 2023'
  }, {
    phase: 'Testing & Launch',
    duration: '2 weeks',
    date: 'Jun 1 - Jun 14, 2023'
  }],
  colorPalette: [{
    name: 'Primary',
    color: '#22C55E'
  }, {
    name: 'Secondary',
    color: '#3B82F6'
  }, {
    name: 'Accent',
    color: '#F43F5E'
  }, {
    name: 'Background',
    color: '#F9FAFB'
  }, {
    name: 'Text',
    color: '#1F2937'
  }],
  galleryImages: ["/image.png", "/image.png", "/image.png"],
  galleryDescriptions: ['Dashboard with expense tracking and budget overview', 'Savings goals tracking interface', 'Monthly budget planning tool']
}, {
  id: 'portfolio',
  title: 'Developer Portfolio',
  description: 'A responsive portfolio website showcasing my projects and skills as a web developer.',
  overview: 'A personal portfolio website designed to showcase my skills, projects, and experience as a web developer. The site features a clean, modern design with smooth animations and a focus on user experience.',
  challenge: 'Creating a portfolio that stands out while effectively communicating my skills and experience to potential clients and employers.',
  solution: 'I designed and developed a custom portfolio using React and Tailwind CSS, with a focus on visual appeal, performance, and accessibility.',
  image: "/image.png",
  category: 'website',
  link: 'https://example.com/portfolio',
  client: 'Personal Project',
  timeline: '2 weeks',
  role: 'Designer & Developer',
  learnings: [{
    text: 'Creating a professional brand identity'
  }, {
    text: 'Optimizing images for web performance'
  }, {
    text: 'Implementing smooth animations and transitions'
  }],
  technologies: [{
    name: 'React',
    category: 'frontend'
  }, {
    name: 'Tailwind CSS',
    category: 'frontend'
  }, {
    name: 'JavaScript',
    category: 'frontend'
  }, {
    name: 'Framer Motion',
    category: 'frontend'
  }],
  timelineItems: [{
    phase: 'Design',
    duration: '3 days',
    date: 'Jul 1 - Jul 3, 2023'
  }, {
    phase: 'Development',
    duration: '1 week',
    date: 'Jul 4 - Jul 10, 2023'
  }, {
    phase: 'Content',
    duration: '3 days',
    date: 'Jul 11 - Jul 13, 2023'
  }, {
    phase: 'Launch',
    duration: '1 day',
    date: 'Jul 14, 2023'
  }],
  colorPalette: [{
    name: 'Primary',
    color: '#F97316'
  }, {
    name: 'Secondary',
    color: '#0EA5E9'
  }, {
    name: 'Accent',
    color: '#8B5CF6'
  }, {
    name: 'Background',
    color: '#FFFFFF'
  }, {
    name: 'Text',
    color: '#1E293B'
  }],
  galleryImages: ["/image.png", "/image.png", "/image.png"],
  galleryDescriptions: ['Homepage with hero section', 'Projects showcase grid', 'Skills and expertise section']
}, {
  id: 'weather',
  title: 'Weather App',
  description: 'A simple weather application that provides current and forecasted weather information.',
  overview: 'A weather application that provides users with current conditions and forecasts for any location. The app features a clean, intuitive interface with dynamic backgrounds that change based on weather conditions.',
  challenge: 'Creating a weather app that delivers accurate information in a visually appealing way while handling API integration and location-based services.',
  solution: 'I developed a React-based application that integrates with the OpenWeather API, incorporates geolocation services, and features dynamic UI elements that respond to weather conditions.',
  image: "/image.png",
  category: 'side',
  link: 'https://example.com/weather',
  client: 'Side Project',
  timeline: '1 week',
  role: 'Frontend Developer',
  learnings: [{
    text: 'Working with external APIs'
  }, {
    text: 'Creating dynamic UI based on data'
  }, {
    text: 'Implementing location-based features'
  }],
  technologies: [{
    name: 'React',
    category: 'frontend'
  }, {
    name: 'OpenWeather API',
    category: 'api'
  }, {
    name: 'CSS3',
    category: 'frontend'
  }, {
    name: 'Geolocation API',
    category: 'api'
  }],
  timelineItems: [{
    phase: 'Planning',
    duration: '1 day',
    date: 'Aug 1, 2023'
  }, {
    phase: 'Design',
    duration: '2 days',
    date: 'Aug 2 - Aug 3, 2023'
  }, {
    phase: 'Development',
    duration: '3 days',
    date: 'Aug 4 - Aug 6, 2023'
  }, {
    phase: 'Testing',
    duration: '1 day',
    date: 'Aug 7, 2023'
  }],
  colorPalette: [{
    name: 'Primary',
    color: '#0EA5E9'
  }, {
    name: 'Secondary',
    color: '#6366F1'
  }, {
    name: 'Sunny',
    color: '#FBBF24'
  }, {
    name: 'Rainy',
    color: '#60A5FA'
  }, {
    name: 'Background',
    color: '#F1F5F9'
  }],
  galleryImages: ["/image.png", "/image.png", "/image.png"],
  galleryDescriptions: ['Current weather display', 'Weekly forecast view', 'Location search interface']
}];
export function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [, setImagesPreloaded] = useState(false);
  const mainContentRef = useAnimateOnScroll<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('Project ID from router:', id);
    console.log('Available detailed projects:', Object.keys(projectsDataMap));
    console.log('Detailed project data:', typeof id === 'string' ? projectsDataMap[id] : null);
  }, [id]);
  // Preload all project images on component mount to avoid layout shifts
  useEffect(() => {
    // Preload all project images at once to avoid layout shifts when navigating between projects
    const allImages = mockProjects.reduce((acc: string[], project) => {
      acc.push(project.image);
      if (project.galleryImages) {
        acc.push(...project.galleryImages);
      }
      return acc;
    }, []);
    const uniqueImages = [...new Set(allImages)];
    let loadedCount = 0;
    const totalImages = uniqueImages.length;
    uniqueImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
    });
  }, [setImagesPreloaded]);
  // Load project data once on initial render
  useEffect(() => {
    // Find the current project
    const currentProject = mockProjects.find(p => p.id === id) || null;
    if (currentProject) {
      // Find related projects (excluding current)
      const related = mockProjects.filter(p => p.id !== currentProject.id).filter(p => p.category === currentProject.category).slice(0, 2);
      // If we need more projects to show, add from other categories
      if (related.length < 2) {
        const others = mockProjects.filter(p => p.id !== currentProject.id && !related.includes(p)).slice(0, 2 - related.length);
        setRelatedProjects([...related, ...others]);
      } else {
        setRelatedProjects(related);
      }
      setProject(currentProject);
      // Set loading to false after a short delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [id]);
  // Render with fixed dimensions to prevent layout shifts
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50" style={{
      height: '100vh'
    }}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-36 bg-slate-200 rounded"></div>
        </div>
      </div>;
  }
  if (!project) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center" style={{
      height: '100vh'
    }}>
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-lg text-slate-600 mb-8">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <Button href="/portfolio" variant="primary">
          Back to Portfolio
        </Button>
      </div>;
  }

  // Check if this is a project with detailed data structure (like Cafe Crave)
  const detailedProject = typeof id === 'string' ? projectsDataMap[id] : null;

  if (detailedProject) {
    // Render with new detailed structure
    return <div className="font-sans text-gray-800 bg-white" ref={contentRef}>
        <SEO title={`${detailedProject.hero.title} - Project Case Study | LP Web Studio`} description={detailedProject.hero.tagline} keywords={`${detailedProject.hero.title.toLowerCase()}, case study, web development, ${detailedProject.hero.category}, portfolio project`} />
        <main className="pt-0">
          {/* Hero Section */}
          <ProjectHero
            title={detailedProject.hero.title}
            tagline={detailedProject.hero.tagline}
            image={detailedProject.hero.image}
            category={detailedProject.hero.category}
            date={detailedProject.hero.date}
            client={detailedProject.client}
            role={detailedProject.role}
          />
          {/* Main Content */}
          <div className="container mx-auto px-4 md:px-6 py-8 md:py-16" ref={mainContentRef}>
            {/* Back to Portfolio Link */}
            <div className="mb-8 md:mb-12 animate-on-scroll opacity-0">
              <Link href="/portfolio" className="inline-flex items-center text-slate-600 hover:text-orange-500 transition-colors">
                <ArrowLeftIcon size={16} className="mr-2" />
                <span>Back to Portfolio</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {/* Project Overview */}
                <ProjectOverview
                  description={detailedProject.overview.description}
                  purpose={detailedProject.overview.purpose}
                  targetAudience={detailedProject.overview.targetAudience}
                  keyFeatures={detailedProject.overview.keyFeatures}
                  scope={detailedProject.overview.scope}
                />
                {/* Challenge and Solution */}
                <ChallengeAndSolution challenges={detailedProject.challenges} />
                {/* Development Process */}
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                    Development Process
                  </h2>
                  {/* Project Gallery */}
                  {detailedProject.gallery && detailedProject.gallery.length > 0 && <ProjectGallery images={detailedProject.gallery} />}
                  {/* Color Palette */}
                  {detailedProject.colors && detailedProject.colors.length > 0 && <div className="mt-12">
                      <h3 className="text-xl font-semibold mb-4 animate-on-scroll opacity-0">
                        Color Palette
                      </h3>
                      <ColorPalette colors={detailedProject.colors} />
                    </div>}
                </section>
                {/* Project Timeline */}
                {detailedProject.timeline && detailedProject.timeline.phases && <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                      Project Timeline
                    </h2>
                    <ProjectTimeline
                      phases={detailedProject.timeline.phases}
                    />
                  </section>}
                {/* Learnings & Outcomes */}
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                    Learnings & Outcomes
                  </h2>
                  <LearningsAccordion learnings={detailedProject.learnings} />
                </section>
              </div>
              {/* Sidebar Column */}
              <div className="lg:col-span-1">
                <TechStack
                  frontend={detailedProject.techStack.frontend}
                  backend={detailedProject.techStack.backend}
                  libraries={detailedProject.techStack.libraries}
                  tools={detailedProject.techStack.tools}
                  apis={detailedProject.techStack.apis}
                  link={detailedProject.link}
                />
              </div>
            </div>
          </div>
          {/* Related Projects */}
          {relatedProjects.length > 0 && <RelatedProjects projects={relatedProjects} />}
          {/* CTA Section */}
          <ContactCTA />
        </main>
      </div>;
  }

  // Render with old structure for other projects
  return <div className="font-sans text-gray-800 bg-white" ref={contentRef}>
      <SEO title={`${project.title} - Project Case Study | LP Web Studio`} description={project.description} keywords={`${project.title.toLowerCase()}, case study, web development, ${project.category}, portfolio project`} />
      <main className="pt-0">
        {/* Hero Section */}
        <ProjectHero project={project} />
        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16" ref={mainContentRef}>
          {/* Back to Portfolio Link */}
          <div className="mb-8 md:mb-12 animate-on-scroll opacity-0">
            <Link href="/portfolio" className="inline-flex items-center text-slate-600 hover:text-orange-500 transition-colors">
              <ArrowLeftIcon size={16} className="mr-2" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Project Overview */}
              <ProjectOverview project={project} />
              {/* Challenge and Solution */}
              <ChallengeAndSolution project={project} />
              {/* Development Process */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                  Development Process
                </h2>
                {/* Project Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && <ProjectGallery images={project.galleryImages} descriptions={project.galleryDescriptions || []} />}
                {/* Color Palette */}
                {project.colorPalette && project.colorPalette.length > 0 && <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4 animate-on-scroll opacity-0">
                      Color Palette
                    </h3>
                    <ColorPalette colors={project.colorPalette} />
                  </div>}
              </section>
              {/* Project Timeline */}
              {project.timelineItems && project.timelineItems.length > 0 && <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                    Project Timeline
                  </h2>
                  <ProjectTimeline timeline={project.timelineItems} />
                </section>}
              {/* Learnings & Outcomes */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
                  Learnings & Outcomes
                </h2>
                <LearningsAccordion learnings={project.learnings} />
              </section>
            </div>
            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <TechStack project={project} />
            </div>
          </div>
        </div>
        {/* Related Projects */}
        {relatedProjects.length > 0 && <RelatedProjects projects={relatedProjects} />}
        {/* CTA Section */}
        <ContactCTA />
      </main>
    </div>;
}