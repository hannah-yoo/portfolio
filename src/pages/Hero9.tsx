import { Link } from "react-router-dom";

/**
 * Hero 9: Layered Depth - Charcoal & Amber
 * Multiple overlapping layers with depth
 */
export default function Hero9() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(30,5%,15%)]">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(30,5%,12%)_0%,hsl(30,5%,18%)_100%)]" />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-12 py-8">
        <Link to="/" className="text-lg font-light tracking-wider text-[hsl(40,80%,65%)]">
          JULIA LOYD MOHR
        </Link>
        <div className="flex gap-10 text-xs tracking-widest text-[hsl(30,10%,60%)]">
          <a href="#" className="transition-colors hover:text-[hsl(40,80%,65%)]">WORK</a>
          <a href="#" className="transition-colors hover:text-[hsl(40,80%,65%)]">ABOUT</a>
          <a href="#" className="transition-colors hover:text-[hsl(40,80%,65%)]">CONTACT</a>
        </div>
      </nav>

      {/* Layer 1 - Back */}
      <div className="absolute right-0 top-1/4 h-[60vh] w-[45vw] bg-[hsl(30,10%,20%)]" />
      
      {/* Layer 2 - Middle */}
      <div className="absolute right-[5vw] top-[30%] h-[50vh] w-[35vw] bg-[hsl(40,70%,50%)]">
        <div className="flex h-full flex-col justify-end p-8">
          <span className="text-xs tracking-wider text-[hsl(30,5%,15%)]">01 / FEATURED</span>
          <h3 className="mt-2 font-serif text-3xl text-[hsl(30,5%,15%)]">Harvest Table</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-[85vh] items-center px-12">
        <div className="max-w-xl">
          <div className="mb-8 h-px w-16 bg-[hsl(40,80%,55%)]" />
          <h1 className="font-serif text-6xl leading-[1.1] text-[hsl(30,10%,90%)] lg:text-7xl">
            Designing<br />
            <span className="italic text-[hsl(40,80%,65%)]">timeless</span><br />
            brands
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-[hsl(30,10%,60%)]">
            A design studio specializing in brand identity, art direction, and visual systems for ambitious brands.
          </p>
          <div className="mt-12 flex gap-6">
            <button className="bg-[hsl(40,80%,55%)] px-8 py-4 text-sm font-medium tracking-wider text-[hsl(30,5%,12%)] transition-transform hover:scale-105">
              EXPLORE WORK
            </button>
            <button className="border border-[hsl(30,10%,40%)] px-8 py-4 text-sm tracking-wider text-[hsl(30,10%,70%)] transition-colors hover:border-[hsl(40,80%,55%)] hover:text-[hsl(40,80%,65%)]">
              ABOUT ME
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-12 right-12 flex justify-between text-xs text-[hsl(30,10%,45%)]">
        <span>BRAND DESIGNER • EST. 2015</span>
        <span>PORTLAND, OR</span>
      </div>
    </div>
  );
}
