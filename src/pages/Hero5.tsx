import { Link } from "react-router-dom";

/**
 * Hero 5: Editorial Layout - Sage & Ivory
 * Magazine-inspired with large typography
 */
export default function Hero5() {
  return (
    <div className="min-h-screen bg-[hsl(90,10%,95%)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-8 border-b border-[hsl(90,10%,85%)]">
        <Link to="/" className="font-serif text-2xl italic text-[hsl(90,25%,30%)]">
          Julia Loyd Mohr
        </Link>
        <div className="flex gap-10 text-sm text-[hsl(90,15%,40%)]">
          <a href="#" className="hover:text-[hsl(90,25%,25%)]">Projects</a>
          <a href="#" className="hover:text-[hsl(90,25%,25%)]">Biography</a>
          <a href="#" className="hover:text-[hsl(90,25%,25%)]">Contact</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="grid min-h-[85vh] grid-cols-12 gap-8 px-12 py-16">
        {/* Left Column */}
        <div className="col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] text-[hsl(90,20%,50%)]">DESIGN STUDIO</span>
            <h1 className="mt-6 font-serif text-[8rem] font-light leading-[0.85] text-[hsl(90,25%,30%)]">
              JLM
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[hsl(90,15%,45%)]">
            A multidisciplinary design practice focused on branding, visual identity, and graphic design for cultural and commercial clients.
          </p>
        </div>

        {/* Middle Column */}
        <div className="col-span-4 flex flex-col justify-center">
          <div className="aspect-[3/4] bg-[hsl(90,25%,55%)]">
            <div className="flex h-full items-end p-6">
              <span className="font-serif text-lg text-[hsl(90,10%,95%)]">Selected Works →</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 flex flex-col justify-center">
          <div className="border-l border-[hsl(90,15%,80%)] pl-8">
            <h2 className="font-serif text-4xl italic text-[hsl(90,25%,35%)]">
              Branding<br />& Graphic<br />Design
            </h2>
            <div className="mt-8 flex flex-col gap-4 text-sm text-[hsl(90,15%,50%)]">
              <span>Visual Identity</span>
              <span>Art Direction</span>
              <span>Print Design</span>
              <span>Digital Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
