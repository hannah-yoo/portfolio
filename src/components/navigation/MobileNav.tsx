import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { designer } from "@/data/designer";
import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

/**
 * MobileNav Component
 * 
 * Horizontal header with hamburger menu for mobile devices (< lg breakpoint).
 * Opens a Sheet drawer with navigation links and social media.
 * 
 * Visible only on mobile, hidden on desktop (where Sidebar is used).
 */
export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-50">
      {/* Designer Name */}
      <Link to="/">
        <h1 className="text-xl font-semibold tracking-tight text-brand-black hover:opacity-80 transition-opacity">
          {designer.name.split(" ")[0]}
        </h1>
      </Link>

      {/* Hamburger Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle className="text-left text-2xl font-semibold">
              {designer.name}
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full justify-between py-8">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-6">
              <NavLink to="/" onClick={handleLinkClick}>
                Work
              </NavLink>
              <NavLink to="/about" onClick={handleLinkClick}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={handleLinkClick}>
                Contact
              </NavLink>
            </nav>

            {/* Social Links */}
            <div className="pt-8 border-t border-border space-y-4">
              <p className="text-sm text-neutral-500 mb-4">Connect</p>
              <SocialLinks />
              
              {/* Discreet Design System Link */}
              <Link 
                to="/design-system" 
                className="block text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                onClick={handleLinkClick}
              >
                Design System
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
