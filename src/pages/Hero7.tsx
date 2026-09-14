import { Link } from "react-router-dom";

/**
 * Hero 7: Organic Flow - Blush & Forest
 * Soft, flowing shapes with organic feel
 */
export default function Hero7() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(350,30%,95%)]">
      {/* Background Shapes */}
      <div className="absolute -right-1/4 -top-1/4 h-[80vh] w-[80vh] rounded-full bg-[hsl(150,30%,35%)] opacity-90" />
      <div className="absolute -bottom-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-[hsl(350,40%,85%)]" />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-12 py-8">
        <Link to="/" className="font-serif text-xl text-[hsl(150,25%,25%)]">
          Julia Loyd Mohr
        </Link>
        <div className="flex gap-8 text-sm text-[hsl(150,20%,35%)]">
          <a href="#" className="hover:text-[hsl(150,30%,25%)]">Work</a>
          <a href="#" className="hover:text-[hsl(150,30%,25%)]">About</a>
          <a href="#" className="hover:text-[hsl(150,30%,25%)]">Contact</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[85vh] items-center px-12">
        <div className="max-w-2xl">
          <p className="text-sm tracking-wider text-[hsl(150,25%,40%)]">BRAND & GRAPHIC DESIGNER</p>
          <h1 className="mt-6 font-serif text-6xl leading-tight text-[hsl(150,30%,20%)] lg:text-7xl">
            Creating brands<br />
            <span className="italic text-[hsl(350,40%,60%)]">with soul</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-[hsl(150,15%,40%)]">
            I'm Julia, a designer who believes in the power of authentic visual storytelling.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-[hsl(150,30%,30%)] px-8 py-3 text-sm text-[hsl(350,30%,95%)] transition-transform hover:scale-105">
              View Projects
            </button>
            <button className="rounded-full border border-[hsl(150,30%,40%)] px-8 py-3 text-sm text-[hsl(150,30%,30%)] transition-colors hover:bg-[hsl(150,30%,30%)] hover:text-[hsl(350,30%,95%)]">
              Say Hello
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 right-20 h-4 w-4 rounded-full bg-[hsl(350,50%,70%)]" />
      <div className="absolute bottom-32 right-40 h-2 w-2 rounded-full bg-[hsl(150,40%,50%)]" />
      <div className="absolute top-40 right-1/3 h-3 w-3 rounded-full bg-[hsl(350,40%,75%)]" />
    </div>
  );
}
