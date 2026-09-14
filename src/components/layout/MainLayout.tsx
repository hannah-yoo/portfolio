import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileNav } from "@/components/navigation/MobileNav";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * MainLayout - Master layout with sidebar offset
 * 
 * Provides consistent layout structure with space for fixed sidebar.
 * - Desktop: Content offset by 180px (sidebar width)
 * - Mobile: Content offset by 64px (mobile header height)
 * 
 * This component wraps all page content and includes both
 * the desktop Sidebar and mobile MobileNav components.
 */
export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar />
      
      {/* Mobile Header (hidden on desktop) */}
      <MobileNav />
      
      {/* Main Content Area */}
      <div
        className={cn(
          // Desktop: offset by sidebar width (180px)
          "lg:ml-[180px]",
          // Mobile: offset by header height (64px) + no left margin
          "ml-0 mt-16 lg:mt-0",
          // Minimum height for full page layouts
          "min-h-screen",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
