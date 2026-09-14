import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: "sm" | "md" | "lg" | "xl";
}

/**
 * Section - Consistent section spacing component
 * 
 * Provides standardized vertical spacing for page sections.
 * Padding variants follow the design system spacing scale.
 * 
 * @param padding - Vertical padding size (default: lg)
 * - sm: 1rem (4) - Form field spacing, tight layouts
 * - md: 1.5rem (6) - Grid gaps, card padding
 * - lg: 2rem (8) - Section spacing, comfortable layouts
 * - xl: 3rem (12) - Major section breaks
 */
export const Section = ({ 
  children, 
  id,
  className,
  padding = "lg" 
}: SectionProps) => {
  const paddingClasses = {
    sm: "py-4",
    md: "py-6",
    lg: "py-8",
    xl: "py-12",
  };

  return (
    <section
      id={id}
      className={cn(
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </section>
  );
};
