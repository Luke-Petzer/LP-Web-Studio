import { Button } from './ui/Button';
import { ProjectCard } from './ui/ProjectCard';
export function ProjectsSection() {
  return <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
          Recent Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 overflow-x-hidden">
          <ProjectCard
            image="/L-card.png"
            title="Loruki Website"
            description="A demo cloud-hosting website created to experiment with responsive design and modern layout structure."
            link="/showcase/loruki"
          />
          <ProjectCard
            image="/CC-card.png"
            title="Cafe Client Website"
            description="A modern, responsive website for a local cafe featuring online menu, location details, and booking functionality."
            link="disabled"
          />
          <ProjectCard
            image="/CM-card.png"
            title="Granite and Marble"
            description="A comprehensive website design concept showcasing modern UI/UX principles for a stone and marble business."
            link="/design/granite-marble"
          />
        </div>
        <div className="text-center">
          <Button href="/portfolio" variant="outline">
            See More Projects
          </Button>
        </div>
      </div>
    </section>;
}