import { useState, useEffect, useMemo } from "react";

interface Dimensions {
  width: number;
  height: number;
  columnCount: number;
  columnWidth: number;
  rowHeight: number;
  cardWidth: number;
  gap: number;
}

export const useGridDimensions = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 1200,
    height: 600,
  });

  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateContainerDimensions();
    window.addEventListener("resize", updateContainerDimensions);

    return () =>
      window.removeEventListener("resize", updateContainerDimensions);
  }, [containerRef]);

  const dimensions = useMemo((): Dimensions => {
    const containerWidth = containerDimensions.width;
    const containerHeight = containerDimensions.height;
    const minCardWidth = 200;
    const gap = 16;

    const availableWidth = containerWidth - gap * 2;
    let columnCount = Math.floor((availableWidth + gap) / (minCardWidth + gap));
    columnCount = Math.max(1, columnCount);

    const totalGapWidth = gap * (columnCount + 1) - 20;
    const cardWidth = (containerWidth - totalGapWidth - 20) / columnCount;
    const columnWidth = cardWidth + gap;
    const rowHeight = Math.floor(cardWidth * 1.4);

    return {
      width: containerWidth,
      height: containerHeight,
      columnCount,
      columnWidth,
      rowHeight,
      cardWidth,
      gap,
    };
  }, [containerDimensions]);

  return dimensions;
};
