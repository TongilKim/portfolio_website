import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { Portfolio } from "./Portfolio";

// Mock useTranslation to return proper portfolio items
vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string, options?: { returnObjects?: boolean }) => {
			if (key === "portfolio.projects" && options?.returnObjects) {
				return [
					{
						title: "Project Alpha",
						description: "A modern web application",
					},
					{
						title: "Project Beta",
						description: "E-commerce platform",
					},
					{
						title: "Project Gamma",
						description: "Mobile-first dashboard",
					},
				];
			}
			return key;
		},
		i18n: {
			language: "ko",
			changeLanguage: vi.fn(),
		},
	}),
}));

describe("Portfolio", () => {
	it("renders the portfolio section with correct id", () => {
		const { container } = render(<Portfolio />);
		expect(container.querySelector("#portfolio")).toBeInTheDocument();
	});

	it("renders section title and description", () => {
		render(<Portfolio />);
		expect(screen.getByText("portfolio.title")).toBeInTheDocument();
		expect(screen.getByText("portfolio.description")).toBeInTheDocument();
	});

	it("renders all project cards", () => {
		render(<Portfolio />);
		expect(screen.getByText("Project Alpha")).toBeInTheDocument();
		expect(screen.getByText("Project Beta")).toBeInTheDocument();
		expect(screen.getByText("Project Gamma")).toBeInTheDocument();
	});

	it("renders project descriptions", () => {
		render(<Portfolio />);
		expect(screen.getByText("A modern web application")).toBeInTheDocument();
		expect(screen.getByText("E-commerce platform")).toBeInTheDocument();
		expect(screen.getByText("Mobile-first dashboard")).toBeInTheDocument();
	});

	it("renders project images", () => {
		render(<Portfolio />);
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThanOrEqual(3);
	});

	it("renders technology badges", () => {
		render(<Portfolio />);
		// Use getAllByText since "React" appears multiple times in different project cards
		expect(screen.getAllByText("React").length).toBeGreaterThanOrEqual(1);
		expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
		expect(screen.getByText("Next.js")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Portfolio />);
		expect(container.querySelector("section")).toBeInTheDocument();
		expect(container.querySelector("h2")).toBeInTheDocument();
	});

	it("renders project cards with hover effect class", () => {
		const { container } = render(<Portfolio />);
		const cards = container.querySelectorAll(".group");
		expect(cards.length).toBeGreaterThanOrEqual(3);
	});
});
