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
    linkedin?: string;
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

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  description: string;
  role: string;
  team: string;
  timeline: string;
  heroImage: string;
  images: ProjectImage[];
  gridWidth: 3 | 6 | 12;
  featured: boolean;
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
