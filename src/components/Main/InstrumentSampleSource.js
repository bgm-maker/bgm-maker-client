import { useDrag } from "react-dnd";

import { ITEM_TYPES } from "../../constants";

export default function InstrumentSampleSource() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.INSTRUMENT_SAMPLE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div>
      <div ref={drag} style={{
        width: 80,
        height: 40,
        borderStyle: "solid",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}>여기는 샘플바들 올거임
      </div>
    </div>
  );
}
