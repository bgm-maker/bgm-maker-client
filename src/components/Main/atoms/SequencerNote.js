import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import * as Tone from "tone";

import SampleGroup from "../molecules/SampleGroup";
import useDropSample from "../../../customHooks/useDropSample";
import { selectCurrentNote } from "../../../feature/showCurrentNoteSlice";
import { selectDropZoneCount } from "../../../feature/sequencerDropZoneCountSlice";
import {
  addSequencerSamples,
  removeSequencerSample
} from "../../../feature/sequencerSamplesSlice";

export default function SequencerNote({ measure, quarter, dropZoneRowNum }) {
  const dispatch = useDispatch();
  const sampleSchedule = useRef(null);
  const isPlayingNote = (useSelector(selectCurrentNote) === `${measure}:${quarter}`);
  const dropZoneRowSamples = useSelector((state) => state.sequencerSamples[dropZoneRowNum]);
  const dropZoneCount = useSelector(selectDropZoneCount);
  const [isOver, drop, setSampleInfo, sampleInfo, isDropped, setIsDropped] = useDropSample();

  useEffect(() => {
    const time = `${measure}:${quarter}:0`;

    if (sampleSchedule.current !== null) {
      dispatch(removeSequencerSample({ dropZoneRowNum, time }));
      Tone.Transport.clear(sampleSchedule.current);
      sampleSchedule.current = null;
      return;
    }

    if (isDropped) {
      const scheduleId = Tone.Transport.schedule(() => {
        sampleInfo.sample.sample.start();
      }, time);

      sampleSchedule.current = scheduleId;
      dispatch(addSequencerSamples({ sampleInfo, dropZoneRowNum, time }));
    }
  }, [isDropped, sampleInfo]);

  useEffect(() => {
    const time = `${measure}:${quarter}:0`;
    const isDroppedSample =
      dropZoneRowSamples ? dropZoneRowSamples[time] : undefined;

    if (isDroppedSample) {
      setIsDropped(true);
      setSampleInfo(isDroppedSample);
    }

    return () => {
      Tone.Transport.clear(sampleSchedule.current);
    }
  }, []);

  return (
    <StyledSingleNote
      ref={drop}
      isOver={isOver}
      isPlayingNote={isPlayingNote}
    >
      {
        isDropped &&
        <SampleGroup
          sample={sampleInfo.sample}
          instType={sampleInfo.instType}
          order={sampleInfo.order}
          isDropped={isDropped}
          setIsDropped={setIsDropped}
        >
          <SampleGroup.SampleDiv
            measure={measure}
            quarter={quarter}
            dropZoneCount={dropZoneCount.noteCount}
          />
        </SampleGroup>
      }
    </StyledSingleNote>
  );
};

const StyledSingleNote = styled.div`
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
