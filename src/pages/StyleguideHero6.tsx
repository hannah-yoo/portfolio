import { motion } from "framer-motion";

const StyleguideHero6 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brutalist-cream text-brutalist-ink font-mono"
    >
      {/* Header */}
      <header className="border-b-4 border-brutalist-ink px-6 py-4">
        <h1 className="text-2xl font-bold">Hero6 Brutalist Style Guide</h1>
      </header>

      <main className="max-w-6xl mx-auto p-8 space-y-12">
        {/* Philosophy */}
        <section>
          <h2 className="text-3xl font-bold mb-4 border-b-4 border-brutalist-ink pb-2">Design Philosophy</h2>
          <p className="text-sm leading-relaxed text-brutalist-muted">
            Raw, bold aesthetic with strong geometry, high contrast, and utilitarian typography.
          </p>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <ColorSwatch name="Cream" variable="--brutalist-cream" className="bg-brutalist-cream border-4 border-brutalist-ink" textDark />
            <ColorSwatch name="Ink" variable="--brutalist-ink" className="bg-brutalist-ink" />
            <ColorSwatch name="Muted" variable="--brutalist-muted" className="bg-brutalist-muted" />
            <ColorSwatch name="Placeholder" variable="--brutalist-placeholder" className="bg-brutalist-placeholder" />
            <ColorSwatch name="Red" variable="--brutalist-red" className="bg-brutalist-red" />
            <ColorSwatch name="Teal" variable="--brutalist-teal" className="bg-brutalist-teal" />
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Typography Scale</h2>
          <div className="space-y-6">
            <TypographyExample 
              label="Display (Hero)" 
              className="text-6xl lg:text-8xl font-bold leading-none"
              example="HELLO"
            />
            <TypographyExample 
              label="Section Header" 
              className="text-4xl lg:text-6xl font-bold"
              example="Section Title"
            />
            <TypographyExample 
              label="Navigation / Labels" 
              className="text-xs font-bold tracking-widest uppercase"
              example="NAVIGATION LABEL"
            />
            <TypographyExample 
              label="Body Text" 
              className="text-sm leading-relaxed"
              example="Body text for paragraphs and descriptions. Should be easy to read with comfortable line height."
            />
            <TypographyExample 
              label="Project Title" 
              className="text-sm font-bold"
              example="Project Title"
            />
            <TypographyExample 
              label="Meta Text" 
              className="text-xs text-brutalist-muted"
              example="Client Name · 2024"
            />
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Spacing System</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-4 border-brutalist-ink">
              <thead>
                <tr className="bg-brutalist-ink text-brutalist-cream">
                  <th className="p-3 text-left font-bold">Context</th>
                  <th className="p-3 text-left font-bold">Padding</th>
                  <th className="p-3 text-left font-bold">Gap</th>
                </tr>
              </thead>
              <tbody>
                <SpacingRow context="Navigation" padding="px-6 py-4" gap="gap-1" />
                <SpacingRow context="Hero Panel" padding="p-12" gap="-" />
                <SpacingRow context="Project List" padding="p-6" gap="space-y-6" />
                <SpacingRow context="Footer Grid" padding="p-8 lg:p-12" gap="gap-8" />
                <SpacingRow context="Footer CTA" padding="p-8" gap="gap-6" />
                <SpacingRow context="Copyright" padding="px-6 py-4" gap="gap-4" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Borders */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Border System</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-16 border-4 border-brutalist-ink"></div>
              <div>
                <p className="font-bold text-sm">border-4</p>
                <p className="text-xs text-brutalist-muted">Heavy brutalist borders used throughout</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive States */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Interactive States</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Buttons</h3>
              <div className="flex gap-4 flex-wrap">
                <button className="px-6 py-3 bg-brutalist-ink text-brutalist-cream border-4 border-brutalist-ink font-bold text-xs uppercase tracking-wider hover:bg-brutalist-red hover:border-brutalist-red transition-colors">
                  Default → Hover
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="flex gap-4 flex-wrap">
                <a href="#" className="px-4 py-2 text-brutalist-ink font-bold text-xs hover:bg-brutalist-ink hover:text-brutalist-cream transition-colors">
                  Link Hover Effect
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Project Cards</h3>
              <div className="w-64 group cursor-pointer">
                <div className="aspect-[4/3] bg-brutalist-muted overflow-hidden">
                  <div className="w-full h-full bg-brutalist-placeholder grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"></div>
                </div>
                <p className="mt-2 text-sm font-bold group-hover:text-brutalist-red transition-colors">Project Title</p>
                <p className="text-xs text-brutalist-muted">Client · 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Input Fields */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Input Fields</h2>
          <div className="max-w-md space-y-4">
            <input 
              type="text" 
              placeholder="EMAIL ADDRESS"
              className="w-full px-4 py-3 bg-transparent border-4 border-brutalist-ink text-brutalist-ink placeholder:text-brutalist-placeholder font-bold uppercase text-sm focus:outline-none focus:ring-2 focus:ring-brutalist-red"
            />
            <textarea 
              placeholder="YOUR MESSAGE"
              rows={4}
              className="w-full px-4 py-3 bg-transparent border-4 border-brutalist-ink text-brutalist-ink placeholder:text-brutalist-placeholder font-bold uppercase text-sm focus:outline-none focus:ring-2 focus:ring-brutalist-red resize-none"
            />
          </div>
        </section>

        {/* Accent Blocks */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b-4 border-brutalist-ink pb-2">Accent Blocks</h2>
          <div className="flex gap-8 items-end">
            <div>
              <div className="h-4 w-32 bg-brutalist-red"></div>
              <p className="mt-2 text-xs text-brutalist-muted">Red bar (h-4 w-32)</p>
            </div>
            <div>
              <div className="h-32 w-32 bg-brutalist-teal"></div>
              <p className="mt-2 text-xs text-brutalist-muted">Teal accent (h-32 w-32)</p>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

const ColorSwatch = ({ 
  name, 
  variable, 
  className, 
  textDark = false 
}: { 
  name: string; 
  variable: string; 
  className: string; 
  textDark?: boolean;
}) => (
  <div className={`p-4 ${className}`}>
    <p className={`font-bold text-sm ${textDark ? 'text-brutalist-ink' : 'text-brutalist-cream'}`}>{name}</p>
    <p className={`text-xs ${textDark ? 'text-brutalist-muted' : 'text-brutalist-cream/70'}`}>{variable}</p>
  </div>
);

const TypographyExample = ({ 
  label, 
  className, 
  example 
}: { 
  label: string; 
  className: string; 
  example: string;
}) => (
  <div className="border-l-4 border-brutalist-ink pl-4">
    <p className="text-xs text-brutalist-muted mb-2 uppercase tracking-wider">{label}</p>
    <p className={className}>{example}</p>
  </div>
);

const SpacingRow = ({ 
  context, 
  padding, 
  gap 
}: { 
  context: string; 
  padding: string; 
  gap: string;
}) => (
  <tr className="border-t-2 border-brutalist-ink">
    <td className="p-3 font-bold">{context}</td>
    <td className="p-3"><code className="bg-brutalist-ink/10 px-2 py-1">{padding}</code></td>
    <td className="p-3"><code className="bg-brutalist-ink/10 px-2 py-1">{gap}</code></td>
  </tr>
);

export default StyleguideHero6;
