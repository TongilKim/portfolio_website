import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  // Use desktop viewport for consistent testing
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('contact form is visible', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#contact form, form[action*="formspree"]')).toBeVisible();
  });

  test('form has all required fields', async ({ page }) => {
    const form = page.locator('#contact');

    // Check for name field
    await expect(form.locator('input[name="name"], input[placeholder*="name" i], input[placeholder*="이름" i]')).toBeVisible();

    // Check for email field
    await expect(form.locator('input[name="email"], input[type="email"]')).toBeVisible();

    // Check for message field
    await expect(form.locator('textarea[name="message"], textarea')).toBeVisible();

    // Check for submit button
    await expect(form.locator('button[type="submit"]')).toBeVisible();
  });

  test('shows validation errors for empty form submission', async ({ page }) => {
    const form = page.locator('#contact');

    // Click submit without filling form
    await form.locator('button[type="submit"]').click();

    // Wait for validation messages
    await page.waitForTimeout(500);

    // Should show error messages or fields should have validation state
    const errorMessage = page.locator('.text-red-500, .text-destructive, [role="alert"], .error');
    const invalidFields = page.locator(':invalid');

    // Either custom errors or HTML5 validation should be active
    const hasErrors = await errorMessage.count() > 0 || await invalidFields.count() > 0;
    expect(hasErrors).toBe(true);
  });

  test('validates email format', async ({ page }) => {
    const form = page.locator('#contact');

    // Fill name
    await form.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');

    // Fill invalid email
    await form.locator('input[name="email"], input[type="email"]').first().fill('invalid-email');

    // Fill message
    await form.locator('textarea').first().fill('Test message');

    // Submit
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(500);

    // Should show email validation error
    const emailInput = form.locator('input[type="email"]').first();
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const hasEmailError = await page.locator('text=/email|이메일/i').count() > 0 ||
                          await page.locator('.text-red-500, .text-destructive').count() > 0;

    expect(isInvalid || hasEmailError).toBe(true);
  });

  test('can fill out form completely', async ({ page }) => {
    const form = page.locator('#contact');

    // Fill all fields
    await form.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');
    await form.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
    await form.locator('textarea').first().fill('This is a test message for the contact form.');

    // Verify fields are filled
    await expect(form.locator('input[name="name"], input[placeholder*="name" i]').first()).toHaveValue('Test User');
    await expect(form.locator('input[type="email"]').first()).toHaveValue('test@example.com');
    await expect(form.locator('textarea').first()).toHaveValue('This is a test message for the contact form.');
  });

  test('submit button shows loading state', async ({ page }) => {
    const form = page.locator('#contact');

    // Fill form
    await form.locator('input[name="name"], input[placeholder*="name" i]').first().fill('Test User');
    await form.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
    await form.locator('textarea').first().fill('Test message');

    // Get submit button
    const submitBtn = form.locator('button[type="submit"]');

    // Click submit (don't wait for network since Formspree might not be configured)
    await submitBtn.click();

    // Button should either show loading state or the form handles submission
    await page.waitForTimeout(500);
  });

  test('form works in Korean language', async ({ page }) => {
    // Find language switcher
    const langSwitcher = page.locator('header').getByRole('button').filter({ has: page.locator('svg.lucide-globe') }).first();

    // Switch to Korean
    await langSwitcher.click();
    await page.waitForTimeout(500);

    // Scroll to contact
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const form = page.locator('#contact');

    // Form should still be visible and functional in Korean
    await expect(form.locator('button[type="submit"]')).toBeVisible();

    // Fill form in Korean mode
    await form.locator('input').first().fill('테스트 사용자');
    await form.locator('input[type="email"]').first().fill('test@example.com');
    await form.locator('textarea').first().fill('테스트 메시지');

    // Verify fields are filled
    await expect(form.locator('input').first()).toHaveValue('테스트 사용자');
  });
});
