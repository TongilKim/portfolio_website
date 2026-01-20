import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@/test/test-utils";
import { Hero } from "./Hero";

describe("Hero", () => {
	it("renders the hero section with correct id", () => {
		const { container } = render(<Hero />);
		expect(container.querySelector("#home")).toBeInTheDocument();
	});

	it("renders the badge text", () => {
		render(<Hero />);
		expect(screen.getByText("hero.badge")).toBeInTheDocument();
	});

	it("renders the title and highlighted text", () => {
		render(<Hero />);
		expect(screen.getByText("hero.title")).toBeInTheDocument();
		expect(screen.getByText("hero.titleHighlight")).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<Hero />);
		expect(screen.getByText("hero.description")).toBeInTheDocument();
	});

	it("renders CTA buttons", () => {
		render(<Hero />);
		expect(screen.getByText("hero.cta.start")).toBeInTheDocument();
		expect(screen.getByText("hero.cta.portfolio")).toBeInTheDocument();
	});

	it("renders all stats", () => {
		render(<Hero />);
		expect(screen.getByText("hero.stats.projects")).toBeInTheDocument();
		expect(screen.getByText("hero.stats.projectsLabel")).toBeInTheDocument();
		expect(screen.getByText("hero.stats.satisfaction")).toBeInTheDocument();
		expect(
			screen.getByText("hero.stats.satisfactionLabel"),
		).toBeInTheDocument();
		expect(screen.getByText("hero.stats.experience")).toBeInTheDocument();
		expect(screen.getByText("hero.stats.experienceLabel")).toBeInTheDocument();
	});

	it("renders the hero image", () => {
		render(<Hero />);
		const img = screen.getByAltText("Modern workspace with laptop");
		expect(img).toBeInTheDocument();
	});

	it("scrolls to portfolio when portfolio button is clicked", () => {
		const mockElement = document.createElement("div");
		mockElement.id = "portfolio";
		document.body.appendChild(mockElement);

		const scrollIntoViewMock = vi.fn();
		mockElement.scrollIntoView = scrollIntoViewMock;

		render(<Hero />);
		const portfolioButton = screen.getByText("hero.cta.portfolio");
		fireEvent.click(portfolioButton);

		expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

		document.body.removeChild(mockElement);
	});

	it("has link to contact page for start button", () => {
		render(<Hero />);
		const startButton = screen.getByText("hero.cta.start");
		expect(startButton.closest("a")).toHaveAttribute("href", "/contact");
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Hero />);
		expect(container.querySelector("section")).toBeInTheDocument();
		expect(container.querySelector("h1")).toBeInTheDocument();
	});
});
