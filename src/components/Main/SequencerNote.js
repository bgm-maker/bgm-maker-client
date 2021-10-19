import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Tone from "tone";
import styled, { css } from "styled-components";

import InstrumentSampleSource from "./InstrumentSampleSource";
import useDropSample from "../../customHooks/useDropSample";
import { addSequencerSamples } from "../../feature/sequencerSamplesSlice";
import { selectCurrentNote } from "../../feature/showCurrentNoteSlice";

export default function SequencerNote({ measure, quarter, dropZoneRowNum }) {
  const [isDropped, setIsDropped] = useState(false);
  const [samplePart, setSamplePart] = useState(null);
  const [isOver, drop, sampler] = useDropSample(setIsDropped);
  const isPlayingNote = (useSelector(selectCurrentNote) === `${measure}:${quarter}`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sampler) return;

    const time = `${measure}:${quarter}:0`;
    const part = Tone.Transport.schedule(() => {
      dispatch(addSequencerSamples({
        sampler,
        dropZoneRowNum,
      }));
      sampler[0].start();
    }, time)

    setSamplePart(part);
  }, [sampler]);

  useEffect(() => {
    if (!isDropped) {
      samplePart?.dispose();
    }
  }, [isDropped]);

  return (
    <SingleNote ref={drop} isOver={isOver} isPlayingNote={isPlayingNote}>
      {isDropped && <InstrumentSampleSource handleShowSample={setIsDropped} sample={sampler} />}
    </SingleNote>
  );
}

const SingleNote = styled.div`
  width: 27px;
  height: 70px;
  margin: 1px;
  border-style: solid;
  border-width: 0.1px;
  ${(props) => {
    if (props.isOver) {
      return css`background-color: #DFF4F3`;
    }

    if (props.isPlayingNote) {
      return css`background-color: #DFF4F3`;
    }
  }}
`;
