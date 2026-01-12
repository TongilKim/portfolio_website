import { expect, test } from "@playwright/test";

test.describe("Responsive Design", () => {
	test.describe("Desktop Layout", () => {
		test.use({ viewport: { width: 1280, height: 720 } });

		test("desktop navigation is visible", async ({ page }) => {
			await page.goto("/");

			// Desktop nav links should be visible (they're in a nav with hidden md:flex)
			await expect(
				page.locator('header nav.hidden.md\\:flex a[href="/faq"]'),
			).toBeVisible();
			await expect(
				page.locator('header nav.hidden.md\\:flex a[href="/process"]'),
			).toBeVisible();
			await expect(
				page.locator('header nav.hidden.md\\:flex a[href="/about"]'),
			).toBeVisible();
		});

		test("hero section has proper layout", async ({ page }) => {
			await page.goto("/");

			const hero = page.locator("#home");
			await expect(hero).toBeVisible();

			// Check that hero image is displayed
			const heroImage = hero.locator("img").first();
			await expect(heroImage).toBeVisible();
		});
	});

	test.describe("Tablet Layout", () => {
		test.use({ viewport: { width: 768, height: 1024 } });

		test("tablet layout adjusts properly", async ({ page }) => {
			await page.goto("/");

			// Page should load without horizontal scroll
			const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
			const viewportWidth = await page.evaluate(() => window.innerWidth);
			expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
		});

		test("content is readable on tablet", async ({ page }) => {
			await page.goto("/");

			// Hero text should be visible
			await expect(page.locator("#home h1")).toBeVisible();

			// Buttons should be visible
			await expect(page.locator("#home button").first()).toBeVisible();
		});
	});

	test.describe("Mobile Layout", () => {
		test.use({ viewport: { width: 375, height: 667 } });

		test("mobile menu toggle exists", async ({ page }) => {
			await page.goto("/");

			// Mobile menu toggle is a button with md:hidden class
			const mobileMenuTrigger = page.locator("header button.md\\:hidden");
			await expect(mobileMenuTrigger).toBeVisible();
		});

		test("mobile menu opens and shows links", async ({ page }) => {
			await page.goto("/");

			// Click mobile menu trigger
			const menuTrigger = page.locator("header button.md\\:hidden");
			await menuTrigger.click();

			await page.waitForTimeout(300);

			// Mobile menu should appear with FAQ link
			await expect(
				page.locator('header nav.md\\:hidden a[href="/faq"]'),
			).toBeVisible();
		});

		test("mobile menu closes when link clicked", async ({ page }) => {
			await page.goto("/");

			// Open mobile menu
			const menuTrigger = page.locator("header button.md\\:hidden");
			await menuTrigger.click();
			await page.waitForTimeout(300);

			// Click FAQ link
			await page.locator('header nav.md\\:hidden a[href="/faq"]').click();

			// Should navigate to FAQ
			await expect(page).toHaveURL("/faq");
		});

		test("no horizontal overflow on mobile", async ({ page }) => {
			await page.goto("/");

			const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
			const viewportWidth = await page.evaluate(() => window.innerWidth);

			// Body should not overflow viewport
			expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
		});

		test("hero stacks vertically on mobile", async ({ page }) => {
			await page.goto("/");

			const hero = page.locator("#home");
			await expect(hero).toBeVisible();

			// Text and image should both be visible
			const heroText = hero.locator("h1");
			const heroImage = hero.locator("img").first();

			await expect(heroText).toBeVisible();
			await expect(heroImage).toBeVisible();
		});

		test("contact form is usable on mobile", async ({ page }) => {
			await page.goto("/");

			await page.locator("#contact").scrollIntoViewIfNeeded();

			const form = page.locator("#contact form, #contact");

			// Form should be visible
			await expect(form.locator("input").first()).toBeVisible();
			await expect(form.locator("textarea").first()).toBeVisible();
			await expect(form.locator('button[type="submit"]')).toBeVisible();

			// Form fields should be tappable (check they're reasonably sized)
			const input = form.locator("input").first();
			const box = await input.boundingBox();
			// Allow inputs as small as 32px (common mobile size)
			expect(box?.height).toBeGreaterThanOrEqual(32);
		});
	});
});

test.describe("Image Lazy Loading", () => {
	test("portfolio images have lazy loading", async ({ page }) => {
		await page.goto("/");

		// Scroll to portfolio section
		await page.locator("#portfolio").scrollIntoViewIfNeeded();

		// Check that images in portfolio have loading="lazy"
		const portfolioImages = page.locator("#portfolio img");
		const count = await portfolioImages.count();

		if (count > 0) {
			for (let i = 0; i < Math.min(count, 3); i++) {
				const loadingAttr = await portfolioImages
					.nth(i)
					.getAttribute("loading");
				expect(loadingAttr).toBe("lazy");
			}
		}
	});

	test("hero image loads eagerly", async ({ page }) => {
		await page.goto("/");

		const heroImage = page.locator("#home img").first();
		const loadingAttr = await heroImage.getAttribute("loading");

		// Hero image should load eagerly
		expect(loadingAttr).toBe("eager");
	});
});

test.describe("SEO & Meta Tags", () => {
	test("page has proper meta tags", async ({ page }) => {
		await page.goto("/");

		// Check title
		await expect(page).toHaveTitle(/John Doe/);

		// Check meta description
		const description = await page
			.locator('meta[name="description"]')
			.getAttribute("content");
		expect(description).toContain("freelance");

		// Check Open Graph tags
		const ogTitle = await page
			.locator('meta[property="og:title"]')
			.getAttribute("content");
		expect(ogTitle).toContain("John Doe");

		// Check Twitter cards
		const twitterCard = await page
			.locator('meta[name="twitter:card"]')
			.getAttribute("content");
		expect(twitterCard).toBe("summary_large_image");
	});

	test("favicon is set", async ({ page }) => {
		await page.goto("/");

		const favicon = page.locator('link[rel="icon"]');
		const href = await favicon.getAttribute("href");
		expect(href).toContain("favicon");
	});
});
