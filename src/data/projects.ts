import { Project } from "@/types";
import airtableProjects from "./airtable-projects.json";

const normalizeCategory = (category: unknown): Project["category"] => {
  const value = String(category || "").trim().toLowerCase();
  if (value === "articles" || value === "fine art" || value === "fine arts") return "fine-arts";
  if (value === "engineering" || value === "broadcast" || value === "broadcasts") return "broadcasts";
  if (value === "design") return "design";
  return "fine-arts";
};

const projects: Project[] = Array.isArray(airtableProjects)
  ? airtableProjects.map((project) => ({
      ...project,
      category: normalizeCategory(project.category),
    }))
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
