import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/test-utils";
import { Footer } from "./Footer";

describe("Footer", () => {
	it("renders the app title", () => {
		render(<Footer />);
		expect(screen.getByText("app.title")).toBeInTheDocument();
	});

	it("renders the footer description", () => {
		render(<Footer />);
		expect(screen.getByText("footer.description")).toBeInTheDocument();
	});

	it("renders the copyright text", () => {
		render(<Footer />);
		expect(screen.getByText(/footer.copyright/)).toBeInTheDocument();
	});

	it("displays the current year in copyright", () => {
		render(<Footer />);
		const currentYear = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Footer />);
		expect(container.querySelector("footer")).toBeInTheDocument();
	});
});
