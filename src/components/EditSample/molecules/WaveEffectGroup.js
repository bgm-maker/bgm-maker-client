import { useState } from "react";
import styled from "styled-components";

import EffectRange from "../../common/atoms/EffectRange";

export default function WaveEffectGroup({ waveHandler }) {
  const [effectsValue, setEffectsValue] = useState({});

  function handleEffects(event) {
    const { name, value } = event.target;

    waveHandler.setEffects({ [name]: value });
    setEffectsValue((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <EffectWrapper>
      <EffectRange
        type="range"
        name="biquad"
        min={0} max={10}
        value={effectsValue.biquad || 0}
        onChange={handleEffects}
      />
      <EffectRange
        type="range"
        name="compressor"
        min={-30}
        max={0}
        value={effectsValue.compressor || -30}
        onChange={handleEffects}
      />
      <EffectRange
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
