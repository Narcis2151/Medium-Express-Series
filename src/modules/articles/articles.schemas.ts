import {z} from "zod";

export const articleParamsSchema = z.object({
  params: z.object({
    articleId: z.string({required_error: "Article ID is required"}),
  }),
});

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string({required_error: "Article Title is required"}),
    content: z.string({required_error: "Article Content is required"}),
  }),
});

export const updateArticleSchema = z.object({
  params: articleParamsSchema.shape.params,
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export type ArticleParams = z.infer<typeof articleParamsSchema.shape.params>;
export type CreateArticleInput = z.infer<typeof createArticleSchema.shape.body>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
