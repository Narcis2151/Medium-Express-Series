import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getArticles() {
  return prisma.article.findMany();
}

export async function createArticle(
  data: { title: string; content: string },
  userId: number,
) {
  const createdArticle = await prisma.article.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  if (!createdArticle) {
    throw new Error("Article not created");
  }
  return createdArticle;
}

export async function getArticleById(articleId: number) {
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
}

export async function updateArticle(
  articleId: number,
  data: { title: string; content: string },
  userId: number,
) {
  const updatedArticle = await prisma.article.update({
    where: {
      id: articleId,
      authorId: userId,
    },
    data: {
      ...data,
      authorId: userId,
    },
  });
  if (!updatedArticle) {
    throw new Error("Article not found");
  }
  return updatedArticle;
}

export async function deleteArticle(articleId: number, userId: number) {
  const deletedArticle = await prisma.article.delete({
    where: {
      id: articleId,
      authorId: userId,
    },
  });
  if (!deletedArticle) {
    throw new Error("Article not found");
  }
}
