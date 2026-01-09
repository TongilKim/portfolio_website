# Roadmap: Responsive Freelance Webpage

## Overview

Transform the Figma-generated portfolio template into a production-ready bilingual (English/Korean) sales website for freelance web development services. Starting with internationalization infrastructure, then localizing content, enabling functional contact forms for quote requests, adding dedicated service/pricing pages, and polishing for launch.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Localization Foundation** - Set up i18n infrastructure for English + Korean
- [x] **Phase 2: Content Localization** - Translate all UI text and replace placeholder content
- [x] **Phase 3: Contact Form Functionality** - Add form validation and submission handler
- [x] **Phase 4: Services & Pricing Page** - Enhance Services section with CTA-focused cards
- [ ] **Phase 5: Additional Pages** - FAQ, Process/How It Works, detailed About page
- [ ] **Phase 6: Polish & Optimization** - Image optimization, SEO meta tags, final QA

## Phase Details

### Phase 1: Localization Foundation
**Goal**: Set up i18n infrastructure with language switcher and translation file structure
**Depends on**: Nothing (first phase)
**Research**: Completed (react-i18next selected)
**Plans**: 2

Plans:
- [x] 01-01: Install and configure i18n library
- [x] 01-02: Create language switcher component

### Phase 2: Content Localization
**Goal**: Translate all UI text to Korean and replace placeholder content with real business data
**Depends on**: Phase 1
**Research**: Not needed
**Plans**: 3

Plans:
- [x] 02-01: Extract hardcoded text to translation files
- [x] 02-02: Add Korean translations
- [x] 02-03: Replace placeholder business data (kept placeholders per user decision)

### Phase 3: Contact Form Functionality
**Goal**: Working contact form with validation that sends quote requests
**Depends on**: Phase 2
**Research**: Complete (Formspree selected)
**Research findings**:
- **Email service**: Formspree (best for static sites, no backend required, built-in spam protection)
- **Form validation**: react-hook-form + Zod + @hookform/resolvers
- **Alternatives considered**: EmailJS (exposes API keys), Resend (requires backend)
- **Free tier**: 50 submissions/month (sufficient for freelance portfolio)
**Plans**: 2

Plans:
- [x] 03-01: Add form validation with Zod + react-hook-form (client-side validation, bilingual errors)
- [x] 03-02: Integrate Formspree for email submission (API integration, loading/success/error states)

### Phase 4: Services & Pricing Page
**Goal**: Enhance Services section with CTA-focused project type cards
**Depends on**: Phase 3
**Research**: Not needed (internal UI work)
**Plans**: 1

Plans:
- [x] 04-01: Enhance Services section with CTA-focused cards (project types, "ideal for" descriptions, quote CTAs)

### Phase 5: Additional Pages
**Goal**: Information hub with separate FAQ, Process, and About pages
**Depends on**: Phase 4
**Research**: Complete (routing patterns explored)
**Plans**: 3

Plans:
- [x] 05-01: Add routing infrastructure and create FAQ page (accordion-style, bilingual)
- [ ] 05-02: Create Process/How It Works page (visual step-by-step, client experience)
- [ ] 05-03: Enhance About page (dedicated page with expanded content)

### Phase 6: Polish & Optimization
**Goal**: Production-ready site with optimized performance and SEO
**Depends on**: Phase 5
**Research**: Unlikely (standard patterns)
**Plans**: TBD

Plans:
- [ ] 06-01: Image optimization and lazy loading
- [ ] 06-02: SEO meta tags and Open Graph
- [ ] 06-03: Final QA and cross-browser testing

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Localization Foundation | 2/2 | Complete | 2026-01-09 |
| 2. Content Localization | 3/3 | Complete | 2026-01-09 |
| 3. Contact Form Functionality | 2/2 | Complete | 2026-01-09 |
| 4. Services & Pricing Page | 1/1 | Complete | 2026-01-09 |
| 5. Additional Pages | 1/3 | In progress | - |
| 6. Polish & Optimization | 0/3 | Not started | - |
