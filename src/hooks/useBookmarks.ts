import { api } from "~/utils/api";
import { useState } from "react";
import { type FilterItem } from "~/components/ui/Filters";
import { ACTIVE_FILTER } from "~/hooks/useProfile";
import { useUser } from "@clerk/nextjs";

const useBookmarks = () => {
  const { user } = useUser();
  const [filter, setFilter] = useState<ACTIVE_FILTER>(ACTIVE_FILTER.TWEETS);
  const { data, isLoading } = api.posts.getSavedById.useQuery({
    userId: user?.id || "",
  });
  const [emptyStateMsg, setEmptyStateMsg] = useState(
    "You don't have any saved tweets"
  );

  const navItems: FilterItem[] = [
    {
      text: "Tweets",
      value: ACTIVE_FILTER.TWEETS,
      handler: () => {
        setFilter(ACTIVE_FILTER.TWEETS);
        setEmptyStateMsg("You don't have any saved tweets");
      },
    },
    {
      text: "Comments",
      value: ACTIVE_FILTER.COMMENTS,
      handler: () => {
        setFilter(ACTIVE_FILTER.COMMENTS);
        setEmptyStateMsg("You don't have any comments");
      },
    },
    {
      text: "Likes",
      value: ACTIVE_FILTER.LIKES,
      handler: () => {
        setFilter(ACTIVE_FILTER.LIKES);
        setEmptyStateMsg("You don't have any liked posts");
      },
    },
  ];

  return { data, filter, navItems, isLoading, emptyStateMsg };
};

export default useBookmarks;