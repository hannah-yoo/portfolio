import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Project } from "@/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ProjectCardProps {
  project: Project;
  onHover?: (projectId: string) => void;
}

/**
 * ProjectCard Component - Brutalist Style
 * 
 * Interactive project preview card with brutalist styling.
 * Features heavy borders, grayscale images, and hover effects.
 */
export const ProjectCard = ({ project, onHover }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: "200px",
    threshold: 0.1,
  });

  const aspectRatio = project.gridWidth === 3 ? 4 / 3 : 16 / 9;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(project.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block overflow-hidden border-4 border-brutalist-ink"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AspectRatio ratio={aspectRatio} ref={ref}>
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 w-full h-full bg-brutalist-cream animate-pulse" />
        )}
        
        {/* Image with grayscale effect */}
        {isIntersecting && (
          <img
            src={project.heroImage}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              "grayscale group-hover:grayscale-0 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </AspectRatio>

      {/* Card Info */}
      <div className="p-4 bg-brutalist-cream border-t-4 border-brutalist-ink">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={cn(
              "font-mono text-sm font-bold uppercase transition-colors",
              isHovered ? "text-brutalist-red" : "text-brutalist-ink"
            )}>
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="font-mono text-xs text-brutalist-muted mt-1">
                {project.subtitle}
              </p>
            )}
          </div>
          <span className="font-mono text-xs font-bold text-brutalist-muted">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
};
