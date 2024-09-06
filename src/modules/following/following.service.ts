import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFeedArticles(
  userId: number,
  limit: number,
  offset: number,
  search: string
) {
  const followedUsers = await prisma.userFollower.findMany({
    where: {
      followerId: userId,
    },
  });
  return prisma.article.findMany({
    where: {
      authorId: {
        in: followedUsers.map((user) => user.followingId),
      },
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          content: {
            contains: search,
          },
        },
      ],
    },
    take: limit,
    skip: offset,
  });
}

export async function getFollowingUsers(userId: number) {
  const followers = await prisma.userFollower
    .findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })
    .then((data) => {
      return data.map((user) => user.follower);
    });

  const following = await prisma.userFollower
    .findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })
    .then((data) => {
      return data.map((user) => user.following);
    });

  return {
    followers,
    following,
  };
}

export async function followUser(userId: number, followUserId: number) {
  try {
    await prisma.userFollower.create({
      data: {
        followerId: userId,
        followingId: followUserId,
      },
    });
  } catch (error) {
    throw new Error("User already followed");
  }
}

export async function unfollowUser(userId: number, unfollowUserId: number) {
  try {
    await prisma.userFollower.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: unfollowUserId,
        },
      },
    });
  } catch (error) {
    throw new Error("User not followed");
  }
}
