import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";

import { INITIAL_VOLUME, INITIAL_REVERB } from "../../constants";
import connectEffectAndSample from "../../util/connectEffectAndSample";

export default function EffectZone({ isFirstDropZone, dropZoneRowNum }) {
  const [effect, setEffect] = useState({
    volume: INITIAL_VOLUME,
    reverb: INITIAL_REVERB,
  });
  const dropZoneRowSamples = useSelector((state) => state.samples[dropZoneRowNum]);

  function handleChangeEffectValue(event) {
    let { name, value } = event.target;
    value = Number(value);

    connectEffectAndSample(dropZoneRowSamples, name, value);
    setEffect((prevValue) => ({ ...prevValue, [name]: value }));
  }

  return (
    <EffectWrapper isFirstDropZone={isFirstDropZone}>
      <Label htmlFor="Volume">Volume</Label>
      <Range type="range" min="-10" max="10" value={effect.volume} name="volume" onChange={handleChangeEffectValue} />
      <Label htmlFor="Reverb">Reverb</Label>
      <Range type="range" min="0" max="10" value={effect.reverb} name="reverb" onChange={handleChangeEffectValue} />
    </EffectWrapper>
  );
}

const EffectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 109px;
  height: 70px;
  top: 19;
  margin-right: 45px;
  margin-bottom: ${(props) => props.isFirstDropZone ? "8px" : "3px"};
  margin-top: ${(props) => props.isFirstDropZone ? "14px" : "0px"};
`;

const Range = styled.input`
  height: 14px;
  width: 125px;
  border-radius: 12px;
  background-color: #93B5C6;
  background: white;
  box-shadow: 1px 1px 1px #C9CCD5, 0px 0px 1px #93B5C6;
  cursor: pointer;
  -webkit-appearance: none;
`;

const Label = styled.label`
  margin-top: 5px;
  font-size: 13px;
`;
