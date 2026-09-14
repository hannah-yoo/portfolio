import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ProjectHeroProps {
  image: string;
  alt: string;
  aspectRatio?: "16/9" | "4/3" | "3/4";
}

/**
 * ProjectHero Component
 * 
 * Large showcase image for project detail pages.
 * 
 * Features:
 * - Full-width display
 * - Configurable aspect ratios (16:9, 4:3, 3:4)
 * - Intersection Observer lazy loading for performance
 * - Blur-up placeholder effect during load
 * - Smooth fade-in animation
 */
export const ProjectHero = ({ 
  image, 
  alt, 
  aspectRatio = "16/9" 
}: ProjectHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0.1,
  });

  const ratioMap = {
    "16/9": 16 / 9,
    "4/3": 4 / 3,
    "3/4": 3 / 4,
  };

  return (
    <AspectRatio ratio={ratioMap[aspectRatio]} className="w-full" ref={ref}>
      {!imageLoaded && (
        <div className="absolute inset-0 w-full h-full rounded-lg bg-neutral-200 animate-pulse" />
      )}
      {isIntersecting && (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover rounded-lg",
            "transition-all duration-500",
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105 blur-sm"
          )}
        />
      )}
    </AspectRatio>
  );
};
