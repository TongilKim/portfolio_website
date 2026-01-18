import { expect, test } from "@playwright/test";

// Helper to wait for intro animation to complete on homepage
async function waitForIntroAnimation(page: import("@playwright/test").Page) {
	const introOverlay = page.locator(".fixed.inset-0.z-50.bg-gray-900");
	await introOverlay.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
}

test.describe("KakaoTalk Chat Button", () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	test.describe("Korean language", () => {
		test.beforeEach(async ({ page }) => {
			// Set Korean language via localStorage before navigating
			await page.addInitScript(() => {
				localStorage.setItem("i18nextLng", "ko");
			});
			await page.goto("/");
			// Wait for intro animation to complete
			await waitForIntroAnimation(page);
		});

		test("floating button is visible in Korean", async ({ page }) => {
			const floatingButton = page.locator(
				'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(floatingButton).toBeVisible();
		});

		test("floating button has correct styling", async ({ page }) => {
			const floatingButton = page.locator(
				'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);

			// Check it has the yellow Kakao color
			await expect(floatingButton).toHaveCSS(
				"background-color",
				"rgb(254, 229, 0)",
			);
		});

		test("floating button opens in new tab", async ({ page }) => {
			const floatingButton = page.locator(
				'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);

			await expect(floatingButton).toHaveAttribute("target", "_blank");
			await expect(floatingButton).toHaveAttribute(
				"rel",
				"noopener noreferrer",
			);
		});

		test("kakao button is visible in contact section", async ({ page }) => {
			// Scroll to contact section
			await page.locator("#contact").scrollIntoViewIfNeeded();

			// Should have kakao button in the contact section
			const contactSection = page.locator("#contact");
			const kakaoButton = contactSection.locator(
				'a[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(kakaoButton).toBeVisible();
		});

		test("kakao button is visible on contact page", async ({ page }) => {
			await page.goto("/contact");

			// Should have kakao button on contact page (in the card, not just floating)
			const mainContent = page.locator("main");
			const kakaoButton = mainContent.locator(
				'a[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(kakaoButton).toBeVisible();
		});
	});

	test.describe("English language", () => {
		test.beforeEach(async ({ page }) => {
			// Set English language via localStorage before navigating
			await page.addInitScript(() => {
				localStorage.setItem("i18nextLng", "en");
			});
			await page.goto("/");
			// Wait for intro animation to complete
			await waitForIntroAnimation(page);
		});

		test("floating button is hidden in English", async ({ page }) => {
			// Floating button should not be visible
			const floatingButton = page.locator(
				'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(floatingButton).toHaveCount(0);
		});

		test("kakao button is hidden in contact section", async ({ page }) => {
			// Scroll to contact section
			await page.locator("#contact").scrollIntoViewIfNeeded();

			// Should not have kakao card in the contact section
			const contactSection = page.locator("#contact");
			const kakaoButton = contactSection.locator(
				'a[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(kakaoButton).toHaveCount(0);
		});

		test("kakao button is hidden on contact page", async ({ page }) => {
			await page.goto("/contact");

			// Should not have kakao button on contact page
			const mainContent = page.locator("main");
			const kakaoButton = mainContent.locator(
				'a[href="https://open.kakao.com/o/sL7Kr6bi"]',
			);
			await expect(kakaoButton).toHaveCount(0);
		});
	});

	test("language switch toggles kakao button visibility", async ({ page }) => {
		// Start with Korean
		await page.addInitScript(() => {
			localStorage.setItem("i18nextLng", "ko");
		});
		await page.goto("/");
		// Wait for intro animation to complete
		await waitForIntroAnimation(page);

		// Button should be visible in Korean
		let floatingButton = page.locator(
			'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
		);
		await expect(floatingButton).toBeVisible();

		// Click language switcher button to toggle to English
		// The switcher shows current language and toggles on click
		const langButton = page.locator('button:has(svg.lucide-globe)');
		await langButton.click();
		await page.waitForTimeout(300);

		// Button should be hidden in English
		floatingButton = page.locator(
			'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
		);
		await expect(floatingButton).toHaveCount(0);

		// Click again to switch back to Korean
		await langButton.click();
		await page.waitForTimeout(300);

		// Button should be visible again
		floatingButton = page.locator(
			'a.fixed[href="https://open.kakao.com/o/sL7Kr6bi"]',
		);
		await expect(floatingButton).toBeVisible();
	});
});
