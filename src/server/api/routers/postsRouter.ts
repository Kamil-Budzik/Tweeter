import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  filterUserForClient,
  filterUserForClientWithDetails,
} from "~/server/helpers/clientFilters";
import { ACTIVE_FILTER } from "~/hooks/useProfile";

const GET_WITH_FILTERS_QUERY = (userId: string) => ({
  where: {
    userId,
  },
  take: 100,
  orderBy: [{ createdAt: "desc" }],
  select: {
    post: {
      include: {
        likes: true,
        saves: true,
        comments: true,
      },
    },
  },
});

export const postsRouter = createTRPCRouter({
  getWithFilters: publicProcedure
    .input(z.object({ userId: z.string(), activeFilter: z.string() }))
    .query(async ({ ctx, input }) => {
      switch (input.activeFilter) {
        case ACTIVE_FILTER.LIKES:
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

        case ACTIVE_FILTER.REPLIES:
          const commentedPosts = await ctx.prisma.comment.findMany(
            GET_WITH_FILTERS_QUERY(input.userId)
          );

          const users2 = (
            await clerkClient.users.getUserList({
              userId: commentedPosts.map((comment) => comment.post.authorId),
              limit: 100,
            })
          ).map(filterUserForClient);

          return commentedPosts.map((comment) => ({
            post: comment.post,
            author: users2.find((user) => user.id === comment.post.authorId),
          }));
        default:
          return;
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: {
        likes: true,
        saves: true,
        comments: true,
      },
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
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = (
        await clerkClient.users.getUserList({
          limit: 100,
        })
      ).map(filterUserForClientWithDetails);

      const user = users.find((user) => user.username === input.username);

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't find user with given id",
        });

      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
        include: {
          likes: true,
          saves: true,
          comments: true,
        },
      });

      return { posts, user };
    }),
  getSavedById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = (
        await clerkClient.users.getUserList({
          limit: 100,
        })
      ).map(filterUserForClient);

      const savedPosts = await ctx.prisma.savedPost.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          post: {
            include: {
              likes: true,
              saves: true,
              comments: true,
            },
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
      } else {
        await ctx.prisma.savedPost.create({
          data: {
            postId: input.postId,
            userId: input.userId,
          },
        });
      }
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
      } else {
        await ctx.prisma.like.create({
          data: {
            userId: input.userId,
            postId: input.postId,
          },
        });
      }
    }),
});