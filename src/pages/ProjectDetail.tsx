import { Fragment } from "react";
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

  const projectWithStaticGalleryGifs = withStaticGalleryGifs(project);
  const media = projectWithStaticGalleryGifs.images ?? [];
  const localizedTeam = project.teamKo !== project.team ? project.teamKo : "";
  const localizedTimeline =
    project.timelineKo !== project.timeline ? project.timelineKo : "";
  const teamText = `${project.team} ${project.teamKo ?? ""}`.toLocaleLowerCase();
  const showClientLabel =
    Boolean(project.team) &&
    !/personal\s*(work|freelance|commission)|개인\s*(작업|외주)/.test(teamText) &&
    !/collaboration|협업/.test(teamText);
  const websiteUrl = isWebDesignProject(project)
    ? extractWebsiteUrl(project.topDescription) ?? extractWebsiteUrl(project.topDescriptionKo)
    : undefined;
  const descriptions = [
    {
      afterImage: project.topDescriptionAfterImage ?? 0,
      description: project.topDescription || project.description,
      descriptionKo: project.topDescriptionKo || project.descriptionKo,
    },
    {
      afterImage: project.middleDescriptionAfterImage ?? Math.ceil(media.length / 2),
      description: project.middleDescription,
      descriptionKo: project.middleDescriptionKo,
    },
    {
      afterImage: project.bottomDescriptionAfterImage ?? media.length,
      description: project.bottomDescription,
      descriptionKo: project.bottomDescriptionKo,
    },
  ].map((item, index) => ({
    ...item,
    websiteUrl: index === 0 ? websiteUrl : undefined,
    afterImage: Math.max(
      0,
      Math.min(media.length, Number.isInteger(item.afterImage) ? item.afterImage : media.length)
    ),
  }));
  const descriptionsAfter = (imageCount: number) =>
    descriptions
      .filter(
        ({ afterImage, description, descriptionKo }) =>
          afterImage === imageCount && (description || descriptionKo)
      )
      .map((item, index) => (
        <FadeIn key={`${imageCount}-${index}`} className="portfolio-gallery-wide">
          <ProjectDescription
            description={item.description}
            descriptionKo={item.descriptionKo}
            websiteUrl={item.websiteUrl}
          />
          {item.websiteUrl && (
            <ProjectWebsiteEmbed url={item.websiteUrl} title={project.title} />
          )}
        </FadeIn>
      ));
  return (
    <PageTransition>
      <div className="portfolio-shell">
        {/* Project Title Section */}
        <main id="main-content" className="portfolio-project">
          <FadeIn>
            {project.year && <p className="portfolio-eyebrow">{project.year}</p>}
            <h1 className="portfolio-title project-title-bilingual">
              {project.title}
              {project.titleKo && <span className="project-inline-ko" lang="ko">{project.titleKo}</span>}
            </h1>
            {(project.subtitle || project.subtitleKo) && (
              <p className="portfolio-lede project-bilingual-line">
                {project.subtitle && <span>{project.subtitle}</span>}
                {project.subtitleKo && <span className="project-inline-ko" lang="ko">{project.subtitleKo}</span>}
              </p>
            )}
            {[project.team, project.timeline].some(Boolean) && (
              <p className="portfolio-project-top-meta project-bilingual-line">
                {project.team && (
                  <span>{showClientLabel ? `Client: ${project.team}` : project.team}</span>
                )}
                {localizedTeam && (
                  <span className="project-inline-ko" lang="ko">
                    {showClientLabel ? `클라이언트: ${localizedTeam}` : localizedTeam}
                  </span>
                )}
                {project.timeline && (
                  <span>{project.team ? ` · ${project.timeline}` : project.timeline}</span>
                )}
                {localizedTimeline && (
                  <span className="project-inline-ko" lang="ko">
                    {project.timeline && project.team ? ` · ${localizedTimeline}` : localizedTimeline}
                  </span>
                )}
              </p>
            )}
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
                <ProjectHeroImage project={project} />
              </FadeIn>
            </section>
          )}
          {(project.medium?.length || project.mediumKo?.length) && (
            <p className="portfolio-project-medium project-bilingual-line">
              {project.medium && project.medium.length > 0 && <span>{project.medium.join(" · ")}</span>}
              {project.mediumKo?.length ? (
                <span className="project-inline-ko" lang="ko">{project.mediumKo.join(" · ")}</span>
              ) : null}
            </p>
          )}

        {/* Project details */}
        <section className="portfolio-project-copy">
          <FadeIn>
            <div className="portfolio-project-meta">
              <div>
                {(project.role || project.roleKo) && (
                  <h2 className="project-bilingual-line">
                    {project.role && <span>{project.role.split(",")[0]}</span>}
                    {project.roleKo && <span className="project-inline-ko" lang="ko">{project.roleKo}</span>}
                  </h2>
                )}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Additional project images */}
        <section className="portfolio-project-gallery">
          <FadeInStagger staggerDelay={0.15}>
            <div className="portfolio-project-gallery">
              {descriptionsAfter(0)}
              {media.map((image, index) => (
                <Fragment key={image.id}>
                  {image.url && (
                    <FadeIn className="portfolio-gallery-item">
                      <ProjectImage src={image.url} alt={image.alt} caption={image.caption} />
                    </FadeIn>
                  )}
                  {descriptionsAfter(index + 1)}
                </Fragment>
              ))}
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

const ProjectDescription = ({
  description,
  descriptionKo,
  websiteUrl,
}: {
  description?: string;
  descriptionKo?: string;
  websiteUrl?: string;
}) => (
  <div className="portfolio-project-gallery-description">
    {(description || descriptionKo) && (
      <p className="portfolio-project-description">
        {description && <span>{removeWebsiteUrl(description, websiteUrl)}</span>}
        {descriptionKo && <span className="project-inline-ko" lang="ko">{removeWebsiteUrl(descriptionKo, websiteUrl)}</span>}
      </p>
    )}
  </div>
);

const ProjectWebsiteEmbed = ({ url, title }: { url: string; title: string }) => {
  const canEmbed = new URL(url).origin !== window.location.origin;

  return (
    <div className="portfolio-project-website">
      {canEmbed && (
        <iframe
          src={url}
          title={`${title} website preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
        />
      )}
      <a href={url} target="_blank" rel="noreferrer">
        Open website in a new tab
      </a>
    </div>
  );
};

const isWebDesignProject = (project: Project) =>
  [...(project.medium ?? []), ...(project.tags ?? []), project.role]
    .join(" ")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .split(/[,;|]/)
    .some((value) => /\bweb(?:site)?\s+design\b|웹(?:사이트)?\s*디자인/i.test(value.trim()));

const extractWebsiteUrl = (description?: string) => {
  const match = description?.match(/https?:\/\/[^\s<>"']+/i)?.[0];
  if (!match) return undefined;
  const candidate = match.replace(/[),.;!?]+$/, "");

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
};

const removeWebsiteUrl = (description: string, websiteUrl?: string) =>
  websiteUrl
    ? description.replace(/https?:\/\/[^\s<>"']+/i, "").trim()
    : description;

const isAnimatedGif = (image: { url: string; alt: string; isAnimatedGif?: boolean }) =>
  image.isAnimatedGif ??
  [image.alt, image.url].some((source) => /\.gif(?:$|[?#])/i.test(source));

const withStaticGalleryGifs = (project: Project): Project => ({
  ...project,
  images: (project.images ?? []).map((image) =>
    isAnimatedGif(image)
      ? { ...image, url: image.thumbnailUrl && image.thumbnailUrl !== image.url ? image.thumbnailUrl : "" }
      : image
  ),
});

const ProjectHeroImage = ({ project }: { project: Project }) => {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <div className="project-hero-image" style={{ aspectRatio }}>
      <ProjectImageFrame
        src={resolveAssetUrl(project.heroImage)}
        alt={`${project.title} hero image`}
        onDimensionsLoad={({ width, height }) => {
          if (width > 0 && height > 0) setAspectRatio(width / height);
        }}
      />
    </div>
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
