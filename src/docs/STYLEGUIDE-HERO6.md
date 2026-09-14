# Hero6 Brutalist Style Guide

## Design Philosophy
Raw, bold aesthetic with strong geometry, high contrast, and utilitarian typography.

---

## Color Palette

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--brutalist-cream` | `hsl(50, 50%, 95%)` | Background |
| `--brutalist-ink` | `hsl(0, 0%, 10%)` | Primary text, borders |
| `--brutalist-muted` | `hsl(0, 0%, 40%)` | Secondary text |
| `--brutalist-placeholder` | `hsl(0, 0%, 60%)` | Input placeholders |
| `--brutalist-red` | `hsl(0, 70%, 50%)` | Primary accent |
| `--brutalist-teal` | `hsl(180, 50%, 40%)` | Secondary accent |

---

## Typography Scale

### Display (Hero Headings)
- **Size**: `text-8xl` → `lg:text-[10rem]`
- **Weight**: `font-bold`
- **Line Height**: `leading-none`
- **Font**: `font-mono`

### Section Headers (Footer)
- **Size**: `text-4xl` → `lg:text-6xl`
- **Weight**: `font-bold`

### Navigation / Labels
- **Size**: `text-xs`
- **Weight**: `font-bold`
- **Transform**: `tracking-widest` (subtitles only)

### Body Text
- **Size**: `text-sm`
- **Weight**: `normal`
- **Line Height**: `leading-relaxed`

### Project Cards
- **Title**: `text-sm font-bold`
- **Client**: `text-xs` (muted)
- **Year**: `text-xs font-bold` (muted)

---

## Spacing System

| Context | Padding | Gap |
|---------|---------|-----|
| Navigation | `px-6 py-4` | `gap-1` |
| Hero Panel | `p-12` | - |
| Project List | `p-6` | `space-y-6` |
| Footer Grid | `p-8 lg:p-12` | `gap-8` |
| Footer CTA | `p-6 lg:p-8` | `gap-6` |
| Copyright | `px-6 py-4` | `gap-4` |

---

## Border System

- **Weight**: `border-4` (heavy brutalist borders)
- **Color**: `border-[hsl(var(--brutalist-ink))]`
- **Placement**: Bottom borders on nav, top borders on footer sections

---

## Interactive States

### Buttons
```
Default: bg-[hsl(var(--brutalist-ink))] text-[hsl(var(--brutalist-cream))]
Hover:   bg-[hsl(var(--brutalist-red))] border-[hsl(var(--brutalist-red))]
```

### Links
```
Default: text-[hsl(var(--brutalist-ink))]
Hover:   bg-[hsl(var(--brutalist-ink))] text-[hsl(var(--brutalist-cream))]
```

### Project Cards
```
Image:   grayscale → grayscale-0 + scale-105
Title:   text-[hsl(var(--brutalist-ink))] → text-[hsl(var(--brutalist-red))]
```

---

## Component Patterns

### Input Fields
- Border: `border-4`
- Background: `transparent`
- Focus: `ring-2 ring-[hsl(var(--brutalist-red))]`
- Text: `font-bold uppercase`

### Accent Blocks
- Solid color blocks used as visual punctuation
- Red bar under hero name: `h-4 w-32`
- Teal corner accent: `h-32 w-32`

---

## Layout Grid

- **Hero**: 2-column grid (`grid-cols-2`)
- **Footer Services**: Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- **Scrollable Panel**: `h-[90vh] overflow-y-auto`

---

## Audit Findings

### ✅ Consistent
- Border weight (4px throughout)
- Mono font family
- HSL color format
- Interactive hover states

### ⚠️ Needs Attention
- [ ] Hardcoded HSL values should use CSS variables
- [ ] Text sizes vary slightly (xs vs sm in similar contexts)
- [ ] Footer CTA section has different padding than other footer sections
- [ ] Consider consolidating spacing tokens (p-6 vs p-8)

---

## Recommended Refactor

Replace hardcoded colors with design system tokens:
```css
/* Instead of */
text-[hsl(0,0%,10%)]

/* Use */
text-brutalist-ink
```
