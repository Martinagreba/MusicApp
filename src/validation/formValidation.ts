import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter an email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: "Please enter your user name" })
      .min(3, { message: "User name must be at least 3 characters long" }),

    email: z
      .string()
      .min(1, { message: "Please enter an email address" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Please enter a password" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;
