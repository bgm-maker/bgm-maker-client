import { useDrag } from "react-dnd";

import { ITEM_TYPES } from "../constants";

export default function useDragSample(instType, sample, order, setIsDropped) {
  const sampleInfo = { instType, sample, order }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.INSTRUMENT_SAMPLE,
    item: sampleInfo,
    end: () => {
      if (!setIsDropped) {
        return;
      }

      setIsDropped(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return [isDragging, drag];
}
