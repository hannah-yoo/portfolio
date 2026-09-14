import { FadeIn } from "@/components/animations/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { designer } from "@/data/designer";
import { PageTransition } from "@/components/animations/PageTransition";
import { MainLayout } from "@/components/layout/MainLayout";

/**
 * Contact Page
 * 
 * Dedicated contact page with form and contact information.
 * Two-column layout: Contact info (left), Form (right).
 * 
 * Features:
 * - ContactForm with validation
 * - Contact information display
 * - Social media links
 * - Responsive layout (stacks on mobile)
 * 
 * Pattern adapted from tailwind-plus studio ContactSection
 */
export const Contact = () => {
  return (
    <MainLayout>
      <PageTransition>
        <div id="main-content" className="min-h-screen py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Form - Left Column */}
              <FadeIn>
                <div className="space-y-8">
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
                      Get in Touch
                    </h1>
                  </div>
                  
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8">
                    <ContactForm />
                  </div>
                </div>
              </FadeIn>

              {/* Contact Info - Right Column */}
              <FadeIn>
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <div className="text-sm text-neutral-600 mb-2">Email</div>
                    <a
                      href={`mailto:${designer.email}`}
                      className="text-xl text-neutral-950 hover:text-accent transition-colors"
                    >
                      {designer.email}
                    </a>
                  </div>

                  {/* Social Link */}
                  <div>
                    <div className="text-sm text-neutral-600 mb-2">Follow</div>
                    <a
                      href={designer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-neutral-950 hover:text-accent transition-colors"
                    >
                      Instagram →
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};
