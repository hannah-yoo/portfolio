import { cn } from "@/lib/utils";

interface ImageDimensions {
  width: number;
  height: number;
}

interface ProjectImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  onLoad?: () => void;
  onDimensionsLoad?: (dimensions: ImageDimensions) => void;
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
  onDimensionsLoad,
  loading,
}: ProjectImageFrameProps) => (
  <div
    className={cn("protected-portfolio-image relative isolate h-full w-full overflow-hidden bg-neutral-100", className)}
    onContextMenu={(event) => event.preventDefault()}
    onDragStart={(event) => event.preventDefault()}
  >
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
    />
    <img
      src={src}
      alt={alt}
      loading={loading}
      draggable={false}
      onLoad={(event) => {
        onLoad?.();
        onDimensionsLoad?.({
          width: event.currentTarget.naturalWidth,
          height: event.currentTarget.naturalHeight,
        });
      }}
      className={cn("relative z-10 h-full w-full object-contain", imageClassName)}
    />
  </div>
);
