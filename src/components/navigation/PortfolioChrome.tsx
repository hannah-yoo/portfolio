import { Link, useLocation } from "react-router-dom";
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

  return (
    <header className="portfolio-header">
      <div className="portfolio-ruler" aria-hidden="true" />
      <nav className="portfolio-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="portfolio-nav-link"
            aria-current={activePath === item.to ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
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
