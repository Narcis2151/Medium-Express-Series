import {Router} from "express";

import {
  createArticleHandler,
  deleteArticleHandler,
  getArticleByIdHandler,
  getArticlesHandler,
  updateArticleHandler,
} from "./articles.controller";
import {
  articleParamsSchema,
  createArticleSchema,
  updateArticleSchema
} from "./articles.schemas";
import {authenticate} from '../../middleware/authenticate';
import {authorize} from '../../middleware/authorize';
import {validate} from "../../middleware/validate";

const router = Router();

router.get('/', getArticlesHandler);
router.get('/:id', validate(articleParamsSchema), getArticleByIdHandler);
router.post('/', [validate(createArticleSchema), authorize(['WRITER'])], createArticleHandler);
router.put('/:id', [validate(updateArticleSchema), authenticate, authorize(['WRITER'])], updateArticleHandler);
router.delete('/:id', [validate(articleParamsSchema), authorize(['WRITER'])], deleteArticleHandler);

export default router;