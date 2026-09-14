import { Link } from "react-router-dom";

/**
 * Hero 2: Full Width Minimalist - Black & White
 * Ultra clean with bold typography
 */
export default function Hero2() {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,2%)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-8">
        <Link to="/" className="text-sm tracking-[0.3em] text-[hsl(0,0%,100%)]">
          STUDIO
        </Link>
        <div className="flex gap-12 text-xs tracking-[0.2em] text-[hsl(0,0%,60%)]">
          <a href="#" className="hover:text-[hsl(0,0%,100%)] transition-colors">PROJECTS</a>
          <a href="#" className="hover:text-[hsl(0,0%,100%)] transition-colors">ABOUT</a>
          <a href="#" className="hover:text-[hsl(0,0%,100%)] transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex min-h-[80vh] flex-col justify-center px-12">
        <div className="max-w-5xl">
          <p className="text-sm tracking-[0.2em] text-[hsl(0,0%,50%)]">CREATIVE DIRECTION & DESIGN</p>
          <h1 className="mt-8 text-7xl font-light leading-[0.9] text-[hsl(0,0%,100%)] lg:text-[10rem]">
            Julia<br />
            Loyd<br />
            Mohr
          </h1>
          <p className="mt-12 max-w-md text-lg text-[hsl(0,0%,60%)]">
            Crafting visual identities that resonate. Branding, art direction, and graphic design.
          </p>
          <button className="mt-12 border border-[hsl(0,0%,30%)] px-8 py-4 text-sm tracking-[0.2em] text-[hsl(0,0%,100%)] transition-colors hover:bg-[hsl(0,0%,100%)] hover:text-[hsl(0,0%,2%)]">
            VIEW WORK
          </button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0,0%,20%)] to-transparent" />
    </div>
  );
}
