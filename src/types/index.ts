/**
 * Type definitions for the Creative Portfolio Platform
 * Based on SPECIFICATION.md data models
 */

export interface Designer {
  name: string;
  bio: string;
  email: string;
  photo: string;
  services: string[];
  socialLinks: {
    instagram?: string;
    threads?: string;
    linkedin?: string;
    github?: string;
    email: string;
  };
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  width: "full" | "half";
  caption?: string;
}

export type ProjectCategory = "fine-arts" | "design" | "broadcasts";

export interface Project {
  id: string;
  slug: string;
  order?: number;
  title: string;
  subtitle?: string;
  year: string;
  description: string;
  role: string;
  team: string;
  timeline: string;
  heroImage: string;
  externalUrl?: string;
  images: ProjectImage[];
  gridWidth: 3 | 6 | 12;
  featured: boolean;
  /** Which work section this project belongs to */
  category: ProjectCategory;
  tags?: string[];
  medium?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}
