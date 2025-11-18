import { useEffect } from 'react';
import { Button } from './Button';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export function ProjectCard({
  image,
  title,
  description,
  link
}: ProjectCardProps) {
  // Preload image functionality kept for performance
  useEffect(() => {
    const img = new Image();
    img.src = image;
  }, [image]);

  const isDisabled = link === 'disabled';
  const altText = `${title} - Professional web development project showcase by LP Web Studio`;

  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2">
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 to-teal-500/0 group-hover:from-orange-500/20 group-hover:to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={256}
          style={{aspectRatio: '400/256'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold mb-2 text-slate-50 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="mb-4 text-slate-300 leading-relaxed">
            {description}
          </p>
          {isDisabled ? (
            <div className="inline-flex items-center px-4 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg cursor-not-allowed">
              Coming Soon
            </div>
          ) : (
            <Button
              href={link}
              variant="primary"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
            >
              View Project
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}