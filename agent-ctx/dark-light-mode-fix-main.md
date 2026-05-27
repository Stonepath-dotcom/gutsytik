# Task: Fix Dark/Light Mode on Mova Homepage

## Summary
Fixed all hardcoded colors across 3 files to support proper dark/light mode switching using semantic theme variables and `dark:` prefix variants.

## Files Modified

### 1. `/home/z/my-project/src/app/globals.css`
- **`.hero-bg`**: Added light mode variant (`html:not(.dark) .hero-bg`) with light indigo gradient
- **`.hero-bg::after`**: Changed fade from `#FFFFFF` to `var(--background)` so it works in both modes
- **`.dark-section`**: Added light mode variant (`html:not(.dark) .dark-section`) using `var(--card)` and `var(--card-foreground)`

### 2. `/home/z/my-project/src/app/page.tsx`
- **Navbar**: Fixed all hardcoded white/navy colors to use `dark:` + semantic fallbacks; added `mounted` state to prevent hydration flicker on theme toggle icons
- **Hero Section**: Badge, title, subtitle, tabs, input, trust line, platform hints, loading, error, and result card all updated from hardcoded colors to semantic tokens (`text-foreground`, `bg-card`, `text-muted-foreground`, etc.)
- **Features Section**: Changed `bg-white` → `bg-card`, `text-gray-900` → `text-foreground`, `text-gray-500` → `text-muted-foreground`, `border-gray-100` → `border-border`
- **How It Works Section**: Changed `bg-gray-50` → `bg-muted` plus all text/border semantic replacements
- **Platforms Section**: Changed `bg-white` → `bg-card`, borders to `border-border`, text to semantic tokens
- **FAQ Section**: Changed background, cards, borders, and text to semantic tokens
- **Blog Section**: Changed background, cards, borders, and text to semantic tokens
- **CTA Section**: Added `dark:` prefixes for text, kept `.dark-section` class
- **Footer**: All links, headings, borders converted from `text-white/50` to `dark:text-white/50 text-muted-foreground`
- **Bottom Nav**: Changed from hardcoded navy to `dark:bg-[#0F172A] bg-white`
- **Main wrapper**: Changed `bg-white` → `bg-background`
- **Platform Download Pages section**: Fixed remaining hardcoded colors

### 3. `/home/z/my-project/src/components/seo-page-layout.tsx`
- Added `mounted` state and `useEffect` to prevent hydration flicker
- Updated theme toggle icon to use mounted guard pattern

## Key Patterns Used
- `dark:text-white/70 text-muted-foreground` — dark mode uses white, light mode uses muted
- `dark:bg-white/10 bg-muted` — dark mode uses white overlay, light mode uses muted
- `dark:border-white/10 border-border` — dark mode uses white border, light mode uses semantic border
- Semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `bg-muted`, `border-border`) auto-switch via CSS variables
- Brand accent `#4F46E5` was intentionally kept unchanged

## Build Status
- `next build` compiles successfully with no errors
