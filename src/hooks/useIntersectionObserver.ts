import { useEffect, useRef, useState } from "react";

/**
 * useIntersectionObserver Hook
 * 
 * Custom hook for lazy loading images using the Intersection Observer API.
 * Loads images only when they enter the viewport for better performance.
 * 
 * Features:
 * - Configurable root margin for early loading
 * - Threshold control for visibility detection
 * - Automatic cleanup on unmount
 * - One-time observation (unobserves after loading)
 * 
 * @param options - IntersectionObserver configuration options
 * @returns [ref, isIntersecting] - Element ref and intersection state
 * 
 * @example
 * const [ref, isIntersecting] = useIntersectionObserver({
 *   rootMargin: "100px", // Start loading 100px before entering viewport
 *   threshold: 0.1 // Trigger when 10% visible
 * });
 */

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
  const {
    rootMargin = "100px",
    threshold = 0.1,
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting && triggerOnce) {
          setHasIntersected(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold, triggerOnce, hasIntersected]);

  return [ref, isIntersecting || hasIntersected];
};
