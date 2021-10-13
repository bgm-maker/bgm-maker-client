import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Tone from "tone";

import InstrumentSampleSource from "./InstrumentSampleSource";
import useDropSample from "../../customHooks/useDropSample";
import { addSequencerSamples } from "../../feature/sequencerSamplesSlice";

export default function SequencerNote({ measure, quarter, dropZoneRowNum }) {
  const [isDropped, setIsDropped] = useState(false);
  const [samplePart, setSamplePart] = useState(null);
  const [isOver, drop, sampler] = useDropSample(setIsDropped);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sampler) return;

    const time = `${measure}:${quarter}:0`;
    const part = Tone.Transport.schedule(() => {
      dispatch(addSequencerSamples({
        sampler,
        dropZoneRowNum,
      }));
      sampler.start();
    }, time)

    setSamplePart(part);
  }, [sampler]);

  useEffect(() => {
    if (!isDropped) {
      samplePart?.dispose();
    }
  }, [isDropped]);

  return (
    <div
      ref={drop}
      style={{
        width: 25,
        height: 70,
        borderStyle: "solid",
        backgroundColor: isOver ? "gray" : "white",
      }}
    >
      {isDropped && <InstrumentSampleSource handleShowSample={setIsDropped} sample={sampler} />}
    </div>
  );
}
