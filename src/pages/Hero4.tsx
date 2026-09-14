import { Link } from "react-router-dom";

/**
 * Hero 4: Centered Minimal - Navy & Gold
 * Elegant centered layout with luxury feel
 */
export default function Hero4() {
  return (
    <div className="min-h-screen bg-[hsl(220,40%,15%)]">
      {/* Navigation */}
      <nav className="flex items-center justify-center gap-16 px-8 py-10 text-xs tracking-[0.3em] text-[hsl(45,60%,70%)]">
        <a href="#" className="hover:text-[hsl(45,70%,80%)]">WORK</a>
        <a href="#" className="hover:text-[hsl(45,70%,80%)]">ABOUT</a>
        <Link to="/" className="font-serif text-xl text-[hsl(45,60%,85%)]">JLM</Link>
        <a href="#" className="hover:text-[hsl(45,70%,80%)]">SERVICES</a>
        <a href="#" className="hover:text-[hsl(45,70%,80%)]">CONTACT</a>
      </nav>

      {/* Hero Content */}
      <div className="flex min-h-[85vh] flex-col items-center justify-center px-8 text-center">
        <p className="text-sm tracking-[0.4em] text-[hsl(45,50%,60%)]">BRAND DESIGNER</p>
        
        <h1 className="mt-8 font-serif text-6xl text-[hsl(45,60%,90%)] lg:text-8xl">
          Julia Loyd Mohr
        </h1>
        
        <div className="mt-8 h-px w-24 bg-[hsl(45,60%,50%)]" />
        
        <p className="mt-8 max-w-xl font-serif text-xl italic text-[hsl(220,20%,70%)]">
          Creating timeless visual identities for brands that value craft, elegance, and authenticity.
        </p>

        <div className="mt-16 flex gap-6">
          <button className="border border-[hsl(45,60%,50%)] px-8 py-3 text-xs tracking-[0.2em] text-[hsl(45,60%,85%)] transition-all hover:bg-[hsl(45,60%,50%)] hover:text-[hsl(220,40%,15%)]">
            VIEW PORTFOLIO
          </button>
          <button className="px-8 py-3 text-xs tracking-[0.2em] text-[hsl(45,50%,60%)] transition-colors hover:text-[hsl(45,60%,85%)]">
            GET IN TOUCH
          </button>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute left-8 top-32 h-16 w-px bg-[hsl(45,60%,40%)]" />
      <div className="absolute left-8 top-32 h-px w-16 bg-[hsl(45,60%,40%)]" />
      <div className="absolute bottom-32 right-8 h-16 w-px bg-[hsl(45,60%,40%)]" />
      <div className="absolute bottom-32 right-8 h-px w-16 bg-[hsl(45,60%,40%)]" />
    </div>
  );
}
