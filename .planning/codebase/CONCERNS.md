# Codebase Concerns

**Analysis Date:** 2026-01-09

## Tech Debt

**Contact forms have no submission handling:**
- Issue: Forms capture input but never submit data anywhere
- Files: `src/app/components/Contact.tsx`, `src/app/components/v2/ContactV2.tsx`
- Why: Static site template - backend not implemented
- Impact: Contact form is non-functional, users cannot send messages
- Fix approach: Add form submission handler with API endpoint or email service (e.g., Formspree, SendGrid)

**Code duplication between V1 and V2 components:**
- Issue: Nearly identical logic duplicated across version variants
- Files:
  - `src/app/components/Header.tsx` vs `src/app/components/v2/HeaderV2.tsx`
  - `src/app/components/Hero.tsx` vs `src/app/components/v2/HeroV2.tsx`
  - `src/app/components/Services.tsx` vs `src/app/components/v2/ServicesV2.tsx`
  - `src/app/components/Contact.tsx` vs `src/app/components/v2/ContactV2.tsx`
- Why: Generated from Figma with separate layouts
- Impact: Bug fixes must be applied in multiple places; maintenance burden
- Fix approach: Extract shared logic into hooks/utilities, use theme variants for styling differences

**Array index used as React key:**
- Issue: Using `key={index}` in list renders
- Files:
  - `src/app/components/Services.tsx` (services list)
  - `src/app/components/Portfolio.tsx` (projects list)
  - `src/app/components/About.tsx` (skills list)
  - `src/app/components/v2/ServicesV2.tsx`
  - `src/app/components/v2/WorkV2.tsx`
- Why: Quick implementation without stable IDs
- Impact: Performance issues, incorrect re-renders if lists change
- Fix approach: Add unique `id` field to data objects, use as key

## Known Bugs

**None explicitly marked in code**

No TODO, FIXME, or BUG comments found in codebase.

## Security Considerations

**Non-null assertion without safety check:**
- Risk: App crashes if root element missing
- File: `src/main.tsx` (line 6: `document.getElementById("root")!`)
- Current mitigation: None
- Recommendations: Add null check with descriptive error message

**Form inputs lack validation:**
- Risk: If connected to backend, could accept malicious input
- Files: `src/app/components/Contact.tsx`, `src/app/components/v2/ContactV2.tsx`
- Current mitigation: Forms don't submit (no backend)
- Recommendations: Add input validation before any backend integration

**Hardcoded placeholder content:**
- Risk: Demo content could be deployed to production accidentally
- Files: Contact info in `src/app/components/Contact.tsx`, `src/app/components/v2/ContactV2.tsx`
  - "hello@webcraft.com"
  - "+1 (555) 123-4567"
  - "john@example.com"
- Current mitigation: None
- Recommendations: Move to environment variables or constants file

## Performance Bottlenecks

**No performance optimizations applied:**
- Problem: Inline arrow functions recreated on every render
- Files: All components with `onClick={() => scrollToSection(...)}`
- Measurement: Not profiled (likely minor impact for static site)
- Cause: Generated code pattern, no optimization pass
- Improvement path: Add `useCallback` for handlers if performance issues arise

**External images without optimization:**
- Problem: Unsplash images loaded without lazy loading or responsive sizes
- Files: `src/app/components/Hero.tsx`, `src/app/components/Portfolio.tsx`
- Measurement: Could impact LCP (Largest Contentful Paint)
- Cause: Direct image URLs without optimization
- Improvement path: Add `loading="lazy"`, use `srcset` for responsive images, or use image CDN

## Fragile Areas

**Scroll navigation relies on element IDs:**
- Why fragile: Navigation breaks silently if section ID is misspelled or removed
- Files: `src/app/components/Header.tsx`, `src/app/components/Hero.tsx`, V2 variants
- Common failures: Typo in ID string breaks navigation with no error
- Safe modification: Keep section IDs in constants file, verify IDs exist
- Test coverage: None

**ImageWithFallback error handling:**
- File: `src/app/components/figma/ImageWithFallback.tsx`
- Why fragile: Relies on `onError` event which may not fire in all scenarios
- Safe modification: Add loading state, test with network conditions
- Test coverage: None

## Scaling Limits

**Static content only:**
- Current capacity: Unlimited (static files)
- Limit: N/A for current architecture
- Note: If dynamic features added, would need backend infrastructure

## Dependencies at Risk

**No critical risks identified**

All dependencies are current as of early 2026:
- React 18.3.1 (stable)
- Vite 6.3.5 (current)
- Tailwind 4.1.12 (current)
- Radix UI packages (actively maintained)

## Missing Critical Features

**Form submission:**
- Problem: Contact form captures data but doesn't send it
- Current workaround: None (form is non-functional)
- Blocks: User inquiries, lead generation
- Implementation complexity: Low - needs API endpoint or service integration

**Input validation:**
- Problem: No form validation
- Current workaround: N/A (forms don't submit)
- Blocks: Production deployment with working forms
- Implementation complexity: Low - add react-hook-form validation or Zod schemas

## Test Coverage Gaps

**No test coverage:**
- What's not tested: Entire codebase (0% coverage)
- Risk: Any change could break functionality unnoticed
- Priority: High
- Difficulty to test: Low - standard React testing patterns apply

**Critical paths needing tests:**
1. Form input and submission flow
2. Navigation scroll behavior
3. Mobile menu toggle
4. Image fallback behavior
5. Version switching

## Documentation Gaps

**Scroll pattern undocumented:**
- Files: Header, Hero, and V2 variants
- Issue: `scrollToSection()` pattern copied across files without explanation
- Recommendation: Add comment explaining ID naming convention

**Guidelines.md is empty template:**
- File: `guidelines/Guidelines.md`
- Issue: Contains placeholder content, not actual guidelines
- Recommendation: Fill in project-specific coding guidelines

## Missing Configuration

**No environment template:**
- Issue: No `.env.example` file
- Impact: Unclear what configuration is needed for deployment
- Recommendation: Add `.env.example` even if currently empty

**No linting configuration:**
- Issue: No ESLint or Prettier config
- Impact: Code style inconsistencies possible
- Recommendation: Add ESLint + Prettier configuration

---

*Concerns audit: 2026-01-09*
*Update as issues are fixed or new ones discovered*
