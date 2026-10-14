import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { PortfolioHeader } from "@/components/navigation/PortfolioChrome";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProjectDetail from "./pages/ProjectDetail";
import { Contact } from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * AnimatedRoutes Component
 * 
 * Handles route animations using AnimatePresence from framer-motion.
 * Each route change triggers smooth fade and slide transitions.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const portfolioRoutes = new Set([
    "/",
    "/about",
    "/cv",
    "/design",
    "/fine-arts",
    "/broadcasts",
    "/articles",
    "/engineering",
  ]);
  const showPortfolioHeader =
    portfolioRoutes.has(location.pathname) || location.pathname.startsWith("/projects/");

  return (
    <>
      {showPortfolioHeader && <PortfolioHeader />}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/cv" element={<Index />} />
          <Route path="/design" element={<Collection kind="design" />} />
          <Route path="/fine-arts" element={<Collection kind="fine-arts" />} />
          <Route path="/broadcasts" element={<Collection kind="broadcasts" />} />
          <Route path="/articles" element={<Navigate to="/fine-arts" replace />} />
          <Route path="/engineering" element={<Navigate to="/broadcasts" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const rawBase = import.meta.env.BASE_URL || "/";
const routerBasename = rawBase.endsWith("/") && rawBase.length > 1 ? rawBase.slice(0, -1) : rawBase;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBasename === "/" ? undefined : routerBasename}>
        <SkipToContent />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
