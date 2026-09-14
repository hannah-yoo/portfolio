import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GridContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "1620px" | "800px" | "500px";
}

/**
 * GridContainer - 12-column responsive grid wrapper
 * 
 * Provides consistent max-width containers with configurable sizes.
 * Used throughout the site for consistent content containment.
 * 
 * @param maxWidth - Maximum width of the container (default: 1620px)
 */
export const GridContainer = ({ 
  children, 
  className,
  maxWidth = "1620px" 
}: GridContainerProps) => {
  const maxWidthClasses = {
    "1620px": "max-w-[1620px]",
    "800px": "max-w-[800px]",
    "500px": "max-w-[500px]",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-6",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};
