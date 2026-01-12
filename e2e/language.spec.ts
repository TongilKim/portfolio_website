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

  test('default language is Korean', async ({ page }) => {
    await page.goto('/');

    // Get hero section text - should be Korean by default
    const heroSection = page.locator('#home');
    const heroText = await heroSection.textContent();

    // Check for Korean characters (Hangul)
    expect(heroText).toMatch(/[\uAC00-\uD7AF]/);
  });

  test('switch to English language', async ({ page }) => {
    await page.goto('/');

    // Get hero section text before switch (should be Korean)
    const heroSection = page.locator('#home');
    const koreanText = await heroSection.textContent();

    // Find and click language switcher (button with Globe icon)
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();
    await langSwitcher.click();

    // Wait for translation to apply
    await page.waitForTimeout(500);

    // Verify text has changed
    const englishText = await heroSection.textContent();
    expect(englishText).not.toBe(koreanText);

    // Verify English content is shown
    await expect(page.getByText('Get Started', { exact: false })).toBeVisible();
  });

  test('switch back to Korean', async ({ page }) => {
    await page.goto('/');

    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to English first (default is Korean)
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Verify English
    await expect(page.getByText('Get Started', { exact: false })).toBeVisible();

    // Now switch back to Korean
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Verify Korean content is shown (check hero section for Korean text)
    const heroSection = page.locator('#home');
    const heroText = await heroSection.textContent();
    expect(heroText).toMatch(/[\uAC00-\uD7AF]/); // Contains Korean characters
  });

  test('language persists on page navigation', async ({ page }) => {
    await page.goto('/');

    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to English (default is Korean)
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Navigate to FAQ using desktop nav
    await page.locator('header nav a[href="/faq"]').first().click();
    await page.waitForTimeout(500);

    // Verify English is still active (check for English heading)
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
  });

  test('FAQ page shows content in default Korean', async ({ page }) => {
    await page.goto('/faq');

    // Verify Korean FAQ heading (default language is Korean)
    await expect(page.getByRole('heading', { name: /자주 묻는 질문/i })).toBeVisible();
  });
});
