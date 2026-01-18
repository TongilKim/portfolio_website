import { expect, test } from "@playwright/test";

// Helper to wait for intro animation to complete on homepage
async function waitForIntroAnimation(page: import("@playwright/test").Page) {
	const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
	await introOverlay.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
}

test.describe("Contact Form", () => {
	// Use desktop viewport for consistent testing
	test.use({ viewport: { width: 1280, height: 720 } });

	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		// Wait for intro animation to complete
		await waitForIntroAnimation(page);
		// Scroll to contact section
		await page.locator("#contact").scrollIntoViewIfNeeded();
	});

	test("contact form is visible", async ({ page }) => {
		await expect(page.locator("#contact")).toBeVisible();
		await expect(
			page.locator('#contact form, form[action*="formspree"]'),
		).toBeVisible();
	});

	test("form has all required fields", async ({ page }) => {
		const form = page.locator("#contact");

		// Check for name field
		await expect(
			form.locator(
				'input[name="name"], input[placeholder*="name" i], input[placeholder*="이름" i]',
			),
		).toBeVisible();

		// Check for email field
		await expect(
			form.locator('input[name="email"], input[type="email"]'),
		).toBeVisible();

		// Check for message field
		await expect(
			form.locator('textarea[name="message"], textarea'),
		).toBeVisible();

		// Check for submit button
		await expect(form.locator('button[type="submit"]')).toBeVisible();
	});

	test("submit button is disabled when form is empty", async ({ page }) => {
		const form = page.locator("#contact");

		// Button should be disabled when form is empty
		const submitBtn = form.locator('button[type="submit"]');
		await expect(submitBtn).toBeDisabled();
	});

	test("validates email format", async ({ page }) => {
		const form = page.locator("#contact");

		// Fill name
		await form
			.locator('input[name="name"], input[placeholder*="name" i]')
			.first()
			.fill("Test User");

		// Fill invalid email and blur
		const emailField = form
			.locator('input[name="email"], input[type="email"]')
			.first();
		await emailField.fill("invalid-email");
		await emailField.blur();

		// Wait for validation to run
		await page.waitForTimeout(300);

		// Should show email validation error
		const hasEmailError =
			(await page.locator(".text-red-600, .text-red-500").count()) > 0;
		expect(hasEmailError).toBe(true);
	});

	test("can fill out form completely", async ({ page }) => {
		const form = page.locator("#contact");

		// Fill all fields
		await form
			.locator('input[name="name"], input[placeholder*="name" i]')
			.first()
			.fill("Test User");
		await form
			.locator('input[name="email"], input[type="email"]')
			.first()
			.fill("test@example.com");

		// Fill project type (if exists - V1 form only)
		const projectField = form.locator('input[name="projectType"]');
		if ((await projectField.count()) > 0) {
			await projectField.first().fill("Website");
		}

		await form
			.locator("textarea")
			.first()
			.fill("This is a test message for the contact form.");

		// Verify fields are filled
		await expect(
			form.locator('input[name="name"], input[placeholder*="name" i]').first(),
		).toHaveValue("Test User");
		await expect(form.locator('input[type="email"]').first()).toHaveValue(
			"test@example.com",
		);
		await expect(form.locator("textarea").first()).toHaveValue(
			"This is a test message for the contact form.",
		);
	});

	test("submit button is enabled after filling form", async ({ page }) => {
		const form = page.locator("#contact");
		const submitBtn = form.locator('button[type="submit"]');

		// Button should be disabled initially
		await expect(submitBtn).toBeDisabled();

		// Use pressSequentially (slower but more reliable for React)
		const nameField = form
			.locator('input[name="name"], input[placeholder*="name" i]')
			.first();
		await nameField.click();
		await nameField.pressSequentially("Test User", { delay: 10 });

		const emailField = form
			.locator('input[name="email"], input[type="email"]')
			.first();
		await emailField.click();
		await emailField.pressSequentially("test@example.com", { delay: 10 });

		// Fill project type (if exists - V1 form only)
		const projectField = form.locator('input[name="projectType"]');
		if ((await projectField.count()) > 0) {
			await projectField.first().click();
			await projectField
				.first()
				.pressSequentially("Website Project", { delay: 10 });
		}

		const messageField = form.locator("textarea").first();
		await messageField.click();
		await messageField.pressSequentially(
			"This is a test message for the form.",
			{ delay: 5 },
		);

		// Wait for React to process form updates
		await page.waitForTimeout(300);

		// Button should now be enabled
		await expect(submitBtn).toBeEnabled();
	});

	test("form works in Korean language", async ({ page }) => {
		// Default is already Korean, so just verify the form works
		const form = page.locator("#contact");

		// Form should be visible and functional
		await expect(form.locator('button[type="submit"]')).toBeVisible();

		// Fill form in Korean mode
		await form
			.locator('input[name="name"], input[placeholder*="name" i]')
			.first()
			.fill("테스트 사용자");
		await form.locator('input[type="email"]').first().fill("test@example.com");
		await form
			.locator("textarea")
			.first()
			.fill("테스트 메시지입니다. 연락 양식을 테스트합니다.");

		// Verify fields are filled
		await expect(
			form.locator('input[name="name"], input[placeholder*="name" i]').first(),
		).toHaveValue("테스트 사용자");
	});
});
