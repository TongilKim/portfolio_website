import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@/test/test-utils";
import { Contact } from "./Contact";

// Mock formspree
vi.mock("@formspree/react", () => ({
	useForm: () => [
		{ submitting: false, succeeded: false, errors: null },
		vi.fn(),
	],
}));

describe("Contact", () => {
	it("renders the contact section with correct id", () => {
		const { container } = render(<Contact />);
		expect(container.querySelector("#contact")).toBeInTheDocument();
	});

	it("renders section title and description", () => {
		render(<Contact />);
		expect(screen.getByText("contact.title")).toBeInTheDocument();
		expect(screen.getByText("contact.description")).toBeInTheDocument();
	});

	it("renders get in touch section", () => {
		render(<Contact />);
		expect(screen.getByText("contact.getInTouch.title")).toBeInTheDocument();
		expect(
			screen.getByText("contact.getInTouch.description"),
		).toBeInTheDocument();
	});

	it("renders all form fields", () => {
		render(<Contact />);
		expect(screen.getByLabelText("contact.form.name")).toBeInTheDocument();
		expect(screen.getByLabelText("contact.form.email")).toBeInTheDocument();
		expect(screen.getByLabelText("contact.form.project")).toBeInTheDocument();
		expect(screen.getByLabelText("contact.form.message")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(<Contact />);
		expect(
			screen.getByRole("button", { name: /contact.form.submit/i }),
		).toBeInTheDocument();
	});

	it("submit button is disabled when form is empty", () => {
		render(<Contact />);
		const submitButton = screen.getByRole("button", {
			name: /contact.form.submit/i,
		});
		expect(submitButton).toBeDisabled();
	});

	it("can fill name field", () => {
		render(<Contact />);
		const nameInput = screen.getByLabelText("contact.form.name");
		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		expect(nameInput).toHaveValue("John Doe");
	});

	it("can fill email field", () => {
		render(<Contact />);
		const emailInput = screen.getByLabelText("contact.form.email");
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		expect(emailInput).toHaveValue("john@example.com");
	});

	it("can fill project type field", () => {
		render(<Contact />);
		const projectInput = screen.getByLabelText("contact.form.project");
		fireEvent.change(projectInput, { target: { value: "Website" } });
		expect(projectInput).toHaveValue("Website");
	});

	it("can fill message field", () => {
		render(<Contact />);
		const messageInput = screen.getByLabelText("contact.form.message");
		fireEvent.change(messageInput, {
			target: { value: "This is a test message." },
		});
		expect(messageInput).toHaveValue("This is a test message.");
	});

	it("enables submit button when form is filled correctly", async () => {
		render(<Contact />);

		const nameInput = screen.getByLabelText("contact.form.name");
		const emailInput = screen.getByLabelText("contact.form.email");
		const projectInput = screen.getByLabelText("contact.form.project");
		const messageInput = screen.getByLabelText("contact.form.message");

		fireEvent.change(nameInput, { target: { value: "John Doe" } });
		fireEvent.change(emailInput, { target: { value: "john@example.com" } });
		fireEvent.change(projectInput, { target: { value: "Website Project" } });
		fireEvent.change(messageInput, {
			target: { value: "This is a detailed test message for the form." },
		});

		await waitFor(() => {
			const submitButton = screen.getByRole("button", {
				name: /contact.form.submit/i,
			});
			expect(submitButton).toBeEnabled();
		});
	});

	it("has proper semantic structure", () => {
		const { container } = render(<Contact />);
		expect(container.querySelector("section")).toBeInTheDocument();
		expect(container.querySelector("form")).toBeInTheDocument();
		expect(container.querySelector("h2")).toBeInTheDocument();
	});

	it("renders form with proper accessibility attributes", () => {
		render(<Contact />);
		const nameInput = screen.getByLabelText("contact.form.name");
		const emailInput = screen.getByLabelText("contact.form.email");

		expect(nameInput).toHaveAttribute("id", "name");
		expect(emailInput).toHaveAttribute("id", "email");
		expect(emailInput).toHaveAttribute("type", "email");
	});
});
