import { Link, useLocation } from "react-router-dom";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { designer } from "@/data/designer";

const navigation = [
  { label: "About", to: "/" },
  { label: "Design", to: "/design" },
  { label: "Fine Arts", to: "/fine-arts" },
  { label: "Broadcasts", to: "/broadcasts" },
];

export const PortfolioHeader = () => {
  const { pathname } = useLocation();
  const activePath = pathname === "/about" || pathname === "/cv" ? "/" : pathname;
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="portfolio-header">
      <div className="portfolio-ruler" aria-hidden="true" />
      <nav className="portfolio-nav" aria-label="Primary navigation">
        <LayoutGroup id="portfolio-navigation">
          {navigation.map((item) => {
            const isActive = activePath === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className="portfolio-nav-link"
                aria-current={isActive ? "page" : undefined}
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
      <div className="portfolio-ruler" aria-hidden="true" />
    </header>
  );
};

export const PortfolioFooter = () => (
  <footer className="portfolio-footer">
    <span>© {new Date().getFullYear()} {designer.name}</span>
    <nav aria-label="Social links">
      <a href={`mailto:${designer.email}`}>Mail</a>
      {designer.socialLinks.instagram && (
        <a href={designer.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
      )}
      {designer.socialLinks.linkedin && (
        <a href={designer.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      )}
    </nav>
  </footer>
);
