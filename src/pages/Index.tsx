import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { PortfolioFooter } from "@/components/navigation/PortfolioChrome";
import { getCv, loadCv, CvContent } from "@/data/cv";
import { designer } from "@/data/designer";

interface HyParticle {
  id: number;
  x: number;
  y: number;
  endX: number;
  endY: number;
  rotation: number;
}

const Index = () => {
  const [cvContent, setCvContent] = useState<CvContent>(getCv());
  const [particles, setParticles] = useState<HyParticle[]>([]);
  const particleId = useRef(0);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    void loadCv().then((loadedCv) => {
      if (active) setCvContent(loadedCv);
    });

    return () => {
      active = false;
    };
  }, []);

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
            {cvContent.introKo && <p className="portfolio-lede bilingual-secondary" lang="ko">{cvContent.introKo}</p>}
            {cvContent.postscript && <p className="portfolio-postscript">{cvContent.postscript}</p>}
            {cvContent.postscriptKo && <p className="portfolio-postscript" lang="ko">{cvContent.postscriptKo}</p>}
          </section>

          <section className="about-cv" aria-labelledby="cv-heading">
            <div className="about-section-heading">
              <h2 id="cv-heading">CV</h2>
            </div>
            {cvContent.entries.length > 0 ? (
              <ul className="about-cv-list">
                {cvContent.entries.map((entry) => (
                  <li key={entry.id}>
                    <span className="about-cv-year">{entry.year}</span>
                    <div>
                      <h3>{entry.title}</h3>
                      {entry.titleKo && <p lang="ko">{entry.titleKo}</p>}
                      <p>{entry.organization}</p>
                      {entry.organizationKo && <p lang="ko">{entry.organizationKo}</p>}
                      {entry.description && <p className="about-cv-description">{entry.description}</p>}
                      {entry.descriptionKo && <p className="about-cv-description" lang="ko">{entry.descriptionKo}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="portfolio-muted">
                CV entries managed in Airtable will appear here.
              </p>
            )}
          </section>

        </main>
        <PortfolioFooter />
        <div className="portfolio-wordmark" aria-hidden="true">
          {designer.name}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
