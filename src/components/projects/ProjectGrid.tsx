import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

/**
 * ProjectGrid Component - Brutalist Style
 * 
 * Responsive grid for displaying project cards.
 * Simplified to 1-2-3 column layout for brutalist aesthetic.
 */
export const ProjectGrid = ({ projects, className }: ProjectGridProps) => {
  return (
    <FadeInStagger className={className} staggerDelay={0.1}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <FadeIn key={project.id}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </FadeInStagger>
  );
};
