import { useState } from "react";
import styled from "styled-components";

export default function SoundEffectTools({ waveHandler }) {
  const [effectsValue, setEffectsValue] = useState({});

  function handleEffects(event) {
    const { name, value } = event.target;

    waveHandler.setEffects({ [name]: value });
    setEffectsValue((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <EffectWrapper>
      <p>Biquad</p>
      <Range
        type="range"
        name="biquad"
        min={0} max={10}
        value={effectsValue.biquad || 0}
        onChange={handleEffects}
      />
      <p>Compressor</p>
      <Range
        type="range"
        name="compressor"
        min={-30}
        max={0}
        value={effectsValue.compressor || -30}
        onChange={handleEffects}
      />
      <p>Volume</p>
      <Range
        type="range"
        name="volume"
        min={-5}
        max={7}
        value={effectsValue.volume || 0}
        onChange={handleEffects}
      />
    </EffectWrapper>
  );
}

const EffectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 50px;
`;

const Range = styled.input`
  height: 25px;
  width: 190px;
  border-radius: 12px;
  margin-bottom: 8px;
  background-color: #93B5C6;
  background: white;
  box-shadow: 1px 1px 1px #C9CCD5, 0px 0px 1px #93B5C6;
  cursor: pointer;
  -webkit-appearance: none;
`;
