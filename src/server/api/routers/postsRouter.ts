import { z } from "zod";
import { type Prisma } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/clientFilters";
import { ACTIVE_FILTER } from "~/hooks/useProfile";
import { EXPLORE_ACTIVE_FILTER } from "~/hooks/useExplore";

export const INCLUDE_IN_POST = {
  likes: true,
  saves: true,
  comments: true,
};

const GET_WITH_FILTERS_QUERY = (userId: string) => ({
  where: {
    userId,
  },
  take: 100,
  select: {
    post: {
      include: INCLUDE_IN_POST,
    },
  },
});

export const postsRouter = createTRPCRouter({
  // getWithFilters is so awful that i will refactor it in the future
  getWithFilters: publicProcedure
    .input(z.object({ userId: z.string(), activeFilter: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.activeFilter === ACTIVE_FILTER.LIKES) {
        const likedPosts = await ctx.prisma.like.findMany(
          GET_WITH_FILTERS_QUERY(input.userId)
        );

        const users = (
          await clerkClient.users.getUserList({
            userId: likedPosts.map((like) => like.post.authorId),
            limit: 100,
          })
        ).map(filterUserForClient);

        return likedPosts.map((like) => ({
          post: like.post,
          author: users.find((user) => user.id === like.post.authorId),
        }));
      }

      if (input.activeFilter === ACTIVE_FILTER.COMMENTS) {
        const commentedPosts = await ctx.prisma.comment.findMany(
          GET_WITH_FILTERS_QUERY(input.userId)
        );

        const users = (
          await clerkClient.users.getUserList({
            userId: commentedPosts.map((comment) => comment.post.authorId),
            limit: 100,
          })
        ).map(filterUserForClient);

        return commentedPosts.map((comment) => ({
          post: comment.post,
          author: users.find((user) => user.id === comment.post.authorId),
        }));
      }
    }),
  getAll: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input: sortBy }) => {
      const orderBy: Prisma.PostOrderByWithRelationInput[] = [];
      if (sortBy === EXPLORE_ACTIVE_FILTER.LATEST) {
        orderBy.push({ createdAt: "desc" }); // Sort by createdAt field in descending order
      } else if (sortBy === EXPLORE_ACTIVE_FILTER.TOP) {
        orderBy.push({ likes: { _count: "desc" } }); // Sort by the count of likes in descending order
      } else if (sortBy === EXPLORE_ACTIVE_FILTER.COMMENTED) {
        orderBy.push({ comments: { _count: "desc" } }); // Sort by the count of comments in descending order
      } else if (sortBy === EXPLORE_ACTIVE_FILTER.SAVED) {
        orderBy.push({ saves: { _count: "desc" } }); // Sort by the count of saves in descending order
      }

      const posts = await ctx.prisma.post.findMany({
        take: 100,
        orderBy,
        include: INCLUDE_IN_POST,
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
  getSavedById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = (
        await clerkClient.users.getUserList({
          limit: 100,
        })
      ).map(filterUserForClient);
      // eslint is throwing an error, but it's 100% valid, for some reason server doesn't recognize orderBy as a value even though it is there
      const savedPosts = await ctx.prisma.savedPost.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: [{ createdAt: "desc" }],
        include: {
          post: {
            include: INCLUDE_IN_POST,
          },
        },
      });

      return savedPosts.map((post) => ({
        post,
        author: users.find((user) => user.id === post.post.authorId),
      }));
    }),
  toggleSave: publicProcedure
    .input(
      z.object({ isSaved: z.boolean(), userId: z.string(), postId: z.number() })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isSaved) {
        await ctx.prisma.savedPost.deleteMany({
          where: {
            postId: input.postId,
            userId: input.userId,
          },
        });
        return;
      }
      await ctx.prisma.savedPost.create({
        data: {
          postId: input.postId,
          userId: input.userId,
        },
      });
    }),
  addItem: publicProcedure
    .input(z.object({ text: z.string(), authorId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.post.create({
        data: {
          authorId: input.authorId,
          content: input.text,
        },
      });
    }),
  toggleLike: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        postId: z.number(),
        isLiked: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isLiked) {
        await ctx.prisma.like.deleteMany({
          where: {
            userId: input.userId,
            postId: input.postId,
          },
        });
        return;
      }
      await ctx.prisma.like.create({
        data: {
          userId: input.userId,
          postId: input.postId,
        },
      });
    }),
});