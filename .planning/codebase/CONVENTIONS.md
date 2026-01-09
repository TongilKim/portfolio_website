# Coding Conventions

**Analysis Date:** 2026-01-09

## Naming Patterns

**Files:**
- PascalCase for React components: `Header.tsx`, `Services.tsx`, `VersionSwitcher.tsx`
- lowercase for UI primitives: `button.tsx`, `card.tsx`, `input.tsx`
- V2 suffix for variants: `HeaderV2.tsx`, `HeroV2.tsx`
- kebab-case for CSS: `index.css`, `theme.css`
- No test files (testing not implemented)

**Functions:**
- camelCase for all functions: `scrollToSection()`, `scrollToContact()`
- handle prefix for event handlers: `handleError()`
- on prefix for callback props: `onSwitch()`
- No async prefix for async functions

**Variables:**
- camelCase for variables: `isMenuOpen`, `didError`
- camelCase for data arrays: `services`, `projects`, `skills`
- UPPER_CASE not used (no module-level constants)

**Types:**
- PascalCase for interfaces: `VersionSwitcherProps`
- Props suffix for component props: `ButtonProps`, `CardProps`
- No I prefix for interfaces

## Code Style

**Formatting:**
- 2-space indentation
- Double quotes for strings and JSX attributes
- Semicolons required
- No explicit Prettier config (inferred from code)

**Linting:**
- No ESLint configuration detected
- No explicit linting rules enforced

## Import Organization

**Order (observed pattern):**
1. React imports (`import { useState } from "react"`)
2. External packages (`import { Button } from "@/components/ui/button"`)
3. Relative imports (`import { cn } from "./utils"`)

**Path Aliases:**
- `@/` maps to `src/` (configured in `vite.config.ts`)
- Used for UI components: `@/components/ui/button`

**Grouping:**
- No strict grouping enforced
- Generally one import per line

## Error Handling

**Patterns:**
- Minimal error handling throughout
- Image errors: `onError` callback in `ImageWithFallback.tsx`
- No try/catch blocks in application code
- No custom error classes

**Error Types:**
- Component-level: Image load failures handled
- Form validation: Not implemented
- API errors: No API calls to handle

## Logging

**Framework:**
- Browser console only
- No structured logging library

**Patterns:**
- No console.log statements in codebase
- No logging utilities

## Comments

**When to Comment:**
- Sparingly used - code is self-documenting
- Configuration comments: `// Alias @ to the src directory` in `vite.config.ts`

**JSDoc/TSDoc:**
- Not used - minimal documentation
- Props typed via TypeScript interfaces

**TODO Comments:**
- None detected in codebase

## Function Design

**Size:**
- Components generally under 100 lines
- Largest: `Contact.tsx` (~110 lines)

**Parameters:**
- Destructured props in function signature
- Example: `function VersionSwitcher({ currentVersion, onSwitch }: VersionSwitcherProps)`

**Return Values:**
- JSX returns for components
- Void for event handlers

## Module Design

**Exports:**
- Named exports preferred: `export function Header()`
- No default exports
- No barrel files (direct imports)

**Component Structure:**
```tsx
// Imports
import { useState } from "react";
import { Icon } from "lucide-react";

// Types (if needed)
interface ComponentProps {
  prop: string;
}

// Component
export function Component({ prop }: ComponentProps) {
  // State
  const [state, setState] = useState(false);

  // Handlers
  const handleClick = () => { ... };

  // Render
  return (
    <div>...</div>
  );
}
```

## Styling Patterns

**Approach:**
- Tailwind CSS utility classes exclusively
- No CSS Modules or styled-components
- `cn()` utility for conditional classes

**Example:**
```tsx
<div className={cn(
  "pt-20 min-h-screen flex items-center",
  isActive && "bg-primary"
)}>
```

**Theme Variables:**
- CSS custom properties in `src/styles/theme.css`
- OKLCH color space for colors
- Light/dark mode via `.dark` class

## React Patterns

**State Management:**
- `useState` for local component state
- No Context API usage
- No global state library

**Event Handling:**
- Inline arrow functions: `onClick={() => scrollToSection("services")}`
- No useCallback optimization

**Lists:**
- Array index as key (anti-pattern present): `key={index}`
- Static data defined inline in components

---

*Convention analysis: 2026-01-09*
*Update when patterns change*
