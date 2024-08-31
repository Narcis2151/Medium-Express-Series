import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export type RegisterUserInput = z.infer<typeof registerSchema.shape.body>;
export type LoginUserInput = z.infer<typeof loginSchema.shape.body>;
