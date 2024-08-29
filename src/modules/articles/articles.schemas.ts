import { z } from "zod";

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
  }),
});

export const articleParamsSchema = z.object({
  params: z.object({
    articleId: z.string({ required_error: "Article ID is required" }),
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({
    articleId: z.string({ required_error: "Article ID is required" }),
  }),
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
  }),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema.shape.body>;
export type ArticleParamsInput = z.infer<
  typeof articleParamsSchema.shape.params
>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
