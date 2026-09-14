import { Link } from "react-router-dom";

const projects = [
  { id: 1, title: "BRAND IDENTITY", client: "NORDIC STUDIOS", year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" },
  { id: 2, title: "VISUAL SYSTEM", client: "ARCH COLLECTIVE", year: "2024", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80" },
  { id: 3, title: "ART DIRECTION", client: "MONO MAGAZINE", year: "2023", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80" },
  { id: 4, title: "PACKAGING", client: "FORMA GOODS", year: "2023", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80" },
  { id: 5, title: "EDITORIAL", client: "PULSE MEDIA", year: "2023", image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&q=80" },
];

/**
 * Hero 6: Brutalist - Raw Contrast
 * Bold, raw aesthetic with strong geometry
 */
export default function Hero6() {
  return (
    <div className="min-h-screen bg-brutalist-cream font-mono">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b-4 border-brutalist-ink px-6 py-4">
        <Link to="/" className="text-xl font-bold text-brutalist-ink">
          JLM*
        </Link>
        <div className="flex gap-1">
          <a href="#" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">WORK</a>
          <a href="#" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">INFO</a>
          <a href="#" className="border-2 border-brutalist-ink px-4 py-2 text-xs font-bold text-brutalist-ink hover:bg-brutalist-ink hover:text-brutalist-cream">MAIL</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative grid min-h-[90vh] grid-cols-2">
        {/* Left Panel */}
        <div className="flex flex-col justify-center border-r-4 border-brutalist-ink p-12">
          <h1 className="text-8xl font-bold leading-none text-brutalist-ink lg:text-[10rem]">
            JULIA<br />LOYD<br />MOHR
          </h1>
          <div className="mt-8 h-4 w-32 bg-brutalist-red" />
          <p className="mt-6 text-xs tracking-widest text-brutalist-muted">
            DESIGNER / EST. 2015
          </p>
        </div>

        {/* Right Panel - Scrollable Projects + Footer */}
        <div className="h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                to="#"
                className="group block transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-brutalist-ink group-hover:text-brutalist-red">
                      {project.title}
                    </h3>
                    <p className="text-xs text-brutalist-muted">
                      {project.client}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brutalist-muted">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer inside scroll area */}
          <footer className="border-t-4 border-brutalist-ink mt-8">
            {/* Large Text Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 lg:p-12">
              <div>
                <h3 className="text-4xl font-bold text-brutalist-ink lg:text-6xl">BRAND</h3>
                <p className="mt-4 text-sm leading-relaxed text-brutalist-muted">Identity systems that define your visual language</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brutalist-ink lg:text-6xl">DIGITAL</h3>
                <p className="mt-4 text-sm leading-relaxed text-brutalist-muted">Web experiences built for impact</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brutalist-ink lg:text-6xl">PRINT</h3>
                <p className="mt-4 text-sm leading-relaxed text-brutalist-muted">Tangible design that leaves a mark</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-brutalist-ink lg:text-6xl">MOTION</h3>
                <p className="mt-4 text-sm leading-relaxed text-brutalist-muted">Dynamic visuals that tell stories</p>
              </div>
            </div>

            {/* Email CTA Section */}
            <div className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row border-t-4 border-brutalist-ink">
              <div>
                <h4 className="text-xl font-bold text-brutalist-ink">LET'S WORK TOGETHER</h4>
                <p className="mt-1 text-xs text-brutalist-muted">Drop your email and I'll get back to you within 24 hours.</p>
              </div>
              <form className="flex w-full max-w-md gap-2">
                <input
                  type="email"
                  placeholder="YOUR@EMAIL.COM"
                  className="flex-1 border-4 border-brutalist-ink bg-transparent px-4 py-3 text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-red"
                />
                <button
                  type="submit"
                  className="border-4 border-brutalist-ink bg-brutalist-ink px-6 py-3 text-sm font-bold text-brutalist-cream transition-colors hover:bg-brutalist-red hover:border-brutalist-red"
                >
                  SEND →
                </button>
              </form>
            </div>

            {/* Copyright */}
            <div className="border-t-4 border-brutalist-ink px-6 py-4 flex justify-between items-center">
              <span className="text-xs font-bold text-brutalist-muted">© {new Date().getFullYear()} JULIA LOYD MOHR</span>
              <div className="flex gap-4">
                <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">INSTAGRAM</a>
                <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">BEHANCE</a>
                <a href="#" className="text-xs font-bold text-brutalist-muted hover:text-brutalist-ink">LINKEDIN</a>
              </div>
            </div>
          </footer>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 left-0 h-32 w-32 bg-brutalist-teal" />
      </div>
    </div>
  );
}
