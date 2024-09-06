import { Request, Response } from "express";

import {
  getFeedArticles,
  getFollowingUsers,
  followUser,
  unfollowUser,
} from "./following.service";
import { FollowUserType, FollowingFeedType } from "./following.schemas";

export async function getFeedArticlesHandler(
  req: Request<{}, {}, {}, FollowingFeedType["query"]>,
  res: Response
) {
  const userId = res.locals.user;
  const { limit = 5, offset = 0, search = "" } = req.query;
  const articles = await getFeedArticles(
    userId,
    Number(limit),
    Number(offset),
    search
  );

  return res.json(articles);
}

export async function getFollowingUsersHandler(req: Request, res: Response) {
  const userId = res.locals.user;

  const users = await getFollowingUsers(userId);

  return res.json(users);
}

export async function followUserHandler(
  req: Request<FollowUserType["params"]>,
  res: Response
) {
  const userId = res.locals.user;
  const followUserId = Number(req.params.userId);
  try {
    await followUser(userId, followUserId);
    return res.status(201).json({ message: "User Followed Successfully" });
  } catch (error) {
    return res.status(400).json({ message: "User already followed" });
  }
}

export async function unfollowUserHandler(
  req: Request<FollowUserType["params"]>,
  res: Response
) {
  const userId = res.locals.user;
  const followUserId = req.params.userId;
  try {
    await unfollowUser(userId, Number(followUserId));
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: "User not followed" });
  }
}
