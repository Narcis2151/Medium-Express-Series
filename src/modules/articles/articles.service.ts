import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getArticles() {
  return prisma.article.findMany();
}

export async function createArticle(
  data: { title: string; content: string },
  userId: number
) {
  return prisma.article.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
}

export async function getArticleById(articleId: number) {
  return prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });
}

export async function updateArticle(
  articleId: number,
  data: { title: string; content: string },
  userId: number
) {
  return prisma.article.update({
    where: {
      id: articleId,
      authorId: userId,
    },
    data: {
      ...data,
      authorId: userId,
    },
  });
}

export async function deleteArticle(articleId: number, userId: number) {
  return prisma.article.delete({
    where: {
      id: articleId,
      authorId: userId,
    },
  });
}
