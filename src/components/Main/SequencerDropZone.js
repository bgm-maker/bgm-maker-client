import { useState } from "react";
import { useDrop } from "react-dnd";

import { ITEM_TYPES } from "../../constants";

export default function SequencerDropZone() {
  const [text, setText] = useState("hello")

  const [isOver, drop] = useDrop(() => ({
    accept: ITEM_TYPES.INSTRUMENT_SAMPLE,
    drop: (item, monitor) => { setText("우와아아아아") },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return <div ref={drop} style={{ width: 1000, height: 70, borderStyle: "solid" }}>{text}</div>
}
