import { useInfiniteQuery } from "@tanstack/react-query";
import { Item } from "@/types";
import { getCards } from "@/services/api/cards";

interface UseItemsReturn {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  totalCards: number;
}

export const useItems = (maxLimit: number = 2000): UseItemsReturn => {
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items", maxLimit],
    queryFn: ({ pageParam = 1 }) => getCards(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce(
        (sum, page) => sum + page.data.length,
        0
      );

      if (currentTotal >= maxLimit || !lastPage.has_more) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
  });

  const items =
    data?.pages.flatMap((page) => page.data).slice(0, maxLimit) ?? [];

  const totalCards = data?.pages[0]?.total_cards ?? 0;

  return {
    items,
    isLoading,
    error: error?.message || null,
    refetch,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    totalCards,
  };
};
