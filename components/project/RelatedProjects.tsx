// import { Button } from '../ui/Button';
// import { ProjectCard } from '../ui/ProjectCard';
// import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   link: string;
// }
// interface RelatedProjectsProps {
//   projects: Project[];
// }
// export function RelatedProjects({
//   projects
// }: RelatedProjectsProps) {
//   const sectionRef = useAnimateOnScroll<HTMLElement>();
//   return <section ref={sectionRef} className="py-16 bg-slate-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center animate-on-scroll opacity-0">
//           More Projects
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {projects.map(project => <ProjectCard key={project.id} image={project.image} title={project.title} description={project.description} link={`/project/${project.id}`} />)}
//         </div>
//         <div className="text-center animate-on-scroll opacity-0">
//           <Button href="/portfolio" variant="outline">
//             View All Projects
//           </Button>
//         </div>
//       </div>
//     </section>;
// }