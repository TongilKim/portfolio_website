import { expect, test } from "@playwright/test";

test.describe("Navigation & Routing", () => {
	// Use desktop viewport for these tests since they use desktop nav
	test.use({ viewport: { width: 1280, height: 720 } });

	test("homepage loads correctly", async ({ page }) => {
		await page.goto("/");

		// Check page title
		await expect(page).toHaveTitle(/John Doe/);

		// Check hero section is visible
		await expect(page.locator("#home")).toBeVisible();

		// Check navigation is present
		await expect(page.locator("header")).toBeVisible();
	});

	test("navigate to FAQ page", async ({ page }) => {
		await page.goto("/");

		// Click FAQ link in desktop navigation
		await page.locator('header nav a[href="/faq"]').first().click();

		// Verify URL changed
		await expect(page).toHaveURL("/faq");

		// Verify FAQ content is visible (actual title is "Frequently Asked Questions")
		await expect(page.locator("h1")).toBeVisible();
		const h1Text = await page.locator("h1").textContent();
		expect(h1Text).toMatch(/Frequently Asked Questions|자주 묻는 질문/i);
	});

	test("navigate to Process page", async ({ page }) => {
		await page.goto("/");

		// Click Process link in desktop nav
		await page.locator('header nav a[href="/process"]').first().click();

		// Verify URL changed
		await expect(page).toHaveURL("/process");

		// Verify Process page content (default is Korean "작업 프로세스", English is "How I Work")
		await expect(page.locator("h1")).toBeVisible();
		const h1Text = await page.locator("h1").textContent();
		expect(h1Text).toMatch(/How I Work|작업 프로세스/i);
	});

	test("navigate to About page", async ({ page }) => {
		await page.goto("/");

		// Click About link in desktop nav
		await page.locator('header nav a[href="/about"]').first().click();

		// Verify URL changed
		await expect(page).toHaveURL("/about");

		// Verify About page content
		await expect(page.locator("h1")).toBeVisible();
	});

	test("browser back/forward buttons work", async ({ page }) => {
		await page.goto("/");
		await page.locator('header nav a[href="/faq"]').first().click();
		await expect(page).toHaveURL("/faq");

		// Go back
		await page.goBack();
		await expect(page).toHaveURL("/");

		// Go forward
		await page.goForward();
		await expect(page).toHaveURL("/faq");
	});

	test("scroll to portfolio section on homepage", async ({ page }) => {
		await page.goto("/");

		// Click portfolio button in nav (it's a button, not a link)
		await page
			.locator(
				'header nav button:has-text("Portfolio"), header nav button:has-text("포트폴리오")',
			)
			.first()
			.click();

		// Wait for smooth scroll
		await page.waitForTimeout(500);

		// Verify portfolio section is in view
		await expect(page.locator("#portfolio")).toBeInViewport();
	});

	test("can navigate home from other pages", async ({ page }) => {
		// Go to FAQ first
		await page.goto("/faq");
		await expect(page).toHaveURL("/faq");

		// Click Home button to go back
		await page
			.locator(
				'header nav button:has-text("Home"), header nav button:has-text("홈")',
			)
			.first()
			.click();

		// Should navigate to home page (full URL check)
		await page.waitForTimeout(300);
		const url = page.url();
		expect(url).toMatch(/\/$|#home$/);
	});
});
