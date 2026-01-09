import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  // Use desktop viewport for consistent testing
  test.use({ viewport: { width: 1280, height: 720 } });

  test('language switcher is visible', async ({ page }) => {
    await page.goto('/');

    // Language switcher is a button with Globe icon in the header
    // Look for button that contains text like "English" or "한국어"
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg') });
    await expect(langSwitcher.first()).toBeVisible();
  });

  test('switch to Korean language', async ({ page }) => {
    await page.goto('/');

    // Get hero section text before switch
    const heroSection = page.locator('#home');
    const englishText = await heroSection.textContent();

    // Find and click language switcher (button with Globe icon)
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();
    await langSwitcher.click();

    // Wait for translation to apply
    await page.waitForTimeout(500);

    // Verify text has changed (contains Korean characters)
    const koreanText = await heroSection.textContent();
    expect(koreanText).not.toBe(englishText);

    // Check for Korean characters (Hangul)
    expect(koreanText).toMatch(/[\uAC00-\uD7AF]/);
  });

  test('switch back to English', async ({ page }) => {
    await page.goto('/');

    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to Korean first
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Now switch back to English
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Verify English content is shown
    await expect(page.getByText('Get Started', { exact: false })).toBeVisible();
  });

  test('language persists on page navigation', async ({ page }) => {
    await page.goto('/');

    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to Korean
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Navigate to FAQ using desktop nav
    await page.locator('header nav a[href="/faq"]').first().click();
    await page.waitForTimeout(500);

    // Verify Korean is still active (check for Korean text on FAQ page)
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toMatch(/[\uAC00-\uD7AF]/); // Contains Korean characters
  });

  test('FAQ page shows Korean questions when switched', async ({ page }) => {
    await page.goto('/faq');

    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to Korean
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Verify Korean FAQ heading
    await expect(page.getByRole('heading', { name: /자주 묻는 질문/i })).toBeVisible();
  });
});
