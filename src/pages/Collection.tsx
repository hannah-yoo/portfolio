import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter } from "@/components/navigation/PortfolioChrome";
import { ProjectImageFrame } from "@/components/projects/ProjectImageFrame";
import { getAllProjects, loadProjects } from "@/data/projects";
import { Project } from "@/types";
import { resolveAssetUrl } from "@/lib/utils";
import { getCollections } from "@/data/projects";

type CollectionKind = "design" | "fine-arts" | "photography-video";

interface CollectionProps {
  kind: CollectionKind;
}

const WorkCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1.5);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="work-card-shell"
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -42 : 42, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: (index % 4) * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link className="work-card group" to={`/projects/${project.slug}`}>
        {project.heroImage && (
          <div className="work-image" style={{ aspectRatio: imageAspectRatio }}>
            <ProjectImageFrame
              src={resolveAssetUrl(project.heroThumbnail || project.heroImage)}
              alt={project.title}
              onDimensionsLoad={({ width, height }) => {
                if (width > 0 && height > 0) setImageAspectRatio(width / height);
              }}
            />
          </div>
        )}
        <div className="work-card-caption">
          <div>
            <h2 className="project-bilingual-line">
              <span>{project.title}</span>
              {project.titleKo && <span className="project-inline-ko" lang="ko">{project.titleKo}</span>}
            </h2>
            {(project.subtitle || project.subtitleKo) && (
              <p className="project-bilingual-line">
                {project.subtitle && <span>{project.subtitle}</span>}
                {project.subtitleKo && <span className="project-inline-ko" lang="ko">{project.subtitleKo}</span>}
              </p>
            )}
          </div>
          <span>{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
};

const Collection = ({ kind }: CollectionProps) => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const prefersReducedMotion = useReducedMotion();
  const details = getCollections().find((collection) => collection.category === kind);

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
  return (
    <PageTransition>
      <div className="portfolio-shell">
        <main id="main-content" className="portfolio-page">
          <div className="portfolio-page-heading">
            <div className="collection-heading-copy">
              <h1 className="portfolio-title">
                {details?.title}
              </h1>
              <div className="collection-description">
                <p>{details?.description}</p>
                <p lang="ko">{details?.descriptionKo}</p>
              </div>
            </div>
          </div>

          {collectionProjects.length > 0 ? (
            <div className="work-grid">
              <AnimatePresence>
                {collectionProjects.map((project, index) => (
                  <WorkCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="portfolio-empty">
              <h2>No entries yet</h2>
              <p>
                Add records to the Airtable <code>collections</code> table and set Category to{" "}
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
