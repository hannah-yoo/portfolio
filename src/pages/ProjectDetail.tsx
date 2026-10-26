import { Fragment, type CSSProperties } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

  const media = project.images ?? [];
  const localizedTeam = project.teamKo !== project.team ? project.teamKo : "";
  const localizedTimeline =
    project.timelineKo !== project.timeline ? project.timelineKo : "";
  const teamText = `${project.team} ${project.teamKo ?? ""}`.toLocaleLowerCase();
  const showClientLabel =
    Boolean(project.team) &&
    !/personal\s*(work|freelance|commission)|개인\s*(작업|외주)/.test(teamText) &&
    !/collaboration|협업/.test(teamText);
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
  ].map((item) => ({
    ...item,
    afterImage: Math.max(
      0,
      Math.min(media.length, Number.isInteger(item.afterImage) ? item.afterImage : media.length)
    ),
  }));
  const hasDescriptionAfter = (imageCount: number) =>
    descriptions.some(
      ({ afterImage, description, descriptionKo }) =>
        afterImage === imageCount && (description || descriptionKo)
    );
  const descriptionsAfter = (imageCount: number) =>
    descriptions
      .filter(
        ({ afterImage, description, descriptionKo }) =>
          afterImage === imageCount && (description || descriptionKo)
      )
      .map((item, index) => (
        <FadeIn key={`${imageCount}-${index}`} className="portfolio-gallery-wide">
          <ProjectDescription description={item.description} descriptionKo={item.descriptionKo} />
        </FadeIn>
      ));
  const galleryBlocks: Array<{
    start: number;
    end: number;
    kind: "mosaic" | "slideshow" | "pair" | "single" | "skip";
    imageIndexes?: number[];
  }> = [];
  const slideshowImageIndexes = new Set<number>();
  for (let index = 0; index < media.length;) {
    const image = media[index];
    if (slideshowImageIndexes.has(index)) {
      galleryBlocks.push({ start: index, end: index, kind: "skip" });
      index++;
      continue;
    }
    const groupStart = image.groupId
      ? media.findIndex((item) => item.groupId === image.groupId)
      : index;
    const groupImages = image.groupId
      ? media.filter((item) => item.groupId === image.groupId)
      : [];
    const groupEnd = groupStart + groupImages.length - 1;
    const canRenderMosaic =
      groupImages[0]?.layout === "mosaic-lead" &&
      groupImages.length > 2 &&
      !media
        .slice(groupStart + 1, groupEnd + 1)
        .some((_, offset) => hasDescriptionAfter(groupStart + offset + 1));

    if (image.layout === "mosaic-tile" && canRenderMosaic) {
      index++;
      continue;
    }

    if (canRenderMosaic) {
      galleryBlocks.push({ start: index, end: groupEnd, kind: "mosaic" });
      index = groupEnd + 1;
      continue;
    }

    const matchingRatioIndexes = [index];
    const aspectRatio = image.aspectRatio;
    if (aspectRatio) {
      for (let candidateIndex = index + 1; candidateIndex < media.length; candidateIndex++) {
        if (hasDescriptionAfter(candidateIndex - 1)) break;
        const candidate = media[candidateIndex];
        if (
          candidate.layout === "single" &&
          candidate.aspectRatio &&
          Math.abs(candidate.aspectRatio - aspectRatio) < 0.01
        ) {
          matchingRatioIndexes.push(candidateIndex);
          slideshowImageIndexes.add(candidateIndex);
        }
      }
    }
    if (matchingRatioIndexes.length > 1) {
      galleryBlocks.push({
        start: index,
        end: index,
        kind: "slideshow",
        imageIndexes: matchingRatioIndexes,
      });
      index++;
      continue;
    }

    const canPair =
      image.width === "half" &&
      media[index + 1]?.width === "half" &&
      !hasDescriptionAfter(index + 1);
    if (canPair) {
      galleryBlocks.push({ start: index, end: index + 1, kind: "pair" });
      index += 2;
      continue;
    }

    galleryBlocks.push({ start: index, end: index, kind: "single" });
    index++;
  }

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
                <HeroSlideshow project={project} />
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
              {galleryBlocks.map(({ start, end, kind, imageIndexes }) => {
                const blockImages = imageIndexes
                  ? imageIndexes.map((imageIndex) => media[imageIndex])
                  : media.slice(start, end + 1);
                const firstImage = media[start];
                return (
                  <Fragment key={firstImage.id}>
                    {kind === "skip" ? null : kind === "mosaic" ? (
                      <FadeIn className="portfolio-gallery-wide">
                        <div
                          className="portfolio-project-mosaic"
                          style={{
                            gridTemplateRows: `repeat(${blockImages.length - 1}, minmax(150px, 1fr))`,
                          }}
                        >
                          {blockImages.map((groupImage, groupIndex) => (
                            <ProjectImage
                              key={groupImage.id}
                              src={groupImage.url}
                              alt={groupImage.alt}
                              caption={groupImage.caption}
                              figureClassName={
                                groupIndex === 0
                                  ? "portfolio-project-mosaic-lead"
                                  : "portfolio-project-mosaic-tile"
                              }
                              figureStyle={
                                groupIndex === 0
                                  ? { gridRow: `span ${blockImages.length - 1}` }
                                  : undefined
                              }
                              imageFit="cover"
                            />
                          ))}
                        </div>
                      </FadeIn>
                    ) : kind === "slideshow" ? (
                      <FadeIn className="portfolio-gallery-item">
                        <GallerySlideshow images={blockImages} />
                      </FadeIn>
                    ) : kind === "pair" ? (
                      blockImages.map((pairImage) => (
                        <FadeIn className="portfolio-gallery-item" key={pairImage.id}>
                          <ProjectImage
                            src={pairImage.url}
                            alt={pairImage.alt}
                            caption={pairImage.caption}
                          />
                        </FadeIn>
                      ))
                    ) : (
                      <FadeIn className="portfolio-gallery-item">
                        <ProjectImage
                          src={firstImage.url}
                          alt={firstImage.alt}
                          caption={firstImage.caption}
                        />
                      </FadeIn>
                    )}
                    {descriptionsAfter(end + 1)}
                  </Fragment>
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

const ProjectDescription = ({
  description,
  descriptionKo,
}: {
  description?: string;
  descriptionKo?: string;
}) => (
  <div className="portfolio-project-gallery-description">
    {(description || descriptionKo) && (
      <p className="portfolio-project-description">
        {description && <span>{description}</span>}
        {descriptionKo && <span className="project-inline-ko" lang="ko">{descriptionKo}</span>}
      </p>
    )}
  </div>
);

const HeroSlideshow = ({ project }: { project: Project }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const prefersReducedMotion = useReducedMotion();
  const slides = [
    { id: `${project.slug}-hero`, url: project.heroImage, alt: `${project.title} hero image` },
    ...(project.heroSlideshowImages ?? []).map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
    })),
  ];

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return;
    const intervalId = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      1500
    );
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, slides.length]);

  return (
    <div className="project-hero-slideshow" style={{ aspectRatio }}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slides[activeIndex].id}
          className="project-hero-slide"
          initial={prefersReducedMotion ? false : { x: "8%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { x: "-8%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <ProjectImageFrame
            src={resolveAssetUrl(slides[activeIndex].url)}
            alt={slides[activeIndex].alt}
            onDimensionsLoad={({ width, height }) => {
              if (width > 0 && height > 0) setAspectRatio(width / height);
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const GallerySlideshow = ({
  images,
}: {
  images: Project["images"];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(images[0]?.aspectRatio ?? 16 / 9);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return;
    const intervalId = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % images.length),
      1500
    );
    return () => window.clearInterval(intervalId);
  }, [images.length, prefersReducedMotion]);

  const image = images[activeIndex];
  return (
    <figure className="portfolio-gallery-slideshow">
      <div className="project-hero-slideshow" style={{ aspectRatio }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={image.id}
            className="project-hero-slide"
            initial={prefersReducedMotion ? false : { x: "8%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { x: "-8%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ProjectImageFrame
              src={resolveAssetUrl(image.url)}
              alt={image.alt}
              onDimensionsLoad={({ width, height }) => {
                if (width > 0 && height > 0) setAspectRatio(width / height);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
};

/**
 * Project image with a full-image fit and lazy loading.
 */
interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  figureClassName?: string;
  figureStyle?: CSSProperties;
  imageFit?: "contain" | "cover";
}

const ProjectImage = ({
  src,
  alt,
  caption,
  figureClassName,
  figureStyle,
  imageFit = "contain",
}: ProjectImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: "150px",
    threshold: 0.1,
  });

  return (
    <figure className={figureClassName} style={figureStyle}>
      <div className={figureClassName ? "portfolio-project-mosaic-frame" : undefined}>
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
                imageFit === "cover" && "object-cover",
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
