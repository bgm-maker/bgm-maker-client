import { useState } from "react";
import { useDrop } from "react-dnd";

import { ITEM_TYPES } from "../constants";

export default function useDropSample(setIsDropped) {
  const [sampler, setSampler] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.INSTRUMENT_SAMPLE,
    drop: (item, monitor) => {
      setSampler(item.current);
      setIsDropped(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return [isOver, drop, sampler];
}
