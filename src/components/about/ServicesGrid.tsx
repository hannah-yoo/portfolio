import { FadeInStagger } from "@/components/animations/FadeIn";
import { ServiceCard } from "./ServiceCard";
import { designer } from "@/data/designer";

/**
 * ServicesGrid Component
 * 
 * Displays a 3-column grid of services offered by the designer.
 * Uses the GridList pattern from tailwind-plus studio example.
 * 
 * Features:
 * - 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
 * - Staggered fade-in animations
 * - Border accent on each service card
 */
export const ServicesGrid = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
            Services
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Specialized design solutions that blend strategic thinking with meticulous craftsmanship.
          </p>
        </div>
        
        <FadeInStagger>
          <ul
            role="list"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {designer.services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </ul>
        </FadeInStagger>
      </div>
    </section>
  );
};
