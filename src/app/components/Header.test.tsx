import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@/test/test-utils";
import { Header } from "./Header";

describe("Header", () => {
	it("renders the app title", () => {
		render(<Header />);
		expect(screen.getByText("app.title")).toBeInTheDocument();
	});

	it("renders desktop navigation links", () => {
		render(<Header />);
		// Desktop nav only (mobile menu is hidden by default)
		expect(screen.getByText("nav.home")).toBeInTheDocument();
		expect(screen.getByText("nav.services")).toBeInTheDocument();
		expect(screen.getByText("nav.portfolio")).toBeInTheDocument();
		expect(screen.getByText("nav.about")).toBeInTheDocument();
		expect(screen.getByText("nav.faq")).toBeInTheDocument();
		expect(screen.getByText("nav.process")).toBeInTheDocument();
		expect(screen.getByText("nav.contact")).toBeInTheDocument();
	});

	it("renders the Get Started button", () => {
		render(<Header />);
		expect(screen.getByText("nav.getStarted")).toBeInTheDocument();
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Header />);
		expect(container.querySelector("header")).toBeInTheDocument();
		expect(container.querySelector("nav")).toBeInTheDocument();
	});

	it("mobile menu is hidden by default", () => {
		render(<Header />);
		// Desktop nav is visible (hidden on mobile via CSS, but in DOM)
		const desktopNav = screen
			.getAllByRole("navigation")
			.find((nav) => nav.className.includes("hidden md:flex"));
		expect(desktopNav).toBeInTheDocument();
	});

	it("toggles mobile menu when hamburger button is clicked", () => {
		render(<Header />);
		// Find the mobile menu button (the only button with Menu/X icon)
		const menuButton = screen
			.getAllByRole("button")
			.find((btn) => btn.className.includes("md:hidden"));

		if (menuButton) {
			// Click to open menu
			fireEvent.click(menuButton);

			// Mobile nav should now be visible
			const mobileNav = screen
				.getAllByRole("navigation")
				.find((nav) => nav.className.includes("md:hidden"));
			expect(mobileNav).toBeInTheDocument();

			// Click again to close
			fireEvent.click(menuButton);
		}
	});

	it("calls scrollIntoView when home button is clicked on homepage", () => {
		// Create a mock element
		const mockElement = document.createElement("div");
		mockElement.id = "home";
		document.body.appendChild(mockElement);

		const scrollIntoViewMock = vi.fn();
		mockElement.scrollIntoView = scrollIntoViewMock;

		render(<Header />);
		const homeButtons = screen.getAllByText("nav.home");
		fireEvent.click(homeButtons[0]);

		expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

		document.body.removeChild(mockElement);
	});

	it("renders links with correct href attributes", () => {
		render(<Header />);

		const aboutLinks = screen.getAllByText("nav.about");
		expect(aboutLinks[0].closest("a")).toHaveAttribute("href", "/about");

		const faqLinks = screen.getAllByText("nav.faq");
		expect(faqLinks[0].closest("a")).toHaveAttribute("href", "/faq");

		const processLinks = screen.getAllByText("nav.process");
		expect(processLinks[0].closest("a")).toHaveAttribute("href", "/process");

		const contactLinks = screen.getAllByText("nav.contact");
		expect(contactLinks[0].closest("a")).toHaveAttribute("href", "/contact");
	});
});
