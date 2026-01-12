import { z } from 'zod';

// Helper to convert undefined/null to empty string
const stringField = () => z.preprocess((val) => val ?? '', z.string());

// Contact form validation schema
export const contactSchema = z.object({
  name: stringField()
    .pipe(z.string().min(2, { message: 'validation.name.min' }).max(50, { message: 'validation.name.max' })),

  email: stringField()
    .pipe(z.string().min(1, { message: 'validation.email.required' }).email({ message: 'validation.email.invalid' })),

  projectType: stringField()
    .pipe(z.string().min(1, { message: 'validation.projectType.required' })),

  message: stringField()
    .pipe(z.string().min(10, { message: 'validation.message.min' }).max(1000, { message: 'validation.message.max' }))
});

// TypeScript type inferred from schema
export type ContactFormData = z.infer<typeof contactSchema>;
