import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { INCLUDE_IN_POST } from "~/server/api/routers/postsRouter";
import getUserByUsername from "~/server/helpers/getUserByUsername";
import { clerkClient } from "@clerk/nextjs/api";
import {
  filterUserForClient,
  filterUserForClientWithDetails,
} from "~/server/helpers/clientFilters";

const ZOD_FOLLOW = z.array(
  z.object({
    id: z.number(),
    userId: z.string(),
    followedUserId: z.string(),
  })
);

export const profileRouter = createTRPCRouter({
  getHomePosts: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const followedUserIds = await ctx.prisma.follow
        .findMany({
          where: {
            userId: input.userId,
          },
          select: {
            followedUserId: true,
          },
        })
        .then((follows) => follows.map((follow) => follow.followedUserId));

      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: {
            in: followedUserIds,
          },
        },
        take: 50,
        include: INCLUDE_IN_POST,
        orderBy: [{ createdAt: "desc" }],
      });

      const users = (
        await clerkClient.users.getUserList({
          userId: posts.map((post) => post.authorId),
          limit: 100,
        })
      ).map(filterUserForClient);

      return posts.map((post) => ({
        post,
        author: users.find((user) => user.id === post.authorId),
      }));
    }),
  getDataByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await getUserByUsername(input.username);
      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
        include: INCLUDE_IN_POST,
      });

      const userBio = await ctx.prisma.userBio.findFirst({
        where: {
          userId: user.id,
        },
      });

      const follows = await ctx.prisma.follow.findMany({
        where: {
          userId: user.id,
        },
      });
      const followedBy = await ctx.prisma.follow.findMany({
        where: {
          followedUserId: user.id,
        },
      });

      return {
        posts,
        user: {
          ...user,
          bio: userBio?.content || "No bio yet",
        },
        followData: {
          followedBy,
          follows,
        },
      };
    }),
  getFollowStatus: publicProcedure
    .input(z.object({ userId: z.string(), userToCheck: z.string() }))
    .query(async ({ ctx, input }) => {
      const follow = await ctx.prisma.follow.findFirst({
        where: {
          userId: input.userId,
          followedUserId: input.userToCheck,
        },
      });
      return !!follow;
    }),
  getFollowData: publicProcedure
    .input(
      z.object({
        followers: ZOD_FOLLOW,
        follows: ZOD_FOLLOW,
      })
    )
    .query(async ({ ctx, input }) => {
      const followersIds = input.followers.map((follower) => follower.userId);
      const followsIds = input.follows.map((follow) => follow.followedUserId);
      const users = (
        await clerkClient.users.getUserList({
          limit: 100,
        })
      ).map(filterUserForClientWithDetails);

      const usersBio = await ctx.prisma.userBio.findMany();

      let followedBy = users.filter((user) => followersIds.includes(user.id));

      let follows = users.filter((user) => followsIds.includes(user.id));

      followedBy = followedBy.map((user) => ({
        ...user,
        bio:
          usersBio.filter((item) => item.userId === user.id)[0]?.content || "",
      }));

      follows = follows.map((user) => ({
        ...user,
        bio:
          usersBio.filter((item) => item.userId === user.id)[0]?.content || "",
      }));

      return {
        followedBy,
        follows,
      };
    }),
  editBio: publicProcedure
    .input(z.object({ userId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.userBio.deleteMany({
        where: {
          userId: input.userId,
        },
      });
      await ctx.prisma.userBio.create({
        data: {
          userId: input.userId,
          content: input.content,
        },
      });
    }),
  toggleFollow: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userToFollow: z.string(),
        isFollowed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isFollowed) {
        await ctx.prisma.follow.deleteMany({
          where: {
            userId: input.userId,
            followedUserId: input.userToFollow,
          },
        });
        return;
      }
      await ctx.prisma.follow.create({
        data: {
          userId: input.userId,
          followedUserId: input.userToFollow,
        },
      });
    }),
});