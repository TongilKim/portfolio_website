import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("handles conditional classes", () => {
		expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
	});

	it("handles undefined and null values", () => {
		expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
	});

	it("handles empty strings", () => {
		expect(cn("foo", "", "bar")).toBe("foo bar");
	});

	it("merges tailwind classes correctly", () => {
		expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
	});

	it("handles conflicting tailwind utilities", () => {
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});

	it("handles array of classes", () => {
		expect(cn(["foo", "bar"])).toBe("foo bar");
	});

	it("handles object syntax", () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
	});

	it("returns empty string for no arguments", () => {
		expect(cn()).toBe("");
	});
});
