import { cn } from "@/lib/utils";

interface ProjectImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  onLoad?: () => void;
  loading?: "lazy" | "eager";
}

/**
 * Keeps the source artwork fully visible while using a blurred version to fill
 * the frame around images with a different aspect ratio.
 */
export const ProjectImageFrame = ({
  src,
  alt,
  className,
  imageClassName,
  onLoad,
  loading,
}: ProjectImageFrameProps) => (
  <div className={cn("relative isolate h-full w-full overflow-hidden bg-neutral-100", className)}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
    />
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={onLoad}
      className={cn("relative z-10 h-full w-full object-contain", imageClassName)}
    />
  </div>
);
