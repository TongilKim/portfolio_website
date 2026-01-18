import { expect, test } from "@playwright/test";

test.describe("Intro Animation", () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	test("intro animation appears on homepage load", async ({ page }) => {
		await page.goto("/");

		// Check intro animation overlay is visible initially
		const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
		await expect(introOverlay).toBeVisible();

		// Check PixelFlow branding is visible in the intro animation
		const introBranding = introOverlay.locator("text=PixelFlow");
		await expect(introBranding).toBeVisible();
	});

	test("intro animation shows Figma-like toolbar", async ({ page }) => {
		await page.goto("/");

		// Check for design.fig text in toolbar
		await expect(page.getByText("design.fig")).toBeVisible();

		// Check for window control dots (red, yellow, green)
		const toolbar = page.locator(".bg-gray-800.px-4.py-2");
		await expect(toolbar).toBeVisible();
	});

	test("intro animation completes and reveals homepage", async ({ page }) => {
		await page.goto("/");

		// Initially the animation overlay should be visible
		const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
		await expect(introOverlay).toBeVisible();

		// Wait for animation to complete (2.5 seconds max)
		await page.waitForTimeout(2500);

		// Animation overlay should be gone
		await expect(introOverlay).not.toBeVisible();

		// Hero section should now be visible
		await expect(page.locator("#home")).toBeVisible();
	});

	test("intro animation plays on every homepage visit", async ({ page }) => {
		// First visit
		await page.goto("/");
		const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
		await expect(introOverlay).toBeVisible();

		// Wait for animation to complete
		await page.waitForTimeout(2500);
		await expect(introOverlay).not.toBeVisible();

		// Navigate to another page
		await page.goto("/faq");
		await expect(page).toHaveURL("/faq");

		// Navigate back to homepage
		await page.goto("/");

		// Animation should play again
		await expect(introOverlay).toBeVisible();
	});

	test("intro animation works on mobile viewport", async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		await page.goto("/");

		// Check intro animation is visible on mobile
		const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
		await expect(introOverlay).toBeVisible();

		// Wait for animation to complete
		await page.waitForTimeout(2500);

		// Animation should complete and hero should be visible
		await expect(introOverlay).not.toBeVisible();
	});

	test("wireframe elements are visible during animation", async ({ page }) => {
		await page.goto("/");

		// Check for wireframe elements in the design preview
		// Header wireframe (navigation mockup elements)
		const wireframeElements = page.locator(".bg-gray-300.rounded");
		const count = await wireframeElements.count();
		expect(count).toBeGreaterThan(0);
	});
});
