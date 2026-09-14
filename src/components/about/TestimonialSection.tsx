import { FadeIn } from "@/components/animations/FadeIn";
import { testimonials } from "@/data/testimonials";

/**
 * TestimonialSection Component
 * 
 * Displays client testimonials in a clean, elegant layout.
 * Pattern adapted from tailwind-plus examples.
 * 
 * Features:
 * - Large quote typography using Crimson Text
 * - Author information with role and company
 * - Decorative quotation marks
 * - Fade-in animations
 * - Responsive grid layout
 */
export const TestimonialSection = () => {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              What clients say about working together.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-12 lg:gap-16">
          {testimonials.map((testimonial) => (
            <FadeIn key={testimonial.id}>
              <figure className="max-w-4xl">
                <blockquote className="relative">
                  <p className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-neutral-950 leading-relaxed">
                    <span className="text-neutral-300">"</span>
                    {testimonial.quote}
                    <span className="text-neutral-300">"</span>
                  </p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div>
                    <div className="font-semibold text-neutral-950">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
