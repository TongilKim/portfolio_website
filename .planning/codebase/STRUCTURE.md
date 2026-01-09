# Codebase Structure

**Analysis Date:** 2026-01-09

## Directory Layout

```
Responsive Freelance Webpage/
├── index.html              # HTML entry point
├── vite.config.ts          # Vite build config with @ alias
├── postcss.config.mjs      # PostCSS configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # Lock file
├── README.md               # Setup instructions
├── ATTRIBUTIONS.md         # Credits for shadcn/ui and Unsplash
│
├── src/
│   ├── main.tsx            # React DOM root mount
│   │
│   ├── app/
│   │   ├── App.tsx         # Default app (V1 layout)
│   │   │
│   │   └── components/
│   │       ├── Version1.tsx        # V1 page layout
│   │       ├── Version2.tsx        # V2 page layout
│   │       ├── VersionSwitcher.tsx # V1/V2 toggle button
│   │       │
│   │       ├── Header.tsx          # Navigation header (V1)
│   │       ├── Hero.tsx            # Hero section (V1)
│   │       ├── Services.tsx        # Services cards (V1)
│   │       ├── Portfolio.tsx       # Project gallery (V1)
│   │       ├── About.tsx           # About section (V1)
│   │       ├── Contact.tsx         # Contact form (V1)
│   │       ├── Footer.tsx          # Footer (shared)
│   │       │
│   │       ├── v2/                 # V2 variant components
│   │       │   ├── HeaderV2.tsx
│   │       │   ├── HeroV2.tsx
│   │       │   ├── ServicesV2.tsx
│   │       │   ├── WorkV2.tsx
│   │       │   ├── ContactV2.tsx
│   │       │   └── FooterV2.tsx
│   │       │
│   │       ├── ui/                 # UI component library (50+ files)
│   │       │   ├── button.tsx
│   │       │   ├── card.tsx
│   │       │   ├── input.tsx
│   │       │   ├── badge.tsx
│   │       │   ├── dialog.tsx
│   │       │   ├── form.tsx
│   │       │   ├── tabs.tsx
│   │       │   ├── sidebar.tsx
│   │       │   ├── utils.ts        # cn() utility
│   │       │   ├── use-mobile.ts   # Mobile breakpoint hook
│   │       │   └── ...40+ more UI components
│   │       │
│   │       └── figma/
│   │           └── ImageWithFallback.tsx  # Image error handling
│   │
│   └── styles/
│       ├── index.css       # Main stylesheet entry
│       ├── fonts.css       # Font definitions
│       ├── tailwind.css    # Tailwind directives
│       └── theme.css       # Theme variables
│
└── guidelines/
    └── Guidelines.md       # Project guidelines (template)
```

## Directory Purposes

**src/**
- Purpose: All source code
- Contains: React components, styles, entry point
- Key files: `main.tsx` (entry), `app/App.tsx` (root component)

**src/app/components/**
- Purpose: Page-level section components
- Contains: Header, Hero, Services, Portfolio, About, Contact, Footer
- Key files: `Version1.tsx`, `Version2.tsx` (page layouts)
- Subdirectories: `v2/` (alternate designs), `ui/` (primitives), `figma/` (custom)

**src/app/components/ui/**
- Purpose: Reusable UI component library (shadcn/ui)
- Contains: 50+ atomic components built on Radix UI
- Key files: `button.tsx`, `card.tsx`, `form.tsx`, `utils.ts`

**src/app/components/v2/**
- Purpose: Alternative V2 design variant components
- Contains: HeaderV2, HeroV2, ServicesV2, WorkV2, ContactV2, FooterV2
- Pattern: Same structure as V1 with different styling

**src/app/components/figma/**
- Purpose: Custom components from Figma generation
- Contains: `ImageWithFallback.tsx`

**src/styles/**
- Purpose: Global CSS and theme configuration
- Contains: Tailwind setup, theme variables, fonts
- Key files: `index.css` (entry), `theme.css` (variables)

**guidelines/**
- Purpose: Project documentation and guidelines
- Contains: Guidelines.md (currently template)

## Key File Locations

**Entry Points:**
- `index.html` - HTML shell with root div
- `src/main.tsx` - React DOM initialization

**Configuration:**
- `vite.config.ts` - Build configuration, path alias
- `postcss.config.mjs` - PostCSS plugins
- `package.json` - Dependencies, scripts

**Core Logic:**
- `src/app/App.tsx` - Root component
- `src/app/components/Version1.tsx` - V1 layout composition
- `src/app/components/Version2.tsx` - V2 layout composition

**Styling:**
- `src/styles/index.css` - CSS entry point
- `src/styles/theme.css` - Theme variables (light/dark)
- `src/styles/tailwind.css` - Tailwind directives

**Documentation:**
- `README.md` - Setup and usage
- `ATTRIBUTIONS.md` - Third-party credits

## Naming Conventions

**Files:**
- PascalCase.tsx: React components (`Header.tsx`, `Services.tsx`)
- lowercase.tsx: UI primitives (`button.tsx`, `card.tsx`)
- V2 suffix: Variant components (`HeaderV2.tsx`, `HeroV2.tsx`)
- kebab-case.css: Style files (`index.css`, `theme.css`)

**Directories:**
- lowercase: All directories (`components/`, `ui/`, `styles/`)
- v2/: Variant directory for alternate designs
- figma/: Generated/custom components

**Special Patterns:**
- No barrel files (index.ts) - direct imports
- No `__tests__` directories - no tests exist

## Where to Add New Code

**New Section Component:**
- V1: `src/app/components/{Name}.tsx`
- V2: `src/app/components/v2/{Name}V2.tsx`
- Import in: `Version1.tsx` or `Version2.tsx`

**New UI Primitive:**
- Implementation: `src/app/components/ui/{name}.tsx`
- Follow shadcn/ui patterns with CVA variants

**New Utility:**
- Shared helpers: `src/app/components/ui/utils.ts`
- Custom hooks: `src/app/components/ui/use-{name}.ts`

**New Styles:**
- Global CSS: `src/styles/{name}.css`
- Import in: `src/styles/index.css`

## Special Directories

**src/app/components/ui/**
- Purpose: shadcn/ui component library
- Source: Generated from shadcn CLI or manual additions
- Committed: Yes (customized for project)

**node_modules/**
- Purpose: Dependencies
- Source: pnpm install
- Committed: No (in .gitignore)

**dist/**
- Purpose: Build output
- Source: `pnpm build`
- Committed: No (generated)

---

*Structure analysis: 2026-01-09*
*Update when directory structure changes*
