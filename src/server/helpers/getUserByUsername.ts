import { clerkClient } from "@clerk/nextjs/api";
import { filterUserForClientWithDetails } from "~/server/helpers/clientFilters";
import { TRPCError } from "@trpc/server";

const getUserByUsername = async (username: string) => {
  const users = (
    await clerkClient.users.getUserList({
      limit: 100,
    })
  ).map(filterUserForClientWithDetails);

  const user = users.find((user) => user.username === username);

  if (!user)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Couldn't find user with given id",
    });
  return user;
};

export default getUserByUsername;