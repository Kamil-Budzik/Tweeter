import { api } from "~/utils/api";
import { useState } from "react";

export enum ACTIVE_FILTER {
  TWEETS = "tweets",
  REPLIES = "replies",
  MEDIA = "media",
  LIKES = "likes",
}

const useProfile = (username: string) => {
  const [filters, setFilters] = useState<ACTIVE_FILTER>(ACTIVE_FILTER.TWEETS);
  const { data } = api.posts.getByUsername.useQuery({
    username,
  });

  const handleFiltersChange = (v: ACTIVE_FILTER) => {
    setFilters(v);
  };

  return { data, filters, setFilters: handleFiltersChange };
};

export default useProfile;