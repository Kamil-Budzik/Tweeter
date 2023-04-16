import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "~/server/helpers/clientFilters";
import { useUser } from "@clerk/nextjs";

export const commentsRouter = createTRPCRouter({
  getByPostId: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        orderBy: [{ createdAt: "desc" }],
        include: {
          likes: true,
        },
      });

      const users = (
        await clerkClient.users.getUserList({
          userId: comments.map((comment) => comment.userId),
        })
      ).map(filterUserForClient);

      if (!users)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Couldn't find users",
        });

      if (comments) {
        return comments.map((comment) => ({
          comment,
          author: users.find((user) => user.id === comment.userId),
        }));
      }
    }),
  addComment: publicProcedure
    .input(
      z.object({ text: z.string(), postId: z.number(), userId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.create({
        data: {
          userId: input.userId,
          content: input.text,
          postId: input.postId,
        },
      });
    }),
  deleteComment: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),
  toggleLike: publicProcedure
    .input(
      z.object({
        isLiked: z.boolean(),
        userId: z.string(),
        commentId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isLiked) {
        await ctx.prisma.commentLike.deleteMany({
          where: {
            userId: input.userId,
            commentId: input.commentId,
          },
        });
      } else {
        await ctx.prisma.commentLike.create({
          data: {
            userId: input.userId,
            commentId: input.commentId,
          },
        });
      }
    }),
});