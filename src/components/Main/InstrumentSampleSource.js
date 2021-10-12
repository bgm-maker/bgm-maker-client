import * as Tone from "tone";

import useDragSample from "../../customHooks/useDragSample";

export default function InstrumentSampleSource({ handleShowSample, sample }) {
  const [isDragging, drag] = useDragSample(handleShowSample, sample);

  function handlePlaySample() {
    sample.start();
  }

  return (
    <div>
      <div
        ref={drag}
        onClick={handlePlaySample}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: 120,
          height: 40,
          borderStyle: "solid",
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: "lightcoral",
        }}
      >
        <span>sample</span>
        <span>click</span>
      </div>
    </div>
  );
}
