import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Project } from "@/types";

interface ProjectNavProps {
  nextProject: Project | null;
}

/**
 * ProjectNav Component - Brutalist styled
 * 
 * Navigation footer for project detail pages.
 */
export const ProjectNav = ({ nextProject }: ProjectNavProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-between">
      {/* Next Project Link */}
      {nextProject ? (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group flex items-center gap-3 font-mono text-xs font-bold text-brutalist-ink hover:text-brutalist-red transition-colors"
        >
          <span className="uppercase tracking-widest">Next Project</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          to="/"
          className="group flex items-center gap-3 font-mono text-xs font-bold text-brutalist-ink hover:text-brutalist-red transition-colors"
        >
          <span className="uppercase tracking-widest">Back to Work</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="group flex items-center gap-3 font-mono text-xs font-bold text-brutalist-ink hover:text-brutalist-red transition-colors"
      >
        <span className="uppercase tracking-widest">Back to Top</span>
        <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
      </button>
    </div>
  );
};
