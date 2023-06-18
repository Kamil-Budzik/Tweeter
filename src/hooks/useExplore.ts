import { api } from "~/utils/api";
import { useState } from "react";
import { type FilterItem } from "~/components/ui/Filters";

export enum EXPLORE_ACTIVE_FILTER {
  TOP = "TOP",
  LATEST = "LATEST",
  COMMENTED = "COMMENTED",
  SAVED = "SAVED",
}

const useExplore = () => {
  const [filter, setFilter] = useState<EXPLORE_ACTIVE_FILTER>(
    EXPLORE_ACTIVE_FILTER.TOP
  );
  const { data, isLoading } = api.posts.getAll.useQuery();

  const navItems: FilterItem[] = [
    {
      text: "Top",
      value: EXPLORE_ACTIVE_FILTER.TOP,
      handler: () => setFilter(EXPLORE_ACTIVE_FILTER.TOP),
    },
    {
      text: "Latest",
      value: EXPLORE_ACTIVE_FILTER.LATEST,
      handler: () => setFilter(EXPLORE_ACTIVE_FILTER.LATEST),
    },
    {
      text: "Most Comments",
      value: EXPLORE_ACTIVE_FILTER.COMMENTED,
      handler: () => setFilter(EXPLORE_ACTIVE_FILTER.COMMENTED),
    },
    {
      text: "Most Saved",
      value: EXPLORE_ACTIVE_FILTER.SAVED,
      handler: () => setFilter(EXPLORE_ACTIVE_FILTER.SAVED),
    },
  ];

  return { data, filter, navItems, isLoading };
};

export default useExplore;