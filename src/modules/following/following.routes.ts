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
 *      - Following
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
 *      - Following
 *     summary: Get follower and following users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of articles
 */
router.get("/users", authenticate, getFollowingUsersHandler);

/**
 * @swagger
 * /following/{userId}/follow:
 *   post:
 *     tags:
 *      - Following
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
 *         description: User followed
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
 *      - Following
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
 *       200:
 *         description: User unfollowed
 */
router.delete(
  "/:userId/unfollow",
  [authenticate, validate(followUserSchema)],
  unfollowUserHandler
);

export default router;
