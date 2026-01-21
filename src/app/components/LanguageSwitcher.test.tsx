import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@/test/test-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const mockChangeLanguage = vi.fn();

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			language: "ko",
			changeLanguage: mockChangeLanguage,
		},
	}),
}));

describe("LanguageSwitcher", () => {
	beforeEach(() => {
		mockChangeLanguage.mockClear();
	});

	it("renders the language switcher button", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("displays current language label", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByText("language.ko")).toBeInTheDocument();
	});

	it("renders globe icon", () => {
		const { container } = render(<LanguageSwitcher />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("calls changeLanguage when clicked", () => {
		render(<LanguageSwitcher />);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockChangeLanguage).toHaveBeenCalledWith("en");
	});

	it("has accessible button structure", () => {
		render(<LanguageSwitcher />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("flex", "items-center", "gap-2");
	});
});

describe("LanguageSwitcher - English mode", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	it("toggles to Korean when in English mode", async () => {
		const mockChangeLang = vi.fn();
		vi.doMock("react-i18next", () => ({
			useTranslation: () => ({
				t: (key: string) => key,
				i18n: {
					language: "en",
					changeLanguage: mockChangeLang,
				},
			}),
		}));

		// Re-import after mock
		const { LanguageSwitcher: LS } = await import("./LanguageSwitcher");
		render(<LS />);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockChangeLang).toHaveBeenCalledWith("ko");
	});
});
