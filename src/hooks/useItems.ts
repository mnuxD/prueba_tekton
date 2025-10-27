import { useQuery } from "@tanstack/react-query";
import { Item } from "@/types";
import { getCards } from "@/services/api/cards";

interface UseItemsReturn {
  items: Item[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useItems = (limit: number = 2000): UseItemsReturn => {
  const {
    data: items = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["items", limit],
    queryFn: () => getCards(limit),
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
  });

  const loading = isLoading || isFetching;

  return {
    items,
    loading,
    error: error?.message || null,
    refetch,
  };
};
