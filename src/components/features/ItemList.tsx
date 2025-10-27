"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
import { FixedSizeGrid } from "react-window";
import { Item, ItemData } from "@/types";
import { CardItem } from "./CardItem";
import { useGridDimensions } from "@/hooks/useGridDimensions";

interface ItemListProps {
  items: Item[];
}

export const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useGridDimensions(containerRef);

  const toggleFlip = useCallback((cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  }, []);

  const rowCount = Math.ceil(items.length / dimensions.columnCount);

  const itemData = useMemo(
    (): ItemData => ({
      items,
      columnCount: dimensions.columnCount,
      flippedCards,
      toggleFlip,
      cardWidth: dimensions.cardWidth,
      gap: dimensions.gap,
    }),
    [
      items,
      dimensions.columnCount,
      flippedCards,
      toggleFlip,
      dimensions.cardWidth,
      dimensions.gap,
    ]
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <FixedSizeGrid
        columnCount={dimensions.columnCount}
        columnWidth={dimensions.columnWidth}
        height={dimensions.height}
        rowCount={rowCount}
        rowHeight={dimensions.rowHeight}
        width={dimensions.width}
        itemData={itemData}
      >
        {CardItem}
      </FixedSizeGrid>
    </div>
  );
};
