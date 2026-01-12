import { z } from 'zod';

// Helper to convert undefined/null to empty string for proper validation messages
const stringPreprocess = (val: unknown) => (val === undefined || val === null ? '' : val);

// Contact form validation schema for V1 (with projectType)
export const contactSchema = z.object({
  name: z.preprocess(
    stringPreprocess,
    z.string()
      .min(2, { message: 'validation.name.min' })
      .max(50, { message: 'validation.name.max' })
  ),

  email: z.preprocess(
    stringPreprocess,
    z.string()
      .min(1, { message: 'validation.email.required' })
      .email({ message: 'validation.email.invalid' })
  ),

  projectType: z.preprocess(
    stringPreprocess,
    z.string()
      .min(1, { message: 'validation.projectType.required' })
  ),

  message: z.preprocess(
    stringPreprocess,
    z.string()
      .min(10, { message: 'validation.message.min' })
      .max(1000, { message: 'validation.message.max' })
  )
});

// Contact form validation schema for V2 (without projectType)
export const contactSchemaV2 = z.object({
  name: z.preprocess(
    stringPreprocess,
    z.string()
      .min(2, { message: 'validation.name.min' })
      .max(50, { message: 'validation.name.max' })
  ),

  email: z.preprocess(
    stringPreprocess,
    z.string()
      .min(1, { message: 'validation.email.required' })
      .email({ message: 'validation.email.invalid' })
  ),

  message: z.preprocess(
    stringPreprocess,
    z.string()
      .min(10, { message: 'validation.message.min' })
      .max(1000, { message: 'validation.message.max' })
  )
});

// TypeScript types inferred from schemas
export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactFormDataV2 = z.infer<typeof contactSchemaV2>;
