import { z } from "zod";

export const getFormSchema = (
  type: FormTypes
): z.ZodObject<
  {
    username?: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    username?: string;
    email: string;
    password: string;
  }
> => {
  if (type === "sign-in") {
    return z.object({
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Za-z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .nonempty("Password is required"),
    });
  } else {
    return z.object({
      username: z
        .string()
        .min(2, "Username must contain at least characters")
        .max(50, "Username must be less than 50 characters"),
      email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Za-z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .nonempty("Password is required"),
    });
  }
};
