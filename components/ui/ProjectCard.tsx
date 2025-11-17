import { useEffect } from 'react';
import { Button } from './Button';
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

  return <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={altText}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          width={400}
          height={256}
          style={{aspectRatio: '400/256'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="mb-4 opacity-90">{description}</p>
          {isDisabled ? (
            <div className="inline-flex items-center px-4 py-2 bg-gray-400 text-white text-sm rounded cursor-not-allowed opacity-75">
              Coming Soon
            </div>
          ) : (
            <Button href={link} variant="primary" className="text-sm px-4 py-2">
              View Project
            </Button>
          )}
        </div>
      </div>
    </div>;
}