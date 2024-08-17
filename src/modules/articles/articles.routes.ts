import {Router} from "express";

import {
  createArticleHandler,
  deleteArticleHandler,
  getArticleByIdHandler,
  getArticlesHandler,
  updateArticleHandler,
} from "./articles.controller";
import {authenticate} from '../../middleware/authenticate';

const router = Router();

router.get("/", getArticlesHandler);

router.post("/", authenticate, createArticleHandler);

router.get("/:id", getArticleByIdHandler);

router.put("/:id", authenticate, updateArticleHandler);

router.delete("/:id", authenticate, deleteArticleHandler);

export default router;