# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start Vite dev server (port 5173)
pnpm build    # Production build
```

No lint or test commands are configured. Biome was used for formatting (see git history) but no biome.json exists.

## Architecture

This is a React SPA for a freelance web development services website, generated from Figma designs.

**Tech Stack:**
- React 18 + TypeScript + Vite
- Tailwind CSS 4 for styling
- shadcn/ui + Radix UI for components
- react-router-dom for routing (/, /about, /contact, /faq, /process)
- i18next for internationalization (English/Korean, fallback: Korean)
- react-hook-form + Zod for form validation
- Formspree for contact form submission

**Key Patterns:**
- **Dual design variants**: V1 components in `src/app/components/`, V2 variants in `src/app/components/v2/`
- **Page routing + scroll navigation**: Router handles pages, Header has scroll-to-section for single-page sections
- **Path alias**: `@` maps to `src/` (configured in vite.config.ts and tsconfig.json)
- **cn() utility**: Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes

**Directory Structure:**
```
src/
├── app/
│   ├── App.tsx              # Router configuration
│   └── components/
│       ├── Header.tsx       # Main nav with scroll-to-section
│       ├── v2/              # V2 design variant components
│       └── ui/              # shadcn/ui primitives
├── pages/                   # Route page components
├── styles/
│   ├── theme.css            # CSS custom properties (OKLCH colors)
│   └── tailwind.css         # Tailwind directives
├── locales/{en,ko}/         # Translation JSON files
├── i18n.ts                  # i18next setup
└── lib/
    ├── utils.ts             # cn() and utilities
    └── validations/         # Zod schemas
```

**Localization:**
- Use `useTranslation()` hook from react-i18next
- Translation keys in `src/locales/{en,ko}/translation.json`
- Language persisted to localStorage under `i18nextLng` key

## Project Context

- Sales-focused site for freelance web development services
- Target markets: English and Korean-speaking clients
- Contact form submits via Formspree (see `src/config/formspree.ts`)
- Planning documentation in `.planning/` directory

## TDD & Tidy First Principles

Always follow the instructions in plan.md. When I say "go", find the next unmarked test in plan.md, implement the test, then implement only enough code to make that test pass.

### TDD Cycle: Red → Green → Refactor

1. Write a simple failing test for a small increment of functionality
2. Implement the bare minimum to make it pass
3. Run tests to confirm they pass (Green)
4. Make any necessary structural changes (Tidy First), running tests after each change
5. Commit structural changes separately
6. Add another test for the next small increment
7. Repeat until feature is complete

### Tidy First Approach

Separate all changes into two distinct types:
- **STRUCTURAL CHANGES**: Rearranging code without changing behavior (renaming, extracting methods, moving code)
- **BEHAVIORAL CHANGES**: Adding or modifying actual functionality

Never mix structural and behavioral changes in the same commit. Always make structural changes first when both are needed.

### Commit Discipline

Only commit when:
1. ALL tests are passing
2. ALL compiler/linter warnings have been resolved
3. The change represents a single logical unit of work
4. Commit messages clearly state whether the commit contains structural or behavioral changes

### Code Quality Standards

- Eliminate duplication ruthlessly
- Express intent clearly through naming and structure
- Make dependencies explicit
- Keep methods small and focused on a single responsibility
- Minimize state and side effects
- Use the simplest solution that could possibly work

### Refactoring Guidelines

- Refactor only when tests are passing (in the "Green" phase)
- Make one refactoring change at a time
- Run tests after each refactoring step
- Prioritize refactorings that remove duplication or improve clarity
