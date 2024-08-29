import { Request, Response } from "express";

import {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "./articles.service";
import {
  ArticleParamsInput,
  CreateArticleInput,
  UpdateArticleInput,
} from "./articles.schemas";

export async function getArticlesHandler(req: Request, res: Response) {
  const articles = await getArticles();
  return res.status(200).send(articles);
}

export async function createArticleHandler(
  req: Request<{}, {}, CreateArticleInput>,
  res: Response,
) {
  try {
    const userId = res.locals.user;
    const article = await createArticle(req.body, userId);
    return res.status(201).send(article);
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function getArticleByIdHandler(
  req: Request<ArticleParamsInput>,
  res: Response,
) {
  try {
    const article = await getArticleById(Number(req.params.articleId));
    return res.status(200).send(article);
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function updateArticleHandler(
  req: Request<UpdateArticleInput["params"], {}, UpdateArticleInput["body"]>,
  res: Response,
) {
  try {
    const userId = res.locals.user;
    const article = await updateArticle(
      Number(req.params.articleId),
      req.body,
      userId,
    );
    return res.status(200).send(article);
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).send(e.message);
  }
}

export async function deleteArticleHandler(
  req: Request<ArticleParamsInput>,
  res: Response,
) {
  try {
    const userId = res.locals.user;
    await deleteArticle(Number(req.params.articleId), Number(userId));
    return res.status(204).send();
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).send(e.message);
  }
}
