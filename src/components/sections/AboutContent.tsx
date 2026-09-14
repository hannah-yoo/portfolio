import { FadeIn } from "@/components/animations/FadeIn";
import { designer } from "@/data/designer";
import { Award, Briefcase, Code, Palette, Users, Zap } from "lucide-react";

/**
 * AboutContent Component
 * 
 * Main content for the About page featuring:
 * - Professional biography
 * - Design philosophy
 * - Core skills and expertise
 * - Professional approach
 * 
 * Implements sophisticated minimalism with clean typography,
 * generous spacing, and subtle visual hierarchy.
 */
export const AboutContent = () => {
  const skills = [
    {
      icon: Palette,
      title: "Visual Design",
      description: "Creating elegant, user-centered interfaces that balance aesthetics with functionality."
    },
    {
      icon: Code,
      title: "Front-End Development",
      description: "Building responsive, accessible web experiences with modern technologies and best practices."
    },
    {
      icon: Users,
      title: "User Experience",
      description: "Crafting intuitive interactions through research, testing, and iterative refinement."
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and efficiency without compromising on design quality."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering work that exceeds expectations and stands the test of time."
    },
    {
      icon: Briefcase,
      title: "Collaboration",
      description: "Partnering with clients and teams to bring shared visions to life through open communication."
    }
  ];

  return (
    <div className="min-h-screen py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <FadeIn>
          <div className="mb-16 lg:mb-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-black mb-6">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl">
              A designer and developer passionate about creating beautiful, functional digital experiences.
            </p>
          </div>
        </FadeIn>

        {/* Biography Section */}
        <FadeIn>
          <section className="mb-20 lg:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-8">
              Background
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                With over a decade of experience in digital design and development, I specialize in crafting 
                clean, purposeful interfaces that prioritize user needs while maintaining visual excellence. 
                My work spans from early-stage startups to established brands, always focusing on the 
                intersection of aesthetics and usability.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                I believe great design should be invisible—it should guide users effortlessly toward their 
                goals without calling attention to itself. This philosophy drives every project I undertake, 
                from initial concept through final implementation.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                I work with clients worldwide to transform ideas into polished, production-ready products 
                that users love.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Skills Section */}
        <FadeIn>
          <section className="mb-20 lg:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-12">
              Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div 
                  key={skill.title}
                  className="group p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-brand-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <skill.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-brand-black mb-3">
                        {skill.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Values Section */}
        <FadeIn>
          <section className="mb-20 lg:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-12">
              Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="p-8 rounded-2xl border-2 border-neutral-200 hover:border-brand-black transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl border-2 border-brand-black flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-brand-black" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-brand-black mb-3">
                        {value.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Design Philosophy */}
        <FadeIn>
          <section className="mb-20 lg:mb-32">
            <div className="p-12 rounded-3xl bg-brand-black text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Design Philosophy
              </h2>
              <blockquote className="text-xl md:text-2xl leading-relaxed font-serif italic">
                "The best design is when nothing can be taken away. Every element serves a purpose, 
                every interaction feels natural, and the overall experience becomes greater than the 
                sum of its parts."
              </blockquote>
            </div>
          </section>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn>
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${designer.email}`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-brand-black rounded-xl hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
              <a 
                href={designer.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-brand-black bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors"
              >
                View Instagram
              </a>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
};
