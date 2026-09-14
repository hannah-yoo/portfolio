import { Link } from "react-router-dom";
import { designer } from "@/data/designer";
import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

/**
 * Sidebar Component
 * 
 * Fixed sidebar navigation (desktop only, 180px width).
 * Structure:
 * - Top: Designer name/logo
 * - Middle: Main navigation links
 * - Bottom: Social media links
 * 
 * Hidden on mobile (< lg breakpoint) - replaced by MobileNav
 */
export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-[180px] h-screen bg-background border-r border-border flex-col justify-between p-8 z-50">
      {/* Top: Designer Name/Logo */}
      <div>
        <Link to="/">
          <h1 className="text-2xl font-semibold tracking-tight text-brand-black hover:opacity-80 transition-opacity">
            {designer.name.split(" ")[0]}
          </h1>
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex flex-col gap-4">
        <NavLink to="/">Work</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      {/* Bottom: Social Links */}
      <div className="space-y-4">
        <SocialLinks />
        
        {/* Discreet Design System Link */}
        <Link 
          to="/design-system" 
          className="block text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Design System
        </Link>
      </div>
    </aside>
  );
};
