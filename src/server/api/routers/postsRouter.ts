import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient, type User } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username || "",
    profileImageUrl: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
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
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      // const users = (
      //   await clerkClient.users.getUserList({
      //     limit: 100,
      //   })
      // ).map(filterUserForClient);
      //
      // console.log(users);
      //
      // const user = users.find((user) => user.username === input.username);
      //
      // if (!user)
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Couldn't find user",
      //   });

      console.log("USERNAME", input.username);

      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found!",
        });
      }

      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });
      return posts;
    }),
});