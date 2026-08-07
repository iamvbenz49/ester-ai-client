import { z } from "zod";

export const signupBodySchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
  name: z.string().trim().min(1).max(120).optional(),
});

export type SignupBody = z.infer<typeof signupBodySchema>;
