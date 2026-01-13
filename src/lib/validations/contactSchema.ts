import { z } from "zod";

// Contact form validation schema
export const contactSchema = z.object({
	name: z
		.string()
		.default("")
		.refine((val) => val.length >= 2, { message: "validation.name.min" })
		.refine((val) => val.length <= 50, { message: "validation.name.max" }),
	email: z
		.string()
		.default("")
		.refine((val) => val.length >= 1, { message: "validation.email.required" })
		.refine((val) => val.includes("@") && val.includes("."), {
			message: "validation.email.invalid",
		}),
	projectType: z
		.string()
		.default("")
		.refine((val) => val.length >= 1, {
			message: "validation.projectType.required",
		}),
	message: z
		.string()
		.default("")
		.refine((val) => val.length >= 10, { message: "validation.message.min" })
		.refine((val) => val.length <= 1000, {
			message: "validation.message.max",
		}),
});

// TypeScript type inferred from schema
export type ContactFormData = z.infer<typeof contactSchema>;
