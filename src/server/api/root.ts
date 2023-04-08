import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/postsRouter";
import { profileRouter } from "~/server/api/routers/profileRouter";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;