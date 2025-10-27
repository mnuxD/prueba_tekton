"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
import { FixedSizeGrid, GridOnItemsRenderedProps } from "react-window";
import { Item, ItemData } from "@/types";
import { CardItem } from "./CardItem";
import { useGridDimensions } from "@/hooks/useGridDimensions";
import { Spinner } from "@/components/common";

interface ItemListProps {
  items: Item[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}) => {
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

  const handleItemsRendered = useCallback(
    (props: GridOnItemsRenderedProps) => {
      const { visibleRowStopIndex } = props;

      const threshold = Math.max(0, rowCount - 3);

      if (
        visibleRowStopIndex >= threshold &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage
      ) {
        fetchNextPage();
      }
    },
    [rowCount, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <FixedSizeGrid
        columnCount={dimensions.columnCount}
        columnWidth={dimensions.columnWidth}
        height={dimensions.height}
        rowCount={rowCount}
        rowHeight={dimensions.rowHeight}
        width={dimensions.width}
        itemData={itemData}
        onItemsRendered={handleItemsRendered}
      >
        {CardItem}
      </FixedSizeGrid>

      {isFetchingNextPage && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 flex items-center gap-3">
          <Spinner size="sm" />
          <span className="text-sm text-gray-600">Cargando...</span>
        </div>
      )}
    </div>
  );
};
