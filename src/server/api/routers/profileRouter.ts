import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { filterUserForClientWithDetails } from "~/server/helpers/clientFilters";

export const profileRouter = createTRPCRouter({
  // This is not used at the moment, but might be usefull in the future
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return filterUserForClientWithDetails(user);
    }),
});