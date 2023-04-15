import { type User } from "@clerk/nextjs/api";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username || "",
    profileImageUrl: user.profileImageUrl,
  };
};

export const filterUserForClientWithDetails = (user: User) => {
  return {
    id: user.id,
    username: user.username || "",
    profileImageUrl: user.profileImageUrl,
    bio: "Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰",
  };
};