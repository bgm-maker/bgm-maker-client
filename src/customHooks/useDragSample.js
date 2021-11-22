import { useRef } from "react";
import { useDrag } from "react-dnd";

import { ITEM_TYPES } from "../constants";

export default function useDragSample(handleShowSample, sample, instType, order) {
  const sampler = useRef({ sample, instType, order });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.INSTRUMENT_SAMPLE,
    item: sampler,
    end: () => {
      if (!handleShowSample) return;

      handleShowSample(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return [isDragging, drag];
}
