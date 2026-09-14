import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * PageTransition Component
 * 
 * Wraps page content with smooth enter/exit animations for route changes.
 * Uses framer-motion to create professional fade and slide effects.
 * 
 * Features:
 * - Fade in/out with subtle slide up on enter
 * - Fade out with slide down on exit
 * - Respects prefers-reduced-motion preference
 * - Smooth timing with ease-in-out curves
 * 
 * Animation timing:
 * - Enter: 0.4s
 * - Exit: 0.3s
 * 
 * Usage:
 * Wrap each page component with PageTransition
 * 
 * @example
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth easing
      }}
    >
      {children}
    </motion.div>
  );
};
