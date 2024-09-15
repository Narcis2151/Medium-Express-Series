import { Router } from "express";

import {
  getFeedArticlesHandler,
  getFollowingUsersHandler,
  followUserHandler,
  unfollowUserHandler,
} from "./following.controller";
import { authenticate } from "../../middleware/authenticate";
import { validate } from "../../middleware/validate";
import { followUserSchema, followingFeedSchema } from "./following.schemas";

const router = Router();

/**
 * @swagger
 * /following/feed:
 *   get:
 *     tags:
 *       - Following
 *     summary: Get feed articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of articles to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of articles to skip
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Validation error
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
 */
router.get(
  "/feed",
  [authenticate, validate(followingFeedSchema)],
  getFeedArticlesHandler
);

/**
 * @swagger
 * /following/users:
 *   get:
 *     tags:
 *       - Following
 *     summary: Get follower and following users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users the current user is following or being followed by
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 */
router.get("/users", authenticate, getFollowingUsersHandler);

/**
 * @swagger
 * /following/{userId}/follow:
 *   post:
 *     tags:
 *       - Following
 *     summary: Follow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User followed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: User Followed Successfully
 *       400:
 *         description: Validation error
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
 */
router.post(
  "/:userId/follow",
  [authenticate, validate(followUserSchema)],
  followUserHandler
);

/**
 * @swagger
 * /following/{userId}/unfollow:
 *   delete:
 *     tags:
 *       - Following
 *     summary: Unfollow a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *        description: No Content
 *       400:
 *         description: Validation error
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
 */
router.delete(
  "/:userId/unfollow",
  [authenticate, validate(followUserSchema)],
  unfollowUserHandler
);

export default router;
