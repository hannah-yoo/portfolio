import { Instagram, Linkedin, Mail } from "lucide-react";
import { designer } from "@/data/designer";

/**
 * SocialLinks Component
 * 
 * Displays social media links for Instagram, LinkedIn, and Email.
 * Links are pulled from the designer data configuration.
 * 
 * Adapted from tailwind-plus examples but customized for this portfolio.
 */
export const SocialLinks = () => {
  const { socialLinks } = designer;

  const links = [
    {
      name: "Instagram",
      href: socialLinks.instagram,
      icon: Instagram,
      show: !!socialLinks.instagram,
    },
    {
      name: "LinkedIn",
      href: socialLinks.linkedin,
      icon: Linkedin,
      show: !!socialLinks.linkedin,
    },
    {
      name: "Email",
      href: `mailto:${socialLinks.email}`,
      icon: Mail,
      show: !!socialLinks.email,
    },
  ];

  return (
    <div className="flex gap-4">
      {links.map(
        (link) =>
          link.show && (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="text-neutral-600 hover:text-brand-black transition-colors"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </a>
          )
      )}
    </div>
  );
};
