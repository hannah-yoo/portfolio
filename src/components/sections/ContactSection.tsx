import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { designer } from "@/data/designer";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

/**
 * ContactSection Component - Brutalist Style
 * 
 * Email CTA section with brutalist styling.
 * Features heavy borders, mono typography, and input field.
 */
export const ContactSection = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="bg-brutalist-cream">
      <FadeIn>
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 lg:p-12 border-b-4 border-brutalist-ink">
          {/* Services Columns */}
          {[
            { title: "BRAND", items: ["Strategy", "Identity", "Guidelines", "Naming"] },
            { title: "DIGITAL", items: ["Web Design", "UI/UX", "App Design", "Prototyping"] },
            { title: "PRINT", items: ["Editorial", "Packaging", "Collateral", "Environmental"] },
            { title: "MOTION", items: ["Animation", "Video", "Interaction", "3D"] },
          ].map((service) => (
            <div key={service.title}>
              <h3 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-brutalist-ink mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-brutalist-muted leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Email CTA */}
        <div className="p-8 lg:p-12">
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-brutalist-ink mb-6">
            LET'S WORK
            <br />
            TOGETHER
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-4 border-brutalist-ink px-4 py-3 font-mono text-sm font-bold text-brutalist-ink placeholder:text-brutalist-placeholder focus:outline-none focus:ring-2 focus:ring-brutalist-red uppercase"
            />
            <a
              href={`mailto:${designer.email}?subject=Let's work together&body=Hi, I'd like to discuss a project with you.`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 border-4 font-mono text-sm font-bold uppercase transition-colors",
                "border-brutalist-ink bg-brutalist-ink text-brutalist-cream",
                "hover:bg-brutalist-red hover:border-brutalist-red"
              )}
            >
              SEND
              <ArrowRight className={cn("h-4 w-4 transition-transform", isHovered && "translate-x-1")} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t-4 border-brutalist-ink">
          <span className="font-mono text-xs text-brutalist-muted">
            © {new Date().getFullYear()} {designer.name.toUpperCase()}
          </span>
          <div className="flex gap-4">
            <a href="#" className="font-mono text-xs text-brutalist-muted hover:text-brutalist-ink transition-colors">
              TWITTER
            </a>
            <a href="#" className="font-mono text-xs text-brutalist-muted hover:text-brutalist-ink transition-colors">
              INSTAGRAM
            </a>
            <a href="#" className="font-mono text-xs text-brutalist-muted hover:text-brutalist-ink transition-colors">
              LINKEDIN
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
