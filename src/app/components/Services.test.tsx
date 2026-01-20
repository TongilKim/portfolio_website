import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { Services } from "./Services";

// Mock useTranslation to return proper service items
vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string, options?: { returnObjects?: boolean }) => {
			if (key === "services.items" && options?.returnObjects) {
				return [
					{
						title: "E-commerce",
						description: "Online store solutions",
						idealFor: "Small businesses",
					},
					{
						title: "Corporate",
						description: "Professional websites",
						idealFor: "Corporations",
					},
					{
						title: "Landing Page",
						description: "High-converting pages",
						idealFor: "Startups",
					},
					{
						title: "Custom Development",
						description: "Tailored solutions",
						idealFor: "Enterprises",
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

describe("Services", () => {
	it("renders the services section with correct id", () => {
		const { container } = render(<Services />);
		expect(container.querySelector("#services")).toBeInTheDocument();
	});

	it("renders section title and description", () => {
		render(<Services />);
		expect(screen.getByText("services.title")).toBeInTheDocument();
		expect(screen.getByText("services.description")).toBeInTheDocument();
	});

	it("renders all service cards", () => {
		render(<Services />);
		expect(screen.getByText("E-commerce")).toBeInTheDocument();
		expect(screen.getByText("Corporate")).toBeInTheDocument();
		expect(screen.getByText("Landing Page")).toBeInTheDocument();
		expect(screen.getByText("Custom Development")).toBeInTheDocument();
	});

	it("renders service descriptions", () => {
		render(<Services />);
		expect(screen.getByText("Online store solutions")).toBeInTheDocument();
		expect(screen.getByText("Professional websites")).toBeInTheDocument();
		expect(screen.getByText("High-converting pages")).toBeInTheDocument();
		expect(screen.getByText("Tailored solutions")).toBeInTheDocument();
	});

	it("renders ideal for labels", () => {
		render(<Services />);
		expect(screen.getByText(/Small businesses/)).toBeInTheDocument();
		expect(screen.getByText(/Corporations/)).toBeInTheDocument();
		expect(screen.getByText(/Startups/)).toBeInTheDocument();
		expect(screen.getByText(/Enterprises/)).toBeInTheDocument();
	});

	it("renders CTA buttons in each card", () => {
		render(<Services />);
		const ctaButtons = screen.getAllByText("services.cta.card");
		expect(ctaButtons).toHaveLength(4);
	});

	it("renders section CTA", () => {
		render(<Services />);
		expect(screen.getByText("services.cta.section")).toBeInTheDocument();
		expect(
			screen.getByText("services.cta.sectionDescription"),
		).toBeInTheDocument();
		expect(screen.getByText("services.cta.button")).toBeInTheDocument();
	});

	it("has links to contact page", () => {
		render(<Services />);
		const contactLinks = screen.getAllByRole("link");
		const contactPageLinks = contactLinks.filter(
			(link) => link.getAttribute("href") === "/contact",
		);
		expect(contactPageLinks.length).toBeGreaterThan(0);
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Services />);
		expect(container.querySelector("section")).toBeInTheDocument();
		expect(container.querySelector("h2")).toBeInTheDocument();
	});
});
