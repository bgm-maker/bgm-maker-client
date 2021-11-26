import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { INITIAL_VOLUME, INITIAL_REVERB } from "../../../constants";
import SequencerEffectRange from "../atoms/SequencerEffectRange";
import connectEffectAndSample from "../../../util/connectEffectAndSample";

export default function SequencerEffectGroup({ dropZoneRowNum }) {
  const dropZoneRowSamples = useSelector((state) => state.sequencerSamples[dropZoneRowNum]);
  const [effect, setEffect] = useState({ volume: INITIAL_VOLUME, reverb: INITIAL_REVERB });

  function handleChangeEffectValue(event) {
    const name = event.target.name;
    const value = Number(event.target.value);
    setEffect((prevValue) => ({ ...prevValue, [name]: value }));

    if (dropZoneRowSamples) {
      connectEffectAndSample(dropZoneRowSamples, name, value);
    }
  }

  return (
    <StyledEffectGroup>
      <SequencerEffectRange
        type="range"
        min="-10"
        max="10"
        value={effect.volume}
        name="volume"
        onChange={handleChangeEffectValue}
      />
      <SequencerEffectRange
        type="range"
        min="0"
        max="10"
        value={effect.reverb}
        name="reverb"
        onChange={handleChangeEffectValue}
      />
    </StyledEffectGroup>
  );
};

const StyledEffectGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 70px;
  border: 0.1px solid black;
  border-radius: 4px;
  margin-left: 5px;
  margin-right: 10px;
`;
