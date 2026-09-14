import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * FadeIn Component
 * 
 * Scroll-reveal animation component adapted from tailwind-plus studio example.
 * Uses framer-motion to animate elements as they enter the viewport.
 * Respects user's prefers-reduced-motion setting.
 * 
 * @param children - Content to animate
 * @param className - Additional CSS classes
 * @param variants - Custom animation variants (optional)
 */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FadeIn = ({ children, className, variants = defaultVariants }: FadeInProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      variants={shouldReduceMotion ? undefined : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeInStagger Component
 * 
 * Container for staggered fade-in animations.
 * Children elements will animate in sequence with a delay between each.
 * 
 * @param children - Child elements to stagger
 * @param className - Additional CSS classes
 * @param staggerDelay - Delay between each child animation (default: 0.1s)
 */

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const FadeInStagger = ({ 
  children, 
  className,
  staggerDelay = 0.1 
}: FadeInStaggerProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ staggerChildren: shouldReduceMotion ? 0 : staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
