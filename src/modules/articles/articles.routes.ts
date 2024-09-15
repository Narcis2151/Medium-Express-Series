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

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Retrieve a list of articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/", getArticlesHandler);

/**
 * @swagger
 * /articles/{articleId}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Retrieve a single article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */
router.get("/:articleId", validate(articleParamsSchema), getArticleByIdHandler);

/**
 * @swagger
 * /articles:
 *   post:
 *     tags:
 *       - Articles
 *     summary: Create a new article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateArticle'
 *     responses:
 *       201:
 *         description: The created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 */
router.post(
  "/",
  [authenticate, authorize(["WRITER"]), validate(createArticleSchema)],
  createArticleHandler
);

/**
 * @swagger
 * /articles/{articleId}:
 *   put:
 *     tags:
 *       - Articles
 *     summary: Update an existing article
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArticle'
 *     responses:
 *       200:
 *         description: The updated article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 */
router.put(
  "/:articleId",
  [authenticate, authorize(["WRITER"]), validate(updateArticleSchema)],
  updateArticleHandler
);

/**
 * @swagger
 * /articles/{articleId}:
 *   delete:
 *     tags:
 *       - Articles
 *     summary: Delete an article by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Content
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 */
router.delete(
  "/:articleId",
  [authenticate, authorize(["WRITER"]), validate(articleParamsSchema)],
  deleteArticleHandler
);

export default router;
