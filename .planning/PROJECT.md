# Responsive Freelance Webpage

## What This Is

A sales-focused freelance web development service website where customers can browse website packages and purchase web development services. Built with React and TypeScript, featuring service showcases, pricing, and payment integration. Supports multiple languages for international customers.

## Core Value

Convert visitors into paying customers by clearly presenting web development service packages and enabling seamless purchases.

## Requirements

### Validated

<!-- Shipped and confirmed working in existing codebase. -->

- [x] Responsive hero section with call-to-action
- [x] Services showcase with card-based layout
- [x] Portfolio/work gallery section
- [x] About section with skills display
- [x] Contact form UI (captures name, email, message)
- [x] Smooth scroll navigation between sections
- [x] Mobile-responsive navigation with hamburger menu
- [x] Version switcher (V1/V2 design variants)
- [x] Light/dark theme support (via CSS variables)
- [x] Image fallback handling for failed loads

### Active

<!-- Current scope. Building toward these. -->

- [ ] Localization support (English + Korean)
- [ ] Replace placeholder content with real business data
- [ ] Contact form submission handler for quote requests
- [ ] Form input validation
- [ ] Pricing/packages page (custom quotes model)
- [ ] Additional pages as needed (About detail, FAQ, Process, etc.)

### Out of Scope

- Payment integration — Deferred to future milestone (custom quotes model first)
- User authentication — No user accounts needed for quote requests
- CMS integration — Content managed in code for now
- Database — Static site, no dynamic data storage
- E-commerce/cart — Custom quotes, not self-service purchases

## Context

**Business Goal:** Sales-focused website for freelance web development services. Customers browse services, view portfolio, and request custom quotes via contact form. Target market includes both English and Korean speaking clients.

**Origin:** Generated from Figma designs using Figma Make/Dev Mode export (`@figma/my-make-file`).

**Current State:**
- Full UI implementation with two design variants (V1/V2)
- 50+ shadcn/ui components available
- All content is placeholder/demo data needing replacement
- Contact form captures input but has no submission logic
- No localization support yet
- No test coverage (0%)

**Technical Debt (from codebase analysis):**
- Code duplication between V1 and V2 components
- Array index used as React key in list renders
- Hardcoded placeholder emails and phone numbers

**Known Issues:**
- Contact form is non-functional (see `.planning/codebase/CONCERNS.md`)

## Constraints

- **Tech Stack**: React 18 + TypeScript + Vite — Established, don't migrate
- **Styling**: Tailwind CSS 4 + shadcn/ui — Existing pattern, maintain consistency
- **Package Manager**: pnpm — Lock file exists, continue using
- **No Backend**: Static deployment — Any form handling needs external service
- **Browser Support**: Modern browsers only — No IE11 or legacy concerns

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| English + Korean localization | Target market includes Korean clients | — Pending |
| Custom quotes model | No fixed pricing, personalized service approach | — Pending |
| Payment integration deferred | Focus on content and localization first | — Pending |
| shadcn/ui component library | Generated from Figma with Radix UI base | ✓ Good |
| Scroll-based navigation | SPA without router, simpler for portfolio | ✓ Good |

---
*Last updated: 2026-01-09 after project scope clarification*
