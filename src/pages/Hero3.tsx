import { Link } from "react-router-dom";

/**
 * Hero 3: Asymmetric Overlap - Terracotta & Sand
 * Earthy tones with overlapping elements
 */
export default function Hero3() {
  return (
    <div className="min-h-screen overflow-hidden bg-[hsl(35,30%,90%)]">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <Link to="/" className="font-serif text-lg text-[hsl(15,40%,35%)]">
          JLM Studio
        </Link>
        <div className="flex gap-8 text-xs tracking-widest text-[hsl(15,30%,40%)]">
          <a href="#" className="hover:text-[hsl(15,50%,30%)]">PORTFOLIO</a>
          <a href="#" className="hover:text-[hsl(15,50%,30%)]">ABOUT</a>
          <a href="#" className="hover:text-[hsl(15,50%,30%)]">CONNECT</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative min-h-[90vh] px-8 pt-20">
        {/* Large Background Text */}
        <div className="absolute left-0 top-1/4 font-serif text-[15vw] font-light leading-none text-[hsl(35,25%,85%)]">
          Designer
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="font-serif text-6xl text-[hsl(15,40%,30%)] lg:text-7xl">
              Julia Loyd<br />Mohr
            </h1>
            <p className="mt-6 max-w-sm font-serif text-xl italic text-[hsl(15,30%,45%)]">
              Branding & graphic design for thoughtful brands
            </p>
          </div>

          {/* Featured Image Card */}
          <div className="mt-12 lg:mt-0 lg:w-2/5">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-full w-full bg-[hsl(15,50%,55%)]" />
              <div className="relative aspect-[3/4] bg-[hsl(30,60%,75%)] p-8">
                <span className="font-serif text-sm tracking-wider text-[hsl(15,40%,25%)]">
                  FEATURED PROJECT
                </span>
                <h3 className="mt-4 font-serif text-3xl text-[hsl(15,40%,25%)]">
                  Artisan Collective
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative */}
        <div className="absolute bottom-12 left-8 h-24 w-px bg-[hsl(15,40%,60%)]" />
      </div>
    </div>
  );
}
