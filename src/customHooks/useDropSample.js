import { useState } from "react";
import { useDrop } from "react-dnd";

import { ITEM_TYPES } from "../constants";

export default function useDropSample(setIsDropped, setSampleInfo) {
  const [sampler, setSampler] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.INSTRUMENT_SAMPLE,
    drop: (item) => {
      const { sample, instType, order } = item.current;

      setSampleInfo({ instType, order });
      setSampler(sample);
      setIsDropped(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return [isOver, drop, sampler];
}
