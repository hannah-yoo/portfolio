import { useParams, Navigate, Link } from "react-router-dom";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { PageTransition } from "@/components/animations/PageTransition";
import { getProjectBySlug, getNextProject } from "@/data/projects";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * ProjectDetail Page
 * 
 * Brutalist-styled project case study page.
 * Consistent with Index page: heavy borders, uppercase mono type, red accents
 */
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const nextProject = slug ? getNextProject(slug) : null;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Build services/deliverables list
  const deliverables = [project.role, project.team, project.timeline].filter(Boolean);

  return (
    <PageTransition>
      <div className="min-h-screen bg-brutalist-cream font-mono">
        {/* Navigation - same as Index */}
        <nav className="flex items-center justify-between border-b-4 border-brutalist-ink px-6 py-4">
          <Link to="/" className="text-xl font-bold text-brutalist-ink">
            JLM*
          </Link>
          <div className="flex gap-1">
            <Link to="/#work" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">
              WORK
            </Link>
            <Link to="/#about" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">
              INFO
            </Link>
            <Link to="/#contact" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">
              MAIL
            </Link>
          </div>
        </nav>

        {/* Project Title Section */}
        <section className="px-6 pt-12 pb-6 lg:px-12">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-brutalist-ink leading-none">
              {project.title.toUpperCase()}
            </h1>
            {/* Red accent bar - matches Index */}
            <div className="mt-6 h-4 w-32 bg-brutalist-red" />
          </FadeIn>
        </section>

        {/* Hero Image - with 4px border */}
        <section className="px-6 pb-8 lg:px-12">
          <FadeIn>
            <div className="border-4 border-brutalist-ink overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={project.heroImage}
                  alt={`${project.title} hero image`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </FadeIn>
        </section>

        {/* Two-Column Metadata - with heavy border */}
        <section className="px-6 py-8 lg:px-12 border-t-4 border-brutalist-ink">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Role & Tagline */}
              <div>
                <p className="text-xs font-bold text-brutalist-muted uppercase tracking-widest mb-2">
                  {project.role?.split(',')[0]?.toUpperCase()}
                </p>
                {project.subtitle && (
                  <h2 className="text-xl font-bold text-brutalist-ink">
                    {project.subtitle.toUpperCase()}
                  </h2>
                )}
              </div>

              {/* Right: Services/Deliverables + Description */}
              <div>
                <p className="text-xs font-bold text-brutalist-muted uppercase tracking-widest mb-2">
                  SERVICES / DELIVERABLES
                </p>
                <ul className="space-y-1 mb-6">
                  {deliverables.map((item, index) => (
                    <li key={index} className="text-xs text-brutalist-muted">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-brutalist-muted leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Content Sections - Project Images with borders */}
        <section className="px-6 pb-12 lg:px-12">
          <FadeInStagger staggerDelay={0.15}>
            <div className="space-y-8">
              {project.images.map((image, index) => {
                const nextImage = project.images[index + 1];
                const isHalfWidth = image.width === "half";
                const nextIsHalfWidth = nextImage?.width === "half";
                
                // Skip if this is the second of a pair
                if (index > 0 && project.images[index - 1]?.width === "half" && isHalfWidth) {
                  return null;
                }

                // Render side-by-side pair
                if (isHalfWidth && nextIsHalfWidth) {
                  return (
                    <FadeIn key={image.id}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <ProjectImage
                          src={image.url}
                          alt={image.alt}
                          caption={image.caption}
                        />
                        <ProjectImage
                          src={nextImage.url}
                          alt={nextImage.alt}
                          caption={nextImage.caption}
                        />
                      </div>
                    </FadeIn>
                  );
                }

                // Render full-width image
                return (
                  <FadeIn key={image.id}>
                    <ProjectImage
                      src={image.url}
                      alt={image.alt}
                      caption={image.caption}
                    />
                  </FadeIn>
                );
              })}
            </div>
          </FadeInStagger>
        </section>

        {/* Next Project Navigation */}
        <section className="px-6 py-12 lg:px-12 border-t-4 border-brutalist-ink">
          <FadeIn>
            <ProjectNav nextProject={nextProject} />
          </FadeIn>
        </section>

        {/* Footer - matches Index style */}
        <footer className="border-t-4 border-brutalist-ink">
          <div className="px-6 py-4 flex justify-between items-center">
            <span className="text-xs font-bold text-brutalist-muted">
              © {new Date().getFullYear()} PORTFOLIO
            </span>
            <div className="flex gap-4">
              <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">
                INSTAGRAM
              </a>
              <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">
                BEHANCE
              </a>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

/**
 * ProjectImage Component - Brutalist styled with heavy borders
 */
interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ProjectImage = ({ src, alt, caption }: ProjectImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: "150px",
    threshold: 0.1,
  });

  return (
    <figure>
      <div className="border-4 border-brutalist-ink overflow-hidden">
        <AspectRatio ratio={16 / 9} ref={ref}>
          {!imageLoaded && (
            <div className="absolute inset-0 w-full h-full bg-brutalist-ink/10 animate-pulse" />
          )}
          {isIntersecting && (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover",
                "transition-all duration-500",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105 blur-sm"
              )}
            />
          )}
        </AspectRatio>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs font-bold text-brutalist-muted uppercase tracking-widest">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ProjectDetail;
