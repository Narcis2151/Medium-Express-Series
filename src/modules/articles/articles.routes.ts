import {Router} from "express";

import {
  createArticleHandler,
  deleteArticleHandler,
  getArticleByIdHandler,
  getArticlesHandler,
  updateArticleHandler,
} from "./articles.controller";

const router = Router();

router.get("/", getArticlesHandler);

router.post("/", createArticleHandler);

router.get("/:id", getArticleByIdHandler);

router.put("/:id", updateArticleHandler);

router.delete("/:id", deleteArticleHandler);

export default router;