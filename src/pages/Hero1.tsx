import { Link } from "react-router-dom";

/**
 * Hero 1: Split Screen - Olive & Cream
 * Classic split layout inspired by the reference
 */
export default function Hero1() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <Link to="/" className="font-serif text-xl text-[hsl(56,20%,35%)]">
          Julia Loyd Mohr <em>Design</em>
        </Link>
        <div className="flex gap-8 text-sm tracking-wider text-[hsl(56,20%,35%)]">
          <a href="#" className="hover:opacity-70">WORK</a>
          <a href="#" className="hover:opacity-70">BIO</a>
          <a href="#" className="hover:opacity-70">CONTACT</a>
        </div>
      </nav>

      {/* Split Screen Hero */}
      <div className="flex min-h-screen">
        {/* Left Panel - Olive */}
        <div className="relative flex w-1/2 flex-col justify-center bg-[hsl(56,20%,35%)] px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(56,15%,45%)] to-[hsl(56,20%,30%)]" />
          <div className="relative z-10">
            <h1 className="font-serif text-5xl text-[hsl(50,30%,90%)] lg:text-6xl">
              Julia Loyd Mohr
            </h1>
            <p className="mt-4 font-serif text-4xl italic text-[hsl(50,30%,85%)] lg:text-5xl">
              is a branding and<br />graphic designer.
            </p>
          </div>
        </div>

        {/* Right Panel - Cream */}
        <div className="flex w-1/2 flex-col justify-start bg-[hsl(50,30%,92%)] px-12 pt-32">
          <h2 className="font-serif text-5xl italic text-[hsl(56,20%,35%)]">
            Featured Projects
          </h2>
          <div className="mt-12 aspect-[4/3] overflow-hidden rounded-sm bg-[hsl(0,65%,45%)]">
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-3xl text-[hsl(50,30%,95%)]">Lovestruck Books</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[hsl(56,20%,35%)] underline decoration-1 underline-offset-4">
              Lovestruck Books
            </h3>
            <span className="text-xs tracking-widest text-[hsl(56,20%,45%)]">RETAIL BRANDING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
