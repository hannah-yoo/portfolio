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
  isAnimatedGif?: boolean;
  width: "full" | "half";
  aspectRatio?: number;
  groupId?: string;
  layout?: "single" | "mosaic-lead" | "mosaic-tile";
  caption?: string;
}

export type ProjectCategory = "fine-arts" | "design" | "photography-video";

export interface CollectionContent {
  category: ProjectCategory;
  title: string;
  titleKo?: string;
  description: string;
  descriptionKo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  titleKo?: string;
  subtitle?: string;
  subtitleKo?: string;
  year: string;
  description: string;
  descriptionKo?: string;
  topDescription?: string;
  topDescriptionKo?: string;
  topDescriptionAfterImage?: number;
  middleDescription?: string;
  middleDescriptionKo?: string;
  middleDescriptionAfterImage?: number;
  bottomDescription?: string;
  bottomDescriptionKo?: string;
  bottomDescriptionAfterImage?: number;
  role: string;
  roleKo?: string;
  team: string;
  teamKo?: string;
  timeline: string;
  timelineKo?: string;
  heroImage: string;
  heroImageIsGif?: boolean;
  heroThumbnail?: string;
  externalUrl?: string;
  images: ProjectImage[];
  gridWidth: 3 | 6 | 12;
  featured: boolean;
  /** Which work section this project belongs to */
  category: ProjectCategory;
  tags?: string[];
  medium?: string[];
  mediumKo?: string[];
  heroSlideshowImages?: ProjectImage[];
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
