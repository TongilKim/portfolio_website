# Testing Patterns

**Analysis Date:** 2026-01-09

## Test Framework

**Runner:**
- Not configured - No test framework installed

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test commands available
# Suggested future setup:
pnpm test              # Run all tests (not configured)
pnpm test:coverage     # Coverage report (not configured)
```

## Test File Organization

**Location:**
- No test files exist in the codebase
- No `__tests__` directories
- No `*.test.ts` or `*.spec.ts` files

**Suggested Structure (if implemented):**
```
src/
  app/
    components/
      Header.tsx
      Header.test.tsx      # Co-located tests
      ui/
        button.tsx
        button.test.tsx
```

## Test Structure

**Not Implemented**

Recommended pattern if tests are added:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render correctly', () => {
      render(<ComponentName />);
      expect(screen.getByText('...')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should handle click', () => {
      // test code
    });
  });
});
```

## Mocking

**Not Implemented**

Suggested approach if testing is added:

- Mock `document.getElementById` for scroll tests
- Mock image loading for `ImageWithFallback` tests
- Use MSW for any future API mocking

## Fixtures and Factories

**Not Implemented**

Suggested location: `src/__fixtures__/` or inline in test files

## Coverage

**Requirements:**
- No coverage requirements defined
- No coverage tooling configured

**Suggested Setup:**
```bash
# Add to package.json scripts:
"test": "vitest",
"test:coverage": "vitest --coverage"
```

## Test Types

**Unit Tests:**
- Not implemented
- Would test: individual components, utilities, hooks

**Integration Tests:**
- Not implemented
- Would test: form submission flow, navigation behavior

**E2E Tests:**
- Not implemented
- Would use: Playwright or Cypress for full user flows

## Critical Untested Areas

**High Priority:**
1. Contact form submission (`src/app/components/Contact.tsx`)
2. Contact form V2 (`src/app/components/v2/ContactV2.tsx`)
3. Scroll navigation (`scrollToSection` in Header components)
4. Mobile menu toggle (`src/app/components/Header.tsx`)

**Medium Priority:**
5. Image fallback behavior (`src/app/components/figma/ImageWithFallback.tsx`)
6. Version switching (`src/app/components/VersionSwitcher.tsx`)

**Lower Priority:**
7. UI component variants (buttons, cards, inputs)
8. Theme switching (if using next-themes)

## Recommended Test Setup

**Dependencies to Add:**
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^22.0.0"
  }
}
```

**Configuration (`vitest.config.ts`):**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

---

*Testing analysis: 2026-01-09*
*Update when test framework is configured*
