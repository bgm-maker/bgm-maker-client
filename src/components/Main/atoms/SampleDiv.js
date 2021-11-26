import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SampleContext } from "../molecules/SampleGroup";
import useDragSample from "../../../customHooks/useDragSample";
import useSingleAndDoubleClick from "../../../customHooks/useSingleAndDoubleClick";
import {
  initNowPlayingSample,
  setNowPlayingSample,
  selectNowPlayingSample
} from "../../../feature/nowPlayingSampleSlice";

export default function SampleDiv({ measure, quarter, dropZoneCount }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { instType, sample, order, setIsDropped, isDropped } = useContext(SampleContext);
  const nowPlayingSample = useSelector(selectNowPlayingSample);
  const { handleSingleClick, handleDoubleClick } = useSingleAndDoubleClick(handlePlaySample, handleRouteSampleDetail);
  const [isDragging, drag] = useDragSample(instType, sample, order, setIsDropped);

  function handlePlaySample() {
    if (nowPlayingSample.sampleUrl === sample.sampleUrl) {
      nowPlayingSample.sample.stop();
      dispatch(initNowPlayingSample());
      return;
    }

    if (nowPlayingSample.isPlaying) {
      nowPlayingSample.sample.stop();
    }

    dispatch(setNowPlayingSample(sample));
    sample.sample.start();
  }

  function handleRouteSampleDetail() {
    if (nowPlayingSample.isPlaying) {
      nowPlayingSample.sample.stop();
    }

    const sampleUrl = sample.sampleUrl;
    history.push("/editSample", sampleUrl);
  }

  return (
    <StyledSampleDiv
      ref={drag}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      isDragging={isDragging}
      isDropped={isDropped}
      instType={instType}
      sample={sample}
      measure={measure}
      quarter={quarter}
      dropZoneCount={dropZoneCount}
    >
      <StyledOrderText>{order + 1}</StyledOrderText>
      <StyledManualText>Click / DoubleClick / Drag</StyledManualText>
    </StyledSampleDiv>
  );
};

const StyledSampleDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${(props) => {
    if (!props.isDropped) {
      return "140px";
    }

    const currentNoteCount = ((props.dropZoneCount - props.measure) * 4) - (props.quarter - 1);
    const sampleCount = Math.floor(props.sample.sample.buffer._buffer.duration / 0.49);

    if (currentNoteCount < sampleCount) {
      return `${currentNoteCount * 30.9}px`;
    }
    return `${sampleCount * 30.9}px`;
  }};
  height: 40px;
  border-style: solid;
  border-width: 0.1px;
  border-color: #E6E6E6;
  background-color: ${(props) => {
    switch (props.instType) {
      case "chord": return "#e0d2c4"
      case "bass": return "#d1afab"
      case "rhythm": return "#977673;"
      case "effect": return "#654e46"
      default: return "#93B5C6"
    }
  }};
  text-align: center;
  justify-content: center;
  box-shadow: 2.5px 2.5px 5px #C9CCD5;
  &:hover {
    filter: brightness(105%)
  }
`;

const StyledOrderText = styled.div`
  font-size: 20px;
`;

const StyledManualText = styled.div`
  font-size: 10px;
`;
