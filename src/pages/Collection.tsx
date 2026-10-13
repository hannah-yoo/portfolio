import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter } from "@/components/navigation/PortfolioChrome";
import { ProjectImageFrame } from "@/components/projects/ProjectImageFrame";
import { getAllProjects, loadProjects } from "@/data/projects";
import { Project } from "@/types";
import { resolveAssetUrl } from "@/lib/utils";

type CollectionKind = "design" | "fine-arts" | "broadcasts";

interface CollectionProps {
  kind: CollectionKind;
}

const collectionDetails: Record<CollectionKind, { title: string; description: string }> = {
  design: {
    title: "Design",
    description: "Visual identities, digital experiences, and selected client work.",
  },
  "fine-arts": {
    title: "Fine Arts",
    description: "Painting, illustration, and work from the studio.",
  },
  broadcasts: {
    title: "Broadcasts",
    description: "Television, radio, podcast, and other broadcast appearances.",
  },
};

const WorkCard = ({ project }: { project: Project }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1.5);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="work-card-shell"
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link className="work-card group" to={`/projects/${project.slug}`}>
        {project.heroImage && (
          <div className="work-image" style={{ aspectRatio: imageAspectRatio }}>
            <ProjectImageFrame
              src={resolveAssetUrl(project.heroImage)}
              alt={project.title}
              onDimensionsLoad={({ width, height }) => {
                if (width > 0 && height > 0) setImageAspectRatio(width / height);
              }}
            />
          </div>
        )}
        <div className="work-card-caption">
          <div>
            <h2>{project.title}</h2>
            {project.subtitle && <p>{project.subtitle}</p>}
          </div>
          <span>{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
};

const Collection = ({ kind }: CollectionProps) => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const details = collectionDetails[kind];

  useEffect(() => {
    let active = true;

    void loadProjects().then((loadedProjects) => {
      if (active) setProjects(loadedProjects);
    });

    return () => {
      active = false;
    };
  }, []);

  const collectionProjects = useMemo(() => {
    return projects.filter((project) => project.category === kind);
  }, [kind, projects]);
  const tags = useMemo(
    () => [...new Set(collectionProjects.flatMap((project) => project.tags ?? []))],
    [collectionProjects],
  );
  const visibleProjects = useMemo(
    () =>
      activeTag
        ? collectionProjects.filter((project) => project.tags?.includes(activeTag))
        : collectionProjects,
    [activeTag, collectionProjects],
  );

  return (
    <PageTransition>
      <div className="portfolio-shell">
        <main id="main-content" className="portfolio-page">
          <div className="portfolio-page-heading">
            <div>
              <p className="portfolio-eyebrow">Portfolio</p>
              <h1 className="portfolio-title">{details.title}</h1>
              <p className="portfolio-lede">{details.description}</p>
            </div>
            <span className="portfolio-count">{String(collectionProjects.length).padStart(2, "0")}</span>
          </div>

          {kind === "design" && collectionProjects.length > 0 && (
            <LayoutGroup id="collection-filters">
              <nav className="collection-filters" aria-label="Filter design work">
                <button
                  className="collection-filter"
                  type="button"
                  aria-pressed={activeTag === null}
                  onClick={() => setActiveTag(null)}
                >
                  {activeTag === null && (
                    <motion.span
                      className="collection-filter-indicator"
                      layoutId="collection-filter-indicator"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                      aria-hidden="true"
                    />
                  )}
                  <span>All</span>
                </button>
                {tags.map((tag) => (
                  <button
                    className="collection-filter"
                    type="button"
                    key={tag}
                    aria-pressed={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {activeTag === tag && (
                      <motion.span
                        className="collection-filter-indicator"
                        layoutId="collection-filter-indicator"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 34 }
                        }
                        aria-hidden="true"
                      />
                    )}
                    <span>{tag}</span>
                  </button>
                ))}
              </nav>
            </LayoutGroup>
          )}

          {collectionProjects.length > 0 ? (
            <div className={kind === "broadcasts" ? "broadcasts-list" : "work-grid"}>
              {kind === "broadcasts" ? collectionProjects.map((project, index) => {
                const card = (
                  <>
                    {project.heroImage && (
                      <div className="work-image">
                        <ProjectImageFrame
                          src={resolveAssetUrl(project.heroImage)}
                          alt={project.title}
                        />
                      </div>
                    )}
                    <div className="work-card-caption">
                      <div>
                        <h2>{project.title}</h2>
                        {project.subtitle && <p>{project.subtitle}</p>}
                      </div>
                      <span>{project.year}</span>
                    </div>
                  </>
                );

                return kind === "broadcasts" && project.externalUrl ? (
                  <a
                    className="broadcast-card"
                    href={project.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    key={project.id}
                  >
                    {card}
                    <span className="broadcast-index">{String(index + 1).padStart(2, "0")}</span>
                  </a>
                ) : (
                  <Link
                    className={kind === "broadcasts" ? "broadcast-card" : "work-card group"}
                    to={`/projects/${project.slug}`}
                    key={project.id}
                  >
                    {card}
                    {kind === "broadcasts" && (
                      <span className="broadcast-index">{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </Link>
                );
              }) : (
                <AnimatePresence initial={false}>
                  {visibleProjects.map((project) => (
                    <WorkCard key={project.id} project={project} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          ) : (
            <div className="portfolio-empty">
              <h2>No entries yet</h2>
              <p>
                Add records to the Airtable <code>Artworks_eng</code> table and set Category to{" "}
                <code>{kind}</code>.
              </p>
            </div>
          )}
        </main>
        <PortfolioFooter />
      </div>
    </PageTransition>
  );
};

export default Collection;
