import { Project, ProjectImage } from "@/types";
import airtableProjects from "./airtable-projects.json";

const normalizeImageWidth = (width: string): ProjectImage["width"] => {
  if (width === "full" || width === "half") return width;
  throw new Error(`Unsupported project image width: ${width}`);
};

const normalizeImageLayout = (layout: string | undefined): ProjectImage["layout"] => {
  if (layout === undefined) return undefined;
  if (layout === "single" || layout === "mosaic-lead" || layout === "mosaic-tile") return layout;
  throw new Error(`Unsupported project image layout: ${layout}`);
};

const normalizeGridWidth = (width: number): Project["gridWidth"] => {
  if (width === 3 || width === 6 || width === 12) return width;
  throw new Error(`Unsupported project grid width: ${width}`);
};

const normalizeCategory = (category: unknown): Project["category"] | null => {
  const value = String(category || "").trim().toLowerCase();
  if (value === "engineering" || value === "broadcast" || value === "broadcasts") return null;
  if (value === "articles" || value === "fine art" || value === "fine arts") return "fine-arts";
  if (
    value === "photography" ||
    value === "photo" ||
    value === "photography and video production" ||
    value === "photography & video" ||
    value === "photography-video" ||
    value === "photo-video" ||
    value === "video" ||
    value === "video production"
  ) return "photography-video";
  if (value.includes("사진") || value.includes("영상") || value.includes("촬영")) {
    return "photography-video";
  }
  if (value === "design") return "design";
  return "fine-arts";
};

const projects: Project[] = Array.isArray(airtableProjects)
  ? airtableProjects.flatMap((project) => {
      const category = normalizeCategory(project.category);
      if (!category) return [];
      return [{
        ...project,
        category,
        images: project.images.map((image) => ({
          ...image,
          width: normalizeImageWidth(image.width),
          layout: normalizeImageLayout(image.layout),
        })),
        gridWidth: normalizeGridWidth(project.gridWidth),
      }];
    })
  : [];

export const loadProjects = async (): Promise<Project[]> => projects;

export const getAllProjects = (): Project[] => projects;

export const getFeaturedProjects = (): Project[] =>
  projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getNextProject = (currentSlug: string): Project | null => {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  if (projects.length === 0) return null;
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
};
