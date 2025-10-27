export interface Item {
  id: string;
  name: string;
  type_line: string;
  mana_cost?: string;
  set_name: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    art_crop: string;
  };
  card_faces?: Array<{
    name: string;
    image_uris?: {
      small: string;
      normal: string;
      large: string;
    };
  }>;
  colors?: string[];
  rarity: string;
}

export interface ItemsResponse {
  data: Item[];
  total: number;
}

export interface ItemData {
  items: Item[];
  columnCount: number;
  flippedCards: Set<string>;
  toggleFlip: (id: string) => void;
  cardWidth: number;
  gap: number;
}
