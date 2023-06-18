import { api } from "~/utils/api";
import { useState } from "react";
import { type FilterItem } from "~/components/ui/Filters";

export enum ACTIVE_FILTER {
  TWEETS = "tweets",
  COMMENTS = "comments",
  LIKES = "likes",
}

const useProfile = (username: string) => {
  const [filter, setFilter] = useState<ACTIVE_FILTER>(ACTIVE_FILTER.TWEETS);
  const { data } = api.profile.getDataByUsername.useQuery({
    username,
  });

  const navItems: FilterItem[] = [
    {
      text: "Tweets",
      value: ACTIVE_FILTER.TWEETS,
      handler: () => setFilter(ACTIVE_FILTER.TWEETS),
    },
    {
      text: "Comments",
      value: ACTIVE_FILTER.COMMENTS,
      handler: () => setFilter(ACTIVE_FILTER.COMMENTS),
    },
    {
      text: "Likes",
      value: ACTIVE_FILTER.LIKES,
      handler: () => setFilter(ACTIVE_FILTER.LIKES),
    },
  ];

  return { data, filter, navItems };
};

export default useProfile;