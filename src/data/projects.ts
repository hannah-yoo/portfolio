import { Project } from "@/types";

/**
 * Portfolio projects data
 * 
 * This file contains all project information displayed in the portfolio.
 * Each project includes:
 * - Basic info (title, year, description)
 * - Metadata (role, team, timeline)
 * - Images (hero image and content images)
 * - Grid display settings (width: 3, 6, or 12 columns)
 * 
 * Replace placeholder images with actual project screenshots.
 */
export const projects: Project[] = [
  {
    id: "1",
    slug: "brand-identity-refresh",
    title: "Brand Identity Refresh",
    subtitle: "Modernizing a Legacy Brand",
    year: "2024",
    description: "A comprehensive brand identity redesign for a 50-year-old manufacturing company transitioning into digital markets. The project focused on honoring heritage while establishing a contemporary visual system that appeals to modern audiences.",
    role: "Lead Designer, Brand Strategist",
    team: "2 Designers, 1 Strategist, 1 Copywriter",
    timeline: "3 months",
    heroImage: "https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMTh8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by @felirbe on Unsplash
    images: [
      {
        id: "1-1",
        url: "https://images.unsplash.com/photo-1751170359998-36c22ed75d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMTl8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Buddha Elemental 3D on Unsplash
        alt: "Brand identity logo variations",
        width: "full",
        caption: "Primary and secondary logo variations with flexible applications",
      },
      {
        id: "1-2",
        url: "https://images.unsplash.com/photo-1683562953456-955af90473bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMTl8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by HI! ESTUDIO on Unsplash
        alt: "Brand color palette",
        width: "half",
        caption: "Refined color system balancing heritage and modernity",
      },
      {
        id: "1-3",
        url: "https://images.unsplash.com/photo-1716892001565-09a2d461982f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMTl8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Amol Srivastava on Unsplash
        alt: "Typography system",
        width: "half",
        caption: "Type hierarchy designed for print and digital applications",
      },
      {
        id: "1-4",
        url: "https://images.unsplash.com/photo-1585811759562-a30733b277f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjB8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Tonkla Pairoh on Unsplash
        alt: "Brand guidelines showcase",
        width: "full",
        caption: "Comprehensive brand guidelines ensuring consistent implementation",
      },
    ],
    gridWidth: 12,
    featured: true,
  },
  {
    id: "2",
    slug: "fintech-dashboard",
    title: "FinTech Dashboard",
    subtitle: "Enterprise Financial Platform",
    year: "2024",
    description: "Designed a sophisticated financial dashboard for institutional investors, focusing on data visualization, complex workflows, and real-time information architecture. The interface needed to handle large datasets while maintaining clarity and usability.",
    role: "UI/UX Designer, Design System Architect",
    team: "3 Designers, 2 Engineers, 1 Product Manager",
    timeline: "4 months",
    heroImage: "https://images.unsplash.com/photo-1675627453084-505806a00406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjB8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Steve Johnson on Unsplash
    images: [
      {
        id: "2-1",
        url: "https://images.unsplash.com/photo-1710769084589-1d53e36dd5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjF8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Amjith S on Unsplash
        alt: "Dashboard overview",
        width: "full",
        caption: "Main dashboard interface with real-time data visualization",
      },
      {
        id: "2-2",
        url: "https://images.unsplash.com/photo-1693045181229-3eddc1a2e242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjJ8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Testeur de CBD on Unsplash
        alt: "Design system components",
        width: "full",
        caption: "Comprehensive design system with 60+ custom components",
      },
    ],
    gridWidth: 6,
    featured: true,
  },
  {
    id: "3",
    slug: "editorial-magazine",
    title: "Editorial Magazine",
    subtitle: "Print & Digital Publication",
    year: "2023",
    description: "Art direction and layout design for a quarterly design magazine focusing on sustainable architecture. Created a flexible grid system that works across print and digital formats while maintaining typographic hierarchy and visual interest.",
    role: "Art Director, Layout Designer",
    team: "1 Designer, 1 Editor, 3 Contributors",
    timeline: "6 issues over 18 months",
    heroImage: "https://images.unsplash.com/photo-1613517085520-07eb87c52108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjJ8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by NMG Network on Unsplash
    images: [
      {
        id: "3-1",
        url: "https://images.unsplash.com/photo-1665834106020-536dc14887b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjN8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Alizea Sidorov on Unsplash
        alt: "Magazine spread examples",
        width: "full",
      },
      {
        id: "3-2",
        url: "https://images.unsplash.com/photo-1684323750753-ddeb888f825a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjN8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Rhamely on Unsplash
        alt: "Typography system",
        width: "half",
      },
      {
        id: "3-3",
        url: "https://images.unsplash.com/photo-1561291349-732653586bd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjR8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Laika Notebooks on Unsplash
        alt: "Grid system",
        width: "half",
      },
    ],
    gridWidth: 6,
    featured: true,
  },
  {
    id: "4",
    slug: "mobile-app-design",
    title: "Wellness App",
    subtitle: "iOS & Android",
    year: "2023",
    description: "Designed a mindfulness and meditation app focused on simplicity and calm aesthetics. The interface needed to feel approachable while guiding users through various meditation practices and tracking their progress over time.",
    role: "Mobile Designer, UX Researcher",
    team: "2 Designers, 3 Engineers",
    timeline: "5 months",
    heroImage: "https://images.unsplash.com/photo-1569990467292-bf052050d72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjR8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Dylan Alcock on Unsplash
    images: [
      {
        id: "4-1",
        url: "https://images.unsplash.com/photo-1610295272575-7376b67b3e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjV8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Mor Shani on Unsplash
        alt: "App screens showcase",
        width: "full",
      },
    ],
    gridWidth: 3,
    featured: false,
  },
  {
    id: "5",
    slug: "ecommerce-redesign",
    title: "E-Commerce Redesign",
    subtitle: "Luxury Fashion Retailer",
    year: "2023",
    description: "Redesigned the digital shopping experience for a luxury fashion brand, focusing on large product photography, intuitive navigation, and seamless checkout flow. The design needed to reflect the brand's premium positioning while improving conversion rates.",
    role: "Lead Designer, UX Strategist",
    team: "2 Designers, 1 Developer, 1 Product Manager",
    timeline: "3 months",
    heroImage: "https://images.unsplash.com/photo-1641484202138-59dc921826e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjV8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Yuliya Strizhkina (Cartier) 🇺🇦 on Unsplash
    images: [
      {
        id: "5-1",
        url: "https://images.unsplash.com/photo-1760287363879-6012adab292c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjZ8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Zayed Ahmed Zadu on Unsplash
        alt: "E-commerce homepage",
        width: "full",
      },
      {
        id: "5-2",
        url: "https://images.unsplash.com/photo-1711996246978-b8274c280a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjZ8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Pawel Czerwinski on Unsplash
        alt: "Product detail page",
        width: "half",
      },
      {
        id: "5-3",
        url: "https://images.unsplash.com/photo-1695091613943-1ecff15f5d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjd8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Erik Mclean on Unsplash
        alt: "Checkout flow",
        width: "half",
      },
    ],
    gridWidth: 6,
    featured: true,
  },
  {
    id: "6",
    slug: "illustration-series",
    title: "Illustration Series",
    subtitle: "Digital Art Collection",
    year: "2022",
    description: "A personal project exploring abstract forms and color relationships through digital illustration. This series experiments with geometric shapes, gradients, and compositional balance.",
    role: "Illustrator, Creative Direction",
    team: "Solo Project",
    timeline: "Ongoing",
    heroImage: "https://images.unsplash.com/photo-1745602649671-9bf3585b9187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjh8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Haroon Khalid on Unsplash
    images: [
      {
        id: "6-1",
        url: "https://images.unsplash.com/photo-1759074558550-dcca42849e36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjQ2NzIwMjh8&ixlib=rb-4.1.0&q=80&w=1080", // Photo by Steve Johnson on Unsplash
        alt: "Illustration examples",
        width: "full",
      },
    ],
    gridWidth: 3,
    featured: false,
  },
];

/**
 * Get all projects
 */
export const getAllProjects = (): Project[] => {
  return projects;
};

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

/**
 * Get project by slug
 */
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

/**
 * Get next project in sequence (for navigation)
 */
export const getNextProject = (currentSlug: string): Project | null => {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0]; // Loop back to first project
  }
  return projects[currentIndex + 1];
};
