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
import {
  articleParamsSchema,
  createArticleSchema,
  updateArticleSchema,
} from "./articles.schemas";
import { validate } from "../../middleware/validate";

const router = Router();

router.get("/", getArticlesHandler);
router.get("/:articleId", validate(articleParamsSchema), getArticleByIdHandler);
router.post(
  "/",
  [authenticate, authorize(["WRITER"]), validate(createArticleSchema)],
  createArticleHandler,
);
router.put(
  "/:articleId",
  [authenticate, authorize(["WRITER"]), validate(updateArticleSchema)],
  updateArticleHandler,
);
router.delete(
  "/:articleId",
  [authenticate, authorize(["WRITER"]), validate(articleParamsSchema)],
  deleteArticleHandler,
);

export default router;
