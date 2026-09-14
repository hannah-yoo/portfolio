import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { designer } from "@/data/designer";
import { cn } from "@/lib/utils";

/**
 * BrutalistNav Component
 * 
 * Horizontal navigation bar with brutalist styling.
 * Features heavy borders, mono typography, and minimal design.
 */
export const BrutalistNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "WORK", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="border-b-4 border-brutalist-ink">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="font-mono text-xs font-bold text-brutalist-ink hover:text-brutalist-red transition-colors">
          {designer.name.toUpperCase()}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-mono text-xs font-bold text-brutalist-ink px-4 py-2 hover:bg-brutalist-ink hover:text-brutalist-cream transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-brutalist-ink hover:text-brutalist-cream transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t-4 border-brutalist-ink overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-48" : "max-h-0"
        )}
      >
        <div className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs font-bold text-brutalist-ink px-6 py-4 border-b border-brutalist-ink/20 hover:bg-brutalist-ink hover:text-brutalist-cream transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
