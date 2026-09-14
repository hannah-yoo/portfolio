/**
 * SkipToContent Component
 * 
 * Accessibility enhancement that allows keyboard users to skip
 * directly to the main content, bypassing navigation elements.
 * 
 * Features:
 * - Hidden by default, visible on keyboard focus
 * - Positioned at top of page for screen reader priority
 * - High contrast styling for visibility
 * - Smooth scroll to main content
 * 
 * Usage:
 * Place at the very top of the app, before navigation.
 * Main content area should have id="main-content"
 */
export const SkipToContent = () => {
  const skipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={skipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-brand-black focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
    >
      Skip to main content
    </a>
  );
};
