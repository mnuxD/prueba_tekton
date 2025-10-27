import { Item } from "@/types";

export const getImageUrl = (item: Item): string => {
  if (item.image_uris?.normal) {
    return item.image_uris.normal;
  }
  if (item.card_faces?.[0]?.image_uris?.normal) {
    return item.card_faces[0].image_uris.normal;
  }
  return "/no_image.jpg";
};
