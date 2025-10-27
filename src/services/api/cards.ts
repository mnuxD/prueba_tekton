import axiosInstance from "./axiosInstance";
import { Item } from "@/types";

export interface ScryfallResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: Item[];
}

export const getCards = async (page: number = 1): Promise<ScryfallResponse> => {
  try {
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

    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};
