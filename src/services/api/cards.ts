import axiosInstance from "./axiosInstance";
import { Item } from "@/types";

interface ScryfallResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: Item[];
}

export const getCards = async (limit: number = 2000): Promise<Item[]> => {
  try {
    const allCards: Item[] = [];
    let page = 1;
    const cardsPerPage = 175;
    const totalPages = Math.ceil(limit / cardsPerPage);

    while (allCards.length < limit && page <= totalPages) {
      const response = await axiosInstance.get<ScryfallResponse>(
        "/cards/search",
        {
          params: {
            q: "type:creature OR type:instant OR type:sorcery",
            page: page,
            order: "name",
          },
        }
      );

      allCards.push(...response.data.data);

      if (!response.data.has_more) break;
      page++;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return allCards.slice(0, limit);
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};
