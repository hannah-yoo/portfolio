import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Home, ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/animations/PageTransition";
import { MainLayout } from "@/components/layout/MainLayout";

/**
 * NotFound (404) Page
 * 
 * Enhanced 404 error page with clean design, clear messaging,
 * and easy navigation back to the homepage.
 * 
 * Features:
 * - Large decorative 404 text
 * - Clear error messaging
 * - Prominent navigation buttons
 * - Smooth fade-in animations
 * - Matches portfolio design system
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <MainLayout>
      <PageTransition>
        <div id="main-content" className="flex min-h-screen items-center justify-center px-6 py-24">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              {/* Decorative 404 */}
              <div className="relative mb-8">
                <h1 className="text-[10rem] sm:text-[12rem] lg:text-[14rem] font-bold text-neutral-100 dark:text-neutral-800 leading-none select-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-accent/10 animate-pulse" />
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-4 mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">
                  Page Not Found
                </h2>
                <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved.
                  Let's get you back on track.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  asChild
                  className="gap-2 w-full sm:w-auto"
                >
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    Go to Homepage
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="gap-2 w-full sm:w-auto"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </Button>
              </div>

              {/* Additional Help */}
              <p className="mt-12 text-sm text-neutral-500">
                If you believe this is an error, please{" "}
                <Link
                  to="/contact"
                  className="text-neutral-950 hover:text-accent transition-colors underline"
                >
                  contact me
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default NotFound;
