import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * NavLink Component
 * 
 * Navigation link with active state styling and scroll-based detection for hash links.
 * Features:
 * - Route-based active state for regular links
 * - Scroll-based active state for hash links (Intersection Observer)
 * - Smooth scrolling to sections
 * - Underlines when active or on hover
 */
export const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  
  // Set up Intersection Observer for hash links
  useEffect(() => {
    if (!to.startsWith("#")) return;

    const sectionId = to.slice(1); // Remove the # prefix
    const element = document.getElementById(sectionId);
    
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${sectionId}`);
          }
        });
      },
      {
        // Trigger when section is 30% visible
        threshold: 0.3,
        // Adjust root margin to account for fixed header
        rootMargin: "-80px 0px -50% 0px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [to]);
  
  // Check if link is active
  const isActive = to.startsWith("#")
    ? activeSection === to || location.hash === to
    : location.pathname === to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle hash links (scroll to section)
    if (to.startsWith("#")) {
      e.preventDefault();
      const sectionId = to.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Update URL hash
      window.history.pushState(null, "", to);
      setActiveSection(to);
    }
    onClick?.();
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        "text-sm font-medium transition-all duration-200",
        "hover:underline underline-offset-4",
        isActive
          ? "text-brand-black underline"
          : "text-neutral-600 hover:text-brand-black"
      )}
    >
      {children}
    </Link>
  );
};
