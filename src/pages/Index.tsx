import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter, PortfolioHeader } from "@/components/navigation/PortfolioChrome";
import { getCv, loadCv, CvContent } from "@/data/cv";
import { getAllProjects, loadProjects } from "@/data/projects";
import { designer } from "@/data/designer";
import { Project } from "@/types";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [cvContent, setCvContent] = useState<CvContent>(getCv());

  useEffect(() => {
    let active = true;

    void loadProjects().then((loadedProjects) => {
      if (active) setProjects(loadedProjects);
    });
    void loadCv().then((loadedCv) => {
      if (active) setCvContent(loadedCv);
    });

    return () => {
      active = false;
    };
  }, []);

  const selectedProjects = projects
    .filter((project) => project.category !== "broadcasts")
    .slice(0, 5);

  return (
    <PageTransition>
      <div className="portfolio-shell">
        <PortfolioHeader />
        <main id="main-content" className="portfolio-about">
          <section className="about-intro">
            <h1 className="portfolio-title">{designer.name}</h1>
            <p className="portfolio-lede">{cvContent.intro || designer.bio}</p>
          </section>

          <section className="about-projects" aria-labelledby="case-studies-heading">
            <div className="about-section-heading">
              <h2 id="case-studies-heading">Selected work</h2>
              <Link to="/design">See all</Link>
            </div>
            {selectedProjects.length > 0 ? (
              <ul className="about-link-list">
                {selectedProjects.map((project) => (
                  <li key={project.id}>
                    <Link to={`/projects/${project.slug}`}>
                      <span>{project.title}</span>
                      <span className="about-link-meta">{project.year}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="portfolio-muted">
                Projects managed in Airtable will appear here.
              </p>
            )}
          </section>

          <section className="about-experience" aria-labelledby="experience-heading">
            <div className="about-section-heading">
              <h2 id="experience-heading">Experience</h2>
              <span>Selected</span>
            </div>
            {cvContent.entries.length > 0 ? (
              <div className="experience-list">
                {cvContent.entries.map((entry) => (
                  <article className="experience-row" key={entry.id}>
                    <span className="article-date">{entry.year}</span>
                    <div>
                      <h3>{entry.title}</h3>
                      <p>{entry.organization}</p>
                      {entry.description && <p className="experience-description">{entry.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="portfolio-muted">
                Experience managed in the Airtable CV table will appear here.
              </p>
            )}
          </section>

          <section className="about-contact">
            <h2>Contact</h2>
            <a href={`mailto:${designer.email}`}>{designer.email}</a>
          </section>
        </main>
        <PortfolioFooter />
      </div>
    </PageTransition>
  );
};

export default Index;
