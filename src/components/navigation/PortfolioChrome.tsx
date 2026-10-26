import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { designer } from "@/data/designer";

const navigation = [
  { label: "About", to: "/" },
  { label: "Design", to: "/design" },
  { label: "Fine Arts", to: "/fine-arts" },
  { label: "Photography & Video", to: "/photography-video" },
];

export const PortfolioHeader = () => {
  const { pathname } = useLocation();
  const activePath = pathname === "/about" || pathname === "/cv" ? "/" : pathname;
  const prefersReducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = activeLinkRef.current;
    const ruler = rulerRef.current;
    if (!nav || !activeLink || !ruler) return;

    const navBounds = nav.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();
    if (linkBounds.left < navBounds.left) {
      nav.scrollLeft += linkBounds.left - navBounds.left;
    } else if (linkBounds.right > navBounds.right) {
      nav.scrollLeft += linkBounds.right - navBounds.right;
    }

    const updateRuler = () => {
      const currentNavBounds = nav.getBoundingClientRect();
      const currentLinkBounds = activeLink.getBoundingClientRect();
      const markerPosition =
        currentLinkBounds.left - currentNavBounds.left + currentLinkBounds.width / 2;
      ruler.style.setProperty("--ruler-indicator-position", `${markerPosition}px`);
      ruler.style.setProperty("--ruler-tick-offset", `${markerPosition}px`);
    };

    updateRuler();
    nav.addEventListener("scroll", updateRuler, { passive: true });
    window.addEventListener("resize", updateRuler);
    const observer = new ResizeObserver(updateRuler);
    observer.observe(nav);
    observer.observe(activeLink);

    return () => {
      nav.removeEventListener("scroll", updateRuler);
      window.removeEventListener("resize", updateRuler);
      observer.disconnect();
    };
  }, [activePath]);

  return (
    <header className="portfolio-header">
      <div ref={rulerRef} className="portfolio-ruler" aria-hidden="true" />
      <nav ref={navRef} className="portfolio-nav" aria-label="Primary navigation">
        <LayoutGroup id="portfolio-navigation">
          {navigation.map((item) => {
            const isActive = activePath === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className="portfolio-nav-link"
                aria-current={isActive ? "page" : undefined}
                ref={isActive ? activeLinkRef : undefined}
              >
                {isActive && (
                  <motion.span
                    className="portfolio-nav-indicator"
                    layoutId="portfolio-nav-indicator"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34 }
                    }
                    aria-hidden="true"
                  />
                )}
                <span className="portfolio-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </LayoutGroup>
      </nav>
    </header>
  );
};

export const PortfolioFooter = () => (
  <footer className="portfolio-footer">
    <span>© {new Date().getFullYear()} {designer.name}</span>
    <nav aria-label="Social links">
      <a href={`mailto:${designer.email}`}>{designer.email}</a>
      {designer.socialLinks.instagram && (
        <a href={designer.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
      )}
      {designer.socialLinks.threads && (
        <a href={designer.socialLinks.threads} target="_blank" rel="noreferrer">Threads</a>
      )}
      {designer.socialLinks.linkedin && (
        <a href={designer.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      )}
      {designer.socialLinks.github && (
        <a href={designer.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
      )}
    </nav>
  </footer>
);
