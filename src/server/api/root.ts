import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/postsRouter";
import { profileRouter } from "~/server/api/routers/profileRouter";
import { commentsRouter } from "~/server/api/routers/commentsRouter";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
  comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;