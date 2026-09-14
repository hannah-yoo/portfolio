import { AboutContent } from "@/components/sections/AboutContent";
import { PageTransition } from "@/components/animations/PageTransition";
import { MainLayout } from "@/components/layout/MainLayout";

/**
 * About Page
 * 
 * Comprehensive about page featuring designer biography, professional background,
 * skills, expertise, design philosophy, and call-to-action.
 * 
 * Content includes:
 * - Professional biography and background
 * - Core skills and expertise areas
 * - Design approach and values
 * - Philosophy statement
 * - Contact call-to-action
 */
export const About = () => {
  return (
    <MainLayout>
      <PageTransition>
        <div id="main-content">
          <AboutContent />
        </div>
      </PageTransition>
    </MainLayout>
  );
};
