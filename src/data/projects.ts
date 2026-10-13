import { Project } from "@/types";
import airtableProjects from "./airtable-projects.json";

const projects: Project[] = Array.isArray(airtableProjects) ? airtableProjects : [];

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
