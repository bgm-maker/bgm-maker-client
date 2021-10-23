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
  const [samplePart, setSamplePart] = useState(NaN);
  const [duration, setDuration] = useState(NaN);
  const [sampleInfo, setSampleInfo] = useState({});
  const [isOver, drop, sampler] = useDropSample(setIsDropped, setSampleInfo);
  const isPlayingNote = (useSelector(selectCurrentNote) === `${measure}:${quarter}`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sampler) return;

    const time = `${measure}:${quarter}:0`;
    const part = Tone.Transport.schedule(() => {
      dispatch(addSequencerSamples({ sampler, dropZoneRowNum }));
      sampler[0].start();
    }, time);

    setSamplePart(part);
  }, [sampler]);

  useEffect(() => {
    if (!sampler) return;

    if (!isDropped) {
      Tone.Transport.clear(samplePart);
      sessionStorage.removeItem(`${dropZoneRowNum}/${measure}/${quarter}`);
      return;
    }

    const sessionItem = JSON.stringify([
      isDropped,
      sampleInfo,
      sampler[0].buffer._buffer.duration
    ]);

    sessionStorage.setItem(`${dropZoneRowNum}/${measure}/${quarter}`, sessionItem);
  }, [isDropped]);

  useEffect(() => {
    let sessionValue = sessionStorage.getItem(`${dropZoneRowNum}/${measure}/${quarter}`);

    if (sessionValue) {
      sessionValue = JSON.parse(sessionValue);

      const [dropValue, sampleInfoValue, durationValue] = sessionValue;
      setDuration(durationValue);
      setIsDropped(dropValue);
      setSampleInfo(sampleInfoValue);
    }
  }, []);


  return (
    <SingleNote ref={drop} isOver={isOver} isPlayingNote={isPlayingNote}>
      {isDropped &&
        <InstrumentSampleSource
          isDropped={true}
          handleShowSample={setIsDropped}
          duration={duration}
          sample={sampler}
          instType={sampleInfo.instType}
          order={sampleInfo.order}
        />}
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
