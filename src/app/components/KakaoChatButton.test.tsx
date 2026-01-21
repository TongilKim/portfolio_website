import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { KakaoChatFloatingButton } from "./KakaoChatButton";

describe("KakaoChatFloatingButton - Korean language", () => {
	beforeEach(() => {
		vi.resetModules();
		vi.mock("react-i18next", () => ({
			useTranslation: () => ({
				t: (key: string) => key,
				i18n: {
					language: "ko",
					changeLanguage: vi.fn(),
				},
			}),
		}));
	});

	it("renders when language is Korean", () => {
		render(<KakaoChatFloatingButton />);
		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
	});

	it("has correct KakaoTalk link", () => {
		render(<KakaoChatFloatingButton />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute(
			"href",
			"https://open.kakao.com/o/sL7Kr6bi",
		);
	});

	it("opens in new tab with security attributes", () => {
		render(<KakaoChatFloatingButton />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("has accessible aria-label", () => {
		render(<KakaoChatFloatingButton />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("aria-label", "kakao.floatingButton");
	});

	it("renders KakaoTalk icon (SVG)", () => {
		const { container } = render(<KakaoChatFloatingButton />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("renders button text", () => {
		render(<KakaoChatFloatingButton />);
		expect(screen.getByText("kakao.chatButton")).toBeInTheDocument();
	});

	it("has correct styling classes", () => {
		render(<KakaoChatFloatingButton />);
		const link = screen.getByRole("link");
		expect(link).toHaveClass("fixed", "bottom-6", "right-6", "z-50");
	});
});

describe("KakaoChatFloatingButton - English language", () => {
	beforeEach(() => {
		vi.resetModules();
		vi.doMock("react-i18next", () => ({
			useTranslation: () => ({
				t: (key: string) => key,
				i18n: {
					language: "en",
					changeLanguage: vi.fn(),
				},
			}),
		}));
	});

	it("does not render when language is English", async () => {
		const { KakaoChatFloatingButton: KakaoBtn } = await import(
			"./KakaoChatButton"
		);
		const { container } = render(<KakaoBtn />);
		expect(container.firstChild).toBeNull();
	});
});
