import { Testimonial } from "@/types";

/**
 * Client testimonials
 * 
 * Featured testimonials from satisfied clients showcasing
 * the quality of work and professional relationships.
 * 
 * Add your actual client testimonials here.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Working with Jordan was transformative for our brand. The attention to detail and strategic thinking brought our vision to life in ways we couldn't have imagined. The design system they created has become the foundation of our entire visual identity.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc.",
  },
  {
    id: "2",
    quote: "Jordan's ability to balance aesthetics with functionality is unmatched. They don't just make things look beautiful—they solve real business problems through thoughtful design. Our conversion rates improved by 40% after the redesign.",
    author: "Marcus Thompson",
    role: "Creative Director",
    company: "Boutique Agency",
  },
  {
    id: "3",
    quote: "What sets Jordan apart is their collaborative approach and dedication to understanding our needs. Every iteration showed deep consideration of our feedback while maintaining design integrity. The final product exceeded all expectations.",
    author: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Global Brands Co.",
  },
];

/**
 * Get a featured testimonial (first one by default)
 */
export const getFeaturedTestimonial = (): Testimonial => {
  return testimonials[0];
};
