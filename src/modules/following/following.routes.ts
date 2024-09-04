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

router.get(
  "/feed",
  [authenticate, validate(followingFeedSchema)],
  getFeedArticlesHandler
);
router.get("/users", authenticate, getFollowingUsersHandler);
router.post(
  "/:userId/follow",
  [authenticate, validate(followUserSchema)],
  followUserHandler
);
router.delete(
  "/:userId/unfollow",
  [authenticate, validate(followUserSchema)],
  unfollowUserHandler
);

export default router;
