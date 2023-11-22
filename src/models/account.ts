import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TRegisterForm = z.infer<typeof RegisterSchema>;

export const AccountSchema = z.object({
  name: z.string(),
  email: z.string(),
  token: z.string(),
});

export type TAccount = z.infer<typeof AccountSchema>;
