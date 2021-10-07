import { useState } from "react";
import { useDrop } from "react-dnd";

import InstrumentSampleSource from "./InstrumentSampleSource";
import { ITEM_TYPES } from "../../constants";

export default function SequencerDropZone() {
  const [isDropped, setIsDropped] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.INSTRUMENT_SAMPLE,
    drop: (item, monitor) => {
      setIsDropped(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  return (
    <div
      ref={drop}
      style={{
        width: 1000,
        height: 70,
        borderStyle: "solid",
        backgroundColor: isOver ? "gray" : "white"
      }}
      onClick={test}
    >
      <div style={{ width: 90, height: 60 }}>
        {isDropped && <InstrumentSampleSource handleShowSample={setIsDropped} />}
      </div>
    </div>
  );
}
