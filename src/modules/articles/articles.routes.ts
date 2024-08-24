import { Router } from "express";

import {
  createArticleHandler,
  deleteArticleHandler,
  getArticleByIdHandler,
  getArticlesHandler,
  updateArticleHandler,
} from "./articles.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.get("/", getArticlesHandler);
router.get("/:articleId", getArticleByIdHandler);
router.post("/", [authenticate, authorize(["WRITER"])], createArticleHandler);
router.put(
  "/:articleId",
  [authenticate, authorize(["WRITER"])],
  updateArticleHandler
);
router.delete(
  "/:articleId",
  [authenticate, authorize(["WRITER"])],
  deleteArticleHandler
);

export default router;
