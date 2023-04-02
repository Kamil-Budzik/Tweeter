import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/postsRouter";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;