import styled from "styled-components";

import WavePlayerAndCutGroup from "../molecules/WavePlayerAndCutGroup"
import WaveFadeInOutGroup from "../molecules/WaveFadeInOutGroup";
import WaveEffectGroup from "../molecules/WaveEffectGroup";

export default function WaveEditZone({ waveHandler }) {

  return (
    <EditAndPlayerWrapper>
      <WavePlayerAndCutGroup waveHandler={waveHandler} />
      <WaveFadeInOutGroup waveHandler={waveHandler} />
      <WaveEffectGroup waveHandler={waveHandler} />
    </EditAndPlayerWrapper>
  );
}

const EditAndPlayerWrapper = styled.div`
  width: 25vw;
  height: 69vh;
  margin: 5vw 0 0 4vw;
  background: white;
  border-radius: 30px;
  box-shadow: 4px 4px 10px 2px #654e46;
`;
