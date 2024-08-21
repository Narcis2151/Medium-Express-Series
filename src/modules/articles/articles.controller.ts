import { Request, Response } from "express";

import {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "./articles.service";

export async function getArticlesHandler(req: Request, res: Response) {
  const articles = await getArticles();
  return res.status(200).send(articles);
}

export async function createArticleHandler(req: Request, res: Response) {
  const userId = res.locals.user;
  const article = await createArticle(req.body, userId);
  return res.status(201).send(article);
}

export async function getArticleByIdHandler(req: Request, res: Response) {
  const article = await getArticleById(Number(req.params.id));
  return res.status(200).send(article);
}

export async function updateArticleHandler(req: Request, res: Response) {
  const userId = res.locals.user;
  const article = await updateArticle(Number(req.params.id), req.body, userId);
  return res.status(200).send(article);
}

export async function deleteArticleHandler(req: Request, res: Response) {
  await deleteArticle(Number(req.params.id), res.locals.user);
  return res.status(204).send();
}
