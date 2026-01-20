import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

describe("contactSchema", () => {
	describe("name field", () => {
		it("accepts valid name", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(true);
		});

		it("rejects name shorter than 2 characters", () => {
			const result = contactSchema.safeParse({
				name: "J",
				email: "john@example.com",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.name.min");
			}
		});

		it("rejects name longer than 50 characters", () => {
			const result = contactSchema.safeParse({
				name: "A".repeat(51),
				email: "john@example.com",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.name.max");
			}
		});

		it("accepts Korean names", () => {
			const result = contactSchema.safeParse({
				name: "홍길동",
				email: "hong@example.com",
				projectType: "웹사이트",
				message: "테스트 메시지입니다. 열 글자 이상이어야 합니다.",
			});
			expect(result.success).toBe(true);
		});
	});

	describe("email field", () => {
		it("accepts valid email", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(true);
		});

		it("rejects email without @", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "johnexample.com",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.email.invalid");
			}
		});

		it("rejects email without dot", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@examplecom",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.email.invalid");
			}
		});

		it("rejects empty email", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "",
				projectType: "Website",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"validation.email.required",
				);
			}
		});
	});

	describe("projectType field", () => {
		it("accepts valid project type", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website Redesign",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(true);
		});

		it("rejects empty project type", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "",
				message: "This is a valid test message.",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					"validation.projectType.required",
				);
			}
		});
	});

	describe("message field", () => {
		it("accepts valid message", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website",
				message: "This is a valid test message with enough characters.",
			});
			expect(result.success).toBe(true);
		});

		it("rejects message shorter than 10 characters", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website",
				message: "Short",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.message.min");
			}
		});

		it("rejects message longer than 1000 characters", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "Website",
				message: "A".repeat(1001),
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("validation.message.max");
			}
		});
	});

	describe("complete form validation", () => {
		it("validates a complete valid form", () => {
			const result = contactSchema.safeParse({
				name: "John Doe",
				email: "john@example.com",
				projectType: "E-commerce Website",
				message:
					"I need a new website for my business. Please contact me to discuss the project details.",
			});
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual({
					name: "John Doe",
					email: "john@example.com",
					projectType: "E-commerce Website",
					message:
						"I need a new website for my business. Please contact me to discuss the project details.",
				});
			}
		});

		it("returns multiple errors for invalid form", () => {
			const result = contactSchema.safeParse({
				name: "J",
				email: "invalid",
				projectType: "",
				message: "Short",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThan(1);
			}
		});
	});
});
