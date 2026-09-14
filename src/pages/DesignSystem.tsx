import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { MainLayout } from "@/components/layout/MainLayout";

const DesignSystem = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    toast.success(`Copied ${label} to clipboard`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = {
    primary: [
      { name: "Brand Black", hex: "#171717", css: "brand-black", usage: "Primary text, buttons, strong emphasis" },
      { name: "Brand White", hex: "#ffffff", css: "brand-white", usage: "Backgrounds, reverse text, clean space" },
    ],
    neutrals: [
      { name: "Neutral 50", hex: "#fafafa", css: "neutral-50", usage: "Section backgrounds, subtle areas" },
      { name: "Neutral 100", hex: "#f5f5f5", css: "neutral-100", usage: "Card backgrounds, input backgrounds" },
      { name: "Neutral 200", hex: "#e5e5e5", css: "neutral-200", usage: "Borders, dividers, skeleton loading" },
      { name: "Neutral 300", hex: "#d4d4d4", css: "neutral-300", usage: "Input borders, inactive states" },
      { name: "Neutral 400", hex: "#a3a3a3", css: "neutral-400", usage: "Placeholder text, secondary icons" },
      { name: "Neutral 500", hex: "#737373", css: "neutral-500", usage: "Secondary text, metadata" },
      { name: "Neutral 600", hex: "#525252", css: "neutral-600", usage: "Body text, descriptions" },
      { name: "Neutral 700", hex: "#404040", css: "neutral-700", usage: "Headings, important text" },
      { name: "Neutral 800", hex: "#262626", css: "neutral-800", usage: "Button hover states, emphasis" },
      { name: "Neutral 900", hex: "#171717", css: "neutral-900", usage: "Primary text, maximum contrast" },
    ],
    accents: [
      { name: "Success Green", hex: "#22c55e", css: "success-green", usage: "Form success states, positive feedback" },
      { name: "Error Red", hex: "#ef4444", css: "error-red", usage: "Validation errors, critical alerts" },
      { name: "Focus Blue", hex: "#3b82f6", css: "focus-blue", usage: "Focus rings, interactive feedback" },
    ],
  };

  const typographyExamples = [
    { label: "Display", size: "text-5xl", weight: "font-bold", text: "Page headers, hero titles" },
    { label: "Heading 1", size: "text-4xl", weight: "font-bold", text: "Section titles, project names" },
    { label: "Heading 2", size: "text-3xl", weight: "font-semibold", text: "Subsections, testimonial quotes" },
    { label: "Heading 3", size: "text-2xl", weight: "font-semibold", text: "Card titles, form labels" },
    { label: "Body Large", size: "text-lg", weight: "font-normal", text: "Descriptions, bio text, form fields" },
    { label: "Body", size: "text-base", weight: "font-normal", text: "Standard text, navigation" },
    { label: "Small", size: "text-sm", weight: "font-normal", text: "Metadata, captions, helper text" },
    { label: "Extra Small", size: "text-xs", weight: "font-normal", text: "Fine print, micro-copy" },
  ];

  const spacingScale = [
    { label: "Micro", value: "0.5rem", tailwind: "2", usage: "Icon spacing, fine adjustments" },
    { label: "Small", value: "1rem", tailwind: "4", usage: "Form field spacing, tight layouts" },
    { label: "Medium", value: "1.5rem", tailwind: "6", usage: "Grid gaps, card padding" },
    { label: "Large", value: "2rem", tailwind: "8", usage: "Section spacing, comfortable layouts" },
    { label: "Extra Large", value: "3rem", tailwind: "12", usage: "Major section breaks" },
    { label: "2XL", value: "4rem", tailwind: "16", usage: "Page-level spacing" },
    { label: "3XL", value: "6rem", tailwind: "24", usage: "Hero sections, major breaks" },
  ];

  return (
    <MainLayout>
      <div id="main-content" className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-black">Design System</h1>
                <p className="text-neutral-600 mt-1">Comprehensive documentation of design tokens and components</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Introduction */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Introduction</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-neutral-600 leading-relaxed">
              This design system embodies <strong className="text-brand-black">Sophisticated Minimalism</strong>—a clean,
              uncluttered aesthetic that prioritizes content over decoration. Every element is crafted to maintain
              professional credibility while allowing the work to shine.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="p-6 border-neutral-200">
                <h3 className="font-semibold text-brand-black mb-3">Design Principles</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Content-first design philosophy</li>
                  <li>• Consistent spatial relationships</li>
                  <li>• Purposeful use of whitespace</li>
                  <li>• Subtle interactive feedback</li>
                  <li>• Professional typography hierarchy</li>
                </ul>
              </Card>
              <Card className="p-6 border-neutral-200">
                <h3 className="font-semibold text-brand-black mb-3">Technical Stack</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui components</li>
                  <li>• HSL color system</li>
                  <li>• Inter + Crimson Text fonts</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Color Palette */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Color Palette</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our color system uses HSL values for consistency and theme flexibility. All colors are semantic and purpose-driven.
          </p>

          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Primary Colors</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {colors.primary.map((color) => (
                <Card key={color.name} className="overflow-hidden border-neutral-200">
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-brand-black">{color.name}</h4>
                        <p className="text-sm text-neutral-500 font-mono">{color.hex}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedColor === color.name ? (
                          <Check className="h-4 w-4 text-success-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{color.usage}</p>
                    <Badge variant="secondary" className="font-mono text-xs">
                      --{color.css}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Neutral Scale */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Neutral Scale</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colors.neutrals.map((color) => (
                <Card key={color.name} className="overflow-hidden border-neutral-200">
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm text-brand-black">{color.name}</h4>
                        <p className="text-xs text-neutral-500 font-mono">{color.hex}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedColor === color.name ? (
                          <Check className="h-3 w-3 text-success-green" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-600">{color.usage}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Accent Colors</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {colors.accents.map((color) => (
                <Card key={color.name} className="overflow-hidden border-neutral-200">
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-brand-black">{color.name}</h4>
                        <p className="text-sm text-neutral-500 font-mono">{color.hex}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedColor === color.name ? (
                          <Check className="h-4 w-4 text-success-green" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-neutral-600">{color.usage}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Typography */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Typography</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Type hierarchy using Inter for UI and body text, Crimson Text for testimonials and decorative elements.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-brand-black mb-4">Font Families</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-neutral-200">
                  <p className="text-4xl font-sans mb-2">Inter</p>
                  <p className="text-neutral-600 text-sm mb-4">Primary sans-serif for UI and body text</p>
                  <Badge variant="secondary" className="font-mono text-xs">font-sans</Badge>
                </Card>
                <Card className="p-6 border-neutral-200">
                  <p className="text-4xl font-serif mb-2">Crimson Text</p>
                  <p className="text-neutral-600 text-sm mb-4">Secondary serif for testimonials and quotes</p>
                  <Badge variant="secondary" className="font-mono text-xs">font-serif</Badge>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-brand-black mb-4">Type Scale</h3>
              <div className="space-y-6">
                {typographyExamples.map((example) => (
                  <Card key={example.label} className="p-6 border-neutral-200">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{example.label}</Badge>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="font-mono text-xs">{example.size}</Badge>
                        <Badge variant="secondary" className="font-mono text-xs">{example.weight}</Badge>
                      </div>
                    </div>
                    <p className={`${example.size} ${example.weight} text-brand-black mb-2`}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <p className="text-sm text-neutral-600">{example.text}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-brand-black mb-4">Font Weights</h3>
              <Card className="p-6 border-neutral-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-normal text-2xl w-40">Regular (400)</span>
                    <Badge variant="secondary" className="font-mono text-xs">font-normal</Badge>
                    <span className="text-neutral-600 text-sm">Body text, descriptions</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-2xl w-40">Medium (500)</span>
                    <Badge variant="secondary" className="font-mono text-xs">font-medium</Badge>
                    <span className="text-neutral-600 text-sm">Navigation, labels, emphasis</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-2xl w-40">Semibold (600)</span>
                    <Badge variant="secondary" className="font-mono text-xs">font-semibold</Badge>
                    <span className="text-neutral-600 text-sm">Card titles, form labels</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-2xl w-40">Bold (700)</span>
                    <Badge variant="secondary" className="font-mono text-xs">font-bold</Badge>
                    <span className="text-neutral-600 text-sm">Page headers, strong emphasis</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Spacing System */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Spacing System</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Consistent spacing scale based on rem units for responsive and accessible layouts.
          </p>

          <div className="space-y-4">
            {spacingScale.map((space) => (
              <Card key={space.label} className="p-6 border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-brand-black">{space.label}</h4>
                    <p className="text-sm text-neutral-600">{space.usage}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="font-mono">{space.value}</Badge>
                    <Badge variant="outline" className="font-mono">space-{space.tailwind}</Badge>
                  </div>
                </div>
                <div className="bg-neutral-100 rounded">
                  <div
                    className="bg-brand-black rounded"
                    style={{ width: space.value, height: "2rem" }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Component Library */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Component Library</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Interactive examples of key UI components with various states.
          </p>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Buttons</h3>
            <Card className="p-8 border-neutral-200">
              <div className="flex flex-wrap gap-4 items-center">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </Card>
          </div>

          {/* Form Fields */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Form Fields</h3>
            <Card className="p-8 border-neutral-200">
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Input Field</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Input with Value</label>
                  <Input value="John Doe" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Textarea</label>
                  <Textarea placeholder="Enter your message" rows={4} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Disabled Input</label>
                  <Input disabled placeholder="Disabled field" />
                </div>
              </div>
            </Card>
          </div>

          {/* Badges */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Badges</h3>
            <Card className="p-8 border-neutral-200">
              <div className="flex flex-wrap gap-4 items-center">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary Badge</Badge>
                <Badge variant="outline">Outline Badge</Badge>
                <Badge variant="destructive">Destructive Badge</Badge>
              </div>
            </Card>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Cards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-neutral-200">
                <h4 className="font-semibold text-brand-black mb-2">Simple Card</h4>
                <p className="text-neutral-600">
                  Cards are flexible containers for grouping related content with consistent styling.
                </p>
              </Card>
              <Card className="p-6 border-neutral-200 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-brand-black mb-2">Interactive Card</h4>
                <p className="text-neutral-600">
                  Hover over this card to see the elevation change. Perfect for clickable elements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Layout System */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Layout System</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Flexible 12-column grid system with responsive breakpoints and container widths.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-brand-black mb-4">Container Widths</h3>
              <Card className="p-6 border-neutral-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="font-medium text-brand-black">Max Container</span>
                    <Badge variant="secondary" className="font-mono">1620px</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="font-medium text-brand-black">Medium Container</span>
                    <Badge variant="secondary" className="font-mono">800px</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-brand-black">Small Container</span>
                    <Badge variant="secondary" className="font-mono">500px</Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-brand-black mb-4">Grid Demonstration</h3>
              <Card className="p-6 border-neutral-200">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    12 columns (full width)
                  </div>
                  <div className="col-span-6 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    6 columns (half)
                  </div>
                  <div className="col-span-6 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    6 columns (half)
                  </div>
                  <div className="col-span-3 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    3 columns
                  </div>
                  <div className="col-span-3 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    3 columns
                  </div>
                  <div className="col-span-3 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    3 columns
                  </div>
                  <div className="col-span-3 bg-neutral-100 p-4 rounded text-center text-sm font-medium">
                    3 columns
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Usage Guidelines */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-brand-black mb-4">Usage Guidelines</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Best practices for implementing the design system consistently.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-success-green bg-success-green/5">
              <h3 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-success-green" />
                Do's
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✓ Use semantic color tokens (e.g., text-brand-black)</li>
                <li>✓ Maintain consistent spacing using the scale</li>
                <li>✓ Follow typography hierarchy for clarity</li>
                <li>✓ Test all interactive states (hover, focus, disabled)</li>
                <li>✓ Ensure sufficient color contrast for accessibility</li>
                <li>✓ Use the grid system for layout consistency</li>
              </ul>
            </Card>

            <Card className="p-6 border-error-red bg-error-red/5">
              <h3 className="font-semibold text-brand-black mb-4 flex items-center gap-2">
                <span className="h-5 w-5 text-error-red flex items-center justify-center">✕</span>
                Don'ts
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>✕ Don't use arbitrary color values</li>
                <li>✕ Don't mix inconsistent spacing values</li>
                <li>✕ Don't skip font weight hierarchy levels</li>
                <li>✕ Don't override component styles without reason</li>
                <li>✕ Don't ignore responsive breakpoints</li>
                <li>✕ Don't create custom colors outside the palette</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-neutral-200">
          <p className="text-center text-neutral-500 text-sm">
            Design System Documentation • Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
    </MainLayout>
  );
};

export default DesignSystem;
