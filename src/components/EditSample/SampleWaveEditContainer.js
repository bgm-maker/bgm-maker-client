import styled from "styled-components";

import PlayerAndCutTools from "./PlayerAndCutTools";
import FadeInOutTools from "./FadeInOutTools";
import SoundEffectTools from "./SoundEffectTools";

export default function SampleWaveEditContainer({ waveHandler }) {

  return (
    <EditAndPlayerWrapper>
      <PlayerAndCutTools waveHandler={waveHandler} />
      <FadeInOutTools waveHandler={waveHandler} />
      <SoundEffectTools waveHandler={waveHandler} />
    </EditAndPlayerWrapper>
  );
}

const EditAndPlayerWrapper = styled.div`
  width: 280px;
  height: 443px;
  margin: 122px 0 0 50px;
  background: white;
  border-radius: 30px;
  box-shadow: 4px 4px 10px 2px #654e46;
`;
