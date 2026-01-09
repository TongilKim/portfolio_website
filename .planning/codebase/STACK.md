# Technology Stack

**Analysis Date:** 2026-01-09

## Languages

**Primary:**
- TypeScript - All application code (`src/**/*.tsx`, `src/**/*.ts`)

**Secondary:**
- CSS - Styling with Tailwind utilities (`src/styles/*.css`)
- HTML - Entry point (`index.html`)

## Runtime

**Environment:**
- Node.js - Development runtime (inferred from `package.json`)
- Browser - Client-side React SPA execution
- No runtime version file detected (.nvmrc, .node-version)

**Package Manager:**
- pnpm - Lock file: `pnpm-lock.yaml` present
- Scripts: `dev`, `build`, `claude`

## Frameworks

**Core:**
- React 18.3.1 - UI framework (`package.json`)
- React DOM 18.3.1 - React rendering

**Build/Dev:**
- Vite 6.3.5 - Build tool and dev server (`vite.config.ts`)
- @vitejs/plugin-react 4.7.0 - React plugin for Vite
- PostCSS - CSS processing (`postcss.config.mjs`)

**Styling:**
- Tailwind CSS 4.1.12 - Utility-first CSS framework
- @tailwindcss/vite 4.1.12 - Vite plugin for Tailwind
- Emotion (CSS-in-JS) - Used by MUI components
  - @emotion/react 11.14.0
  - @emotion/styled 11.14.1

**Testing:**
- Not detected - No test framework configured

## Key Dependencies

**Critical:**
- lucide-react 0.487.0 - Icon library (used throughout all components)
- class-variance-authority 0.7.1 - CSS class composition for variants
- clsx 2.1.1 - Class name composition
- tailwind-merge 3.2.0 - Tailwind class merging utility

**UI Components:**
- Radix UI - Headless component library (27+ packages including):
  - @radix-ui/react-dialog 1.1.6
  - @radix-ui/react-dropdown-menu 2.1.6
  - @radix-ui/react-tabs 1.1.3
  - @radix-ui/react-accordion 1.2.3
  - @radix-ui/react-tooltip 1.1.8
- @mui/material 7.3.5 - Material Design components
- @mui/icons-material 7.3.5 - Material icons
- shadcn/ui - Component library built on Radix (50+ components in `src/app/components/ui/`)

**Forms & Interaction:**
- react-hook-form 7.55.0 - Form state management
- cmdk 1.1.1 - Command menu component
- sonner 2.0.3 - Toast notifications
- vaul 1.1.2 - Drawer/dialog component

**Additional:**
- motion 12.23.24 - Animation library
- next-themes 0.4.6 - Theme management
- date-fns 3.6.0 - Date utilities
- recharts 2.15.2 - Chart library

## Configuration

**Environment:**
- No .env files detected
- Static configuration only
- No environment variables required

**Build:**
- `vite.config.ts` - Vite build configuration with path alias `@` -> `./src`
- `postcss.config.mjs` - PostCSS configuration (minimal)
- Path alias configured: `@` resolves to `src/`

**Styling:**
- `src/styles/index.css` - Main stylesheet entry
- `src/styles/tailwind.css` - Tailwind directives
- `src/styles/theme.css` - Theme variables (CSS custom properties, light/dark mode)
- `src/styles/fonts.css` - Font definitions

## Platform Requirements

**Development:**
- Any platform with Node.js
- pnpm package manager
- No Docker or external dependencies required

**Production:**
- Static site deployment (Vercel, Netlify, etc.)
- Client-side rendering only
- No server runtime required

---

*Stack analysis: 2026-01-09*
*Update after major dependency changes*
