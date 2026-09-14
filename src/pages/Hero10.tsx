import { Link } from "react-router-dom";

/**
 * Hero 10: Grid System - Lavender & Graphite
 * Structured grid with subtle sophistication
 */
export default function Hero10() {
  return (
    <div className="min-h-screen bg-[hsl(260,20%,95%)]">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(260,15%,85%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(260,15%,85%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-12 py-8">
        <Link to="/" className="font-serif text-xl text-[hsl(260,10%,25%)]">
          Julia Loyd Mohr
        </Link>
        <div className="flex gap-8 text-sm text-[hsl(260,10%,45%)]">
          <a href="#" className="hover:text-[hsl(260,10%,25%)]">Work</a>
          <a href="#" className="hover:text-[hsl(260,10%,25%)]">About</a>
          <a href="#" className="hover:text-[hsl(260,10%,25%)]">Contact</a>
        </div>
      </nav>

      {/* Hero Grid */}
      <div className="relative z-10 grid min-h-[85vh] grid-cols-12 gap-4 px-12 py-8">
        {/* Title Area */}
        <div className="col-span-8 flex flex-col justify-center">
          <span className="text-sm tracking-widest text-[hsl(260,30%,60%)]">DESIGN STUDIO</span>
          <h1 className="mt-4 font-serif text-7xl leading-[1.05] text-[hsl(260,10%,20%)] lg:text-8xl">
            Brand<br />Designer
          </h1>
          <p className="mt-8 max-w-md text-lg text-[hsl(260,10%,45%)]">
            Creating cohesive visual identities that connect brands with their audience.
          </p>
        </div>

        {/* Accent Column */}
        <div className="col-span-4 flex flex-col justify-between py-12">
          <div className="space-y-6">
            <div className="h-32 w-full bg-[hsl(260,25%,70%)]" />
            <div className="h-32 w-full bg-[hsl(260,10%,30%)]">
              <div className="flex h-full items-center justify-center">
                <span className="text-xs tracking-widest text-[hsl(260,20%,80%)]">01</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-[hsl(260,10%,25%)]">Services</h3>
            <ul className="space-y-2 text-sm text-[hsl(260,10%,50%)]">
              <li>Brand Identity</li>
              <li>Visual Systems</li>
              <li>Art Direction</li>
              <li>Print & Digital</li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="col-span-12 flex items-end justify-between pb-4">
          <button className="flex items-center gap-4 text-sm font-medium text-[hsl(260,10%,25%)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(260,10%,25%)] text-[hsl(260,20%,95%)]">
              →
            </span>
            View Selected Work
          </button>
          <span className="text-xs text-[hsl(260,10%,55%)]">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
}
