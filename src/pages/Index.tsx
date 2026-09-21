import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { getCv, loadCv, CvContent } from "@/data/cv";
import { getAllProjects, loadProjects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import { resolveAssetUrl } from "@/lib/utils";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  intensity: number;
  selected: boolean;
  createdAt: number;
};

// Work categories shown on the homepage, in display order
const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "fine-arts", label: "Fine Arts & Illustrations" },
  { id: "design", label: "Design" },
];

const limitSentences = (text: string, limit = 5) =>
  (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).slice(0, limit).join(" ").trim();

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [cvContent, setCvContent] = useState<CvContent>(getCv());
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{ x: number; y: number } | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let active = true;

    void loadProjects().then((nextProjects) => {
      if (active) {
        setProjects(nextProjects);
      }
    });

    void loadCv().then((nextCv) => {
      if (active) {
        setCvContent(nextCv);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const addTrailPoint = (x: number, y: number, selected = false) => {
    const intensity = selected ? 1 : 0.28 + Math.random() * 0.42;

    setTrail((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        x,
        y,
        intensity,
        selected,
        createdAt: Date.now(),
      },
    ]);
  };

  const handleProjectPointer = (event: React.MouseEvent<HTMLAnchorElement>, projectSlug?: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const rightPanel = rightPanelRef.current;
    const y = rightPanel
      ? ((rightPanel.scrollTop + event.clientY - rightPanel.getBoundingClientRect().top) / rightPanel.scrollHeight) * 100
      : ((event.clientY - rect.top) / rect.height) * 100;

    if (projectSlug) {
      setSelectedProjectSlug(projectSlug);
    }
    lastPointerRef.current = { x, y };
    addTrailPoint(x, y, Boolean(projectSlug));
  };

  const handleProjectClick = (event: React.MouseEvent<HTMLAnchorElement>, projectSlug: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const rightPanel = rightPanelRef.current;
    const y = rightPanel
      ? ((rightPanel.scrollTop + event.clientY - rightPanel.getBoundingClientRect().top) / rightPanel.scrollHeight) * 100
      : ((event.clientY - rect.top) / rect.height) * 100;

    setSelectedProjectSlug(projectSlug);
    setSelectedMarker({ x, y });
    lastPointerRef.current = { x, y };
    addTrailPoint(x, y, true);
  };

  const handleRightPanelScroll = () => {
    const rightPanel = rightPanelRef.current;
    const lastPointer = lastPointerRef.current;
    if (!rightPanel || !lastPointer) return;

    const scrollRange = Math.max(rightPanel.scrollHeight - rightPanel.clientHeight, 1);
    const scrollProgress = rightPanel.scrollTop / scrollRange;
    addTrailPoint(lastPointer.x, Math.min(100, Math.max(0, scrollProgress * 100)), false);
  };

  const selectedProject = selectedProjectSlug ? projects.find((project) => project.slug === selectedProjectSlug) : null;

  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden bg-brutalist-cream font-mono">
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b-4 border-brutalist-ink px-6 py-4">
          <Link to="/" className="text-xl font-bold text-brutalist-ink">
            HY*
          </Link>
          <div className="flex gap-1">
            <a href="#work" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">Work</a>
            <a href="#about" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">Info</a>
            <a href="#contact" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">Mail</a>
          </div>
        </nav>

        {/* Hero Content - Two Column Layout */}
        <div className="relative grid min-h-[90vh] grid-cols-1 lg:grid-cols-2">
          {/* Left Panel - Fixed Hero */}
          <div className="relative flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-brutalist-ink p-8 lg:p-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.10),transparent_55%)]" />
              {trail.map((point) => (
                <div
                  key={point.id}
                  className="absolute rounded-full border border-brutalist-red/80 bg-brutalist-red/15"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${point.selected ? 38 : 14 + point.intensity * 15}px`,
                    height: `${point.selected ? 38 : 14 + point.intensity * 15}px`,
                    opacity: point.selected ? 1 : point.intensity,
                    animation: point.selected ? undefined : "trail-fade 180s linear forwards",
                    animationDelay: point.selected ? undefined : `${-(Date.now() - point.createdAt)}ms`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: point.selected
                      ? "0 0 0 1px rgba(220,38,38,0.45), 0 0 18px rgba(220,38,38,0.35)"
                      : "0 0 0 1px rgba(220,38,38,0.25)",
                  }}
                />
              ))}
              {selectedMarker && (
                <div
                  className="absolute rounded-full border-2 border-brutalist-red bg-brutalist-red/30"
                  style={{
                    left: `${selectedMarker.x}%`,
                    top: `${selectedMarker.y}%`,
                    width: "46px",
                    height: "46px",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 0 1px rgba(220,38,38,0.6), 0 0 24px rgba(220,38,38,0.5)",
                  }}
                />
              )}
            </div>
            <div className="relative z-10">
              <h1 className="hero-name mx-auto w-full max-w-full text-center text-[clamp(3.5rem,12vw,10rem)] font-bold leading-none text-brutalist-ink">
                <span className="block whitespace-nowrap">Hannah</span>
                <span className="block whitespace-nowrap">Yoo</span>
              </h1>
              <div className="mt-8 h-4 w-32 bg-brutalist-red" />
              <p className="mt-6 text-xs tracking-widest text-brutalist-muted">
                Artist &amp; Designer / Est. 2022
              </p>
              {selectedProject && (
                <p className="mt-4 max-w-xs text-[10px] font-bold uppercase tracking-[0.28em] text-brutalist-red">
                  Tracking {selectedProject.title}
                </p>
              )}
            </div>
          </div>

          {/* Right Panel - Scrollable Projects + Footer */}
          <div ref={rightPanelRef} onScroll={handleRightPanelScroll} className="lg:h-[90vh] lg:overflow-y-auto" id="work">
            <div className="p-6 space-y-10">
              {projects.length === 0 ? (
                <div className="border-4 border-dashed border-brutalist-ink/30 p-8 text-center">
                  <p className="text-xs font-bold tracking-widest text-brutalist-ink">NO PROJECTS LOADED</p>
                  <p className="mt-2 text-xs text-brutalist-muted">
                    Set PORTFOLIO_TOKEN in .env and run npm run sync to load projects from Airtable.
                  </p>
                </div>
              ) : (
                CATEGORIES.map((category) => {
                  const categoryProjects = projects.filter(
                    (project) => project.category === category.id
                  );
                  if (categoryProjects.length === 0) return null;
                  return (
                  <div key={category.id}>
                    <h2 className="mb-6 flex items-center gap-4 text-xs font-bold tracking-widest text-brutalist-ink">
                      <span>{category.label}</span>
                      <span className="h-[3px] flex-1 bg-brutalist-ink" />
                      <span className="text-brutalist-muted">
                        {String(categoryProjects.length).padStart(2, "0")}
                      </span>
                    </h2>
                    <div className="space-y-6">
                      {categoryProjects.map((project) => (
                        <Link
                          key={project.id}
                          to={`/projects/${project.slug}`}
                          className="group block transition-all"
                          onMouseMove={(event) => handleProjectPointer(event, project.slug)}
                          onClick={(event) => handleProjectClick(event, project.slug)}
                        >
                          <div className="aspect-[16/10] overflow-hidden border-4 border-brutalist-ink flex items-center justify-center p-6 text-center text-sm text-brutalist-muted">
                            {project.heroImage ? (
                              <img
                                src={resolveAssetUrl(project.heroImage)}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
                              />
                            ) : (
                              "To be indicated"
                            )}
                          </div>
                          <div className="p-4 flex justify-between items-center">
                            <div>
                              <h3 className="text-sm font-bold text-brutalist-ink group-hover:text-brutalist-red">
                                {project.title}
                              </h3>
                              <p className="text-xs text-brutalist-muted">
                                {project.subtitle}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-brutalist-muted">
                              {project.year}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
            </div>

            <section className="border-t-4 border-brutalist-ink px-6 py-10" aria-labelledby="cv-heading">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 id="cv-heading" className="text-3xl font-bold text-brutalist-ink sm:text-5xl">CV</h2>
                <span className="text-[10px] font-bold tracking-[0.28em] text-brutalist-muted">PROFILE / SELECTED</span>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-brutalist-ink">
                {limitSentences(cvContent.intro)}
              </p>
              <div className="mt-10 divide-y-2 divide-brutalist-ink/20 border-y-2 border-brutalist-ink/20">
                {cvContent.entries.map((entry) => (
                  <article key={entry.id} className="grid gap-3 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <p className="text-xs font-bold tracking-wide text-brutalist-red">{entry.year}</p>
                    <div>
                      <h3 className="text-sm font-bold text-brutalist-ink">{entry.title}</h3>
                      <p className="mt-1 text-xs font-bold text-brutalist-muted">{entry.organization}</p>
                      {entry.description && (
                        <p className="mt-3 max-w-xl text-xs leading-6 text-brutalist-muted">{entry.description}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Footer inside scroll area */}
            <footer className="border-t-4 border-brutalist-ink mt-8" id="about">
              {/* Services Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 lg:p-12">
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">Brand</h3>
                  <p className="mt-3 text-xs tracking-wide leading-relaxed text-brutalist-muted">Identity systems that define your visual language</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">Digital</h3>
                  <p className="mt-3 text-xs tracking-wide leading-relaxed text-brutalist-muted">Web experiences built for impact</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">Print</h3>
                  <p className="mt-3 text-xs tracking-wide leading-relaxed text-brutalist-muted">Tangible design that leaves a mark</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brutalist-ink lg:text-3xl">Motion</h3>
                  <p className="mt-3 text-xs tracking-wide leading-relaxed text-brutalist-muted">Dynamic visuals that tell stories</p>
                </div>
              </div>

              {/* Contact CTA Section */}
              <div className="p-8 border-t-4 border-brutalist-ink" id="contact">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-brutalist-ink">Let's work together</h4>
                  <p className="mt-1 text-xs text-brutalist-muted tracking-wide">Drop a message and I'll get back to you within 24 hours</p>
                </div>
                <form className="space-y-4 max-w-xl">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-red"
                  />
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-red resize-none"
                  />
                  <button
                    type="submit"
                    className="border-4 border-brutalist-ink bg-brutalist-ink px-6 py-3 text-sm font-bold text-brutalist-cream transition-colors hover:bg-brutalist-red hover:border-brutalist-red"
                  >
                    Send →
                  </button>
                </form>
              </div>

              {/* Copyright */}
              <div className="border-t-4 border-brutalist-ink px-6 py-4 flex justify-between items-center">
                <span className="text-xs font-bold text-brutalist-muted">© {new Date().getFullYear()} Hannah Yoo</span>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/hannah.yoo.hy" target="_blank" rel="noreferrer" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-red">Instagram</a>
                  <a href="https://www.linkedin.com/in/hannah-yoo-hy/" target="_blank" rel="noreferrer" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-red">LinkedIn</a>
                  <a href="https://www.behance.net/hannah_yoo" target="_blank" rel="noreferrer" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-red">Behance</a>
                  <a href="https://github.com/hannah-yoo" target="_blank" rel="noreferrer" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-red">GitHub</a>
                </div>
              </div>
            </footer>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
