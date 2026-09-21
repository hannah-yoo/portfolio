import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { getAllProjects, loadProjects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import { resolveAssetUrl } from "@/lib/utils";

// Work categories shown on the homepage, in display order
const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "fine-arts", label: "Fine Arts & Illustrations" },
  { id: "design", label: "Design" },
];

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());

  useEffect(() => {
    let active = true;

    void loadProjects().then((nextProjects) => {
      if (active) {
        setProjects(nextProjects);
      }
    });

    return () => {
      active = false;
    };
  }, []);

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
          <div className="flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-brutalist-ink p-8 lg:p-12">
            <h1 className="max-w-full text-[clamp(3.5rem,12vw,10rem)] font-bold leading-none text-brutalist-ink">
              <span className="block whitespace-nowrap">Hannah</span>
              <span className="block whitespace-nowrap">Yoo</span>
            </h1>
            <div className="mt-8 h-4 w-32 bg-brutalist-red" />
            <p className="mt-6 text-xs tracking-widest text-brutalist-muted">
              Artist &amp; Designer / Est. 2022
            </p>
          </div>

          {/* Right Panel - Scrollable Projects + Footer */}
          <div className="lg:h-[90vh] lg:overflow-y-auto" id="work">
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
                  <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">IG</a>
                  <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">BE</a>
                  <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">LI</a>
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
