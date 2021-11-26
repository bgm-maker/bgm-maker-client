import styled from "styled-components";

import WaveFadeInOutToggle from "../atoms/WaveFadeInOutToggle";

export default function WaveFadeInOutGroup({ waveHandler }) {

  function handleFadeIn() {
    waveHandler.toggleFadeIn();
  }

  function handleFadeOut() {
    waveHandler.toggleFadeOut();
  }

  return (
    <FadeInOutToggleWrapper>
      <WaveFadeInOutToggle
        type={"checkbox"}
        onClick={handleFadeIn}
        name={"Fade In"}
      />
      <WaveFadeInOutToggle
        type={"checkbox"}
        onClick={handleFadeOut}
        name={"Fade Out"}
      />
    </FadeInOutToggleWrapper>
  );
}

const FadeInOutToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;
