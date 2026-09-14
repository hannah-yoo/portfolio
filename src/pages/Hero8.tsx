import { Link } from "react-router-dom";

/**
 * Hero 8: Vertical Split - Coral & Midnight
 * Bold color blocking with vertical emphasis
 */
export default function Hero8() {
  return (
    <div className="flex min-h-screen">
      {/* Left Narrow Panel */}
      <div className="flex w-20 flex-col items-center justify-between bg-[hsl(220,45%,15%)] py-8">
        <Link to="/" className="text-xs tracking-widest text-[hsl(15,80%,65%)]" style={{ writingMode: 'vertical-rl' }}>
          JLM DESIGN
        </Link>
        <div className="flex flex-col gap-4">
          <a href="#" className="h-2 w-2 rounded-full bg-[hsl(15,70%,60%)]" title="Work" />
          <a href="#" className="h-2 w-2 rounded-full border border-[hsl(220,30%,40%)]" title="About" />
          <a href="#" className="h-2 w-2 rounded-full border border-[hsl(220,30%,40%)]" title="Contact" />
        </div>
        <span className="text-xs text-[hsl(220,30%,50%)]" style={{ writingMode: 'vertical-rl' }}>
          SCROLL
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-[hsl(15,80%,60%)]">
        <div className="flex flex-1 items-center px-16">
          <div>
            <h1 className="font-serif text-7xl text-[hsl(220,45%,15%)] lg:text-8xl">
              Julia<br />Loyd<br />Mohr
            </h1>
            <div className="mt-8 h-1 w-24 bg-[hsl(220,45%,15%)]" />
            <p className="mt-8 max-w-sm text-lg text-[hsl(220,45%,20%)]">
              Designer crafting bold brand identities and memorable visual experiences.
            </p>
          </div>
        </div>
        
        {/* Bottom Strip */}
        <div className="flex items-center justify-between bg-[hsl(220,45%,15%)] px-16 py-6">
          <span className="text-sm text-[hsl(220,30%,60%)]">Based in Portland, OR</span>
          <button className="text-sm text-[hsl(15,80%,65%)] underline underline-offset-4">
            View all projects →
          </button>
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="hidden w-1/3 bg-[hsl(220,35%,25%)] lg:flex lg:items-center lg:justify-center">
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] text-[hsl(15,70%,60%)]">FEATURED</span>
          <h3 className="mt-4 font-serif text-3xl text-[hsl(220,20%,90%)]">
            Bloom<br />Botanicals
          </h3>
          <span className="mt-4 inline-block text-xs text-[hsl(220,30%,60%)]">BRAND IDENTITY</span>
        </div>
      </div>
    </div>
  );
}
