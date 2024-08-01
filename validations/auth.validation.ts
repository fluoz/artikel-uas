import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name is required"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(1, "Confirm password is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const getAuthSchema = (type: "login" | "register") => {
  if (type === "login") return LoginSchema;
  return RegisterSchema;
};
