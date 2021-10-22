import styled from "styled-components";

import useDragSample from "../../customHooks/useDragSample";
import useSingleAndDoubleClick from "../../customHooks/useSingleAndDoubleClick";

export default function InstrumentSampleSource({ isDropped, handleShowSample, duration, sample, instType, history, order, nowPlayingSample, setNowPlayingSample }) {
  const [isDragging, drag] = useDragSample(handleShowSample, sample, instType, order);
  const { handleSingleClick, handleDoubleClick } = useSingleAndDoubleClick(handlePlaySample, handleRouteSampleDetail);

  function handlePlaySample() {
    if (isDropped) return;

    try {
      nowPlayingSample[0]?.stop();
      sample[0].start();
      setNowPlayingSample(sample);
    } catch (err) {
      alert("아직 샘플이 준비 되지 않았습니다 :(");
    }
  }

  function handleRouteSampleDetail() {
    if (isDropped) return;

    const sampleUrl = sample[1];
    nowPlayingSample[0]?.stop();
    history.push("/editSample", sampleUrl);
  }

  return (
    <SampleSource
      ref={drag}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      isDragging={isDragging}
      isDropped={isDropped}
      instType={instType}
      sample={sample}
      duration={duration}
    >
      <Contents>
        <Text size="20px">{order}</Text>
        <Text>click & Drag</Text>
      </Contents>
    </SampleSource>
  );
}

const SampleSource = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${(props) => {
    if (!props.isDropped) {
      return "140px";
    }
    const length = props.duration || Math.floor(props.sample[0].buffer._buffer.duration);

    return `${31 * 2 * length}px`;
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
  box-shadow: 2.5px 2.5px 5px #C9CCD5;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: black;
`;

const Text = styled.span`
  font-size: ${props => props.size || "10px"};
`;
