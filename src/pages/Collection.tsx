import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter, PortfolioHeader } from "@/components/navigation/PortfolioChrome";
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

const Collection = ({ kind }: CollectionProps) => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
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

  return (
    <PageTransition>
      <div className="portfolio-shell">
        <PortfolioHeader />
        <main id="main-content" className="portfolio-page">
          <div className="portfolio-page-heading">
            <div>
              <p className="portfolio-eyebrow">Portfolio</p>
              <h1 className="portfolio-title">{details.title}</h1>
              <p className="portfolio-lede">{details.description}</p>
            </div>
            <span className="portfolio-count">{String(collectionProjects.length).padStart(2, "0")}</span>
          </div>

          {collectionProjects.length > 0 ? (
            <div className={kind === "broadcasts" ? "broadcasts-list" : "work-grid"}>
              {collectionProjects.map((project, index) => {
                const card = (
                  <>
                    {project.heroImage && (
                      <div className="work-image">
                        <ProjectImageFrame
                          src={resolveAssetUrl(project.heroImage)}
                          alt={project.title}
                          imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
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
              })}
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
