import { useState } from "react";
import { useDrop } from "react-dnd";

import { ITEM_TYPES } from "../constants";

export default function useDropSample() {
  const [sampleInfo, setSampleInfo] = useState(null);
  const [isDropped, setIsDropped] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.INSTRUMENT_SAMPLE,
    drop: (sampleInfo) => {
      setSampleInfo(sampleInfo);
      setIsDropped(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return [isOver, drop, setSampleInfo, sampleInfo, isDropped, setIsDropped];
}
