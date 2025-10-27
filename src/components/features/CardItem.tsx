import React from "react";
import { GridChildComponentProps } from "react-window";
import Image from "next/image";
import { Item, ItemData } from "@/types";
import { getImageUrl } from "@/utils";

export const CardItem: React.FC<GridChildComponentProps<ItemData>> = ({
  columnIndex,
  rowIndex,
  style,
  data,
}) => {
  const { items, columnCount, flippedCards, toggleFlip, cardWidth, gap } = data;
  const index = rowIndex * columnCount + columnIndex;

  if (index >= items.length) {
    return null;
  }

  const card = items[index];
  const isFlipped = flippedCards.has(card.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFlip(card.id);
  };

  const cellStyle = {
    ...style,
    left: `${parseFloat(style.left as string) + gap}px`,
    width: `${cardWidth}px`,
  };

  return (
    <div style={cellStyle} className="p-2">
      <div
        className="relative h-full cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={handleClick}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 transform-gpu"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardFront card={card} />

          <CardBack card={card} index={index} />
        </div>
      </div>
    </div>
  );
};

const CardFront: React.FC<{ card: Item }> = ({ card }) => (
  <div
    className="absolute inset-0 backface-hidden"
    style={{ backfaceVisibility: "hidden" }}
  >
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full overflow-hidden">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Image src="/flip-icon.svg" alt="Refresh" width={30} height={30} />
        </div>

        <Image
          src={getImageUrl(card)}
          alt={card.name}
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
          draggable="false"
          width={100}
          height={100}
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex items-center justify-end">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {card.rarity}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CardBack: React.FC<{ card: Item; index: number }> = ({ card, index }) => (
  <div
    className="absolute inset-0 backface-hidden"
    style={{
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
    }}
  >
    <div
      className={`bg-blue-50 rounded-xl shadow-2xl h-full overflow-hidden p-4 overflow-y-auto`}
    >
      <div className="space-y-3">
        <h3 className="font-bold text-lg leading-tight text-gray-900">
          {index + 1}. {card.name}
        </h3>

        <CardInfoSection label="Type" value={card.type_line} />

        <CardInfoSection label="Rarity" value={card.rarity} capitalize />

        <CardInfoSection label="Set" value={card.set_name} />
      </div>
    </div>
  </div>
);

const CardInfoSection: React.FC<{
  label: string;
  value: string;
  capitalize?: boolean;
}> = ({ label, value, capitalize = false }) => (
  <div className="bg-black/10 backdrop-blur-sm rounded-lg px-3 py-2">
    <span className="text-xs text-gray-600">{label}</span>
    <div className={`text-sm text-gray-900 ${capitalize ? "capitalize" : ""}`}>
      {value}
    </div>
  </div>
);
