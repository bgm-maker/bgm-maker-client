import { useDrag } from "react-dnd";
import * as Tone from "tone";

import { ITEM_TYPES } from "../../constants";

export default function InstrumentSampleSource({ handleShowSample, sample }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.INSTRUMENT_SAMPLE,
    item: { hello: "world" },
    end: () => {
      if (!handleShowSample) return;
      handleShowSample(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  function handlePlaySample() {
    sample.triggerAttackRelease("C3", "4n");
  }

  return (
    <div>
      <div ref={drag} onClick={handlePlaySample} style={{
        width: 80,
        height: 40,
        borderStyle: "solid",
        opacity: isDragging ? 0.5 : 1,
      }}
      >여기는 샘플바들 올거임
      </div>
      <button onClick={() => { Tone.Transport.swing = 0; Tone.Transport.start(); Tone.start(); }}>play</button>
    </div>
  );
}
