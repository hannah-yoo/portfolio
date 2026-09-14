import { FadeIn } from "@/components/animations/FadeIn";

/**
 * ServiceCard Component
 * 
 * Individual service item with left border accent.
 * Pattern adapted from tailwind-plus studio GridListItem.
 * 
 * Features:
 * - Left border accent with gradient effect
 * - Fade-in animation on scroll
 * - Numbered prefix for visual hierarchy
 */
interface ServiceCardProps {
  service: string;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <li className="text-base text-neutral-600">
      <FadeIn>
        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-neutral-950 after:absolute after:left-0 after:top-0 after:h-6 after:w-px after:bg-neutral-950">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm font-mono text-neutral-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <strong className="font-semibold text-neutral-950">
              {service}
            </strong>
          </div>
        </div>
      </FadeIn>
    </li>
  );
};
