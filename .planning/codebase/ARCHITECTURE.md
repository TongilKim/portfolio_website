# Architecture

**Analysis Date:** 2026-01-09

## Pattern Overview

**Overall:** Component-Based Single Page Application (SPA)

**Key Characteristics:**
- Static portfolio website with no backend
- Scroll-based navigation (no routing library)
- Dual design variants (V1/V2) switchable at runtime
- Figma-generated component structure

## Layers

**Entry Point Layer:**
- Purpose: Bootstrap React application
- Contains: HTML shell, React DOM initialization
- Location: `index.html`, `src/main.tsx`
- Depends on: React, React DOM
- Used by: Browser directly

**Application Layer:**
- Purpose: Root application component and version management
- Contains: `App.tsx`, version layouts (`Version1.tsx`, `Version2.tsx`)
- Location: `src/app/App.tsx`, `src/app/components/Version*.tsx`
- Depends on: Section components, VersionSwitcher
- Used by: Entry point

**Section Components Layer:**
- Purpose: Page sections (header, hero, services, etc.)
- Contains: Self-contained page sections with local state
- Location: `src/app/components/*.tsx`, `src/app/components/v2/*.tsx`
- Depends on: UI component library, Lucide icons
- Used by: Version layouts

**UI Component Library Layer:**
- Purpose: Reusable UI primitives (shadcn/ui + Radix)
- Contains: 50+ atomic components (Button, Card, Input, etc.)
- Location: `src/app/components/ui/*.tsx`
- Depends on: Radix UI, class-variance-authority, Tailwind
- Used by: Section components

**Utility Layer:**
- Purpose: Shared helpers
- Contains: `cn()` classname utility, `ImageWithFallback` component
- Location: `src/app/components/ui/utils.ts`, `src/app/components/figma/`
- Depends on: clsx, tailwind-merge
- Used by: All component layers

**Styling Layer:**
- Purpose: Global styles, theme variables, Tailwind configuration
- Contains: CSS files with Tailwind directives and custom properties
- Location: `src/styles/*.css`
- Depends on: Tailwind CSS
- Used by: All components via className

## Data Flow

**Page Load:**
1. Browser loads `index.html` with `<div id="root">`
2. `src/main.tsx` mounts React app to root element
3. `App.tsx` renders default V1 layout
4. Section components render with static data

**User Navigation:**
1. User clicks navigation link (e.g., "Services")
2. `scrollToSection(id)` called in Header component
3. `document.getElementById(id)` finds target section
4. `element.scrollIntoView({ behavior: "smooth" })` scrolls to section

**Version Switching:**
1. User clicks VersionSwitcher (bottom-right fixed button)
2. `onSwitch(version)` callback fires
3. App state updates to show Version1 or Version2 layout
4. New layout renders with different section components

**State Management:**
- Local state only via `useState()`
- No global state (no Redux, Context, or Zustand)
- State used for: mobile menu toggle, image error handling

## Key Abstractions

**Section Component:**
- Purpose: Self-contained page section (header, hero, services, etc.)
- Examples: `src/app/components/Hero.tsx`, `src/app/components/Services.tsx`
- Pattern: Functional component with optional local state

**UI Primitive:**
- Purpose: Reusable, styled UI element
- Examples: `src/app/components/ui/button.tsx`, `src/app/components/ui/card.tsx`
- Pattern: Radix UI + CVA variants + Tailwind classes

**Version Layout:**
- Purpose: Full page composition of section components
- Examples: `src/app/components/Version1.tsx`, `src/app/components/Version2.tsx`
- Pattern: Composition container that assembles sections

**ImageWithFallback:**
- Purpose: Image with error state handling
- Location: `src/app/components/figma/ImageWithFallback.tsx`
- Pattern: Wraps `<img>` with error fallback to SVG placeholder

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Triggers: Browser navigation
- Responsibilities: Load root div, import main.tsx via Vite

**React Entry:**
- Location: `src/main.tsx`
- Triggers: Script execution
- Responsibilities: Create React root, render App component

**App Root:**
- Location: `src/app/App.tsx`
- Triggers: React render
- Responsibilities: Render Version1 layout by default

## Error Handling

**Strategy:** Minimal - relies on React's built-in error boundaries

**Patterns:**
- Image errors: Caught via `onError` prop in `ImageWithFallback.tsx`
- No try/catch blocks in application code
- No global error boundary configured

## Cross-Cutting Concerns

**Logging:**
- Browser console only
- No structured logging

**Validation:**
- Not implemented - forms have no validation
- Would need: form validation library or custom validation

**Styling:**
- Tailwind CSS utility classes throughout
- Theme variables in `src/styles/theme.css`
- `cn()` utility for conditional classes

**Navigation:**
- Scroll-based using `document.getElementById()` + `scrollIntoView()`
- Section IDs: `#home`, `#services`, `#portfolio`, `#about`, `#contact`

---

*Architecture analysis: 2026-01-09*
*Update when major patterns change*
