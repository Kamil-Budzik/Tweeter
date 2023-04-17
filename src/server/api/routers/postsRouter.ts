import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  filterUserForClient,
  filterUserForClientWithDetails,
} from "~/server/helpers/clientFilters";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: {
        likes: true,
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
        },
      });

      return { posts, user };
    }),
  getSavedById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const savedPosts = await ctx.prisma.savedPost.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          post: { include: { likes: true } },
        },
      });

      return savedPosts.map((post) => post.post);
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