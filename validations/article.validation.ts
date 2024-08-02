import { z } from "zod";

export const CreateArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required"),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(14, "Minimal content length is 14"),
});

export type CreateArticleSchemaType = z.infer<typeof CreateArticleSchema>;
