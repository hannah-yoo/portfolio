import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter } from "@/components/navigation/PortfolioChrome";
import { getCv, loadCv, CvContent } from "@/data/cv";
import { getAllProjects, loadProjects } from "@/data/projects";
import { designer } from "@/data/designer";
import { Project } from "@/types";

interface HyParticle {
  id: number;
  x: number;
  y: number;
  endX: number;
  endY: number;
  rotation: number;
}

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [cvContent, setCvContent] = useState<CvContent>(getCv());
  const [particles, setParticles] = useState<HyParticle[]>([]);
  const particleId = useRef(0);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

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

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion) return;

    const previous = lastPointer.current;
    const x = event.clientX;
    const y = event.clientY;

    if (previous && Math.hypot(x - previous.x, y - previous.y) < 34) return;

    lastPointer.current = { x, y };
    const id = particleId.current++;
    const drift = Math.sin(id * 2.37) * 24;
    const endX = Math.max(14, Math.min(window.innerWidth - 14, x + drift));

    setParticles((current) => [
      ...current.slice(-71),
      {
        id,
        x,
        y,
        endX,
        endY: Math.max(y, window.innerHeight - 32 - (id % 4) * 7),
        rotation: Math.sin(id * 1.73) * 36,
      },
    ]);
  };

  return (
    <PageTransition>
      <div className="portfolio-shell">
        <div className="hy-particle-layer" aria-hidden="true">
          {particles.map((particle) => (
            <motion.span
              className="hy-particle"
              key={particle.id}
              style={{ left: particle.x, top: particle.y }}
              initial={{ opacity: 0, scale: 0.6, rotate: particle.rotation }}
              animate={{
                opacity: 0.9,
                scale: 1,
                left: particle.endX,
                top: particle.endY,
                rotate: particle.rotation + 90,
              }}
              transition={{ duration: 1.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              HY
            </motion.span>
          ))}
        </div>
        <main id="main-content" className="portfolio-about" onPointerMove={handlePointerMove}>
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
