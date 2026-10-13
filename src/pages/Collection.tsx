import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter, PortfolioHeader } from "@/components/navigation/PortfolioChrome";
import { ProjectImageFrame } from "@/components/projects/ProjectImageFrame";
import { getAllProjects, loadProjects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import { resolveAssetUrl } from "@/lib/utils";

type CollectionKind = "design" | "articles" | "engineering";

interface CollectionProps {
  kind: CollectionKind;
}

const collectionDetails: Record<CollectionKind, { title: string; description: string }> = {
  design: {
    title: "Selected work",
    description: "Visual practice across fine art, illustration, and design.",
  },
  articles: {
    title: "Writing",
    description: "Notes, essays, and conversations.",
  },
  engineering: {
    title: "Experiments",
    description: "Small tools and digital things built with code.",
  },
};

const categoryFilters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Fine art", value: "fine-arts" },
  { label: "Design", value: "design" },
];

const Collection = ({ kind }: CollectionProps) => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
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
    if (kind === "design") {
      return projects.filter(
        (project) =>
          project.category === "fine-arts" ||
          project.category === "design"
      );
    }
    return projects.filter((project) => project.category === kind);
  }, [kind, projects]);

  const visibleProjects =
    kind === "design" && activeCategory !== "all"
      ? collectionProjects.filter((project) => project.category === activeCategory)
      : collectionProjects;

  return (
    <PageTransition>
      <div className="portfolio-shell">
        <PortfolioHeader />
        <main id="main-content" className="portfolio-page">
          <div className="portfolio-page-heading">
            <div>
              <p className="portfolio-eyebrow">{kind === "design" ? "Portfolio" : "Journal"}</p>
              <h1 className="portfolio-title">{details.title}</h1>
              <p className="portfolio-lede">{details.description}</p>
            </div>
            <span className="portfolio-count">{String(visibleProjects.length).padStart(2, "0")}</span>
          </div>

          {kind === "design" && (
            <nav className="portfolio-filters" aria-label="Filter work">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className="portfolio-filter"
                  aria-pressed={activeCategory === filter.value}
                  onClick={() => setActiveCategory(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </nav>
          )}

          {visibleProjects.length > 0 ? (
            kind === "articles" ? (
              <div className="article-list">
                {visibleProjects.map((project) => (
                  <article className="article-row" key={project.id}>
                    <span className="article-date">{project.year}</span>
                    <div>
                      <h2>
                        <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                      </h2>
                      {project.subtitle && <p className="article-excerpt">{project.subtitle}</p>}
                    </div>
                    {project.externalUrl && (
                      <a
                        className="article-external"
                        href={project.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title}`}
                      >
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className={kind === "design" ? "work-grid" : "engineering-list"}>
                {visibleProjects.map((project, index) => {
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

                  return kind === "engineering" && project.externalUrl ? (
                    <a
                      className="work-card group"
                      href={project.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      key={project.id}
                    >
                      {card}
                      <span className="engineering-index">{String(index + 1).padStart(2, "0")}</span>
                    </a>
                  ) : (
                    <Link
                      className="work-card group"
                      to={`/projects/${project.slug}`}
                      key={project.id}
                    >
                      {card}
                      {kind === "engineering" && (
                        <span className="engineering-index">{String(index + 1).padStart(2, "0")}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )
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
