import { useParams, Navigate, Link } from "react-router-dom";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { PageTransition } from "@/components/animations/PageTransition";
import { getAllProjects, getNextProject, loadProjects } from "@/data/projects";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import { cn, resolveAssetUrl } from "@/lib/utils";
import { Project } from "@/types";
import { ProjectImageFrame } from "@/components/projects/ProjectImageFrame";
import { ArrowUpRight } from "lucide-react";
import { PortfolioFooter } from "@/components/navigation/PortfolioChrome";

/**
 * ProjectDetail Page
 * 
 * Editorial detail page for selected portfolio entries.
 */
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void loadProjects().then((nextProjects) => {
      if (active) {
        setProjects(nextProjects);
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const project = slug ? projects.find((item) => item.slug === slug) : undefined;
  const nextProject = slug ? getNextProject(slug) : null;
  const [heroAspectRatio, setHeroAspectRatio] = useState(16 / 9);

  if (!project && isLoading) {
    return (
      <div className="portfolio-shell">
        <main id="main-content" className="portfolio-project">
          <p className="portfolio-muted">Loading project…</p>
        </main>
        <PortfolioFooter />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const media = project.images ?? [];
  return (
    <PageTransition>
      <div className="portfolio-shell">
        {/* Project Title Section */}
        <main id="main-content" className="portfolio-project">
          <FadeIn>
            <p className="portfolio-eyebrow">{project.year}</p>
            <h1 className="portfolio-title">
              {project.title}
            </h1>
            {project.subtitle && <p className="portfolio-lede">{project.subtitle}</p>}
            {project.externalUrl && (
              <a className="portfolio-project-link" href={project.externalUrl} target="_blank" rel="noreferrer">
                Open original <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </FadeIn>

        {/* Project cover */}
          {project.heroImage && (
            <section className="portfolio-project-hero">
              <FadeIn>
                <div style={{ aspectRatio: heroAspectRatio }}>
                  <ProjectImageFrame
                    src={resolveAssetUrl(project.heroImage)}
                    alt={`${project.title} hero image`}
                    onDimensionsLoad={({ width, height }) => {
                      if (width > 0 && height > 0) setHeroAspectRatio(width / height);
                    }}
                  />
                </div>
              </FadeIn>
            </section>
          )}

        {/* Project details */}
        <section className="portfolio-project-copy">
          <FadeIn>
            <div className="portfolio-project-meta">
              <div>
                <h2>{project.role?.split(",")[0]}</h2>
                <p>{[project.team, project.timeline].filter(Boolean).join(" · ")}</p>
              </div>
              <p>{project.description}</p>
            </div>
          </FadeIn>
        </section>

        {/* Additional project images */}
        <section className="portfolio-project-gallery">
          <FadeInStagger staggerDelay={0.15}>
            <div className="portfolio-project-gallery">
              {media.map((image, index) => {
                const nextImage = media[index + 1];
                const isHalfWidth = image.width === "half";
                const nextIsHalfWidth = nextImage?.width === "half";
                
                // Skip if this is the second of a pair
                if (index > 0 && media[index - 1]?.width === "half" && isHalfWidth) {
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
        <section className="portfolio-project-next">
          <FadeIn>
            {nextProject ? (
              <Link to={`/projects/${nextProject.slug}`}>Next: {nextProject.title}</Link>
            ) : (
              <Link to="/design">Back to work</Link>
            )}
            <Link to="/design">All work</Link>
          </FadeIn>
        </section>
        </main>

        <PortfolioFooter />
      </div>
    </PageTransition>
  );
};

/**
 * Project image with a full-image fit and lazy loading.
 */
interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ProjectImage = ({ src, alt, caption }: ProjectImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: "150px",
    threshold: 0.1,
  });

  return (
    <figure>
      <div>
        <div ref={ref} style={{ aspectRatio: imageAspectRatio }}>
          {isIntersecting && src ? (
            <ProjectImageFrame
              src={resolveAssetUrl(src)}
              alt={alt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onDimensionsLoad={({ width, height }) => {
                if (width > 0 && height > 0) setImageAspectRatio(width / height);
              }}
              imageClassName={cn(
                "transition-all duration-500",
                imageLoaded ? "opacity-100" : "opacity-0 blur-sm"
              )}
            />
          ) : null}
        </div>
      </div>
      {caption && (
        <figcaption>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ProjectDetail;
