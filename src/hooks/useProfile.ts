import { api } from "~/utils/api";
import { useState } from "react";
import { type FilterItem } from "~/components/ui/Filters";

export enum ACTIVE_FILTER {
  TWEETS = "tweets",
  REPLIES = "replies",
  MEDIA = "media",
  LIKES = "likes",
}

const useProfile = (username: string) => {
  const [filter, setFilter] = useState<ACTIVE_FILTER>(ACTIVE_FILTER.TWEETS);
  const { data } = api.posts.getByUsername.useQuery({
    username,
  });

  const navItems: FilterItem[] = [
    {
      text: "Tweets",
      value: ACTIVE_FILTER.TWEETS,
      handler: () => setFilter(ACTIVE_FILTER.TWEETS),
    },
    {
      text: "Tweets & replies",
      value: ACTIVE_FILTER.REPLIES,
      handler: () => setFilter(ACTIVE_FILTER.REPLIES),
    },
    {
      text: "Media",
      value: ACTIVE_FILTER.MEDIA,
      handler: () => setFilter(ACTIVE_FILTER.MEDIA),
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