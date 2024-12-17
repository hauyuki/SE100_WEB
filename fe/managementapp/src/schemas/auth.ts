import { z } from "zod";

export const AuthSchema = z.object({
  username: z
    .string()
    .email("This email is invalid")
    .min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});
export const RegisterSchema = z.object({
  email: z
    .string()
    .email("This email is invalid")
    .min(1, "This field is required"),
  password: z.string().min(8, "Invalid password"),
  name: z.string().min(1, "This field is required"),
});
