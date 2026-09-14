import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import DesignSystem from "./pages/DesignSystem";
import NotFound from "./pages/NotFound";
import Hero1 from "./pages/Hero1";
import Hero2 from "./pages/Hero2";
import Hero3 from "./pages/Hero3";
import Hero4 from "./pages/Hero4";
import Hero5 from "./pages/Hero5";
import Hero6 from "./pages/Hero6";
import Hero7 from "./pages/Hero7";
import Hero8 from "./pages/Hero8";
import Hero9 from "./pages/Hero9";
import Hero10 from "./pages/Hero10";
import StyleguideHero6 from "./pages/StyleguideHero6";

const queryClient = new QueryClient();

/**
 * AnimatedRoutes Component
 * 
 * Handles route animations using AnimatePresence from framer-motion.
 * Each route change triggers smooth fade and slide transitions.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/hero-1" element={<Hero1 />} />
        <Route path="/hero-2" element={<Hero2 />} />
        <Route path="/hero-3" element={<Hero3 />} />
        <Route path="/hero-4" element={<Hero4 />} />
        <Route path="/hero-5" element={<Hero5 />} />
        <Route path="/hero-6" element={<Hero6 />} />
        <Route path="/hero-7" element={<Hero7 />} />
        <Route path="/hero-8" element={<Hero8 />} />
        <Route path="/hero-9" element={<Hero9 />} />
        <Route path="/hero-10" element={<Hero10 />} />
        <Route path="/styleguide-hero6" element={<StyleguideHero6 />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipToContent />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
